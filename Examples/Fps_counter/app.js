var game = new moopleGame(800, 800, "canv", {update: update});

game.setColor("#27ae60");

function update(){
	console.log(_fps());
}