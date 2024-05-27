var express = require("express");
var router = express.Router();
var CountryController = require("../controllers/country.controller");

router.get("/", CountryController.getAll);

router.post("/", CountryController.create);

router.get("/:id", CountryController.getById);

router.put("/:id", CountryController.update);

router.delete("/:id", CountryController.delete);

module.exports = router;
