const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// GET /api/roles
const getRoles = async (req, res) => {
  try {
    const roles = await prisma.role.findMany({
      include: {
        permissions: true,
        _count: {
          select: { users: true }
        }
      }
    })
    res.json(roles)
  } catch (error) {
    res.status(500).json({ error: 'Gagal mengambil data role' })
  }
}

// POST /api/roles
const createRole = async (req, res) => {
  const { name, permissions } = req.body
  try {
    // permissions is an array of objects: { module, canCreate, canRead, canUpdate, canDelete }
    const newRole = await prisma.role.create({
      data: {
        name,
        permissions: {
          create: permissions
        }
      },
      include: { permissions: true }
    })
    res.status(201).json(newRole)
  } catch (error) {
    res.status(400).json({ error: 'Gagal membuat role' })
  }
}

// PUT /api/roles/:id
const updateRole = async (req, res) => {
  const { id } = req.params
  const { name, permissions } = req.body
  
  try {
    // Transaction to update role and recreate permissions
    const updatedRole = await prisma.$transaction(async (prisma) => {
      // Delete old permissions
      await prisma.permission.deleteMany({
        where: { roleId: parseInt(id) }
      })
      
      // Update role and create new permissions
      return await prisma.role.update({
        where: { id: parseInt(id) },
        data: {
          name,
          permissions: {
            create: permissions
          }
        },
        include: { permissions: true }
      })
    })
    
    res.json(updatedRole)
  } catch (error) {
    res.status(400).json({ error: 'Gagal mengupdate role' })
  }
}

// DELETE /api/roles/:id
const deleteRole = async (req, res) => {
  const { id } = req.params
  try {
    await prisma.role.delete({
      where: { id: parseInt(id) }
    })
    res.json({ message: 'Role berhasil dihapus' })
  } catch (error) {
    res.status(400).json({ error: 'Gagal menghapus role' })
  }
}

module.exports = {
  getRoles,
  createRole,
  updateRole,
  deleteRole
}
