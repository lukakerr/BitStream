const electron = require('electron')
const app = electron.app;
const ipc = electron.ipcMain
const BrowserWindow = electron.BrowserWindow;

const dock = require('./dock')
const menu = require('./menu')
const tray = require('./tray')
const downloads = require('./downloads')

app.on('ready', function() {
	mainWindow = new BrowserWindow({
		minWidth: 600,
		minHeight: 200,
		width: 600,
		center: true,
		titleBarStyle: 'hidden'
	});
	mainWindow.loadURL('file://' + __dirname + '/../index.html')

	menu.init()
	dock.init()
});

// Put app in tray
ipc.on('put-in-tray', function (event, progress, newTray) {
	tray.createTray(progress, newTray)
})

// Remove from tray
ipc.on('remove-tray', function () {
	tray.removeTray()
})

// Set badge with download progress
ipc.on('set-badge', function(event, progress) {
	if (progress != '100%') {
		dock.badge(progress)
	} else {
		dock.badge('');
	}
})

ipc.on('downloads-path', function(event, arg) {
	event.sender.send('downloads-path-reply', downloads.getDownloadsPath())
})

ipc.on('download-finished', function(event, file) {
	dock.bounceDownloads(downloads.getDownloadsPath() + '/' + file)
})