const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getAll = async (req, res) => {
    try {
        const data = await prisma.tipeContainer.findMany({
            orderBy: { id: 'desc' }
        });
        res.json({ success: true, data });
    } catch (error) {
        console.error("Error fetching Tipe Container:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

exports.create = async (req, res) => {
    try {
        const { nama, ukuran } = req.body;
        if (!nama) return res.status(400).json({ success: false, message: "Nama wajib diisi" });

        const existing = await prisma.tipeContainer.findUnique({ where: { nama } });
        if (existing) return res.status(400).json({ success: false, message: "Nama Tipe Container sudah ada" });

        const newItem = await prisma.tipeContainer.create({
            data: { nama, ukuran: ukuran || "-" }
        });
        res.status(201).json({ success: true, message: "Data berhasil ditambahkan", data: newItem });
    } catch (error) {
        console.error("Error creating Tipe Container:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

exports.update = async (req, res) => {
    try {
        const { id } = req.params;
        const { nama, ukuran } = req.body;
        if (!nama) return res.status(400).json({ success: false, message: "Nama wajib diisi" });

        const existing = await prisma.tipeContainer.findFirst({ where: { nama, id: { not: parseInt(id) } } });
        if (existing) return res.status(400).json({ success: false, message: "Nama Tipe Container sudah ada" });

        const updatedItem = await prisma.tipeContainer.update({
            where: { id: parseInt(id) },
            data: { nama, ukuran: ukuran || "-" }
        });
        res.json({ success: true, message: "Data berhasil diperbarui", data: updatedItem });
    } catch (error) {
        console.error("Error updating Tipe Container:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

exports.delete = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.tipeContainer.delete({ where: { id: parseInt(id) } });
        res.json({ success: true, message: "Data berhasil dihapus" });
    } catch (error) {
        console.error("Error deleting Tipe Container:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

exports.bulkCreate = async (req, res) => {
    try {
        const data = req.body; // Array of objects [{nama: '20ft', ukuran: '20'}, ...]
        if (!Array.isArray(data) || data.length === 0) {
            return res.status(400).json({ success: false, message: "Data tidak valid" });
        }

        let count = 0;
        for (const item of data) {
            if (item.nama) {
                const existing = await prisma.tipeContainer.findUnique({ where: { nama: item.nama } });
                if (!existing) {
                    await prisma.tipeContainer.create({
                        data: { nama: item.nama, ukuran: item.ukuran || "-" }
                    });
                    count++;
                }
            }
        }
        res.json({ success: true, message: `${count} data berhasil diimport` });
    } catch (error) {
        console.error("Error bulk creating Tipe Container:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};
