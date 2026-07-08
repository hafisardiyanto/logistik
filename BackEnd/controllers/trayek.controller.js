const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getAll = async (req, res) => {
    try {
        const data = await prisma.trayek.findMany({
            include: {
                kotaAsal: true,
                kotaTujuan: true
            },
            orderBy: { id: 'desc' }
        });
        res.json({ success: true, data });
    } catch (error) {
        console.error("Error fetching Trayek:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

exports.getById = async (req, res) => {
    try {
        const data = await prisma.trayek.findUnique({
            where: { id: parseInt(req.params.id) }
        });
        if (!data) return res.status(404).json({ success: false, message: "Data tidak ditemukan" });
        res.json({ success: true, data });
    } catch (error) {
        console.error("Error fetching Trayek by ID:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

exports.create = async (req, res) => {
    try {
        const { kode, nama, cabang, kotaAsalId, kotaTujuanId, keterangan, aktif } = req.body;
        
        if (!kode || !nama || !kotaAsalId || !kotaTujuanId) {
            return res.status(400).json({ success: false, message: "Field bertanda * wajib diisi" });
        }

        const existing = await prisma.trayek.findUnique({ where: { kode } });
        if (existing) return res.status(400).json({ success: false, message: "Kode Trayek sudah digunakan" });

        const newItem = await prisma.trayek.create({
            data: {
                kode,
                nama,
                cabang: cabang || null,
                kotaAsalId: parseInt(kotaAsalId),
                kotaTujuanId: parseInt(kotaTujuanId),
                keterangan: keterangan || null,
                aktif: aktif !== false
            }
        });
        res.status(201).json({ success: true, message: "Data berhasil ditambahkan", data: newItem });
    } catch (error) {
        console.error("Error creating Trayek:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

exports.update = async (req, res) => {
    try {
        const { id } = req.params;
        const { kode, nama, cabang, kotaAsalId, kotaTujuanId, keterangan, aktif } = req.body;
        
        if (!kode || !nama || !kotaAsalId || !kotaTujuanId) {
            return res.status(400).json({ success: false, message: "Field bertanda * wajib diisi" });
        }

        const existing = await prisma.trayek.findFirst({ where: { kode, id: { not: parseInt(id) } } });
        if (existing) return res.status(400).json({ success: false, message: "Kode Trayek sudah digunakan" });

        const updatedItem = await prisma.trayek.update({
            where: { id: parseInt(id) },
            data: {
                kode,
                nama,
                cabang: cabang || null,
                kotaAsalId: parseInt(kotaAsalId),
                kotaTujuanId: parseInt(kotaTujuanId),
                keterangan: keterangan || null,
                aktif: aktif !== false
            }
        });
        res.json({ success: true, message: "Data berhasil diperbarui", data: updatedItem });
    } catch (error) {
        console.error("Error updating Trayek:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

exports.delete = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.trayek.delete({ where: { id: parseInt(id) } });
        res.json({ success: true, message: "Data berhasil dihapus" });
    } catch (error) {
        console.error("Error deleting Trayek:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};
