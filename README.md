# moople.js---html5-library
Library that makes canvas drawing a little bit easier.

# Now I'm using classes instead of prototype functions.

Easy to create canvas
```
var game = new MoopleGame(800, 800, "canv", {update: update});

// 800 - width, 800 - height,
// "canv" - canvas id
//  update - function that is called 60 times per second
```

First of all, you need to create game scene
```
var myScene = new Scene();
myScene.show();
```

Set scene background color
```
myScene.setColor("#27ae60");
```

Easy to load and add sprite
```
var sprite = myScene.addSprite("Cat", 0, 0, 200, 200); // 0 - x, 0 - y, 200 - width and height
```

Changing size and position
```
sprite.setSize(500,500);
or
sprite.width = 500;
sprite.height = 500;
```

Creating canvas text
```
text = myScene.addText('enemy1', '30px Arial', 'red', 200, 100);
1st parameter - text
3rd parameter - font and size
4th parameter - color
5 and 6 - x and y positions
```
