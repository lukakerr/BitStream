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

	// menu.init()
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

// Set badge and dock icon progress bar with download progress
ipc.on('set-badge', function(event, progress) {
	if (progress != '100') {
		dock.badge(progress + '%')
		mainWindow.setProgressBar(progress/100)
	} else {
		dock.badge('');
		mainWindow.setProgressBar(-1)
	}
})

ipc.on('downloads-path', function(event, arg) {
	event.sender.send('downloads-path-reply', downloads.getDownloadsPath())
})

ipc.on('download-finished', function(event, file) {
	dock.bounceDownloads(downloads.getDownloadsPath() + '/' + file)
	dock.addFilesToDock(downloads.getDownloadsPath() + '/' + file)
})

// When a recent file is clicked, send its path
app.on('open-file', function(event, filePath) {
  	mainWindow.webContents.send('open-file-reply', filePath)
});

// Clear recent items when app quits
// app.on('before-quit', function() {
// 	app.clearRecentDocuments()
// });

