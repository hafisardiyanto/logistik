const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authService = require('../services/auth.service');

// Secret key untuk JWT. Sebaiknya diletakkan di file .env
// Untuk keamanan, saya ambil dari env, atau fallback ke default
const JWT_SECRET = process.env.JWT_SECRET || 'rahasia_logistics_super_aman';

/**
 * Proses Registrasi (Pendaftaran User Baru)
 */
const register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // 1. Cek apakah user sudah terdaftar
        const existingUser = await authService.findUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: "Email sudah digunakan!" });
        }

        // 2. Hash Password (mengacak password agar aman di database)
        // Angka 10 adalah saltRounds (tingkat kesulitan pengacakan)
        const hashedPassword = await bcrypt.hash(password, 10);

        // 3. Simpan ke database
        const newUser = await authService.createUser(name, email, hashedPassword, role);

        res.status(201).json({
            message: "Registrasi berhasil! Silakan login.",
            user: { id: newUser.id, name: newUser.name, email: newUser.email }
        });
    } catch (error) {
        console.error("Error di register:", error);
        res.status(500).json({ message: "Terjadi kesalahan pada server" });
    }
};

/**
 * Proses Login
 */
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Cari user berdasarkan email di database
        const user = await authService.findUserByEmail(email);
        if (!user) {
            return res.status(401).json({ message: "Email atau Password salah!" });
        }

        // 2. Cocokkan password dari input dengan password yang ada di database
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Email atau Password salah!" });
        }

        // 3. Jika cocok, buatkan JWT (JSON Web Token) sebagai tiket akses
        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role ? user.role.name : null }, 
            JWT_SECRET, 
            { expiresIn: '1d' } // Token berlaku 1 hari
        );

        // 4. Kirim token, info user, DAN permissions ke frontend
        res.status(200).json({
            message: "Login berhasil!",
            token: token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role ? user.role.name : null,
                permissions: user.role ? user.role.permissions : []
            }
        });
    } catch (error) {
        console.error("Error di login:", error);
        res.status(500).json({ message: "Terjadi kesalahan pada server" });
    }
};

module.exports = {
    register,
    login
};
