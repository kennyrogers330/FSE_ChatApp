const express = require("express");
const viewsController = require("../controllers/viewsController");
const router = express.Router();

router.get("/", viewsController.login);
router.get("/signup", viewsController.signUP);
router.get("/chat", viewsController.chatBox);

module.exports = router;
