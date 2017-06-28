function moopleGame(width, height, id, functions)
{

	document.body.style.overflow = "hidden"; // We don't need scrollBar
	document.body.style.padding = 0; // We don't need borders around our window
	document.body.style.margin = 0; // Same

	if(width != "fullScreen" && height != "fullScreen")
	{
		this.width = width;
		this.height = height;
		this.id = id;
		this.canvas = document.createElement("canvas");
		this.canvas.setAttribute('width', this.width);
		this.canvas.setAttribute('height', this.height);
		this.canvas.setAttribute('id', this.id);
		document.body.appendChild(this.canvas);
	}

	if(width == "fullScreen" && height != "fullScreen")
	{
		this.width = window.innerWidth;
		this.height = height;
		this.id = id;
		this.canvas = document.createElement("canvas");
		this.canvas.setAttribute('width', this.width);
		this.canvas.setAttribute('height', this.height);
		this.canvas.setAttribute('id', this.id);
		document.body.appendChild(this.canvas);
	}

	if(width != "fullScreen" && height == "fullScreen")
	{
		this.width = width;
		this.height = window.innerHeight;
		this.id = id;
		this.canvas = document.createElement("canvas");
		this.canvas.setAttribute('width', this.width);
		this.canvas.setAttribute('height', this.height);
		this.canvas.setAttribute('id', this.id);
		document.body.appendChild(this.canvas);
	}

	if(width == "fullScreen" && height == "fullScreen")
	{
		this.width = window.innerWidth;
		this.height = window.innerHeight;
		this.id = id;
		this.canvas = document.createElement("canvas");
		this.canvas.setAttribute('width', this.width);
		this.canvas.setAttribute('height', this.height);
		this.canvas.setAttribute('id', this.id);
		document.body.appendChild(this.canvas);
	}

	/*    LOADED FILES  */
	this.loadedSprites = [];

	/*    ADDED FILES    */
	this.addedSprites = [];

	/*    ADDED TEXT     */
	this.addedText = [];

	this.offsetX = 0;
	this.offsetY = 0;

	// Getting context 2d for our canvas
	this.ctx = this.canvas.getContext("2d");

	this.fillCanvas(); // Fill color and create Rectangle

	canvas = this.canvas;

	this.edited = 0;

	// FUNCTIONS (LOAD, CREATE, UPDATE)

	if(typeof functions === "object")
	{
		setInterval(functions.update, 1); // Update function
	} 
	else 
	{
		console.warn(" update function can only be an Object");
	}

	//this.consoleTextMessage();

} /* moopleGame FUNCTION ==END==  */

/* SET COLOR AND FILL CANVAS      */

moopleGame.prototype.consoleTextMessage = function(){
	console.log ("%cMOOPLE.%cJS%c by Dan Durnev%c | %c Version: 0.1","background-color: #FFFFFF; color: #27ae60; font-size:55px; font-weight:bold;","background-color: #FFFFFF; color: #e74c3c; font-size:55px; font-weight:bold;","background-color: #FFFFFF; color: #9b59b6; font-size:55px; font-weight:bold;","background-color: #FFFFFF; color: #2c3e50; font-size:55px; font-weight:bold;","background-color: #FFFFFF; color: #e74c3c; font-size:55px; font-weight:bold;");
}

moopleGame.prototype.setColor = function(clr)
{ // Changing basic color (black) to any other
	if(typeof clr === "number")
	{
		console.warn(" Color can't be an integer");
	}
	else if(typeof clr === "undefined")
	{
		console.warn(" Color can't be undefined");
	} 
	else if(typeof clr === "boolean")
	{
		console.warn(" Color can't be a boolean");
	} 
	else 
	{
		this.gameColor = clr;
		this.fillCanvas();
	}
}

moopleGame.prototype.fillCanvas = function()
{
	this.ctx.fillStyle = this.gameColor;
	this.ctx.fillRect(-50000,-50000,55000, 55000);
}

/*     FPS COUNTER   */

var lastLoop = new Date;
this._fps = function() 
{ 
    var thisLoop = new Date;
    var fps = 1000 / (thisLoop - lastLoop);
    lastLoop = thisLoop;
    
    if(fps < 15){
    	console.warn( " FPS is under 15");
    }

    return(Math.round(fps));	
}

//    SPRITE FUNCTIONS (ADD, LOAD, RENDER)

moopleGame.prototype.loadSprite = function(sprite, name)
{
	
	if(typeof sprite === "boolean")
	{
		console.warn(" Your sprite can't be a boolean");
	}
	else if(typeof sprite === "undefined")
	{
		console.warn(" Your sprite can't be undefined");
	} else { // we can only add sprite that [Object] because we add a picture, no strings, integers etc.
		this.loadedSprites.push(new Sprite(sprite,name));
	}
}

moopleGame.prototype.addSprite = function(spritename, id, x, y, width, height)
{ // Add sprite to the screen
	ctx = this.ctx;
	
	if(typeof x === "number" && typeof y === "number")
	{
		for(var i = 0; i < this.loadedSprites.length; i++)
		{ // Sprite will appear at x:y
			if(spritename == this.loadedSprites[i].spriteName)
			{ // We try to find sprite we need in all loaded sprites
				var spriteImg = new Image();

				spriteImg.setAttribute('width', width);
				spriteImg.setAttribute('height', height);

				spriteImg.setAttribute('xCoord', x);
				spriteImg.setAttribute('yCoord', y);

				spriteImg.setAttribute('id', id);

				spriteImg.xcoord = x;
				spriteImg.ycoord = y;

				spriteImg.src = this.loadedSprites[i].spriteSrc;

				spriteImg.onload = function()
				{ // Draw sprite only when it's loaded
					ctx.drawImage(spriteImg, spriteImg.xcoord, spriteImg.ycoord, spriteImg.width, spriteImg.height); // Simply add sprite to <canvas> (on x:y)
				}
			}

			else if(!spritename)
			{
				console.warn(" You didn't type the name of the sprite! It should be (type: String)");
			}

			else if(!id)
			{
				console.warn( "You forgot to assign 'id' after sprite's name!");
			}
		}

		spriteObj = {
			"src" : spriteImg.src,
			"name" : spritename,
			"width" : width,
			"height" : height,
			"id": id,
			"x" : x,
			"y" : y
		}

		this.addedSprites.push(spriteObj);
	}

	else if(x == "center" && y == "center"){ // Sprite will appear at the center of the <canvas>
		for(var i = 0; i < this.loadedSprites.length; i++)
		{ // We try to find sprite we need in all loaded sprites
			if(spritename == this.loadedSprites[i].spriteName)
			{
				var spriteImg = new Image();

				spriteImg.setAttribute('width', width);
				spriteImg.setAttribute('height', height);

				spriteImg.src = this.loadedSprites[i].spriteSrc;

				x = (this.width - width) / 2;
				y = (this.height - height) / 2;

				spriteImg.onload = function()
				{ // Draw sprite only when it's loaded
					ctx.drawImage(spriteImg, spriteImg.xcoord, spriteImg.ycoord, spriteImg.width, spriteImg.height); // Simply add sprite to <canvas> (on x:y)
				}
			}
		}

	}

	else if(typeof spritename != "string")
	{
		console.warn(" You must give a name of the sprite (type: String). But it seems that type of sprite you've given is: "+typeof spritename);
	}

	return spriteImg;
}

moopleGame.prototype.setSize = function(sprite, width, height)
{ // Set sprite size

	if(typeof width === 'number' && typeof height === 'number')
	{
		sprite.width = width;
		sprite.height = height;
	}
	else
	{
		console.warn(' Width and height can only be typeof: number, but your type is: ' + typeof width);
	}

	for(var i = 0; i < this.addedSprites.length; i++)
	{
		if(sprite.id == this.addedSprites[i].id)
		{
			this.index = i;
		}

		this.addedSprites[this.index].width = width;
		this.addedSprites[this.index].height = height;
	}

	this.renderObjects();
	
	this.render(sprite);
}

moopleGame.prototype.setPos = function(sprite, newX, newY)
{ // Set new sprite position
	
	if(typeof newX === 'number' && typeof newY === 'number')
	{
		sprite.xcoord = newX;
		sprite.ycoord = newY;
	}

	else
	{
		console.warn(" X and Y should be typeof: number, but your type is: " + typeof newX);
	}

	for(var i = 0; i < this.addedSprites.length; i++)
	{
		if(sprite.id == this.addedSprites[i].id)
		{
			this.index = i;
		}
	}

	this.addedSprites[this.index].x = newX;
	this.addedSprites[this.index].y = newY;

}

moopleGame.prototype.renderObjects = function()
{
	ctx = this.ctx;
	ctx.clearRect(-50000, -50000, 125000, 125000);
	this.ctx.fillRect(-50000, -50000, 125000, 125000);


	for(var i = 0; i < this.addedText.length; i++)
	{
		ctx.font = this.addedText[i].font;
		ctx.fillStyle = this.addedText[i].color;
		ctx.fillText(this.addedText[i].text, this.addedText[i].xcoord, this.addedText[i].ycoord);
		ctx.fillStyle = this.gameColor;
	}
}

moopleGame.prototype.setTextPos = function(text, newX, newY)
{
	text.xcoord = newX;
	text.ycoord = newY;
}


moopleGame.prototype.render = function(sprite, width, height) // Draw image to screen
{
	ctx = this.ctx;

	for(var i = 0; i < this.addedSprites.length; i++)
	{
		if(sprite.id == this.addedSprites[i].id)
		{
			this.index = i;
		}
	}

	var q = new Image();
	q.src = sprite.src;
	ctx.drawImage(q, this.addedSprites[this.index].x, this.addedSprites[this.index].y, sprite.width, sprite.height);

}

//    SPRITE FUNCTIONS (ADD, LOAD, RENDER) END

//    TEXT FUNCTIONS


moopleGame.prototype.addText = function(text, id, font, color, textX, textY)
{
	ctx = this.ctx;
	ctx.font = font;
	ctx.fillStyle = color;
	ctx.fillText(text, textX, textY);
	ctx.fillStyle = this.gameColor;

	var T = new moopleText(text, id, font, color, textX, textY);

	this.addedText.push(T);

	return T;

}

moopleGame.prototype.setText = function(obj, text)
{
	
	for(var i = 0; i < this.addedText.length; i++)
	{
		if(obj.id == this.addedText[i].id)
		{
			this.renderedTextIndex = i;
		}
	}

	this.addedText[this.renderedTextIndex].text = text;
}

//    TEXT FUNCTIONS END

//    COLLISION    

moopleGame.prototype.collisionDetectedBetween = function(object1, object2){
	if(object1.xcoord + object1.width > object2.xcoord 
	&& object1.xcoord < object2.xcoord + object2.width 
	&& object1.ycoord + object1.height > object2.ycoord 
	&& object1.ycoord < object2.ycoord + object2.height)
	{
		return true;
	}
}

//   CAMERA

moopleGame.prototype.cameraGoUp = function(object, speed)
{
	ctx.translate(0, speed);
}
moopleGame.prototype.cameraGoDown = function(object, speed)
{
	ctx.translate(0, -speed);
}

moopleGame.prototype.cameraGoLeft = function(object, speed)
{
	ctx.translate(speed, 0);
}

moopleGame.prototype.cameraGoRight = function(object, speed)
{
	ctx.translate(-speed, 0);
}


//   CAMERA END

function Sprite(sprite,name)
{
	var o = {
		spriteSrc: sprite,
		spriteName: name
	}

	return o;
}

function moopleText(txt, idd, fnt, clr, xpos, ypos)
{
	var t = {
		text: txt,
		id: idd,
		font: fnt,
		color: clr,
		xcoord: xpos,
		ycoord: ypos
	}

	return t;
}