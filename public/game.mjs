import Player from './Player.mjs';
import Collectible from './Collectible.mjs';

const socket = io();
const canvas = document.getElementById('game-window');
const ctx = canvas.getContext('2d');

canvas.width = 640;
canvas.height = 480;

let player;

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

console.log(player);

function renderAll() {
	ctx.fillStyle="red";
	player.draw(ctx);

	requestAnimationFrame(renderAll)
}
requestAnimationFrame(renderAll)
