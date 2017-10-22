<div id="content">

<center>

# Contents

</center>

*   [Getting started](#getstarted)
    *   [Installing Moople.js](#installingmoople)
    *   [Creating Moople window](#creatingwindow)
        *   [Making window fullscreen](#settingfullscreen)

* * *

<div id="getstarted">

<center>

# I. Get Started

</center>

<div id="installingmoople">

<center>

## 1\. Installing Moople

</center>

To get started using moople.js, download moople.js from [github repository](https://github.com/danmoop/moople.js---html5-library). Unpack it to any folder on your PC. Create index.html and app.js yourself. Link app.js and moople.js to index.html. Index.html should look like this:

```
<!DOCTYPE html> 
<html lang="en"> 
<head> 
    <meta charset="UTF-8"> 
    <title>Document</title> 
</head>

<body> 
    <script src="Moople.js">

    </script>
    <script src="app.js">

    </script> 
</body> 

</html>
```

**Pay attention!. You should link Moople.js before app.js**

</div>

* * *

<div id="creatingwindow">

<center>

## 2\. Creating Moople window

</center>

You create Moople window simple using this command.

```
var game = new MoopleGame(width, height, "canv", {update: update}); 

function update()
{
   ... 
}
```

Width and Height - integers. update - function that is executed 60 times per second. "canv" - canvas id.

</div>

* * *

<div id="settingfullscreen">

<center>

## 3\. Making window fullscreen

</center>

You can set window to fullscreen by setting width and height to "fullscreen"

```
var game = new MoopleGame("fullscreen", "fullscreen", "canv", {update: update}); 

function update()
{ 
   ...
}
```
</div>

</div>

</div>
