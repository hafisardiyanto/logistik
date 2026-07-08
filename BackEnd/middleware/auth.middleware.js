const jwt = require('jsonwebtoken')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()
const JWT_SECRET = process.env.JWT_SECRET || 'rahasia_logistics_super_aman'

/**
 * Middleware: Verifikasi token JWT
 * Digunakan untuk melindungi route yang membutuhkan autentikasi
 */
const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1] // Format: "Bearer <token>"

    if (!token) {
        return res.status(401).json({ message: 'Akses ditolak. Token tidak ditemukan.' })
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET)
        req.user = decoded
        next()
    } catch (error) {
        return res.status(403).json({ message: 'Token tidak valid atau sudah kadaluarsa.' })
    }
}

/**
 * GET /api/auth/me
 * Mengambil data user yang sedang login BESERTA permissions terbaru dari database
 * Dipanggil setiap kali halaman di-refresh agar permissions selalu up-to-date
 */
const getMe = async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: req.user.id },
            include: {
                role: {
                    include: { permissions: true }
                }
            }
        })

        if (!user) {
            return res.status(404).json({ message: 'User tidak ditemukan.' })
        }

        res.json({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role ? user.role.name : null,
            permissions: user.role ? user.role.permissions : []
        })
    } catch (error) {
        console.error('Error di getMe:', error)
        res.status(500).json({ message: 'Gagal mengambil data user.' })
    }
}

module.exports = { verifyToken, getMe }
