var app = require('electron').app;
var BrowserWindow = require('electron').BrowserWindow;

app.on('ready', function() {
    mainWindow = new BrowserWindow({
        minWidth: 600,
        minHeight: 200,
        center: true,
        titleBarStyle: 'hidden'
    });
    mainWindow.loadURL('file://' + __dirname + '/index.html');
});