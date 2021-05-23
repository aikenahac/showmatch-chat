const dotenv = require("dotenv");
dotenv.config();

// const InitiateMongoServer = require("./config/db");

// PORT
const PORT = process.env.PORT || 3001;

const app = require('express')()
const http = require('http').createServer(app)

//Socket Logic
const socketio = require('socket.io')(http)

// Initiate Mongo Servers
// InitiateMongoServer().then(r => console.log("Mongo initiated"));

app.get('/', (req, res) => {
	res.send("Chat server running")
})

socketio.on("connection", (userSocket) => {
	userSocket.on("send_message", (data) => {
		userSocket.broadcast.emit("receive_message", data)
	})
})

http.listen(PORT);