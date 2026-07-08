const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcrypt')
const p = new PrismaClient()

async function fix() {
  console.log('Memperbaiki data...')

  // 1. Pastikan Role "Super Admin" ada dengan permissions lengkap
  let superAdminRole = await p.role.findUnique({ where: { name: 'Super Admin' } })
  if (!superAdminRole) {
    superAdminRole = await p.role.create({ data: { name: 'Super Admin' } })
    console.log('✅ Role Super Admin dibuat')
  }

  // 2. Pastikan permissions Super Admin terisi penuh
  await p.permission.deleteMany({ where: { roleId: superAdminRole.id } })
  const modules = ['Dashboard', 'Kontak', 'Tarif Logistik', 'Pemasaran', 'Order', 'Kapal & Kontainer', 'Data Kendaraan', 'Pengaturan']
  for (const mod of modules) {
    await p.permission.create({
      data: { module: mod, canCreate: true, canRead: true, canUpdate: true, canDelete: true, roleId: superAdminRole.id }
    })
  }
  console.log('✅ Permissions Super Admin diisi')

  // 3. Perbaiki user Super Admin (fix roleId)
  const hashedPw = await bcrypt.hash('superadmin123', 10)
  await p.user.upsert({
    where: { email: 'superadmin@logistics.com' },
    update: { roleId: superAdminRole.id, name: 'Super Admin', verified: 'Verified', status: 'Aktif' },
    create: { name: 'Super Admin', email: 'superadmin@logistics.com', password: hashedPw, cabang: 'Pusat', status: 'Aktif', verified: 'Verified', roleId: superAdminRole.id }
  })
  console.log('✅ User Super Admin diperbaiki')

  // 4. Pastikan Role "Operasional" ada dengan permissions terbatas
  let opRole = await p.role.findUnique({ where: { name: 'Operasional' } })
  if (!opRole) {
    opRole = await p.role.create({ data: { name: 'Operasional' } })
  }

  // Permissions Operasional: hanya bisa Read di beberapa modul
  await p.permission.deleteMany({ where: { roleId: opRole.id } })
  await p.permission.createMany({
    data: [
      { module: 'Dashboard', canCreate: false, canRead: true, canUpdate: false, canDelete: false, roleId: opRole.id },
      { module: 'Order', canCreate: true, canRead: true, canUpdate: true, canDelete: false, roleId: opRole.id },
      { module: 'Kontak', canCreate: false, canRead: true, canUpdate: false, canDelete: false, roleId: opRole.id },
      { module: 'Kapal & Kontainer', canCreate: false, canRead: true, canUpdate: false, canDelete: false, roleId: opRole.id },
    ]
  })
  console.log('✅ Permissions Operasional diisi')

  // 5. Perbaiki nama user Hafis
  await p.user.update({
    where: { email: 'hafisardiyanto19@gmail.com' },
    data: { name: 'Hafis Ardiyanto', roleId: opRole.id }
  })
  console.log('✅ User Hafis Ardiyanto diperbaiki')

  // 6. Tampilkan hasil akhir
  const users = await p.user.findMany({ include: { role: { include: { permissions: true } } } })
  console.log('\n=== HASIL AKHIR ===')
  users.forEach(u => {
    console.log(`• ${u.name} (${u.email}) → Role: ${u.role?.name || 'TIDAK ADA'} | Permissions: ${u.role?.permissions?.length || 0} modul`)
  })
}

fix().catch(console.error).finally(() => p.$disconnect())
