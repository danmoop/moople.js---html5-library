window.addEventListener("keypress", keyDown, true);
var game = new moopleGame(800, 800, "canv", {update: update});
game.setColor("#27ae60");

game.loadSprite("Cat.png", "Cat");
game.loadSprite("Doge.png", "Doge");

my_Doge = game.addSprite("Doge", "mydoggy", 0, 700, 100, 100);
my_Cat = game.addSprite("Cat", "mycat", 0, 0, 100, 100);

function update(){
	game.setPos(my_Cat, my_Cat.xcoord+=2, my_Cat.ycoord+=2);
	game.setPos(my_Doge, my_Doge.xcoord+=2, my_Doge.ycoord-=2);
}

function keyDown(e) {
	
}