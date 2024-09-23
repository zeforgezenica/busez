var express = require("express");
var router = express.Router();
var StationController = require("../controllers/station.controller");

// Commenting out unused routes for deployment version
// router.post("/", StationController.create); Redundant for deployment version
// router.put("/:id", StationController.update); // Redundant for deployment version
// router.delete("/:id", StationController.delete); // Redundant for deployment version

router.get("/", StationController.getAll);
router.get("/:id", StationController.getById);

module.exports = router;
