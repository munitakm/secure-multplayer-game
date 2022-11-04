class Player {
  constructor({x, y, score, id}) {
	  this.x = x;
	  this.y = y;
	  this.score = score;
	  this.id = id;
	  this.speed = 1/10;
	  this.dir = null;
	  
	  console.log("construtor feito")

  }

  draw(context) {
	  if(this.dir) {
		  this.movePlayer(this.dir, this.speed)
	  }
	context.fillRect(this.x *20, this.y * 20, 20, 20)
	console.log("avatar feito")
  }

  movePlayer(dir, speed) {
	switch(dir) {
		case 'up':
		this.y = this.y - speed >= 0 ? this.y - speed : 0;
		break;
		case "down":
			this.y = this.y + speed <= 480 ? this.y + speed : 480;
			break;
		case "right":
			this.x = this.x + speed <= 640 ? this.x + speed : 640;
			break;
		case "left":
			this.x = this.x -speed >= 0 ? this.x - speed : 0;
			break;
		default:
			this.y = this.y;
			this.x = this.x;
	  }
  }

  collision(item) {

  }

  calculateRank(arr) {

  }
}

export default Player;
