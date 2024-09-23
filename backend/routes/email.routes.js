var express = require("express");
var router = express.Router();
var EmailController = require("../controllers/email.controller");

router.post("/", EmailController.sendEmail);

module.exports = router;
