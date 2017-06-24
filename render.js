trayDownImg = document.createElement("img")

// Listen for put-in-tray button click
trayButton.addEventListener('click', function (event) {
	if (trayOn) {
		trayButton.removeChild(document.getElementsByTagName('img')[0])
		trayDownImg.src = "assets/img/tray.png"
		trayDownImg.title = "Add Menubar Icon To Show Download Percentage"
		trayButton.appendChild(trayDownImg)
		trayOn = false
		ipc.send('remove-tray')
	} else {
		trayButton.removeChild(document.getElementsByTagName('img')[0])
		trayDownImg.src = "assets/img/tray-down.png"
		trayDownImg.title = "Remove Menubar Icon"
		trayButton.appendChild(trayDownImg)
		trayOn = true
		ipc.send('put-in-tray', 'Progress Shown During Download', true)
	}
})

// Tray removed from context menu on icon
ipc.on('tray-removed', function () {
	ipc.send('remove-tray')
	trayOn = false
})