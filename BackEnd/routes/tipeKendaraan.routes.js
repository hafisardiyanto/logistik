const express = require('express');
const router = express.Router();
const tipeKendaraanController = require('../controllers/tipeKendaraan.controller');

router.get('/moda', tipeKendaraanController.getTipeModa);
router.get('/', tipeKendaraanController.getAll);
router.post('/', tipeKendaraanController.create);
router.put('/:id', tipeKendaraanController.update);
router.delete('/:id', tipeKendaraanController.delete);

module.exports = router;
