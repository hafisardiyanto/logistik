const express = require("express");
const router = express.Router();
const jenisSatuanController = require("../controllers/jenisSatuan.controller");

router.get("/", jenisSatuanController.getAll);
router.post("/", jenisSatuanController.create);
router.put("/:id", jenisSatuanController.update);
router.delete("/:id", jenisSatuanController.delete);
router.post("/bulk", jenisSatuanController.bulkCreate);

module.exports = router;
