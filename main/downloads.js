const electron = require('electron')
const app = electron.app

// Right click menu for dock icon
function getDownloadsPath() {
	return app.getPath('downloads')
}

module.exports = {
	getDownloadsPath
}