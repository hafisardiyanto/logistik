const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get all Kelompok Biaya (hierarchical or flat)
exports.getAll = async (req, res) => {
    try {
        const kelompokBiaya = await prisma.kelompokBiaya.findMany({
            include: {
                children: true // Include direct children for hierarchy
            },
            orderBy: {
                kode: 'asc'
            }
        });

        // The frontend can build the hierarchy, or we can send only top-level items with their children.
        // Let's send top level items and their nested children if requested, or just send all and let frontend structure it.
        // Since we are returning all, frontend can construct the tree.
        // Wait, to make it easier for frontend, maybe return only top-level and their nested children?
        // Actually, just returning all is fine if frontend groups them, but let's structure it here just in case.
        const topLevel = kelompokBiaya.filter(kb => !kb.kategoriId);
        
        // Populate children recursively if needed, but Prisma include children is only 1 level deep.
        // For our simple case, 1 level deep (Parent -> Child) is usually enough.
        // If there are more levels, frontend can map them. We'll just return the flat list and let frontend handle it, 
        // or return a tree. Let's return both or just a flat list since it's easier.
        // Let's return the structured top-level items for the table.
        
        const tree = topLevel.map(parent => {
            return {
                ...parent,
                children: kelompokBiaya.filter(child => child.kategoriId === parent.id)
            };
        });

        // But returning all might be better if we want to show all in a flat table with indentations.
        res.status(200).json(kelompokBiaya);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Gagal mengambil data kelompok biaya' });
    }
};

exports.getById = async (req, res) => {
    try {
        const { id } = req.params;
        const kelompokBiaya = await prisma.kelompokBiaya.findUnique({
            where: { id: Number(id) }
        });
        if (!kelompokBiaya) {
            return res.status(404).json({ error: 'Data tidak ditemukan' });
        }
        res.status(200).json(kelompokBiaya);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Gagal mengambil data' });
    }
};

exports.create = async (req, res) => {
    try {
        const { kategoriId, kodeAkun, kode, nama, stdBiaya, tipe, keterangan } = req.body;
        
        // Tipe is an array or string in req.body, but in DB it's string (Text).
        // If it's an array, stringify it or join by comma.
        const tipeString = Array.isArray(tipe) ? JSON.stringify(tipe) : tipe;

        const newKelompokBiaya = await prisma.kelompokBiaya.create({
            data: {
                kategoriId: kategoriId ? Number(kategoriId) : null,
                kodeAkun,
                kode,
                nama,
                stdBiaya: stdBiaya ? parseFloat(stdBiaya) : 0,
                tipe: tipeString,
                keterangan
            }
        });
        res.status(201).json(newKelompokBiaya);
    } catch (error) {
        console.error(error);
        if (error.code === 'P2002') {
            return res.status(400).json({ error: 'Kode sudah digunakan' });
        }
        res.status(500).json({ error: 'Gagal menyimpan data' });
    }
};

exports.update = async (req, res) => {
    try {
        const { id } = req.params;
        const { kategoriId, kodeAkun, kode, nama, stdBiaya, tipe, keterangan } = req.body;
        
        const tipeString = Array.isArray(tipe) ? JSON.stringify(tipe) : tipe;

        const updatedKelompokBiaya = await prisma.kelompokBiaya.update({
            where: { id: Number(id) },
            data: {
                kategoriId: kategoriId ? Number(kategoriId) : null,
                kodeAkun,
                kode,
                nama,
                stdBiaya: stdBiaya ? parseFloat(stdBiaya) : 0,
                tipe: tipeString,
                keterangan
            }
        });
        res.status(200).json(updatedKelompokBiaya);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Gagal mengubah data' });
    }
};

exports.delete = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.kelompokBiaya.delete({
            where: { id: Number(id) }
        });
        res.status(200).json({ message: 'Data berhasil dihapus' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Gagal menghapus data' });
    }
};
