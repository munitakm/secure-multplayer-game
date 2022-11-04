import Player from './Player.mjs';
import Collectible from './Collectible.mjs';

const socket = io();
const canvas = document.getElementById('game-window');
const ctx = canvas.getContext('2d');

canvas.width = 640;
canvas.height = 480;

let player;
let opponents = [];

function randomPosition() {
	return { 
		x: Math.floor(Math.random() * 32),
		y: Math.floor(Math.random() * 22),
	}
}
socket.on('connect', () => {
	let c = randomPosition();
	player = new Player({x: c.x, y: c.y, score: 0, id: socket.id})

	socket.emit('enterplayer', player);
})

socket.on('player info', (playersInfo) => {
	opponents = playersInfo;
	console.log("rolou", playersInfo, opponents);
})

console.log("estes são os ", opponents)

function renderAll() {
	//render avatar
	ctx.fillStyle="red";
	player.draw(ctx);

	//render opponents
	opponents.forEach(enemy => {
		if(enemy.id !== player.id){
			ctx.fillStyle="green";
			ctx.fillRect(enemy.x * 20, enemy.y * 20, 20, 20);
		}
	})


	requestAnimationFrame(renderAll)
}
requestAnimationFrame(renderAll)
