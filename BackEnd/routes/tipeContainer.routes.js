const express = require("express");
const router = express.Router();
const tipeContainerController = require("../controllers/tipeContainer.controller");

router.get("/", tipeContainerController.getAll);
router.post("/", tipeContainerController.create);
router.put("/:id", tipeContainerController.update);
router.delete("/:id", tipeContainerController.delete);
router.post("/bulk", tipeContainerController.bulkCreate);

module.exports = router;
