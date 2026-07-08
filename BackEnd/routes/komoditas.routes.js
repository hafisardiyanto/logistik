const express = require("express");
const router = express.Router();
const komoditasController = require("../controllers/komoditas.controller");

router.get("/", komoditasController.getAll);
router.post("/", komoditasController.create);
router.put("/:id", komoditasController.update);
router.delete("/:id", komoditasController.delete);
router.post("/bulk", komoditasController.bulkCreate);

module.exports = router;
