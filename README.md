# moople.js---html5-library [0.15]
Library that makes canvas drawing a little bit easier.

# [UNMAINTAINED]

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
myScene.update();
--to close this scene and open a new one:
firstScene.hide();
secondScene.show();
secondScene.update();
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
sprite.x = 50;
sprite.y++;
```

Creating canvas text
```
text = myScene.addText('enemy1', '30px Arial', 'red', 200, 100);
1st parameter - text
2rd parameter - font and size
3th parameter - color
4 and 5 - x and y positions
```
