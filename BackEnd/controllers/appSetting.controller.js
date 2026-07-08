const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// GET /api/app-settings
const getSettings = async (req, res) => {
  try {
    const { group } = req.query
    const where = group ? { group } : {}
    const settings = await prisma.appSetting.findMany({
      where,
      orderBy: { id: 'asc' }
    })
    res.json(settings)
  } catch (error) {
    res.status(500).json({ error: 'Gagal mengambil data pengaturan' })
  }
}

// GET /api/app-settings/:id
const getSetting = async (req, res) => {
  try {
    const setting = await prisma.appSetting.findUnique({
      where: { id: parseInt(req.params.id) }
    })
    if (!setting) return res.status(404).json({ error: 'Pengaturan tidak ditemukan' })
    res.json(setting)
  } catch (error) {
    res.status(500).json({ error: 'Gagal mengambil data pengaturan' })
  }
}

// POST /api/app-settings
const createSetting = async (req, res) => {
  const { key, label, value, type, group } = req.body
  try {
    const setting = await prisma.appSetting.create({
      data: { key, label, value: value || '', type: type || 'text', group: group || 'umum' }
    })
    res.status(201).json(setting)
  } catch (error) {
    if (error.code === 'P2002') {
      return res.status(400).json({ error: 'Key pengaturan sudah ada' })
    }
    res.status(400).json({ error: 'Gagal membuat pengaturan' })
  }
}

// PUT /api/app-settings/:id
const updateSetting = async (req, res) => {
  const { id } = req.params
  const { key, label, value, type, group } = req.body
  try {
    const setting = await prisma.appSetting.update({
      where: { id: parseInt(id) },
      data: { key, label, value, type, group }
    })
    res.json(setting)
  } catch (error) {
    res.status(400).json({ error: 'Gagal mengupdate pengaturan' })
  }
}

// PUT /api/app-settings/bulk - Update many settings at once
const bulkUpdateSettings = async (req, res) => {
  const { settings } = req.body // array of { id, value }
  try {
    const results = await prisma.$transaction(
      settings.map(s =>
        prisma.appSetting.update({
          where: { id: s.id },
          data: { value: s.value }
        })
      )
    )
    res.json(results)
  } catch (error) {
    res.status(400).json({ error: 'Gagal menyimpan pengaturan' })
  }
}

// DELETE /api/app-settings/:id
const deleteSetting = async (req, res) => {
  const { id } = req.params
  try {
    await prisma.appSetting.delete({
      where: { id: parseInt(id) }
    })
    res.json({ message: 'Pengaturan berhasil dihapus' })
  } catch (error) {
    res.status(400).json({ error: 'Gagal menghapus pengaturan' })
  }
}

module.exports = {
  getSettings,
  getSetting,
  createSetting,
  updateSetting,
  bulkUpdateSettings,
  deleteSetting
}