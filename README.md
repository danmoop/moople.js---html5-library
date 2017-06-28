# moople.js---html5-library
Library that makes canvas drawing a little bit easier.

# What added for today:
# Movement,
# Canvas camera,
# Changing size,
# Collision detection,
# Adding text,
# changing text position

Easy to create canvas
```
var game = new moopleGame(800, 800, "canv", {update: update});

// 800 - width, 800 - height,
// "canv" - canvas id
//  update - function that is called 60 times per second
```

Easy to set background color
```
game.setColor("#27ae60");
```

Easy to load and add sprite
```
game.loadSprite("Cat.png", "Cat");

game.addSprite("Cat", 0, 0, 200, 200); // 0 - x, 0 - y, 200 - width and height
```

Changing size and position
```
game.setSize(sprite, 150, 150);
game.setPos(sprite, 0, 100);
```
