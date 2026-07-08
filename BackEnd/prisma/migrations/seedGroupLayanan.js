const prisma = require("@prisma/client").PrismaClient;

const db = new prisma();

async function main() {

    await db.groupLayanan.createMany({

        data: [

            {
                kode: "INTLCL",
                nama: "PENGIRIMAN INTERNAL LCL/LTL"
            },

            {
                kode: "LCL",
                nama: "PENGIRIMAN LCL/LTL"
            },

            {
                kode: "FCL",
                nama: "PENGIRIMAN FCL"
            },

            {
                kode: "FTL",
                nama: "PENGIRIMAN FTL"
            },

            {
                kode: "SEWA",
                nama: "SEWA KENDARAAN"
            },

            {
                kode: "CUSTOM",
                nama: "JASA KEPABEANAN"
            },

            {
                kode: "LAIN",
                nama: "JASA LAINNYA"
            }

        ],

        skipDuplicates: true

    })

}

main()