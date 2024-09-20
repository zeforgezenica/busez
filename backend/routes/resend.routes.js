var express = require("express");
var router = express.Router();
var ResendController = require("../controllers/resend.controller");

router.post("/", ResendController.sendEmail);

module.exports = router;
