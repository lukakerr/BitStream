const electron = require('electron')
const app = electron.app;
const dialog = electron.dialog;
const path = require('path')
const Menu = electron.Menu
const BrowserWindow = electron.BrowserWindow;

function init() {
	menu = Menu.buildFromTemplate(getMenuTemplate());
	Menu.setApplicationMenu(menu);
}

// About window - opened from menubar
function openAboutWindow() {
	const aboutPath = path.join('file://', __dirname, '../assets/html/about.html')
	let aboutWindow = new BrowserWindow({
		minWidth: 300,
		minHeight: 150,
		maxWidth: 300,
		maxHeight: 150,
		width: 300, 
		height: 150,
		center: true,
		titleBarStyle: 'hidden',
		show: false,
		vibrancy: 'ultra-dark'
	})

	aboutWindow.on('close', function () { 
		win = null 
	})

	aboutWindow.on('ready-to-show', function() {
		aboutWindow.show();
		aboutWindow.focus();
	});
	aboutWindow.loadURL(aboutPath)
}

// Preferences window - opened from menubar
function openPreferencesWindow() {
	const prefPath = path.join('file://', __dirname, '../assets/html/preferences.html')
	let prefWindow = new BrowserWindow({
		minWidth: 400,
		minHeight: 400,
		maxWidth: 400,
		maxHeight: 400,
		width: 400, 
		height: 400,
		center: true,
		titleBarStyle: 'hidden',
		show: false,
		vibrancy: 'ultra-dark'
	})

	prefWindow.on('close', function () { 
		win = null 
	})

	prefWindow.on('ready-to-show', function() {
		prefWindow.show();
		prefWindow.focus();
	});
	prefWindow.loadURL(prefPath)
}

function getMenuTemplate() {
	const menuTemplate = [{
		label: 'File',
		submenu: [{
			label: 'Open',
			accelerator: 'CmdOrCtrl+O',
			click: function() {
				dialog.showOpenDialog({ 
					properties: ['openFile'],
					filters: [
						{ name: 'Movies', extensions: ['mp4'] },
						{ name: 'Audio', extensions: ['mp3'] },
						{ name: 'Torrent', extensions: ['torrent'] }
					] 
				}, function(filePath) { 
					if (filePath) {
						mainWindow.webContents.send('open-file-reply', filePath.toString())
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
		menuTemplate.unshift({
			label: name,
			submenu: [{
				label: 'About ' + name,
				click: function() {
					openAboutWindow()
				}
			}, {
				type: 'separator'
			}, {
				label: 'Preferences ',
				accelerator: 'CmdOrCtrl+,',
				click: function() {
					openPreferencesWindow()
				}
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
				click: function() {
					app.quit()
				}
			}]
		});
	}
	return menuTemplate
}

module.exports = {
	init
}