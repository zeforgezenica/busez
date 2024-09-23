var express = require("express");
var router = express.Router();
var AgencyController = require("../controllers/agency.controller");

// Commenting out unused routes for deployment version
// router.post("/", AgencyController.create); // Redundant for deployment version
// router.put("/:id", AgencyController.update); // Redundant for deployment version
// router.delete("/:id", AgencyController.delete); // Redundant for deployment version

router.get("/", AgencyController.getAll);
router.get("/:id", AgencyController.getById);

module.exports = router;
