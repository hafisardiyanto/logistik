const express = require("express");
const router = express.Router();
const perusahaanController = require("../controllers/perusahaan.controller");

router.get("/", perusahaanController.getAll);
router.get("/:id", perusahaanController.getById);
router.post("/", perusahaanController.create);
router.put("/:id", perusahaanController.update);
router.delete("/:id", perusahaanController.delete);

module.exports = router;
