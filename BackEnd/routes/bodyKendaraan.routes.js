const express = require('express');
const router = express.Router();
const bodyKendaraanController = require('../controllers/bodyKendaraan.controller');

router.get('/', bodyKendaraanController.getAll);
router.post('/', bodyKendaraanController.create);
router.put('/:id', bodyKendaraanController.update);
router.delete('/:id', bodyKendaraanController.delete);

module.exports = router;
