# BitStream

A rudimentary Electron application that utilises [WebTorrent](https://github.com/webtorrent/webtorrent) to stream and download a torrent simultaneously.

Either paste in a magnet link into the input box, drag and drop a `.torrent` file, or File > Open a `.torrent` file.

Currently only `.mp4` and `.mp3` files are supported as I haven't had a chance to integrate other formats yet. If you are testing this app, make sure to use a magnet or torrent file that is an `.mp4` or `.mp3` file otherwise nothing will happen. An example magnet is `magnet:?xt=urn:btih:6a9759bffd5c0af65319979fb7832189f4f3c35d&dn=sintel.mp4`.

To get magnets from a torrent website such as [ThePirateBay](https://thepiratebay.org), simply search for a torrent, right click on "GET THIS TORRENT" and hit "copy link".

### To Run The App

`git clone https://github.com/LukaKerr/bitstream.git`

`cd bitstream && npm install`

`npm start`

### Video & Audio Formats Supported

Audio: 

- MP3
- Vorbis in Ogg
- Vorbis in WebM
- PCM in WAVE

Video: 

- MP4
- Theora and Vorbis in Ogg

### Features

- Native notifications, dock icon progress bar, dock icon badge percentage
- Tray (menubar) button that shows download percentage
- Drag and drop `.torrent` files
- Simple entry of magnet links
- Persistent preferences
- Video player shortcuts (play/pause, mute/unmute, skip, rewind, volume up/down, fullscreen)

### To Do

- Integrate playback and streaming of other video and audio formats such as `.mkv` and `.avi`

### Screenshots

<div style="text-align:center">
	<img src ="https://i.imgur.com/QJLRMe1.png" alt="bitstream">
</div>
<br><br>
<div style="text-align:center">
	<img src ="https://i.imgur.com/SKfsIrF.png" alt="bitstream-2">
</div>