import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "http://localhost:5173", methods: ["GET", "POST"] },
});

const PORT = 5001;

// in-memory presence
const users = new Map(); // socketId -> { username }

io.on("connection", (socket) => {
  // client will immediately emit "join" with a username
  socket.on("join", (username) => {
    users.set(socket.id, { username });
    // notify this user + everyone else
    io.emit("users:update", Array.from(users.values()).map(u => u.username));
    socket.broadcast.emit("system", `${username} joined`);
  });

  // incoming chat message
  socket.on("message", (text) => {
    const me = users.get(socket.id);
    if (!me) return;
    const payload = {
      id: Date.now(),
      user: me.username,
      text,
      at: new Date().toISOString(),
    };
    io.emit("message", payload); // broadcast to all
  });

  // typing indicators
  socket.on("typing", (isTyping) => {
    const me = users.get(socket.id);
    if (!me) return;
    socket.broadcast.emit("typing", { user: me.username, isTyping });
  });

  // clean up on disconnect
  socket.on("disconnect", () => {
    const me = users.get(socket.id);
    if (me) {
      users.delete(socket.id);
      io.emit("users:update", Array.from(users.values()).map(u => u.username));
      socket.broadcast.emit("system", `${me.username} left`);
    }
  });
});

app.get("/", (_, res) => res.send("Socket.IO chat server running ✅"));

server.listen(PORT, () =>
  console.log(`🚀 Realtime server: http://localhost:${PORT}`)
);
