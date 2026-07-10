const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const tipeData = [
        { nama: 'Car' },
        { nama: 'Truck' },
        { nama: 'Scooter' },
        { nama: 'Trailer' },
        { nama: 'Alat Berat/MHE' }
    ];

    for (const data of tipeData) {
        await prisma.tipeModa.upsert({
            where: { nama: data.nama },
            update: {},
            create: data
        });
    }
    console.log('Seeding Tipe Moda selesai!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
