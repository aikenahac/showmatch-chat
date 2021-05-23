const dotenv = require("dotenv");
dotenv.config();

// const InitiateMongoServer = require("./config/db");

// PORT
const port = process.env.PORT || 3001;

// Initiate Mongo Servers
// InitiateMongoServer().then(r => console.log("Mongo initiated"));

const WebSocket = require('ws')
const express = require('express')
const moment = require('moment')
const app = express()

app.get('/', (req, res) => {
	res.send("Hello World");
});

let  webSockets = {}

const wss = new WebSocket.Server({ port })
wss.on('connection', function (ws, req)  {
	let userID = req.url.substr(1)
	webSockets[userID] = ws

	console.log('User ' + userID + ' Connected ')

	ws.on('message', message => { //if there is any message
		console.log(message);
		let datastring = message.toString();
		if(datastring.charAt(0) === "{"){
			datastring = datastring.replace(/\'/g, '"');
			let data = JSON.parse(datastring)
			if(data.auth === "chatapphdfgjd34534hjdfk"){
				if(data.cmd === 'send'){
					let boardws = webSockets[data.userid] //check if there is reciever connection
					if (boardws){
						let cdata = "{'cmd':'" + data.cmd + "','userid':'"+data.userid+"', 'msgtext':'"+data.msgtext+"'}";
						boardws.send(cdata); //send message to reciever
						ws.send(data.cmd + ":success");
					} else{
						console.log("No receiver user found.");
						ws.send(data.cmd + ":error");
					}
				} else{
					console.log("No send command");
					ws.send(data.cmd + ":error");
				}
			} else{
				console.log("App Authentication error");
				ws.send(data.cmd + ":error");
			}
		} else{
			console.log("Non JSON type data");
			ws.send(data.cmd + ":error");
		}
	})

	ws.on('close', function () {
		let userID = req.url.substr(1)
		delete webSockets[userID]
		console.log('User Disconnected: ' + userID)
	})

	ws.send('connected');
})

