var game = new MoopleGame(900, 600, "canv", {update: update});

firstScene = new Scene();
firstScene.show();
cat = firstScene.addSprite('Cat.png', 0,0, 100, 100);

function update()
{
	firstScene.update();
	cat.x++;
}