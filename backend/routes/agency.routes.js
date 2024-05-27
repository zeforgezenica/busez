var express = require("express");
var router = express.Router();
var AgencyController = require("../controllers/agency.controller");

router.get("/", AgencyController.getAll);

router.post("/", AgencyController.create);

router.get("/:id", AgencyController.getById);

router.put("/:id", AgencyController.update);

router.delete("/:id", AgencyController.delete);

module.exports = router;
