# moople.js---html5-library
Library that makes canvas drawing a little bit easier.

Easy to create canvas
```
var game = new moopleGame(800, 800, "canv", {update: update});
```

Easy to background color
```
game.setColor("#27ae60");
```

Easy to load and add sprite
```
game.loadSprite("Cat.png", "Cat");

game.addSprite("Cat", 0, 0, 200, 200);
```
