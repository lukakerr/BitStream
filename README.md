# BitStream

A rudimentary Electron application that utilises [WebTorrent](https://github.com/webtorrent/webtorrent) to stream and download a torrent simultaneously.

Either paste in a magnet link into the input box, or File > Open a `.torrent` file.

Currently only `.mp4` and `.mp3` files are supported as I haven't had a chance to integrate other formats yet. If you are testing this app, make sure to use a magnet or torrent file that is an `.mp4` or `.mp3` file otherwise nothing will happen. An example magnet is `magnet:?xt=urn:btih:6a9759bffd5c0af65319979fb7832189f4f3c35d&dn=sintel.mp4`.

To get magnets from a torrent website such as [ThePirateBay](https://thepiratebay.org), simply search for a torrent, right click on "GET THIS TORRENT" and hit "copy link".

### To Run The App

`git clone https://github.com/LukaKerr/bitstream.git`

`cd bitstream && npm install`

`npm start`

### Screenshot

<img src="https://i.imgur.com/uVqtA0F.png" alt="bitstream" width="600">