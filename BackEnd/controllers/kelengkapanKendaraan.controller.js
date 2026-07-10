const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getAll = async (req, res) => {
    try {
        const data = await prisma.kelengkapanKendaraan.findMany({
            orderBy: {
                id: 'desc'
            }
        });
        res.status(200).json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Gagal mengambil data kelengkapan kendaraan' });
    }
};

exports.create = async (req, res) => {
    try {
        const { nama } = req.body;
        
        if (!nama) {
            return res.status(400).json({ error: 'Nama Kelengkapan harus diisi' });
        }

        const newData = await prisma.kelengkapanKendaraan.create({
            data: { nama }
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
        const { nama } = req.body;

        if (!nama) {
            return res.status(400).json({ error: 'Nama Kelengkapan harus diisi' });
        }

        const updatedData = await prisma.kelengkapanKendaraan.update({
            where: { id: Number(id) },
            data: { nama }
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
        await prisma.kelengkapanKendaraan.delete({
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
