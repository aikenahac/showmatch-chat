const dotenv = require("dotenv");
dotenv.config();

// const InitiateMongoServer = require("./config/db");

const socketio = require('socket.io')();

// PORT
const PORT = process.env.PORT || 3001;

// Initiate Mongo Servers
// InitiateMongoServer().then(r => console.log("Mongo initiated"));

socketio.on("connection", (userSocket) => {
	console.log("A user connected.")

	userSocket.on("disconnect", (data) => {
		console.log(data);
		userSocket.broadcast.emit("receive_message", data.user)
	})
	userSocket.on("send_message", (data) => {
		console.log(data);
		userSocket.broadcast.emit("receive_message", data)
	})
})

socketio.listen(PORT);