const express = require('express');
const router = express.Router();
const pabrikanController = require('../controllers/pabrikan.controller');

router.get('/tipe', pabrikanController.getTipePabrikan);
router.get('/', pabrikanController.getAll);
router.post('/', pabrikanController.create);
router.put('/:id', pabrikanController.update);
router.delete('/:id', pabrikanController.delete);

module.exports = router;
