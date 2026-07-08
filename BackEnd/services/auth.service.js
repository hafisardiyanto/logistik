const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Mencari user di database berdasarkan alamat email
 */
const findUserByEmail = async (email) => {
    return await prisma.user.findUnique({
        where: { email: email },
        include: { 
            role: { 
                include: { permissions: true }  // ← Ini yang hilang! Ambil juga permissions milik role
            } 
        }
    });
};

/**
 * Menyimpan user baru ke dalam database
 */
const createUser = async (name, email, hashedPassword, role = 'user') => {
    return await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
            role
        },
    });
};

module.exports = {
    findUserByEmail,
    createUser
};
