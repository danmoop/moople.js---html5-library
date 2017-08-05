var game = new moopleGame('fullScreen', 'fullScreen',"canv", {update: update});

game.setColor("#212121");

game.loadSprite('Ship.png', 'ship');
game.loadSprite('enemy.png', 'enemy');
game.loadSprite('bullet.png', 'bullet');

myship = game.addSprite('ship', 'myship', 900, 800, 100, 100);

enemy1 = game.addSprite('enemy', 'enemy1', 200, 100, 100, 100);
enemy2 = game.addSprite('enemy', 'enemy2', 400, 100, 100, 100);
enemy3 = game.addSprite('enemy', 'enemy3', 600, 100, 100, 100);
enemy4 = game.addSprite('enemy', 'enemy4', 800, 100, 100, 100);
enemy5 = game.addSprite('enemy', 'enemy5', 1000, 100, 100, 100);

enemy1text = game.addText('enemy1', 'mytext', '30px Arial', 'red', 200, 100);
enemy2text = game.addText('enemy2', 'mytext', '30px Arial', 'red', 400, 100);
enemy3text = game.addText('enemy3', 'mytext', '30px Arial', 'red', 600, 100);
enemy4text = game.addText('enemy4', 'mytext', '30px Arial', 'red', 800, 100);
enemy5text = game.addText('enemy5', 'mytext', '30px Arial', 'red', 1000, 100);

var interval;

var bullets = [];

game.setWorldBounds(0, 2000, 0, 1000);


function update()
{

	if(game.dIsDown)
	{
		game.setPos(myship, myship.xcoord+=5, myship.ycoord);
		game.cameraGoRight(5);
	}
	else if(game.aIsDown)
	{
		game.setPos(myship, myship.xcoord-=5, myship.ycoord);
		game.cameraGoLeft(5);
	}
	else if(game.wIsDown)
	{
		game.setPos(myship, myship.xcoord, myship.ycoord-=5);
		game.cameraGoUp(5);
	}
	else if(game.sIsDown)
	{
		game.setPos(myship, myship.xcoord, myship.ycoord+=5);
		game.cameraGoDown(5);
	}

	else if(game.fIsDown)
	{
		bullets.push(game.addSprite('bullet', game.pluralObjects(), myship.xcoord + 40, myship.ycoord - 50, 24, 24));
	}

	for(var i = 0; i < bullets.length; i++)
	{
		game.setPos(bullets[i], bullets[i].xcoord, bullets[i].ycoord -= 2);
	}

	game.handleKeyboard();
	game.renderObjects();
}