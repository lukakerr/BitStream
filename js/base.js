var WebTorrent = require('webtorrent')
var client = new WebTorrent()
var loading = document.getElementById('loading');

client.on('error', function (err) {
	console.error('Error: ' + err.message)
})

document.querySelector('form').addEventListener('submit', function (e) {
	e.preventDefault()

	var torrentId = document.querySelector('form input[name=magnet]').value
	loading.style.display = 'block';
	document.getElementById('status').innerHTML = 'Adding file...';
	client.add(torrentId, { path: __dirname + '/Downloads' }, onTorrent)
})

function onTorrent(torrent) {
	document.getElementById('status').innerHTML = 'Downloading & Streaming Now... Enjoy Your Movie';
	loading.style.display = 'none';

	setTimeout(function () {
		document.getElementById('status').style.display = "none";
	}, 5000);

	var file = torrent.files.find(function (file) {
		return file.name.endsWith('.mp4')
	})

	file.appendTo('.output')

	var interval = setInterval(function () {
		document.getElementById('percentage').innerHTML = 'Progress: ' + (torrent.progress * 100).toFixed(1) + '%'
	}, 5000)

	torrent.on('done', function () {
		ldocument.getElementById('percentage').innerHTML = 'Progress: 100%'
		clearInterval(interval)
	})
}

function log (str) {
	var p = document.createElement('p')
	p.innerHTML = str
	document.querySelector('.output').appendChild(p)
}