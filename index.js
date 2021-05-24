// Initiate Mongo Server
// const InitiateMongoServer = require("./config/db");
// InitiateMongoServer().then(r => console.log("Mongo initiated"));

const app = require('express')()
const http = require('http').createServer(app)

app.get('/', (req, res) => {
	res.send("ShowMatch chat up!")
})

//Socket Logic
const socketio = require('socket.io')(http)

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

http.listen(process.env.PORT)