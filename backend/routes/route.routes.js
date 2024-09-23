var express = require("express");
var router = express.Router();
var RouteController = require("../controllers/route.controller");

// Commenting out unused routes for deployment version
// router.post("/", RouteController.create); // Redundant for deployment version
// router.put("/:id", RouteController.update); // Redundant for deployment version
// router.delete("/:id", RouteController.delete); // Redundant for deployment version

router.get("/", RouteController.getAll);
router.get("/:id", RouteController.getById);

module.exports = router;
