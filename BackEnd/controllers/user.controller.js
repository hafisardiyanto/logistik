const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcrypt')

const prisma = new PrismaClient()

// GET /api/users
const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      include: { role: true }, // Include role data
      orderBy: { createdAt: 'desc' }
    })
    
    // Format data untuk frontend
    const formattedUsers = users.map(user => ({
      id: user.id,
      name: user.name,
      email: user.email,
      cabang: user.cabang,
      status: user.status,
      verified: user.verified,
      level: user.role ? user.role.name : 'Tidak Ada',
      lastActive: 'Baru saja' // Placeholder
    }))
    
    res.json(formattedUsers)
  } catch (error) {
    res.status(500).json({ error: 'Gagal mengambil data user' })
  }
}

// POST /api/users
const createUser = async (req, res) => {
  const { name, email, password, roleId, cabang } = req.body
  try {
    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        roleId: parseInt(roleId),
        cabang: cabang || 'Pusat'
      }
    })
    res.status(201).json(newUser)
  } catch (error) {
    res.status(400).json({ error: 'Gagal membuat user. Pastikan email belum digunakan.' })
  }
}

// PUT /api/users/:id
const updateUser = async (req, res) => {
  const { id } = req.params
  const { name, email, roleId, cabang, status, verified } = req.body
  try {
    const updatedUser = await prisma.user.update({
      where: { id: parseInt(id) },
      data: {
        name,
        email,
        roleId: parseInt(roleId),
        cabang,
        status,
        verified
      }
    })
    res.json(updatedUser)
  } catch (error) {
    res.status(400).json({ error: 'Gagal mengupdate user' })
  }
}

// DELETE /api/users/:id
const deleteUser = async (req, res) => {
  const { id } = req.params
  try {
    await prisma.user.delete({
      where: { id: parseInt(id) }
    })
    res.json({ message: 'User berhasil dihapus' })
  } catch (error) {
    res.status(400).json({ error: 'Gagal menghapus user' })
  }
}

module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUser
}
