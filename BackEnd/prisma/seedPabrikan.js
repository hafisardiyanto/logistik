const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const tipeData = [
        { nama: 'Kendaraan' },
        { nama: 'Ban' }
    ];

    for (const data of tipeData) {
        await prisma.tipePabrikan.upsert({
            where: { nama: data.nama },
            update: {},
            create: data
        });
    }
    console.log('Seeding Tipe Pabrikan selesai!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
