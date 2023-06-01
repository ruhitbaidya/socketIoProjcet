const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server, {
    cors: {
      origin: "*"
    }})
app.get("/", (req, res)=>{
    res.send("hello")
})

io.on("connection", (socket)=>{
    console.log("user connect")
    socket.on("message", (payload)=>{
        console.log(payload)
        io.emit("chat", payload)
    })
})

server.listen(5000, ()=>{
    console.log("server is start")
})