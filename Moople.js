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

	this.edited = 0;

	// I'm so lazy so I want to write "warn" instead of "console.warn" :(

	log = console.log;
	warn = console.warn;

	// FUNCTIONS (LOAD, CREATE, UPDATE)

	if(typeof functions === "object")
	{
		setInterval(functions.update, 1); // Update function
	} 
	else 
	{
		warn(" update function can only be an Object, but your type is: " + typeof functions);
	}

	//this.consoleTextMessage();

	canvas.addEventListener('mousemove', mouseHandler);
	canvas.addEventListener('click', clickHandler);

} /* moopleGame FUNCTION ==END==  */

/* SET COLOR AND FILL CANVAS      */

moopleGame.prototype.consoleTextMessage = function(){
	console.log("%cMOOPLE.%cJS%c by Dan Durnev%c | %c Version: 0.1","background-color: #FFFFFF; color: #27ae60; font-size:15px; font-weight:bold;","background-color: #FFFFFF; color: #e74c3c; font-size:15px; font-weight:bold;","background-color: #FFFFFF; color: #9b59b6; font-size:15px; font-weight:bold;","background-color: #FFFFFF; color: #2c3e50; font-size:15px; font-weight:bold;","background-color: #FFFFFF; color: #e74c3c; font-size:15px; font-weight:bold;");
}

moopleGame.prototype.setColor = function(clr)
{ // Changing basic color (black) to any other
	if(typeof clr === 'string') 
	{
		this.gameColor = clr;
		this.fillCanvas();
	}
	else
		warn('color can"t be typeof: ' + typeof clr+". Only a string");
}

moopleGame.prototype.setBackground = function(img)
{
	ctx = this.ctx;
	
	var background = new Image();
	background.src = img;
	
	background.width = canvas.width;
	background.height = canvas.height;

	background.onload = function() {
		ctx.drawImage(background, 0, 0);
	}

	backgroundObj = {
		"src" : background.src,
		"width" : canvas.width,
		"height" : canvas.height,
		"x" : 0,
		"y" : 0,
		"id" : img
	}

	if(img)
		this.addedSprites.push(backgroundObj);
	else
		warn('can"t find background image on: ' + img);

	return background;
}

moopleGame.prototype.fillCanvas = function()
{
	this.ctx.fillStyle = this.gameColor;
	this.ctx.fillRect(this.minWorldX, this.minWorldY, this.maxWorldX, this.maxWorldY);
}

moopleGame.prototype.setWorldBounds = function(minX, maxX, minY, maxY)
{
	this.minWorldX = minX;
	this.maxWorldX = maxX;
	this.minWorldY = minY;
	this.maxWorldY = maxY;
}

/*     FPS COUNTER   */

var lastLoop = new Date;
this._fps = function() 
{ 
	var thisLoop = new Date;
	var fps = 1000 / (thisLoop - lastLoop);
	lastLoop = thisLoop;

	if(fps < 15){
		warn( " FPS is under 15");
	}

	return(Math.round(fps));	
}

//    SPRITE FUNCTIONS (ADD, LOAD, RENDER)

moopleGame.prototype.loadSprite = function(sprite, name)
{
	
	if(typeof sprite === 'string'){
		this.loadedSprites.push(new Sprite(sprite,name));
	} else {
		warn('your sprite can"t be typeof ' + typeof sprite);
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
				warn(" You didn't type the name of the sprite! It should be (type: String)");
			}

			else if(!id)
			{
				warn( "You forgot to assign 'id' after sprite's name!");
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
		warn(" You must give a name of the sprite (type: String). But it seems that type of sprite you've given is: "+typeof spritename);
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
		warn(' Width and height can only be typeof: number, but your type is: ' + typeof width);
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
		warn(" X and Y should be typeof: number, but your type is: " + typeof newX);
	}

	for(var i = 0; i < this.addedSprites.length; i++)
	{
		if(sprite.id == this.addedSprites[i].id && typeof sprite != 'undefined')
		{
			this.index = i;
		}
	}

	if(undefined != this.addedSprites[this.index])
	{
		this.addedSprites[this.index].x = newX;
		this.addedSprites[this.index].y = newY;
	}

}

moopleGame.prototype.renderObjects = function()
{
	ctx = this.ctx;
	ctx.clearRect(this.minWorldX, this.minWorldY, this.maxWorldX, this.maxWorldY);
	this.ctx.fillRect(this.minWorldX, this.minWorldY, this.maxWorldX, this.maxWorldY);

	for(var i = 0; i < this.addedText.length; i++)
	{
		ctx.font = this.addedText[i].font;
		ctx.fillStyle = this.addedText[i].color;
		ctx.fillText(this.addedText[i].text, this.addedText[i].xcoord, this.addedText[i].ycoord);
		ctx.fillStyle = this.gameColor;
	}

	for(var i = 0; i < this.addedSprites.length; i++)
	{
		var q = new Image();
		q.src = this.addedSprites[i].src;
		ctx.drawImage(q, this.addedSprites[i].x, this.addedSprites[i].y, this.addedSprites[i].width, this.addedSprites[i].height);
	}
}

moopleGame.prototype.destroySprite = function(sprite)
{
	if(!sprite)
		warn('can"t find sprite: ' + sprite);
	else
	{
		for(var i = 0; i < this.addedSprites.length; i++)
		{
			if(sprite != null && sprite.id == this.addedSprites[i].id)
			{
				spriteIndex = i;
			}
		}
	}

	this.addedSprites.splice(spriteIndex, 1);
}

//    SPRITE FUNCTIONS (ADD, LOAD, RENDER) END

//    TEXT FUNCTIONS

moopleGame.prototype.setTextPos = function(text, newX, newY)
{
	text.xcoord = newX;
	text.ycoord = newY;
}

moopleGame.prototype.pluralObjects = function() // this function is used for object's ID. For example - bullets.
// You can't give special ID to bullets. There a lot of them. So this functions is going to generate ID for all of them.
{
	var text = "";
	var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

	for(var i = 0; i < 40; i++)
	{
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}

	return text;
}

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
	
	if(!obj || !text)
		warn('you didn"t set object or text as your parameters');

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
		
		return true;
}

//   CAMERA

moopleGame.prototype.cameraGoUp = function(speed)
{
	ctx.translate(0, speed); // Camera will move up with the same speed as gameobject
}
moopleGame.prototype.cameraGoDown = function(speed)
{
	ctx.translate(0, -speed); // Camera will move down with the same speed as gameobject
}

moopleGame.prototype.cameraGoLeft = function(speed)
{
	ctx.translate(speed, 0); // Camera will move left with the same speed as gameobject
}

moopleGame.prototype.cameraGoRight = function(speed)
{
	ctx.translate(-speed, 0); // Camera will move right with the same speed as gameobject
}

//   CAMERA END

function Sprite(sprite,name)
{
	var image_of_the_sprite = {
		spriteSrc: sprite,
		spriteName: name
	}

	if(!sprite || !name)
		warn("You didn't set sprite object or it's name");

	return image_of_the_sprite;
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

	if(!txt || !idd || !fnt || !clr || !xpos || !ypos){
		warn("Some parameter is missing in your 'addText' function");
		warn("function is: function moopleText(text, id, font, color, xpos, ypos)");
		warn("Example: addText('hello there', '30px Arial', 'green', 100, 100)");
	}

	return t;
}

moopleGame.prototype.handleKeyboard = function()
{
  var _this = this;

  $(document).on('keydown', function(e){
      var property = e.key.toLowerCase() + 'IsDown';
      _this[property] = true;
  })
  .on('keyup', function(e){
      var property = e.key.toLowerCase() + 'IsDown';
      _this[property] = false;
  });
}

function mouseHandler(mouseInfo)
{
	moopleGame.prototype.mouseX = mouseInfo.screenX;
	moopleGame.prototype.mouseY = mouseInfo.clientY;
}

function clickHandler(clickInfo)
{
	moopleGame.prototype.clickCounter = 0;
	moopleGame.prototype.mouseDownX = clickInfo.screenX;
	moopleGame.prototype.mouseDownY = clickInfo.clientY;
}

moopleGame.prototype.isClickedOn = function(object)
{
	if(this.mouseDownX > object.xcoord
		&& this.mouseDownX < object.xcoord + object.width
		&& this.mouseDownY > object.ycoord
		&& this.mouseDownY < object.ycoord + object.height && moopleGame.prototype.clickCounter == 0) {
	
		moopleGame.prototype.clickCounter = 1;
		return true;
	}

	else if(moopleGame.prototype.clickCounter == 1)
		return false;

}
