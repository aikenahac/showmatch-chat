const app = require('express')()
const http = require('http').createServer(app)

//Socket Logic
const socketio = require('socket.io')(http)

const dotenv = require("dotenv");
dotenv.config();

// const InitiateMongoServer = require("./config/db");

// PORT
const PORT = process.env.PORT || 3001;

// Initiate Mongo Servers
// InitiateMongoServer().then(r => console.log("Mongo initiated"));


app.get('/', (req, res) => {
	res.send("ShowMatch chat running!")
})

socketio.on("connection", (socket) => {
	console.log("Someone connected to socket!");
	socket.broadcast.emit("receive_message", "User connected!");

	socket.on("send_message", (data) => {
		console.log(`Message: ${data}`);
		socket.broadcast.emit("receive_message", data)
	})

	socket.on("disconnect", () => {
		console.log("User disconnected.")
		socket.broadcast.emit("receive_message", "User disconnected!");
	})
})

http.listen(PORT, () => {
	console.log("ShowMatch chat started!");
});


