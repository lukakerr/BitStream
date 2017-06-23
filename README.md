# BitStream

A rudimentary Electron application that utilises [WebTorrent](https://github.com/webtorrent/webtorrent) to stream and download a torrent simultaneously.

Currently only `.mp4` files are supported as I haven't had a chance to integrate other formats yet. If you are testing this app, make sure to use a magnet that is an `.mp4` file otherwise nothing will happen. An example magnet is `magnet:?xt=urn:btih:6a9759bffd5c0af65319979fb7832189f4f3c35d&dn=sintel.mp4`.

### To Run The App

`git clone https://github.com/LukaKerr/bitstream.git`

`cd bitstream && npm install`

`electron .`

### Screenshot

<img src="http://i.imgur.com/P74Ajlt.png" alt="bitstream" width="500">