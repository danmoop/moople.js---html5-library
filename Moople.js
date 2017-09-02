class MoopleGame
{
	constructor(width, height, id, functions)
	{
		if(!width || !height || !id || !functions)
			warn("You've missed some parameter in 'new MoopleGame'");

		else
		{
			MoopleGame.canvas = document.createElement('canvas');
			MoopleGame.ctx = MoopleGame.canvas.getContext('2d');
			MoopleGame.canvas.setAttribute("width", width);
			MoopleGame.canvas.setAttribute("height", height);
			MoopleGame.canvas.setAttribute("id", id);
			document.body.appendChild(MoopleGame.canvas);
			MoopleGame.canvas.addEventListener('mousemove', this.mouseHandler);
			MoopleGame.canvas.addEventListener('click', this.clickHandler);

			if(typeof functions === 'object')
				setInterval(functions.update, 0.1337);
			else
				warn('typeof update function should be "object". But your type is ' + typeof functions);

			MoopleGame.minWorldX = -1;
			MoopleGame.maxWorldX = -1;
			MoopleGame.minWorldY = -1;
			MoopleGame.maxWorldY = -1;
		}
	}

	mouseHandler(mouseInfo)
	{
		MoopleGame.mouseX = mouseInfo.screenX;
		MoopleGame.mouseY = mouseInfo.clientY;
	}

	clickHandler(clickInfo)
	{
		MoopleGame.clickCounter = 0;
		MoopleGame.mouseDownX = clickInfo.screenX;
		MoopleGame.mouseDownY = clickInfo.clientY;
	}

	isClickedOn(object)
	{
		if( MoopleGame.mouseDownX > object.x
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

	collisionDetectedBetween(object1, object2)
	{
		if(object1.x + object1.width > object2.x 
			&& object1.x < object2.x + object2.width 
			&& object1.y + object1.height > object2.y 
			&& object1.y < object2.y + object2.height)

			return true;
	}

	setWorldBounds(minX, minY, maxX, maxY)
	{
		MoopleGame.minWorldX = minX;
		MoopleGame.maxWorldX = maxX;
		MoopleGame.minWorldY = minY;
		MoopleGame.maxWorldY = maxY;
	}
}

class Scene
{
	constructor()
	{
		this.shown = false;
		this.gameObjects = [];
		this.gameText = [];
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

	addSprite(source, xcoord, ycoord, w, h)
	{
		if(     typeof source  !== 'undefined' &&
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
				height: h
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
				+ '\n It should be "addText(source, x, y, width, height');
	}

	addText(txt, fnt, clr, txtX, txtY)
	{
		if (    typeof txt   !== 'undefined' &&
			typeof fnt    !== 'undefined' &&
			typeof clr    !== 'undefined' &&
			typeof txtX   !== 'undefined' &&
			typeof txtY   !== 'undefined' )
		{
			if(this.shown)
			{
				var Text = {
					text: txt,
					font: fnt,
					color: clr,
					x: txtX,
					y: txtY
				}

				this.gameText.push(Text);

				this.ctx = MoopleGame.ctx;
				this.ctx.font = fnt;
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
				+ '\n It should be "addText(text, font, color, textX, textY');
	}

	destroySprite(sprite)
	{
		if(typeof sprite !== 'undefined')
		{
			var destroyIndex = this.gameObjects.indexOf(sprite);

			if(destroyIndex != -1)
				this.gameObjects.splice(destroyIndex, 1);
			else
				warn(sprite + ' is not found');
		}

		else
			warn(sprite + 'is not found')
	}

	destroyText(text)
	{
		if(typeof text !== 'undefined')
		{
			var destroyTIndex = this.gameText.indexOf(text);

			if(destroyTIndex != -1)
				this.gameObjects.splice(destroyTIndex, 1);	
			else
				warn(text + ' is not found');
		}

		else
			warn(text + ' is not found');
	}

	update()
	{
		if(this.shown)
		{
			this.ctx = MoopleGame.ctx;

			if(MoopleGame.minWorldX == -1 
			    || MoopleGame.minWorldY == -1 
			    || MoopleGame.maxWorldX == -1 
			    || MoopleGame.maxWorldY == -1 )

				warn("You forgot to set world bounds. \n 'setWorldBounds(minX, minY, maxX, maxY)'");

			else
			{
				this.ctx.clearRect(
					MoopleGame.minWorldX,
					MoopleGame.minWorldY,
					MoopleGame.maxWorldX,
					MoopleGame.maxWorldY
				);

				this.ctx.fillRect(
					MoopleGame.minWorldX,
					MoopleGame.minWorldY,
					MoopleGame.maxWorldX,
					MoopleGame.maxWorldY
				);

				this.ctx.fillStyle = this.gameColor;

				this.ctx.fillRect(
					MoopleGame.minWorldX,
					MoopleGame.minWorldY,
					MoopleGame.maxWorldX,
					MoopleGame.maxWorldY
				);
			}

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
			}

			for(var i = 0; i < this.gameText.length; i++)
			{
				this.ctx.font = this.gameText[i].font;
				this.ctx.fillStyle = this.gameText[i].color;
				this.ctx.fillText(this.gameText[i].text, this.gameText[i].x, this.gameText[i].y);
				this.ctx.fillStyle = this.gameColor;
			}
		}

		game.handleKeyboard();
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
	}

	goDown(speed) 
	{
		this.ctx.translate(0, -speed);
	}

	goLeft(speed)
	{
		this.ctx.translate(speed, 0);
	}

	goRight(speed)
	{
		this.ctx.translate(-speed, 0);
	}
}

MoopleGame.prototype.handleKeyboard = function()
{
	_this = this;

	document.addEventListener('keydown', function(e){
		var property = e.key.toLowerCase() + 'IsDown';
		_this[property] = true;
	})
	document.addEventListener('keyup', function(e){
		var property = e.key.toLowerCase() + 'IsDown';
		_this[property] = false;
	});
}

log = console.log;
warn = console.warn;
