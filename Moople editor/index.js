const {app, BrowserWindow} = require('electron');

app.on('ready', function()
{
	var mainWindow = new BrowserWindow({width: 900, height:600, resizable: false, title: "Editor"});
	mainWindow.loadURL('file://' + __dirname + '/index.html');
	mainWindow.webContents.openDevTools();
});