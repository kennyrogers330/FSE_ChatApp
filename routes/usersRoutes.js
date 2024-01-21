const express = require("express");
const router = express.Router();
const authenticationCtl = require("./../controllers/authenticationCtrl");

router.post("/signup", authenticationCtl.signup);

router.post("/login", authenticationCtl.login);
module.exports = router;
