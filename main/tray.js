const electron = require('electron')
const path = require('path')
const dialog = electron.dialog
const Menu = electron.Menu
const Tray = electron.Tray

let appIcon = null

function removeTray() {
	appIcon.destroy()
}

// Right click menu for dock icon
function createTray(progress, newTray) {
	const iconName = '../assets/img/tray.png'
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
}

module.exports = {
	createTray, 
	removeTray
}