var express = require("express");
var router = express.Router();
var CountryController = require("../controllers/country.controller");

// Commenting out unused routes for deployment version
// router.post("/", CountryController.create); // Redundant for deployment version
// router.put("/:id", CountryController.update); // Redundant for deployment version
// router.delete("/:id", CountryController.delete); // Redundant for deployment version

router.get("/", CountryController.getAll);
router.get("/:id", CountryController.getById);

module.exports = router;
