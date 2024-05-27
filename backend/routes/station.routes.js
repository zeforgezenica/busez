var express = require("express");
var router = express.Router();
var StationController = require("../controllers/station.controller");

router.get("/", StationController.getAll);

router.post("/", StationController.create);

router.get("/:id", StationController.getById);

router.put("/:id", StationController.update);

router.delete("/:id", StationController.delete);

module.exports = router;
