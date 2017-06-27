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
		height: 700,
		center: true,
		titleBarStyle: 'hidden',
		show: false,
		vibrancy: 'ultra-dark'
	});
	mainWindow.loadURL('file://' + __dirname + '/../index.html')

	mainWindow.on('ready-to-show', function() {
		mainWindow.show()
		mainWindow.focus()
	});

	menu.init()
	dock.init()

	// CMD Q
	app.on('before-quit', function() {
	    mainWindow.forceClose = true;
	});

	// On dock icon click
	app.on('activate', function() {
		mainWindow.show();
	});

	// On red x click
	mainWindow.on('close', function(event) {
		if (mainWindow.forceClose) {
			return
		}
		event.preventDefault();
		mainWindow.hide();
	});
});

// If all windows closed, quit, except on OSX
app.on('window-all-closed', function() {
	if (process.platform != 'darwin') {
	  	app.quit();
	}
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

// Get request for downloas path and send path back
ipc.on('downloads-path', function(event, arg) {
	event.sender.send('downloads-path-reply', downloads.getDownloadsPath())
})

// Get request for download finished and bounce the dock, and add to recent items
ipc.on('download-finished', function(event, file) {
	dock.bounceDownloads(downloads.getDownloadsPath() + '/' + file)
	dock.addFilesToDock(downloads.getDownloadsPath() + '/' + file)
})

// When a recent file is clicked, send its path
app.on('open-file', function(event, filePath) {
	mainWindow.webContents.send('open-file-reply', filePath)
});

