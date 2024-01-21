const app = require("./app");
const socketio = require("socket.io");
const http = require("http");
const Messageformatter = require("./utils/messages");
const chatMessage = require("./models/chatMessage");
const mongoDB = require("./dbConnection");

const {
  AddUserToChat,
  getTheConnectedUser,
  onExist,
} = require("./utils/users");

// Socket configuration
const server = http.createServer(app);
const io = socketio(server);

// Run when client connects
io.on("connection", (socket) => {
  // Entrance
  console.log("New Web Socket connection...");
  const room = "FseRoom";
  socket.on("joinRoom", (username) => {
    const user = AddUserToChat(socket.id, username, room);
    socket.join(user.room);

    mongoDB.then(async () => {
      const chats = await chatMessage.find();
      socket.emit("chatMessages", chats);
    });
    // socket.emit(
    //   "botmessage",
    //   Messageformatter("Admin", "Welcome to FSE Chat Room")
    // );

    // Broadcasting upon connection ===> Exempts the connected user from receiving the message
    // socket.broadcast
    //   .to(user.room)
    //   .emit(
    //     "botmessage",
    //     Messageformatter("Admin", `${username} joined FSE Chat Room`)
    //   );
  });

  // Listen for chatMessage
  socket.on("FseChatMessage", (msg) => {
    const user = getTheConnectedUser(socket.id);

    const message = Messageformatter(user.username, msg);

    mongoDB.then(async () => {
      await chatMessage.create(message);
    });

    io.to(user.room).emit("message", Messageformatter(user.username, msg));
  });

  // Exit codes
  socket.on("disconnect", () => {
    const user = onExist(socket.id);

    if (user) {
      io.to(user.room).emit(
        "botmessage",
        Messageformatter("Admin", `${user.username} has left the chat`)
      );
    }
  });
});

// Start server
const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

// io.on("connection", (socket) => {
//   console.log(socket.id);
// });
