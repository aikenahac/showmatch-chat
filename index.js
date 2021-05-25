// Initiate Mongo Server
const InitiateMongoServer = require("./config/db");
InitiateMongoServer().then(r => console.log("Mongo initiated"));

const Message = require("./model/Message");

const app = require('express')()
const http = require('http').createServer(app)

app.get('/', (req, res) => {
	res.send("ShowMatch chat is up!")
})

//Socket Logic
const socketio = require('socket.io')(http)

socketio.on("connection", (userSocket) => {
	console.log("Client connected!");
	userSocket.broadcast.emit("receive_message", "User connected!");

	userSocket.on("send_message", async (data) => {
		console.log(`Message: ${data}`);

		const author = data.author;
		const content = data.message;

		console.log(data);

		let msg = new Message({
			author,
			content
		})

		userSocket.broadcast.emit("receive_message", data);

		await msg.save();
	})
})

http.listen(process.env.PORT)