const express = require('express');
const router = express.Router();
const kelompokBiayaController = require('../controllers/kelompokBiaya.controller');

router.get('/', kelompokBiayaController.getAll);
router.get('/:id', kelompokBiayaController.getById);
router.post('/', kelompokBiayaController.create);
router.put('/:id', kelompokBiayaController.update);
router.delete('/:id', kelompokBiayaController.delete);

module.exports = router;
