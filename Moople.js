function moopleGame(width, height, id, functions){
	
	document.body.style.overflow = "hidden"; // We don't need scrollBar
	document.body.style.padding = 0; // We don't need borders around our window
	document.body.style.margin = 0; // Same

	if(width != "fullScreen" && height != "fullScreen"){
		this.width = width;
		this.height = height;
		this.id = id;
		this.canvas = document.createElement("canvas");
		this.canvas.setAttribute('width', this.width);
		this.canvas.setAttribute('height', this.height);
		this.canvas.setAttribute('id', this.id);
		document.body.appendChild(this.canvas);
	}

	if(width == "fullScreen" && height != "fullScreen"){
		this.width = window.innerWidth;
		this.height = height;
		this.id = id;
		this.canvas = document.createElement("canvas");
		this.canvas.setAttribute('width', this.width);
		this.canvas.setAttribute('height', this.height);
		this.canvas.setAttribute('id', this.id);
		document.body.appendChild(this.canvas);
	}

	if(width != "fullScreen" && height == "fullScreen"){
		this.width = width;
		this.height = window.innerHeight;
		this.id = id;
		this.canvas = document.createElement("canvas");
		this.canvas.setAttribute('width', this.width);
		this.canvas.setAttribute('height', this.height);
		this.canvas.setAttribute('id', this.id);
		document.body.appendChild(this.canvas);
	}

	if(width == "fullScreen" && height == "fullScreen"){
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

	// Getting context 2d for our canvas
	this.ctx = this.canvas.getContext("2d");

	this.fillCanvas(); // Fill color and create Rectangle

	canvas = this.canvas;

	// FUNCTIONS (LOAD, CREATE, UPDATE)

	if(typeof functions === "object"){
		setInterval(functions.update, 1000/60); // Update function
	} else {
		console.warn(" update function can only be an Object");
	}

	//this.consoleTextMessage();

} /* moopleGame FUNCTION ==END==  */

/* SET COLOR AND FILL CANVAS      */

//moopleGame.prototype.consoleTextMessage = function(){
//	console.log ("%cMOOPLE.%cJS%c by Dan Durnev%c | %c Version: 0.1","background-color: #FFFFFF; color: #27ae60; font-size:55px; font-weight:bold;","background-color: #FFFFFF; color: #e74c3c; font-size:55px; font-weight:bold;","background-color: #FFFFFF; color: #9b59b6; font-size:55px; font-weight:bold;","background-color: #FFFFFF; color: #2c3e50; font-size:55px; font-weight:bold;","background-color: #FFFFFF; color: #e74c3c; font-size:55px; font-weight:bold;");
//}

moopleGame.prototype.setColor = function(clr){ // Changing basic color (black) to any other
	if(typeof clr === "number"){
		console.warn(" Color can't be an integer");
	}
	else if(typeof clr === "undefined"){
		console.warn(" Color can't be undefined");
	} 
	else if(typeof clr === "boolean"){
		console.warn(" Color can't be a boolean");
	} else {
		this.gameColor = clr;
		this.fillCanvas();
	}
}

moopleGame.prototype.fillCanvas = function(){
	this.ctx.fillStyle = this.gameColor;
	this.ctx.fillRect(0,0,this.width,this.height);
}

/*     FPS COUNTER   */

var lastLoop = new Date;
this._fps = function() { 
    var thisLoop = new Date;
    var fps = 1000 / (thisLoop - lastLoop);
    lastLoop = thisLoop;
    
    if(fps < 15){
    	console.warn( " FPS is under 15");
    }

    return(Math.round(fps));	
}

/* SPRITE FUNCTIONS */

moopleGame.prototype.loadSprite = function(sprite, name){
	
	if(typeof sprite === "boolean"){
		console.warn(" Your sprite can't be a boolean");
	}
	else if(typeof sprite === "undefined"){
		console.warn(" Your sprite can't be undefined");
	} else { // we can only add sprite that [Object] because we add a picture, no strings, integers etc.
		this.loadedSprites.push(new Sprite(sprite,name));
	}
}

moopleGame.prototype.addSprite = function(spritename, x, y, width, height){ // Add sprite to the screen
	ctx = this.ctx;
	
	if(typeof x === "number" && typeof y === "number"){
		for(var i = 0; i < this.loadedSprites.length; i++){ // Sprite will appear at x:y
			if(spritename == this.loadedSprites[i].spriteName){ // We try to find sprite we need in all loaded sprites
				var spriteImg = new Image();

				spriteImg.setAttribute('width', width);
				spriteImg.setAttribute('height', height);

				spriteImg.setAttribute('xCoord', x);
				spriteImg.setAttribute('yCoord', y);

				spriteImg.xcoord = x;
				spriteImg.ycoord = y;

				spriteImg.src = this.loadedSprites[i].spriteSrc;
				spriteImg.onload = function(){ // Draw sprite only when it's loaded
					ctx.drawImage(spriteImg, spriteImg.xcoord, spriteImg.ycoord, spriteImg.width, spriteImg.height); // Simply add sprite to <canvas> (on x:y)
				}
			}
			else if(!spritename){
				console.warn(" You didn't type the name of the sprite! It should be (type: String)");
			}

			else{
				console.warn(" Can't find Sprite with name: "+spritename+". Check your loaded sprites and make sure name of sprite you want to add is the same as your loaded sprite");
			}
		}

		spriteObj = {
				"name" : spritename,
				"width" : width,
				"height" : height,
				"x" : x,
				"y" : y
		}

		this.addedSprites.push(spriteObj);
	}

	if(x == "center" && y == "center"){ // Sprite will appear at the center of the <canvas>
		for(var i = 0; i < this.loadedSprites.length; i++){ // We try to find sprite we need in all loaded sprites
			if(spritename == this.loadedSprites[i].spriteName){
				var spriteImg = new Image();

				spriteImg.setAttribute('width', width);
				spriteImg.setAttribute('height', height);

				spriteImg.src = this.loadedSprites[i].spriteSrc;

				x = (this.width - width) / 2;
				y = (this.height - height) / 2;

				spriteImg.onload = function(){ // Draw sprite only when it's loaded
					ctx.drawImage(spriteImg, spriteImg.xcoord, spriteImg.ycoord, spriteImg.width, spriteImg.height); // Simply add sprite to <canvas> (on x:y)
				}
			}
		}

	}

	else if(typeof spritename != "string"){
		console.warn(" You must give a name of the sprite (type: String). But it seems that type of sprite you've given is: "+typeof spritename);
	}

	return spriteImg;
}

moopleGame.prototype.setSize = function(sprite, width, height){ // Set sprite size
	sprite.width = width;
	sprite.height = height;
}

moopleGame.prototype.setPos = function(sprite, newX, newY){ // Set new sprite position
	sprite.xcoord = newX;
	sprite.ycoord = newY;
}

function Sprite(sprite,name){
	var o = {
		spriteSrc: sprite,
		spriteName: name
	}
	return o;
}