const express = require('express');
const router = express.Router();
const kelengkapanKendaraanController = require('../controllers/kelengkapanKendaraan.controller');

router.get('/', kelengkapanKendaraanController.getAll);
router.post('/', kelengkapanKendaraanController.create);
router.put('/:id', kelengkapanKendaraanController.update);
router.delete('/:id', kelengkapanKendaraanController.delete);

module.exports = router;
