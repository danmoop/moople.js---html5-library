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

	// Getting context 2d for our canvas
	this.ctx = this.canvas.getContext("2d");

	this.fillCanvas(); // Fill color and create Rectangle

	canvas = this.canvas;

	// FUNCTIONS (LOAD, CREATE, UPDATE)

	if(typeof functions === "object")
	{
		setInterval(functions.update, 1000/60); // Update function
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
	this.ctx.fillRect(0,0,this.width,this.height);
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

	if(x == "center" && y == "center"){ // Sprite will appear at the center of the <canvas>
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

	this.renderObjects();

	this.render(sprite);
}

moopleGame.prototype.setTextPos = function(text, newX, newY)
{
	for(var i = 0; i < this.addedText.length; i++)
	{
		if(text.id == this.addedText[i].id)
		{
			this.index = i;
		}
	}

	this.addedText[this.index].xcoord = newX;
	this.addedText[this.index].ycoord = newY;

}

moopleGame.prototype.renderObjects = function()
{
	rendered = true;

	if(rendered)
	{	
		ctx = this.ctx;
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		this.ctx.fillRect(0,0,canvas.width, canvas.height);
	}

	for(var i = 0; i < this.addedText.length; i++)
	{
		ctx.font = this.addedText[i].font;
		ctx.fillStyle = this.addedText[i].color;
		ctx.fillText(this.addedText[i].text, this.addedText[i].xcoord, this.addedText[i].ycoord);
		ctx.fillStyle = this.gameColor;
	}

}

moopleGame.prototype.render = function(sprite, width, height) // Draw image to screen
{
	ctx = this.ctx;

	this.renderObjects();
	for(var i = 0; i < this.addedSprites.length; i++)
	{
		var q = new Image();
		q.src = this.addedSprites[i].src;
		ctx.drawImage(q, this.addedSprites[i].x, this.addedSprites[i].y,  this.addedSprites[i].width,  this.addedSprites[i].height);
	}

	for(var i = 0; i < this.addedText.length; i++)
	{
		ctx.font = this.addedText[i].font;
		ctx.fillStyle = this.addedText[i].color;
		ctx.fillText(this.addedText[i].text, this.addedText[i].x, this.addedText[i].y);
		ctx.fillStyle = this.gameColor;
	}
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

	if(!text) console.warn(" you didn't write any text as a first parameter");
	else if(!font) console.warn(" you didn't choose font for your text as a second parameter");
	else if(!textX) console.warn(" you didn't write text X position as a third parameter");
	else if(!textY) console.warn(" you didn't write text Y position as a fourth parameter");
	else if(typeof font !== 'string') console.warn(' type of your font can only be string');
	else if(typeof textX !== 'number') console.warn(' type of your text X position can only be a number');
	else if(typeof textY !== 'number') console.warn(' type of your text Y position can only be number');

	return T;

}

//    TEXT FUNCTIONS END

function Sprite(sprite,name)
{
	var o = {
		spriteSrc: sprite,
		spriteName: name
	}

	return o;
}

function moopleText(txt, fnt, idd, clr, xpos, ypos)
{
	var t = {
		text: txt,
		font: fnt,
		id: idd,
		color: clr,
		xcoord: xpos,
		ycoord: ypos
	}

	return t;
}