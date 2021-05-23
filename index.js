const dotenv = require("dotenv");
dotenv.config();

// const InitiateMongoServer = require("./config/db");

// PORT
const PORT = process.env.PORT || 3001;

// Initiate Mongo Servers
// InitiateMongoServer().then(r => console.log("Mongo initiated"));

const server = require('http').createServer()
const io = require('socket.io')(server)

io.on('connection', function (client) {

	console.log('client connect...', client.id);

	client.on('typing', function name(data) {
		console.log(data);
		io.emit('typing', data)
	})

	client.on('message', function name(data) {
		console.log(data);
		io.emit('message', data)
	})

	client.on('location', function name(data) {
		console.log(data);
		io.emit('location', data);
	})

	client.on('connect', function () {
	})

	client.on('disconnect', function () {
		console.log('client disconnect...', client.id)
		// handleDisconnect()
	})

	client.on('error', function (err) {
		console.log('received error from client:', client.id)
		console.log(err)
	})
})

server.listen(PORT, function (err) {
	if (err) throw err
	console.log('Listening on port %d', PORT);
});
