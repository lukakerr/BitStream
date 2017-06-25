const electron = require('electron')
const shell = electron.shell

document.getElementById('webtorrent-link').addEventListener('click', function (event) {
	shell.openExternal('https://github.com/webtorrent/webtorrent')
})

document.getElementById('luka-kerr-link').addEventListener('click', function (event) {
	shell.openExternal('https://github.com/LukaKerr')
})