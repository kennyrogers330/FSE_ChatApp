const path = require("path");
const express = require("express");
const viewsRouter = require("./routes/viewsRoutes");
const userRoutes = require("./routes/usersRoutes");
const chatRoutes = require("./routes/chatRouter");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const chatMessage = require("./models/chatMessage");
const app = express();

// Deignating pug as templating module
app.set("view engine", "pug");

app.set("views", path.join(__dirname, "views"));

// Static files routes

app.use(express.static(path.join(__dirname, "public")));

// Body parsing configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Test middleware
// app.use((req, res, next) => {
//   console.log(req.cookies);
//   next();
// });

// ROUTING
app.use("/", viewsRouter);
app.use("/api/users", userRoutes);

// app.use("/chatbox/:username", chatRoutes);

app.get("/chatbox/:username", (req, res) => {
  const filePath = path.join(__dirname, "public", "pages", "chatbox.html");
  // console.log(req.params.username);
  res.sendFile(filePath);
});

module.exports = app;
