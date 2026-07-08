const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// --- NEGARA ---
exports.getNegara = async (req, res) => {
    try {
        const data = await prisma.negara.findMany({ orderBy: { nama: 'asc' } });
        res.json({ success: true, data });
    } catch (error) { res.status(500).json({ success: false, message: error.message }); }
};
exports.createNegara = async (req, res) => {
    try {
        const { nama, aktif } = req.body;
        const data = await prisma.negara.create({ data: { nama, aktif: aktif !== false } });
        res.json({ success: true, data });
    } catch (error) { res.status(500).json({ success: false, message: error.message }); }
};
exports.updateNegara = async (req, res) => {
    try {
        const { id } = req.params;
        const { nama, aktif } = req.body;
        const data = await prisma.negara.update({ where: { id: Number(id) }, data: { nama, aktif } });
        res.json({ success: true, data });
    } catch (error) { res.status(500).json({ success: false, message: error.message }); }
};
exports.deleteNegara = async (req, res) => {
    try {
        await prisma.negara.delete({ where: { id: Number(req.params.id) } });
        res.json({ success: true });
    } catch (error) { res.status(500).json({ success: false, message: error.message }); }
};

// --- PROVINSI ---
exports.getProvinsi = async (req, res) => {
    try {
        const { negaraId } = req.query;
        let where = {};
        if (negaraId) where.negaraId = Number(negaraId);
        const data = await prisma.provinsi.findMany({ where, include: { negara: true }, orderBy: { nama: 'asc' } });
        res.json({ success: true, data });
    } catch (error) { res.status(500).json({ success: false, message: error.message }); }
};
exports.createProvinsi = async (req, res) => {
    try {
        const { nama, aktif, negaraId } = req.body;
        const data = await prisma.provinsi.create({ data: { nama, aktif: aktif !== false, negaraId: Number(negaraId) } });
        res.json({ success: true, data });
    } catch (error) { res.status(500).json({ success: false, message: error.message }); }
};
exports.updateProvinsi = async (req, res) => {
    try {
        const { id } = req.params;
        const { nama, aktif, negaraId } = req.body;
        const data = await prisma.provinsi.update({ where: { id: Number(id) }, data: { nama, aktif, negaraId: Number(negaraId) } });
        res.json({ success: true, data });
    } catch (error) { res.status(500).json({ success: false, message: error.message }); }
};
exports.deleteProvinsi = async (req, res) => {
    try {
        await prisma.provinsi.delete({ where: { id: Number(req.params.id) } });
        res.json({ success: true });
    } catch (error) { res.status(500).json({ success: false, message: error.message }); }
};

// --- KOTA ---
exports.getKota = async (req, res) => {
    try {
        const { provinsiId } = req.query;
        let where = {};
        if (provinsiId) where.provinsiId = Number(provinsiId);
        const data = await prisma.kota.findMany({ where, include: { provinsi: { include: { negara: true } } }, orderBy: { nama: 'asc' } });
        res.json({ success: true, data });
    } catch (error) { res.status(500).json({ success: false, message: error.message }); }
};
exports.createKota = async (req, res) => {
    try {
        const { nama, aktif, provinsiId } = req.body;
        const data = await prisma.kota.create({ data: { nama, aktif: aktif !== false, provinsiId: Number(provinsiId) } });
        res.json({ success: true, data });
    } catch (error) { res.status(500).json({ success: false, message: error.message }); }
};
exports.updateKota = async (req, res) => {
    try {
        const { id } = req.params;
        const { nama, aktif, provinsiId } = req.body;
        const data = await prisma.kota.update({ where: { id: Number(id) }, data: { nama, aktif, provinsiId: Number(provinsiId) } });
        res.json({ success: true, data });
    } catch (error) { res.status(500).json({ success: false, message: error.message }); }
};
exports.deleteKota = async (req, res) => {
    try {
        await prisma.kota.delete({ where: { id: Number(req.params.id) } });
        res.json({ success: true });
    } catch (error) { res.status(500).json({ success: false, message: error.message }); }
};

// --- KECAMATAN ---
exports.getKecamatan = async (req, res) => {
    try {
        const { kotaId } = req.query;
        let where = {};
        if (kotaId) where.kotaId = Number(kotaId);
        const data = await prisma.kecamatan.findMany({ where, include: { kota: { include: { provinsi: true } } }, orderBy: { nama: 'asc' } });
        res.json({ success: true, data });
    } catch (error) { res.status(500).json({ success: false, message: error.message }); }
};
exports.createKecamatan = async (req, res) => {
    try {
        const { nama, aktif, kotaId } = req.body;
        const data = await prisma.kecamatan.create({ data: { nama, aktif: aktif !== false, kotaId: Number(kotaId) } });
        res.json({ success: true, data });
    } catch (error) { res.status(500).json({ success: false, message: error.message }); }
};
exports.updateKecamatan = async (req, res) => {
    try {
        const { id } = req.params;
        const { nama, aktif, kotaId } = req.body;
        const data = await prisma.kecamatan.update({ where: { id: Number(id) }, data: { nama, aktif, kotaId: Number(kotaId) } });
        res.json({ success: true, data });
    } catch (error) { res.status(500).json({ success: false, message: error.message }); }
};
exports.deleteKecamatan = async (req, res) => {
    try {
        await prisma.kecamatan.delete({ where: { id: Number(req.params.id) } });
        res.json({ success: true });
    } catch (error) { res.status(500).json({ success: false, message: error.message }); }
};
