const { PrismaClient } = require('@prisma/client')
const p = new PrismaClient()

p.user.findMany({ include: { role: { include: { permissions: true } } } })
  .then(users => {
    console.log('=== DAFTAR USER DI DATABASE ===')
    users.forEach(u => {
      console.log(`ID: ${u.id} | Name: ${u.name} | Email: ${u.email} | RoleId: ${u.roleId} | Role: ${u.role?.name || 'TIDAK ADA'}`)
    })
  })
  .finally(() => p.$disconnect())
