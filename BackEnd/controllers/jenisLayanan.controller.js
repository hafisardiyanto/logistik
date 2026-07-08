const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Get all
exports.getAll = async (req, res) => {
    try {
        const data = await prisma.jenisLayanan.findMany({
            include: {
                group: true
            },
            orderBy: {
                id: 'desc'
            }
        });
        res.json({
            success: true,
            data
        });
    } catch (error) {
        console.error("Error fetching Jenis Layanan:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// Create
exports.create = async (req, res) => {
    try {
        const { kode, nama, keterangan, default: isDefault, aktif, groupId } = req.body;
        
        // Simple validation
        if (!kode || !nama || !groupId) {
            return res.status(400).json({ success: false, message: "Kode, Nama, dan Grup Layanan wajib diisi" });
        }

        const newJenisLayanan = await prisma.jenisLayanan.create({
            data: {
                kode,
                nama,
                keterangan,
                default: Boolean(isDefault),
                aktif: Boolean(aktif),
                groupId: parseInt(groupId)
            }
        });

        res.status(201).json({
            success: true,
            message: "Data jenis layanan berhasil ditambahkan",
            data: newJenisLayanan
        });
    } catch (error) {
        console.error("Error creating Jenis Layanan:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// Update
exports.update = async (req, res) => {
    try {
        const { id } = req.params;
        const { kode, nama, keterangan, default: isDefault, aktif, groupId } = req.body;
        
        if (!kode || !nama || !groupId) {
            return res.status(400).json({ success: false, message: "Kode, Nama, dan Grup Layanan wajib diisi" });
        }

        const updatedJenisLayanan = await prisma.jenisLayanan.update({
            where: { id: parseInt(id) },
            data: {
                kode,
                nama,
                keterangan,
                default: Boolean(isDefault),
                aktif: Boolean(aktif),
                groupId: parseInt(groupId)
            }
        });

        res.json({
            success: true,
            message: "Data jenis layanan berhasil diperbarui",
            data: updatedJenisLayanan
        });
    } catch (error) {
        console.error("Error updating Jenis Layanan:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// Delete
exports.delete = async (req, res) => {
    try {
        const { id } = req.params;

        // Validasi transaksi mock (karena tabel transaksi belum ada)
        // TODO: Ganti `false` dengan query untuk mengecek relasi di tabel Transaksi nanti
        const isUsedInTransaction = false; 
        
        // Contoh jika dipakai, kembalikan response error:
        if (isUsedInTransaction) {
            return res.status(400).json({ 
                success: false, 
                message: "master ini telah digunakan transaksi" 
            });
        }

        await prisma.jenisLayanan.delete({
            where: { id: parseInt(id) }
        });

        res.json({
            success: true,
            message: "Data jenis layanan berhasil dihapus"
        });
    } catch (error) {
        console.error("Error deleting Jenis Layanan:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};
