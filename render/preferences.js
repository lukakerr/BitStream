const settings = require('electron-settings')

var dockDownloadProgress = document.querySelector("input[name=dock-download-progress]")
var notification = document.querySelector("input[name=notification]")
var downloadsFolder = document.querySelector("input[name=downloads-folder]")

if (settings.get('dock-download-progress.checked')) {
	dockDownloadProgress.checked = true;
}

if (settings.get('notification.checked')) {
	notification.checked = true;
}

if (settings.get('downloads-folder.checked')) {
	downloadsFolder.checked = true;
}

dockDownloadProgress.onchange = function() {
	if(this.checked) {
    	console.log('checked')
    	settings.set('dock-download-progress', {
			checked: true
		});
	} else {
    	console.log('unchecked')
    	settings.set('dock-download-progress', {
			checked: false
		});
	}
}

notification.onchange = function() {
	if(this.checked) {
    	console.log('checked')
    	settings.set('notification', {
			checked: true
		});
	} else {
    	console.log('unchecked')
    	settings.set('notification', {
			checked: false
		});
	}
}

downloadsFolder.onchange = function() {
	if(this.checked) {
    	console.log('checked')
    	settings.set('downloads-folder', {
			checked: true
		});
	} else {
    	console.log('unchecked')
    	settings.set('downloads-folder', {
			checked: false
		});
	}
}