const express = require('express');
const app = express();
const { Server } = require('socket.io');
const http = require('http');
const server = http.createServer(app);
const io = new Server(server);
const port = 5000;
require('dotenv').config()

const nodemailer = require('nodemailer')
app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
	socket.on('send name', (username) => {
		io.emit('send name', (username));
	});

	socket.on('send message', (chat) => {
		io.emit('send message', (chat));
	});
	socket.on('send mail', (messageFeedback) => {
		console.log("0");
		console.log(messageFeedback);
		let mailTransporter = nodemailer.createTransport({
			service:"gmail", 
			// service:"hotmail",
			auth: {
				user:"chauhanchetan12789@gmail.com",
				pass:process.env.PASS
			},
		});
		
		let details = {
			from:"chauhanchetan12789@gmail.com",
			to:'chauhanchetan12789@gmail.com',
			subject:"Feedback from chat app",
			// text:"test content",
			html: `<p>${messageFeedback}!</p>`
			// CSS: 'h1{color: red}'
		};
		
		mailTransporter.sendMail(details, (err,info) => {
			if(err){
				console.log(err);
			}else{
				console.log("mail sent..." + info.response);
			}
		})
	})
});

server.listen(port, () => {
	console.log(`Server is listening at the port: ${port}`);
});
