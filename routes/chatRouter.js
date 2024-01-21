const express = require("express");
const mongoDB = require("./../dbConnection");
const chatMessage = require("./../models/chatMessage");

const router = express.Router();

router.route("/").get(async (req, res, next) => {
  const chats = await chatMessage.find();
  console.log(chats);

  res.status(200).json({
    status: "success",
    results: chats.length,
    data: {
      chats,
    },
  });
  next();
});

module.exports = router;
