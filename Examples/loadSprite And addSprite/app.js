var game = new moopleGame(800, 800, "canv", {update: update});

game.setColor("#27ae60");

game.loadSprite("Cat.png", "Cat");

game.addSprite("Cat", 0, 0, 200, 200);
game.addSprite("Cat", 600, 0, 200, 200);
game.addSprite("Cat", 600, 600, 200, 200);
game.addSprite("Cat", 0, 600, 200, 200);
game.addSprite("Cat", "center", "center", 200, 200);

function update(){

}