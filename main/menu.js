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

function openAboutWindow() {
	const aboutPath = path.join('file://', __dirname, '../assets/html/about.html')
	let win = new BrowserWindow({
		minWidth: 300,
		minHeight: 150,
		maxWidth: 300,
		maxHeight: 150,
		width: 300, 
		height: 150,
		center: true,
		titleBarStyle: 'hidden' 
	})
	win.on('close', function () { 
		win = null 
	})
	win.loadURL(aboutPath)
	win.show()
}

function getMenuTemplate() {
	const menuTemplate = [{
		label: 'File',
		submenu: [{
			label: 'Open',
			accelerator: 'CmdOrCtrl+O',
			click: function() {
				dialog.showOpenDialog({ properties: ['openFile'] }, function(filePath) { 
					if (filePath) {
						console.log(filePath.toString())
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
		menuTemplate.unshift({
			label: name,
			submenu: [
			{
				label: 'About ' + name,
				click: function() {
					openAboutWindow()
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