var game = new MoopleGame("fullscreen", "fullscreen", 'canv', {update: update});

cam = new Camera();

GameWorld = new Scene();
GameWorld.setWorldBounds(0,0, pcw(100), pch(100));
GameWorld.setColor("#333");

MainScreen = new Scene();
MainScreen.setWorldBounds(0,0, pcw(100), pch(100));
MainScreen.setBackground('public/img/bg.png');

MainScreen.show();


usersOnlineCounter = 0;

xodustext = MainScreen.addText(
	'Exodus',// TEXT
	'Consolas',// FONT
	pcw(5),// SIZE
	'#e74c3c',// COLOR
	window.innerWidth / 2 - pcw(8),	// X 
	window.innerHeight / 2 - pch(30)// Y
);

xodustext.bubble(pcw(5), pcw(7), 80);

playBtn = MainScreen.addSprite(
	'public/img/playbtn.png',// SRC
	 window.innerWidth / 2 - (pcw(20) / 2),// X
	 window.innerHeight / 2 - (pch(20) / 2),// Y
	 pcw(20),// WIDTH
	 pch(8)// HEIGHT
);

usersOnlineText = MainScreen.addText(
	'Players online: Calculating...', // TEXT
	'Consolas',// FONT
	pcw(2),// SIZE
	'#e74c3c',// COLOR
	pcw(35),// X 
	window.innerHeight / 2 - pch(20)// Y
);

howtoBtn = MainScreen.addSprite('public/img/howtoplay.png',// SRC
	window.innerWidth / 2 - (pcw(20) / 2),// X
	window.innerHeight / 2 - (pch(20) / 2) + pch(20),// Y 
	pcw(20),// WIDTH
	pch(8)// HEIGHT
);

optionsBtn = MainScreen.addSprite(
	'public/img/options.png',// SRC
	window.innerWidth / 2 - (pcw(20) / 2),// X
	window.innerHeight / 2 - (pch(20) / 2) + pch(40),// Y 
	pcw(20),// WIDTH
	pch(8)// HEIGHT
);

playBtn.bounce(11, 111);
howtoBtn.bounce(11, 111);
optionsBtn.bounce(11, 111);


/******************  GAME CODE  ************************/
function update()
{
		if(game.isClickedOn(playBtn))
		{
			MainScreen.hide();
			GameWorld.show();
		}

		if(game.aIsDown){
			cam.goLeft(10);
		}
		if(game.dIsDown){
			cam.goRight(10);
		}
		if(game.sIsDown){
			cam.goDown(10);
		}
		if(game.wIsDown){
			cam.goUp(10);
		}

		MainScreen.update();
		GameWorld.update();

render(update);
}
render(update);