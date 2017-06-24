const path = require('path')
const electron = require('electron')
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const Menu = electron.Menu
const dialog = electron.dialog;
const ipc = electron.ipcMain
const Tray = electron.Tray

app.on('ready', function() {
	mainWindow = new BrowserWindow({
		minWidth: 600,
		minHeight: 200,
		width: 600,
		center: true,
		titleBarStyle: 'hidden'
	});
	mainWindow.loadURL('file://' + __dirname + '/index.html');

	var application_menu = [{
		label: 'File',
		submenu: [{
			label: 'Open',
			accelerator: 'CmdOrCtrl+O',
			click: () => {
				dialog.showOpenDialog({properties: [ 'openFile']}, function(filename) { 
					if (filename) {
						console.log(filename.toString())
					}
				});
			}
		}]
	}, {
		label: 'Edit',
		submenu: [{
			label: 'Undo',
			accelerator: 'CmdOrCtrl+Z',
			role: 'undo'
		}, {
			label: 'Redo',
			accelerator: 'Shift+CmdOrCtrl+Z',
			role: 'redo'
		}, {
			type: 'separator'
		}, {
			label: 'Cut',
			accelerator: 'CmdOrCtrl+X',
			role: 'cut'
		}, {
			label: 'Copy',
			accelerator: 'CmdOrCtrl+C',
			role: 'copy'
		}, {
			label: 'Paste',
			accelerator: 'CmdOrCtrl+V',
			role: 'paste'
		}, {
			label: 'Select All',
			accelerator: 'CmdOrCtrl+A',
			role: 'selectall'
		}]
	}, {
		label: 'Window',
		role: 'window',
		submenu: [{
			label: 'Minimize',
			accelerator: 'CmdOrCtrl+M',
			role: 'minimize'
		}, {
			label: 'Close',
			accelerator: 'CmdOrCtrl+W',
			role: 'close'
		}, {
			type: 'separator'
		}, {
			label: 'Reopen Window',
			accelerator: 'CmdOrCtrl+Shift+T',
			enabled: false,
			key: 'reopenMenuItem',
			click: function () {
				app.emit('activate')
			}
		}]
	}];

	if (process.platform == 'darwin') {
		const name = app.getName();
		application_menu.unshift({
			label: name,
			submenu: [
			{
				label: 'About ' + name,
				role: 'about'
			}, {
				type: 'separator'
			}, {
				label: 'Services',
				role: 'services',
				submenu: []
			}, {
				type: 'separator'
			}, {
				label: 'Hide ' + name,
				accelerator: 'Command+H',
				role: 'hide'
			}, {
				label: 'Hide Others',
				accelerator: 'Command+Shift+H',
				role: 'hideothers'
			}, {
				label: 'Show All',
				role: 'unhide'
			}, {
				type: 'separator'
			}, {
				label: 'Quit',
				accelerator: 'Command+Q',
				click: () => { app.quit(); }
			}]
		});
	}

	menu = Menu.buildFromTemplate(application_menu);
	Menu.setApplicationMenu(menu);

});

let appIcon = null

// Put progress in tray
ipc.on('put-in-tray', function (event, progress, newTray) {
	const iconName = 'assets/img/tray.png'
	const iconPath = path.join(__dirname, iconName)
	// If tray already exists, newTray = false
	if (newTray) {
		appIcon = new Tray(iconPath)
	}
	// Create menu item with progress percentage
	const contextMenu = Menu.buildFromTemplate([{
		label: progress,
		enabled: false
	}])
	appIcon.setContextMenu(contextMenu)
})

ipc.on('remove-tray', function () {
	appIcon.destroy()
})

app.on('window-all-closed', function () {
	if (appIcon) appIcon.destroy()
})