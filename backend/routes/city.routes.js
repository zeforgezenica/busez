var express = require("express");
var router = express.Router();
var CityController = require("../controllers/city.controller");

router.get("/", CityController.getAll);

router.post("/", CityController.create);

router.get("/:id", CityController.getById);

router.put("/:id", CityController.update);

router.delete("/:id", CityController.delete);

module.exports = router;
