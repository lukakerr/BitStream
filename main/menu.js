const electron = require('electron')
const app = electron.app;
const dialog = electron.dialog;
const Menu = electron.Menu

function init() {
	menu = Menu.buildFromTemplate(getMenuTemplate());
	Menu.setApplicationMenu(menu);
}

function getMenuTemplate() {
	const menuTemplate = [{
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
		menuTemplate.unshift({
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
	return menuTemplate
}

module.exports = {
	init
}