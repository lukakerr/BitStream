const electron = require('electron')
const app = electron.app;
const dialog = electron.dialog;
const Menu = electron.Menu

// Right click menu for dock icon
function init() {
	if (!app.dock) return
		const menu = Menu.buildFromTemplate(getMenuTemplate())
	app.dock.setMenu(menu)
}

// Display a progress badge
function badge(progress) {
	if (process.platform === 'darwin' || (process.platform === 'linux' && app.isUnityRunning())) {
		app.dock.setBadge(progress)
	}
}

// Bounce the downloads folder
function bounceDownloads(path) {
	app.dock.downloadFinished(path)
}

function getMenuTemplate() {
	return [{
		label: 'Open Torrent File',
		accelerator: 'CmdOrCtrl+O',
		click: function() {
			dialog.showOpenDialog({properties: [ 'openFile']}, function(filename) { 
				if (filename) {
					console.log(filename.toString())
				}
			});
		}
	}]
}

module.exports = {
	init,
	badge,
	bounceDownloads
}