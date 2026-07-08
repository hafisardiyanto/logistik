const express = require("express");
const router = express.Router();
const trayekController = require("../controllers/trayek.controller");

router.get("/", trayekController.getAll);
router.get("/:id", trayekController.getById);
router.post("/", trayekController.create);
router.put("/:id", trayekController.update);
router.delete("/:id", trayekController.delete);

module.exports = router;
