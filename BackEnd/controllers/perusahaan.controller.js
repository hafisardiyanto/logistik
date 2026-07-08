const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getAll = async (req, res) => {
    try {
        const data = await prisma.perusahaan.findMany({
            orderBy: { id: 'desc' }
        });
        res.json({ success: true, data });
    } catch (error) {
        console.error("Error fetching Perusahaan:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

exports.getById = async (req, res) => {
    try {
        const data = await prisma.perusahaan.findUnique({
            where: { id: parseInt(req.params.id) }
        });
        if (!data) return res.status(404).json({ success: false, message: "Data tidak ditemukan" });
        res.json({ success: true, data });
    } catch (error) {
        console.error("Error fetching Perusahaan by ID:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

exports.create = async (req, res) => {
    try {
        const { kode, nama, npwp, telepon, email, alamat, aktif } = req.body;
        
        if (!kode || !nama) {
            return res.status(400).json({ success: false, message: "Field bertanda * wajib diisi" });
        }

        const existing = await prisma.perusahaan.findUnique({ where: { kode } });
        if (existing) return res.status(400).json({ success: false, message: "Kode Perusahaan sudah digunakan" });

        const newItem = await prisma.perusahaan.create({
            data: {
                kode,
                nama,
                npwp: npwp || null,
                telepon: telepon || null,
                email: email || null,
                alamat: alamat || null,
                aktif: aktif !== false
            }
        });
        res.status(201).json({ success: true, message: "Data berhasil ditambahkan", data: newItem });
    } catch (error) {
        console.error("Error creating Perusahaan:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

exports.update = async (req, res) => {
    try {
        const { id } = req.params;
        const { kode, nama, npwp, telepon, email, alamat, aktif } = req.body;
        
        if (!kode || !nama) {
            return res.status(400).json({ success: false, message: "Field bertanda * wajib diisi" });
        }

        const existing = await prisma.perusahaan.findFirst({ where: { kode, id: { not: parseInt(id) } } });
        if (existing) return res.status(400).json({ success: false, message: "Kode Perusahaan sudah digunakan" });

        const updatedItem = await prisma.perusahaan.update({
            where: { id: parseInt(id) },
            data: {
                kode,
                nama,
                npwp: npwp || null,
                telepon: telepon || null,
                email: email || null,
                alamat: alamat || null,
                aktif: aktif !== false
            }
        });
        res.json({ success: true, message: "Data berhasil diperbarui", data: updatedItem });
    } catch (error) {
        console.error("Error updating Perusahaan:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

exports.delete = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.perusahaan.delete({ where: { id: parseInt(id) } });
        res.json({ success: true, message: "Data berhasil dihapus" });
    } catch (error) {
        console.error("Error deleting Perusahaan:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};
