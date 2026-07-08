const express = require("express");
const router = express.Router();
const jenisLayananController = require("../controllers/jenisLayanan.controller");

router.get("/", jenisLayananController.getAll);
router.post("/", jenisLayananController.create);
router.put("/:id", jenisLayananController.update);
router.delete("/:id", jenisLayananController.delete);

module.exports = router;
