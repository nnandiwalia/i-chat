const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const path = require("path");
const pathlocation = path.resolve();
app.use(express.static(path.join(path.resolve(), "public")));
app.set("view engine", "ejs");
app.get("/", (req, res) => {
  res.render("./index");
});

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});
let users = {};
io.on("connection", (socket) => {
  // console.log(socket.id);
  socket.on("new-user", (user) => {
    users[socket.id] = user;
    // console.log(user);
    socket.broadcast.emit("user-connected", user);
  });
  socket.on("send-chatt-message", (data) => {
    // console.log(data);
    socket.broadcast.emit("chatt-message", { user: users[socket.id], data });
  });
  socket.on("disconnected", () => {
    socket.broadcast.emit("user-disconnected", users[socket.id]);

    delete users[socket.id];
  });
});
server.listen(3000, () => {
  console.log("listening on *:3000");
});
