const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getTipeModa = async (req, res) => {
    try {
        const moda = await prisma.tipeModa.findMany();
        res.status(200).json(moda);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Gagal mengambil data tipe moda' });
    }
};

exports.getAll = async (req, res) => {
    try {
        const data = await prisma.tipeKendaraan.findMany({
            include: {
                tipeModa: true
            },
            orderBy: {
                id: 'desc'
            }
        });
        res.status(200).json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Gagal mengambil data tipe kendaraan' });
    }
};

exports.create = async (req, res) => {
    try {
        const { nama, tipeModaId, kapasitasTonase, kapasitasKubikasi, rasioBbmMuat, rasioBbmKosong } = req.body;
        
        if (!nama || !tipeModaId) {
            return res.status(400).json({ error: 'Nama dan Tipe Moda harus diisi' });
        }

        const newData = await prisma.tipeKendaraan.create({
            data: {
                nama,
                tipeModaId: Number(tipeModaId),
                kapasitasTonase: Number(kapasitasTonase) || 0,
                kapasitasKubikasi: Number(kapasitasKubikasi) || 0,
                rasioBbmMuat: Number(rasioBbmMuat) || 0,
                rasioBbmKosong: Number(rasioBbmKosong) || 0
            },
            include: {
                tipeModa: true
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
        const { nama, tipeModaId, kapasitasTonase, kapasitasKubikasi, rasioBbmMuat, rasioBbmKosong } = req.body;

        if (!nama || !tipeModaId) {
            return res.status(400).json({ error: 'Nama dan Tipe Moda harus diisi' });
        }

        const updatedData = await prisma.tipeKendaraan.update({
            where: { id: Number(id) },
            data: {
                nama,
                tipeModaId: Number(tipeModaId),
                kapasitasTonase: Number(kapasitasTonase) || 0,
                kapasitasKubikasi: Number(kapasitasKubikasi) || 0,
                rasioBbmMuat: Number(rasioBbmMuat) || 0,
                rasioBbmKosong: Number(rasioBbmKosong) || 0
            },
            include: {
                tipeModa: true
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
        await prisma.tipeKendaraan.delete({
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
