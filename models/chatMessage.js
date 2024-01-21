const mongoose = require("mongoose");

const ChatSchema = mongoose.Schema({
  username: {
    type: String,
  },
  body: {
    type: String,
  },
  time: {
    type: String,
  },
});
const chatMessage = mongoose.model("chatMessage", ChatSchema);
module.exports = chatMessage;
