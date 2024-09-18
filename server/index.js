const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
app.use(cors());
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["https://www.chriscalver.com", "https://chriscalver.com", "https://chriscalver.com/racer", "https://chriscalver.com/racer/", "https://chat2-1-lw5o.onrender.com", "http://chriscalver.com"],
    methods: ["GET", "POST"],
  },
});


var username = "";
let chatlogs = [
  {
    room: "99",
    author: "Chris",
    message: "Welcome...",
    time: "00:01"
  },
];

console.log(chatlogs);

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);
  // console.log(socket);

  socket.on("join_room", (data) => {
    // console.log(data);
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });

  socket.on("get_name", (data) => {
    console.log("name:" + data);
    username = data;
    // console.log(data);
    // socket.join(data);
    // console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
    // console.log(data);
    chatlogs.push(data);
    console.log(chatlogs);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });

});

server.listen(8080, () => {
  console.log("Server listening on port: 8080");
});
