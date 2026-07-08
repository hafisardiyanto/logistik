const express = require("express");
const router = express.Router();
const groupLayananController = require("../controllers/groupLayanan.controller");

router.get("/", groupLayananController.getAllGroups);

module.exports = router;
