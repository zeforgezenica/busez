var express = require("express");
var router = express.Router();
var CityController = require("../controllers/city.controller");

// Commenting out unused routes for deployment version
// router.post("/", CityController.create); // Redundant for deployment version
// router.put("/:id", CityController.update); // Redundant for deployment version
// router.delete("/:id", CityController.delete); // Redundant for deployment version

router.get("/", CityController.getAll);
router.get("/:id", CityController.getById);

module.exports = router;
