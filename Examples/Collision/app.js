var game = new MoopleGame("fullscreen", "fullscreen", "canv", {update: update});

cam = new Camera();
scene = new Scene();

scene.setColor("#2c3e50");
scene.show();

scene.setWorldBounds(-5000, -5000, 10000, 10000);

hero = scene.addSprite('hero.png', window.innerWidth / 2 - 60, window.innerHeight / 2 + 250, 121, 121);

enemy = scene.addSprite('enemy.png', 500, 200, 100, 100);
mytext = scene.addText('hello there', 'Calibri', '40', 'red', 500, 500);

btn = new UIElement("btn.png", 50, 50, 300, 100);


function update()
{
	if(game.aIsDown)
	{
		hero.x-=15;
	}
	if(game.dIsDown)
	{
		hero.x+=15;
	}
	if(game.wIsDown)
	{
		hero.y-=15;
	}
	if(game.sIsDown)
	{
		hero.y+=15;
	}

	if(game.isClickedOn(enemy))
		scene.destroySprite(enemy);

	if(game.isClickedOn(btn))
		log("btn cl");

	game.makeSolid(hero, enemy);

	scene.update();
}
