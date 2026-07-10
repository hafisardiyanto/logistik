const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get All Tipe Pabrikan
exports.getTipePabrikan = async (req, res) => {
    try {
        const tipe = await prisma.tipePabrikan.findMany();
        res.status(200).json(tipe);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Gagal mengambil data tipe pabrikan' });
    }
};

// Get All Pabrikan
exports.getAll = async (req, res) => {
    try {
        const pabrikan = await prisma.pabrikan.findMany({
            include: {
                tipePabrikan: true
            },
            orderBy: {
                id: 'desc'
            }
        });
        res.status(200).json(pabrikan);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Gagal mengambil data pabrikan' });
    }
};

// Create Pabrikan
exports.create = async (req, res) => {
    try {
        const { nama, tipePabrikanId } = req.body;
        
        if (!nama || !tipePabrikanId) {
            return res.status(400).json({ error: 'Nama dan Tipe Pabrikan harus diisi' });
        }

        const newPabrikan = await prisma.pabrikan.create({
            data: {
                nama,
                tipePabrikanId: Number(tipePabrikanId)
            },
            include: {
                tipePabrikan: true
            }
        });
        res.status(201).json(newPabrikan);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Gagal menyimpan data' });
    }
};

// Update Pabrikan
exports.update = async (req, res) => {
    try {
        const { id } = req.params;
        const { nama, tipePabrikanId } = req.body;

        if (!nama || !tipePabrikanId) {
            return res.status(400).json({ error: 'Nama dan Tipe Pabrikan harus diisi' });
        }

        const updatedPabrikan = await prisma.pabrikan.update({
            where: { id: Number(id) },
            data: {
                nama,
                tipePabrikanId: Number(tipePabrikanId)
            },
            include: {
                tipePabrikan: true
            }
        });
        res.status(200).json(updatedPabrikan);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Gagal mengubah data' });
    }
};

// Delete Pabrikan
exports.delete = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.pabrikan.delete({
            where: { id: Number(id) }
        });
        res.status(200).json({ message: 'Data berhasil dihapus' });
    } catch (error) {
        console.error(error);
        if (error.code === 'P2003') {
            return res.status(400).json({ error: 'data tersebut telah digunakan transaksi tidak bisa dihapus' });
        }
        res.status(500).json({ error: 'Gagal menghapus data' });
    }
};
