const express = require("express");
const router = express.Router();
const lokasiController = require("../controllers/lokasi.controller");

// Negara
router.get("/negara", lokasiController.getNegara);
router.post("/negara", lokasiController.createNegara);
router.put("/negara/:id", lokasiController.updateNegara);
router.delete("/negara/:id", lokasiController.deleteNegara);

// Provinsi
router.get("/provinsi", lokasiController.getProvinsi);
router.post("/provinsi", lokasiController.createProvinsi);
router.put("/provinsi/:id", lokasiController.updateProvinsi);
router.delete("/provinsi/:id", lokasiController.deleteProvinsi);

// Kota
router.get("/kota", lokasiController.getKota);
router.post("/kota", lokasiController.createKota);
router.put("/kota/:id", lokasiController.updateKota);
router.delete("/kota/:id", lokasiController.deleteKota);

// Kecamatan
router.get("/kecamatan", lokasiController.getKecamatan);
router.post("/kecamatan", lokasiController.createKecamatan);
router.put("/kecamatan/:id", lokasiController.updateKecamatan);
router.delete("/kecamatan/:id", lokasiController.deleteKecamatan);

module.exports = router;
