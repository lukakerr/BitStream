const {remote} = require('electron')
const {Menu, MenuItem} = remote

const menu = new Menu()
menu.append(new MenuItem({label: 'MenuItem1', click() { console.log('item 1 clicked') }}))
menu.append(new MenuItem({type: 'separator'}))
menu.append(new MenuItem({label: 'MenuItem2', type: 'checkbox', checked: true}))

function checkIfVideo() {
	if (document.getElementsByTagName('video')[0]) {
		return true
	}
	return false
}

function setContextMenu() {
	video = document.getElementsByTagName('video')[0]
	video.addEventListener('contextmenu', function(e) {
		e.preventDefault()
		menu.popup(remote.getCurrentWindow())
	}, false)
}