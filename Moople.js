class MoopleGame
{
	constructor(width, height, id, functions)
	{
		if(typeof width     === 'undefined' || 
			typeof height    === 'undefined' || 
			typeof id        === 'undefined' || 
			typeof functions === 'undefined')

			warn("You've missed some parameter in 'new MoopleGame'");

		else
		{
			MoopleGame.canvas = document.createElement('canvas');
			MoopleGame.ctx = MoopleGame.canvas.getContext('2d');

			if(width == "fullscreen" && height == "fullscreen")
			{
				document.body.style.overflow = "hidden"; 
				document.body.style.padding = 0; 
				document.body.style.margin = 0; 

				MoopleGame.canvas.setAttribute("width", window.innerWidth);
				MoopleGame.canvas.setAttribute("height", window.innerHeight);
			}

			else if(typeof width === 'number' && typeof height === 'number')
			{
				MoopleGame.canvas.setAttribute("width", width);
				MoopleGame.canvas.setAttribute("height", height);
			}

			MoopleGame.canvas.setAttribute("id", id);
			document.body.appendChild(MoopleGame.canvas);
			MoopleGame.canvas.addEventListener('mousemove', this.mouseHandler);
			MoopleGame.canvas.addEventListener('click', this.clickHandler);

			if(typeof functions === 'object')
				setInterval(functions.update, 0.1337);
			else
				warn('typeof update function should be "object". But your type is ' + typeof functions);

			MoopleGame.Additional_X_Coordinate = 0;
			MoopleGame.Additional_Y_Coordinate = 0;
		}
	}

	mouseHandler(mouseInfo)
	{
		MoopleGame.mouseX = mouseInfo.screenX + MoopleGame.Additional_X_Coordinate;
		MoopleGame.mouseY = mouseInfo.clientY + MoopleGame.Additional_Y_Coordinate;
	}

	clickHandler(clickInfo)
	{
		MoopleGame.clickCounter = 0;
		MoopleGame.mouseDownX = clickInfo.screenX + MoopleGame.Additional_X_Coordinate;
		MoopleGame.mouseDownY = clickInfo.clientY + MoopleGame.Additional_Y_Coordinate;
	}

	isClickedOn(object)
	{
		if(MoopleGame.mouseDownX > object.x
			&& MoopleGame.mouseDownX < object.x + object.width
			&& MoopleGame.mouseDownY > object.y
			&& MoopleGame.mouseDownY < object.y + object.height && MoopleGame.clickCounter == 0) 
		{

			MoopleGame.clickCounter = 1;
			return true;
		}

		else if(MoopleGame.clickCounter == 1)
			return false;

	}

	isHoveredOn(object)
	{
		if(MoopleGame.mouseX > object.x
			&& MoopleGame.mouseX < object.x + object.width
			&& MoopleGame.mouseY > object.y
			&& MoopleGame.mouseY < object.y + object.height) 
			
			return true;
	}

	collisionDetectedBetween(object1, object2)
	{
		if(object1.x + object1.width > object2.x 
			&& object1.x < object2.x + object2.width 
			&& object1.y + object1.height > object2.y 
			&& object1.y < object2.y + object2.height)

			return true;
	}
}

class Scene
{
	constructor()
	{
		this.shown = false;
		this.gameObjects = [];
		this.gameText = [];
		this.spriteSheets = [];

		Scene.minWorldX = -1;
		Scene.minWorldY = -1;
		Scene.maxWorldX = -1;
		Scene.maxWorldY = -1;
	}

	getObjects()
	{
		log(this.gameObjects);
	}

	show()
	{
		this.shown = true;
	}

	hide()
	{
		this.shown = false;
	}

	toggle()
	{
		this.shown = !this.shown;
	}

	setColor(color)
	{
		this.gameColor = color;
	}

	setBackground(img)
	{
		if(typeof img !== 'undefined')
		{
			this.ctx = MoopleGame.ctx;
			this.canvas = MoopleGame.canvas;

			var bg = new Image();
			bg.src = img;
			bg.width = this.canvas.width;
			bg.height = this.canvas.height;

			this.ctx.drawImage(bg, 0, 0, bg.idth, bg.height);

			var bgObject = {
				src: img,
				x: 0,
				y: 0,
				width: bg.width,
				height: bg.height
			}

			this.gameObjects.push(bgObject);

			return bgObject;
		}

		else
			warn('Background image is undefined');
	}

	setWorldBounds(minX, minY, maxX, maxY)
	{
		Scene.minWorldX = minX;
		Scene.minWorldY = minY;
		Scene.maxWorldX = maxX;
		Scene.maxWorldY = maxY;
	}

	addSprite(source, xcoord, ycoord, w, h)
	{
		if( typeof source  !== 'undefined' &&
			typeof xcoord  !== 'undefined' &&
			typeof ycoord  !== 'undefined' &&
			typeof w       !== 'undefined' &&
			typeof h       !== 'undefined' )
		{
			var Sprite = {
				src: source,
				x: xcoord,
				y: ycoord,
				width: w,
				height: h,
				life: 100
			}

			Sprite.bubble = function(startSize, finalSize, bounce_interval)
			{
				if( typeof startSize       === 'undefined' ||
					typeof finalSize       === 'undefined' || 
					typeof bounce_interval === 'undefined')
					warn("Some paramteter is missing in 'Sprite.bubble' function. \n"+
						+"Code: Sprite.bubble(startSize, finalSize, bounce_interval)")

				var increaseSize = true;
				var decreaseSize = false;

				Sprite.width = startSize;
				Sprite.height = startSize;

				setInterval(function(){
					if(increaseSize)
					{
						Sprite.width++;
						Sprite.height++;
						Sprite.x = Sprite.x - 0.5;

						if((Sprite.width && Sprite.height) >= finalSize)
						{
							Sprite.width = finalSize;
							Sprite.height = finalSize;
							increaseSize = false;
							decreaseSize = true;
						}
					}

					if(decreaseSize)
					{
						Sprite.width--;
						Sprite.height--;
						Sprite.x = Sprite.x + 0.5;

						if((Sprite.width && Sprite.height) <= startSize)
						{
							Sprite.width = startSize;
							Sprite.height = startSize;
							increaseSize = true;
							decreaseSize = false;
						}
					}
				}, bounce_interval);
			}

			Sprite.bounce = function(intensity, interval)
			{				
				if( typeof intensity  === 'undefined' ||
					typeof interval   === 'undefined')
					warn("Some paramteter is missing in 'Sprite.bounce' function. \n"+
						+"Code: Sprite.bubble(intensity, interval)")

				var increasePos = true;
				var decreasePos = false;
				var sprite_Start_Y_Pos = Sprite.y;

				setInterval(function(){
					if(increasePos)
					{
						Sprite.y++;

						if(Sprite.y >= sprite_Start_Y_Pos + intensity)
						{
							increasePos = false;
							decreasePos = true;
						}
					}

					if(decreasePos)
					{
						Sprite.y--;

						if(Sprite.y <= sprite_Start_Y_Pos)
						{
							Sprite.y = sprite_Start_Y_Pos;
							increasePos = true;
							decreasePos = false;
						}
					}
				}, interval);
			}

			this.gameObjects.push(Sprite);

			var img = new Image();
			img.src = Sprite.src;
			img.width = Sprite.width;
			img.height = Sprite.height;
			img.setAttribute("xcoord", Sprite.x);
			img.setAttribute("ycoord", Sprite.y);

			img.xcoord = xcoord;
			img.ycoord = ycoord;

			if(this.shown)
			{
				img.onload = function()
				{
					this.ctx = MoopleGame.ctx;
					this.ctx.drawImage(img, img.xcoord, img.ycoord, img.width, img.height);
				}
			}

			else
				warn('Your scene is hidden. Use scene.show()');

			return Sprite;
		}

		else
			warn('You"ve missed some parameter during adding sprite'
				+ '\n It should be "addSprite(source, x, y, width, height');
	}

	addText(txt, fnt, sz, clr, txtX, txtY)
	{
		if ( typeof txt   !== 'undefined' &&
			typeof fnt    !== 'undefined' &&
			typeof sz     !== 'undefined' &&
			typeof clr    !== 'undefined' &&
			typeof txtX   !== 'undefined' &&
			typeof txtY   !== 'undefined' )
		{
			if(this.shown)
			{
				var Text = {
					text: txt,
					font: fnt,
					size: sz,
					color: clr,
					x: txtX,
					y: txtY
				}

				Text.bubble = function(startSize, finalSize, bounce_interval)
				{
					if( typeof startSize       === 'undefined' ||
						typeof finalSize       === 'undefined' || 
						typeof bounce_interval === 'undefined')
						warn("Some paramteter is missing in 'Text.bubble' function. \n"+
							+"Code: Text.bubble(startSize, finalSize, bounce_interval)")

					var increaseSize = true;
					var decreaseSize = false;
					
					setInterval(function(){
						if(increaseSize)
						{
							Text.size++;
							Text.x--;

							if(Text.size >= finalSize)
							{
								Text.size = finalSize;
								increaseSize = false;
								decreaseSize = true;
							}
						}

						if(decreaseSize)
						{
							Text.size--;
							Text.x++;

							if(Text.size <= startSize)
							{
								Text.size = startSize;
								increaseSize = true;
								decreaseSize = false;
							}
						}
					}, bounce_interval);
				}

				this.gameText.push(Text);

				this.ctx = MoopleGame.ctx;
				this.ctx.font = sz+"px"+ " " + fnt;
				this.ctx.fillStyle = clr;
				this.ctx.fillText(txt, txtX, txtY);
				this.ctx.fillStyle = this.gameColor;

				return Text;
			}

			else
				warn('Your scene is hidden. Use scene.show()');
		}

		else
			warn('You"ve missed some parameter during adding text'
				+ '\n It should be "addText(text, font, size, color, textX, textY');
	}

	destroySprite(sprite)
	{
		
		var _this = this;

		var index_ = _this.gameObjects.indexOf(sprite);

		_this.gameObjects.splice(index_, 1);
		
	}

	destroyText(text)
	{
		if(typeof text !== 'undefined')
		{
			var destroyTIndex = this.gameText.indexOf(text);

			if(destroyTIndex != -1)
				this.gameText.splice(destroyTIndex, 1);	
			else
				warn("Can't destroy text. Reason: " + text + ' is not found');
		}

		else
			warn("Can't destroy text. Reason: " + text + ' is not found');
	}

	update()
	{
		if(this.shown)
		{
			this.ctx = MoopleGame.ctx;
			
			this.clear();

			this.ctx.fillStyle = this.gameColor;

			this.draw();

			for(var i = 0; i < this.gameObjects.length; i++)
			{
				var spriteImg = new Image();

				spriteImg.src = this.gameObjects[i].src;

				this.ctx.drawImage(
					spriteImg, 
					this.gameObjects[i].x, 
					this.gameObjects[i].y, 
					this.gameObjects[i].width, 
					this.gameObjects[i].height
				);

				if(this.gameObjects[i].life <= 0)
					this.destroySprite(this.gameObjects[i]);
			}

			for(var i = 0; i < this.gameText.length; i++)
			{
				this.ctx.font = this.gameText[i].size+"px"+" "+this.gameText[i].font;
				this.ctx.fillStyle = this.gameText[i].color;
				this.ctx.fillText(this.gameText[i].text, this.gameText[i].x, this.gameText[i].y);
				this.ctx.fillStyle = this.gameColor;
			}
		}

		game.handleKeyboard();
	}

	clear()
	{
		this.ctx.clearRect(
			Scene.minWorldX,
			Scene.minWorldY,
			Scene.maxWorldX,
			Scene.maxWorldY
		);
	}

	draw()
	{

		this.ctx.fillRect(
			Scene.minWorldX,
			Scene.minWorldY,
			Scene.maxWorldX,
			Scene.maxWorldY
		);
	}
}

class Camera
{
	constructor()
	{
		this.ctx = MoopleGame.ctx;
	}

	goUp(speed)
	{
		this.ctx.translate(0, speed);
		MoopleGame.Additional_Y_Coordinate -= speed;
	}

	goDown(speed) 
	{
		this.ctx.translate(0, -speed);
		MoopleGame.Additional_Y_Coordinate += speed;
	}

	goLeft(speed)
	{
		this.ctx.translate(speed, 0);
		MoopleGame.Additional_X_Coordinate -= speed;
	}

	goRight(speed)
	{
		this.ctx.translate(-speed, 0);
		MoopleGame.Additional_X_Coordinate += speed;
	}

	getX()
	{
		log("X: " + MoopleGame.Additional_X_Coordinate);
	}

	getY()
	{
		log("Y: " + MoopleGame.Additional_Y_Coordinate);
	}
}

MoopleGame.prototype.handleKeyboard = function()
{
	_this = this;
	
	document.addEventListener('keydown', function(e)
	{
		var property = e.key.toLowerCase() + 'IsDown';
		_this[property] = true;
	});

	document.addEventListener('keyup', function(e)
	{
		var property = e.key.toLowerCase() + 'IsDown';
		_this[property] = false;
	});
}

log = console.log;
warn = console.warn;