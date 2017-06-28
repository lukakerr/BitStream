var dropArea = document.querySelector('.file-drop-container')
var uploadElement = document.getElementById('file-drop')

// Dont allow the file dialog to open - only allow drag and drop
uploadElement.onclick = function (e) { 
	e.preventDefault(); 
};

// Listen for onchange event
uploadElement.onchange = function() {
	var fileList = uploadElement.files;

	// If dragging or uploading a torrent file
	if (fileList[0].path.endsWith('.torrent')) {
		loading.style.display = 'block';

		ipc.send('downloads-path')

		ipc.on('downloads-path-reply', function (event, path) {
			const downloadsPath = path
			// Start downloading torrent, callback to onTorrent in base.js
			client.add(fileList[0].path, { path: downloadsPath }, onTorrent)
		})
	} else {
		alert("Error. You can only download and stream .torrent files")
		uploadElement.value = "";
	}
	dropArea.style.border = "1px dashed #AAA"
	dropArea.style.boxShadow = 'none'
}

// On drag over, fill the border
dropArea.addEventListener("dragover", function() {
	dropArea.style.border = "1px solid transparent"
	dropArea.style.boxShadow = '0 0 4px rgba(81, 203, 238, 1)'
}, false);

// On drag leave, dash the border
dropArea.addEventListener("dragleave", function() {
	dropArea.style.border = "1px dashed #AAA"
	dropArea.style.boxShadow = 'none'
}, false);