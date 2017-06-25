var videos = document.getElementsByTagName('video')

var map = {}
var playing = false
var muted = false

// Video key shortcuts
onkeydown = onkeyup = function(e){
    map[e.keyCode] = e.type == 'keydown';
    // Right arrow
    if (map[39]) {
        for (var i = 0; i < videos.length; i++) {
        	videos[i].currentTime += 5;
        }
    // Left arrow
    } else if (map[37]) {
        for (var i = 0; i < videos.length; i++) {
        	videos[i].currentTime -= 5;
        }
    // Space bar
    } else if (map[32]) {
    	for (var i = 0; i < videos.length; i++) {
        	playing ? videos[i].pause() : videos[i].play()
    		playing = !playing
        }
    // F key
    } else if (map[70]) {
    	for (var i = 0; i < videos.length; i++) {
    		videos[i].webkitRequestFullScreen()
    	}
    // Up arrow
    } else if (map[38]) {
    	for (var i = 0; i < videos.length; i++) {
    		videos[i].volume += 0.1
    	}
    // Down arrow
    } else if (map[40]) {
    	for (var i = 0; i < videos.length; i++) {
    		videos[i].volume -= 0.1
    	}
   	// M key
    } else if (map[77]) {
    	for (var i = 0; i < videos.length; i++) {
    		muted ? videos[i].muted = false : videos[i].muted = true
    		muted = !muted
    	}
    }

    map = {};
}

// For every video element, listen for a click and play if not playing
for (var i = 0 ; i < videos.length ; i++) {
    (function(k) {
        videos[k].addEventListener("click", function() {
            playing ? videos[k].pause() : videos[k].play()
    		playing = !playing
        });
    })(i);
}