const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Pastikan folder uploads ada
const uploadDir = path.join(__dirname, "..", "uploads");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Konfigurasi penyimpanan Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        // Format nama: logo_perusahaan_1720000000000.png
        const ext = path.extname(file.originalname);
        const name = file.fieldname + "_" + Date.now() + ext;
        cb(null, name);
    }
});

// Filter hanya menerima file gambar
const fileFilter = (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Format file tidak didukung. Gunakan JPG, PNG, atau WEBP."), false);
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 2 * 1024 * 1024 } // Maksimal 2MB
});

// POST /api/upload/logo - Upload logo perusahaan
router.post("/logo", upload.single("logo"), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "File tidak ditemukan" });
        }

        // Kembalikan path file yang bisa diakses via URL
        const fileUrl = `/uploads/${req.file.filename}`;

        res.json({
            message: "Logo berhasil diupload!",
            filename: req.file.filename,
            url: fileUrl
        });
    } catch (error) {
        res.status(500).json({ message: "Gagal mengupload file", error: error.message });
    }
});

// Middleware error handler untuk Multer
router.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        if (err.code === "LIMIT_FILE_SIZE") {
            return res.status(400).json({ message: "Ukuran file terlalu besar. Maksimal 2MB." });
        }
        return res.status(400).json({ message: err.message });
    }
    if (err) {
        return res.status(400).json({ message: err.message });
    }
    next();
});

module.exports = router;
