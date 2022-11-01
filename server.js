require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const expect = require('chai');
const socket = require('socket.io');
const cors = require('cors');

const fccTestingRoutes = require('./routes/fcctesting.js');
const runner = require('./test-runner.js');

const app = express();

app.use('/public', express.static(process.cwd() + '/public'));
app.use('/assets', express.static(process.cwd() + '/assets'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//For FCC testing purposes and enables user to connect from outside the hosting platform
app.use(cors({origin: '*'})); 

// Index page (static HTML)
app.route('/')
  .get(function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
  }); 

//For FCC testing purposes
fccTestingRoutes(app);
    
// 404 Not Found Middleware
app.use(function(req, res, next) {
  res.status(404)
    .type('text')
    .send('Not Found');
});

const portNum = process.env.PORT || 3000;

// Set up server and tests
const server = app.listen(portNum, () => {
  console.log(`Listening on port ${portNum}`);
  if (process.env.NODE_ENV==='test') {
    console.log('Running Tests...');
    setTimeout(function () {
      try {
        runner.run();
      } catch (error) {
        console.log('Tests are not valid:');
        console.error(error);
      }
    }, 1500);
  }
});
//-----GAME LOGIC		

var currentPlayers = [];
var playersInfo = [];

const io = socket(server);
//when player enter
io.on('connection', (socket) => {
	console.log("someone connected id: "+ socket.id);
	currentPlayers.push(socket.id)
	console.log(currentPlayers);
	socket.on('enterplayer', player => {
		console.log(player);
		playersInfo.push(player);
		console.log(playersInfo);
	});
//when player leave
	socket.on("disconnect", () => {
		console.log("someone disconnected " + socket.id);
		currentPlayers  = currentPlayers.filter(n => {
			if (socket.id != n)
				return socket.id
		})
		delete playersInfo[socket.id];
		console.log(playersInfo);
		console.log(currentPlayers);
		socket.emit('leaveplayer', socket.id)
	})
	let d = "teste"
	socket.broadcast.emit('player info', playersInfo)
})

module.exports = app; // For testing
