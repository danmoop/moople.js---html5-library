var game = new MoopleGame(900, 600, "canv", {update: update});

firstScene = new Scene();
firstScene.setColor("green");
cat = firstScene.addSprite('Cat.png', 0,0, 100, 100);
finish = firstScene.addSprite('http://www.flagservice.ru/pictures/ru/store/stf.jpg', 800, 500, 100, 100);

secondScene = new Scene();
secondScene.setColor("red");
cat2 = secondScene.addSprite('Cat.png', 300,0, 100, 100);

firstScene.show();

firstSceneActive = true;
secondSceneActive = false;

function update()
{
	if(firstSceneActive)
	{
		firstScene.update();
		firstScene.handleKeyboard();

		if(firstScene.dIsDown){
			cat.x+=3;
		}
		if(firstScene.aIsDown){
			cat.x-=3;
		}
		if(firstScene.sIsDown){
			cat.y+=3;
		}
		if(firstScene.wIsDown){
			cat.y-=3;
		}
	}

	else if(secondSceneActive)
	{
		secondScene.update();
		secondScene.handleKeyboard();

		if(secondScene.dIsDown){
			cat2.x+=3;
		}
		if(secondScene.aIsDown){
			cat2.x-=3;
		}
		if(secondScene.sIsDown){
			cat2.y+=3;
		}
		if(secondScene.wIsDown){
			cat2.y-=3;
		}
	}

	if(firstScene.collisionDetectedBetween(cat, finish))
	{
		firstScene.hide();
		secondScene.show();
		secondSceneActive = true;
		firstSceneActive = false;
	}
}