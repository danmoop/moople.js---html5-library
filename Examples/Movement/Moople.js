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
			if(typeof functions === 'object')
				setInterval(functions.update, 1);
			else
				warn('typeof update function should be "object". But your type is ' + typeof functions);
		}
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

	addSprite(source, xcoord, ycoord, w, h)
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

		return Sprite;
	}

	addText(txt, fnt, clr, txtX, txtY)
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
	}

	destroySprite(sprite)
	{
		var destroyIndex = this.gameObjects.indexOf(sprite);
		this.gameObjects.splice(destroyIndex, 1);
	}

	destroyText(text)
	{
		var destroyTIndex = this.gameText.indexOf(text);
		this.gameObjects.splice(destroyTIndex, 1);		
	}

	update()
	{
		if(this.shown)
		{
			this.ctx = MoopleGame.ctx;
			this.ctx.clearRect(0,0,900,600);

			this.ctx.fillRect(0,0,900,600);

			this.ctx.fillStyle = this.gameColor;
			this.ctx.fillRect(0,0,900,600);

			for(var i = 0; i < this.gameObjects.length; i++)
			{
				var q = new Image();
				q.src = this.gameObjects[i].src;
				this.ctx.drawImage(q, this.gameObjects[i].x, this.gameObjects[i].y, this.gameObjects[i].width, this.gameObjects[i].height);
			}

			for(var i = 0; i < this.gameText.length; i++)
			{
				this.ctx.font = this.gameText[i].font;
				this.ctx.fillStyle = this.gameText[i].color;
				this.ctx.fillText(this.gameText[i].text, this.gameText[i].x, this.gameText[i].y);
				this.ctx.fillStyle = this.gameColor;
			}
		}
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

Scene.prototype.handleKeyboard = function()
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