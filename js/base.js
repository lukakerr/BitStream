var WebTorrent = require('webtorrent')
var client = new WebTorrent()
var loading = document.getElementById('loading');

client.on('error', function (err) {
	console.error('Error: ' + err.message)
})

// Listen for for input
document.querySelector('form').addEventListener('submit', function (e) {
	e.preventDefault()

	// Clear out contents
	document.getElementById('title').innerHTML = '';
	document.getElementById('percentage').innerHTML = '';
	document.querySelector('.output').innerHTML = '';

	// Get magnet
	var torrentId = document.querySelector('form input[name=magnet]').value
	// Show loading spinner
	loading.style.display = 'block';
	// Start downloading torrent, callback to onTorrent
	client.add(torrentId, { path: __dirname + '/Downloads' }, onTorrent)
})

function onTorrent(torrent) {
	// Iterate over each file in torrent
	torrent.files.forEach(function (file) {
		// If .mp3
		if (file.name.endsWith('.mp3')) {
			// Add file name to title element and append file to output - dont autoplay audio as there's usually multiple songs
			log(file.name)
			file.appendTo('.output', { autoplay: false })
		// If .mp4
		} else if (file.name.endsWith('.mp4')) {
			// Add file name to title element and append file to output
			log(file.name)
			file.appendTo('.output')
		}
		file.getBlobURL(function (err, url) {
			if (err) return log(err.message)
		})
	})

	// Hide loading spinner
	loading.style.display = 'none';

	// Every 5 seconds get download percentage
	var interval = setInterval(function () {
		document.getElementById('percentage').innerHTML = 'Downloading... ' + (torrent.progress * 100).toFixed(1) + '%'
	}, 5000)

	// When torrent is done, clear the interval
	torrent.on('done', function () {
		document.getElementById('percentage').innerHTML = 'Progress: 100%'
		clearInterval(interval)
	})
}

function log(str) {
	var p = document.createElement('p')
	p.setAttribute("id", "title")
	p.innerHTML = str
	document.querySelector('.output').appendChild(p)
}