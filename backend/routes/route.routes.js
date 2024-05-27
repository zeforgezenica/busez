var express = require("express");
var router = express.Router();
var RouteController = require("../controllers/route.controller");

router.get("/", RouteController.getAll);

router.post("/", RouteController.create);

router.get("/:id", RouteController.getById);

router.put("/:id", RouteController.update);

router.delete("/:id", RouteController.delete);

module.exports = router;
