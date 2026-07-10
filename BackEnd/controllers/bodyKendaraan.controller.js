const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getAll = async (req, res) => {
    try {
        const data = await prisma.bodyKendaraan.findMany({
            orderBy: {
                id: 'desc'
            }
        });
        res.status(200).json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Gagal mengambil data body kendaraan' });
    }
};

exports.create = async (req, res) => {
    try {
        const { nama, isPengecekan, isAktif } = req.body;
        
        if (!nama) {
            return res.status(400).json({ error: 'Nama Body harus diisi' });
        }

        const newData = await prisma.bodyKendaraan.create({
            data: { 
                nama,
                isPengecekan: isPengecekan !== undefined ? isPengecekan : true,
                isAktif: isAktif !== undefined ? isAktif : true
            }
        });
        res.status(201).json(newData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Gagal menyimpan data' });
    }
};

exports.update = async (req, res) => {
    try {
        const { id } = req.params;
        const { nama, isPengecekan, isAktif } = req.body;

        if (!nama) {
            return res.status(400).json({ error: 'Nama Body harus diisi' });
        }

        const updatedData = await prisma.bodyKendaraan.update({
            where: { id: Number(id) },
            data: { 
                nama,
                isPengecekan: isPengecekan !== undefined ? isPengecekan : true,
                isAktif: isAktif !== undefined ? isAktif : true
            }
        });
        res.status(200).json(updatedData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Gagal mengubah data' });
    }
};

exports.delete = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.bodyKendaraan.delete({
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
