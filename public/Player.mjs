class Player {
  constructor({x, y, score, id}) {
	  this.x = x
	  this.y = y
	  this.score = score
	  this.id = id
	  console.log("construtor feito")

  }

  draw(context) {
	context.fillRect(this.x *20, this.y * 20, 20, 20)
	console.log("avatar feito")
  }

  movePlayer(dir, speed) {

  }

  collision(item) {

  }

  calculateRank(arr) {

  }
}

export default Player;
