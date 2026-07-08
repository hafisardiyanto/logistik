const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcrypt')

const prisma = new PrismaClient()

async function main() {
  console.log('Mulai proses seeding...')

  // 1. Buat Role Super Admin
  let superAdminRole = await prisma.role.findUnique({
    where: { name: 'Super Admin' }
  })

  if (!superAdminRole) {
    superAdminRole = await prisma.role.create({
      data: {
        name: 'Super Admin',
        permissions: {
          create: [
            { module: 'Pengaturan User', canCreate: true, canRead: true, canUpdate: true, canDelete: true },
            { module: 'Role & Permission', canCreate: true, canRead: true, canUpdate: true, canDelete: true },
          ]
        }
      }
    })
    console.log('✅ Role Super Admin berhasil dibuat.')
  } else {
    console.log('⚠️ Role Super Admin sudah ada.')
  }

  // 2. Buat User Super Admin
  const existingAdmin = await prisma.user.findUnique({
    where: { email: 'superadmin@logistics.com' }
  })

  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash('superadmin123', 10)

    const superAdmin = await prisma.user.create({
      data: {
        name: 'Super Admin',
        email: 'superadmin@logistics.com',
        password: hashedPassword,
        cabang: 'Pusat',
        status: 'Aktif',
        verified: 'Verified',
        roleId: superAdminRole.id
      }
    })

    console.log(`✅ Superadmin berhasil dibuat dengan email: ${superAdmin.email}`)
  }

  // 3. Buat Group Layanan
  const groupLayananData = [
    { kode: 'INT-LCL', nama: 'PENGIRIMAN INTERNAL LCL/LTL' },
    { kode: 'LCL', nama: 'PENGIRIMAN LCL/LTL' },
    { kode: 'FCL', nama: 'PENGIRIMAN FCL' },
    { kode: 'FTL', nama: 'PENGIRIMAN FTL' },
    { kode: 'S-KND', nama: 'SEWA KENDARAAN' },
    { kode: 'J-KPB', nama: 'JASA KEPABEANAN' },
    { kode: 'J-LYN', nama: 'JASA LAINNYA' },
    { kode: 'INT-FTL', nama: 'PENGIRIMAN INTERNAL FTL' },
  ]

  for (const group of groupLayananData) {
    const existingGroup = await prisma.groupLayanan.findUnique({
      where: { kode: group.kode }
    })
    
    if (!existingGroup) {
      await prisma.groupLayanan.create({ data: group })
      console.log(`✅ Group Layanan ${group.nama} berhasil dibuat.`)
    }
  }

  // 4. Seed Negara, Provinsi, Kota, Kecamatan
  const negara = await prisma.negara.upsert({
    where: { nama: 'Indonesia' },
    update: {},
    create: {
      nama: 'Indonesia',
      aktif: true,
      provinsi: {
        create: [
          {
            nama: 'DKI Jakarta',
            aktif: true,
            kota: {
              create: [
                {
                  nama: 'Jakarta Pusat',
                  aktif: true,
                  kecamatan: {
                    create: [
                      { nama: 'Gambir', aktif: true },
                      { nama: 'Menteng', aktif: true }
                    ]
                  }
                }
              ]
            }
          },
          {
            nama: 'Jawa Timur',
            aktif: true,
            kota: {
              create: [
                {
                  nama: 'Surabaya',
                  aktif: true,
                  kecamatan: {
                    create: [
                      { nama: 'Gubeng', aktif: true },
                      { nama: 'Tegalsari', aktif: true }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    }
  })
  console.log('✅ Lokasi (Negara, Provinsi, Kota, Kecamatan) berhasil di-seed.')

}

main()
  .catch((e) => {
    console.error('Error saat seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
    console.log('Proses seeding selesai.')
  })
