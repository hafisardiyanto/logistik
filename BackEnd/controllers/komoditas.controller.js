const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getAll = async (req, res) => {
    try {
        const data = await prisma.komoditas.findMany({
            orderBy: { id: 'desc' }
        });
        res.json({ success: true, data });
    } catch (error) {
        console.error("Error fetching Komoditas:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

exports.create = async (req, res) => {
    try {
        const { nama, default: isDefault } = req.body;
        if (!nama) return res.status(400).json({ success: false, message: "Nama wajib diisi" });

        const existing = await prisma.komoditas.findUnique({ where: { nama } });
        if (existing) return res.status(400).json({ success: false, message: "Nama Komoditas sudah ada" });

        const newItem = await prisma.komoditas.create({
            data: { nama, default: Boolean(isDefault) }
        });
        res.status(201).json({ success: true, message: "Data berhasil ditambahkan", data: newItem });
    } catch (error) {
        console.error("Error creating Komoditas:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

exports.update = async (req, res) => {
    try {
        const { id } = req.params;
        const { nama, default: isDefault } = req.body;
        if (!nama) return res.status(400).json({ success: false, message: "Nama wajib diisi" });

        const existing = await prisma.komoditas.findFirst({ where: { nama, id: { not: parseInt(id) } } });
        if (existing) return res.status(400).json({ success: false, message: "Nama Komoditas sudah ada" });

        const updatedItem = await prisma.komoditas.update({
            where: { id: parseInt(id) },
            data: { nama, default: Boolean(isDefault) }
        });
        res.json({ success: true, message: "Data berhasil diperbarui", data: updatedItem });
    } catch (error) {
        console.error("Error updating Komoditas:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

exports.delete = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.komoditas.delete({ where: { id: parseInt(id) } });
        res.json({ success: true, message: "Data berhasil dihapus" });
    } catch (error) {
        console.error("Error deleting Komoditas:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

exports.bulkCreate = async (req, res) => {
    try {
        const data = req.body; // Array of objects [{nama: 'Beras', default: true}, ...]
        if (!Array.isArray(data) || data.length === 0) {
            return res.status(400).json({ success: false, message: "Data tidak valid" });
        }

        let count = 0;
        for (const item of data) {
            if (item.nama) {
                const existing = await prisma.komoditas.findUnique({ where: { nama: item.nama } });
                if (!existing) {
                    await prisma.komoditas.create({
                        data: { nama: item.nama, default: Boolean(item.default) }
                    });
                    count++;
                }
            }
        }
        res.json({ success: true, message: `${count} data berhasil diimport` });
    } catch (error) {
        console.error("Error bulk creating Komoditas:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};
