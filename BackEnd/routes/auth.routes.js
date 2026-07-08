const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { verifyToken, getMe } = require('../middleware/auth.middleware');

// Rute untuk registrasi: http://localhost:3000/api/auth/register
router.post('/register', authController.register);

// Rute untuk login: http://localhost:3000/api/auth/login
router.post('/login', authController.login);

// Rute untuk mendapatkan data user saat ini + permissions terbaru
// Dipanggil setiap kali halaman di-refresh
router.get('/me', verifyToken, getMe);

module.exports = router;
