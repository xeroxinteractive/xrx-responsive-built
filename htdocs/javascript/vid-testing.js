
var video = {

	done: false,
	ready: false,
	state: 0,
	videoPlayer: null,
	t: this,

	xrx_youtube_tracking: function (domElement, youtubeID) {
		console.log('xrx_youtube_tracking');
		if (typeof(YT) == 'undefined' || typeof(YT.Player) == 'undefined') {
            var tag = document.createElement('script');
			tag.src = "https://www.youtube.com/player_api";
			var firstScriptTag = document.getElementsByTagName('script')[0];
			firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

            window.onYouTubeIframeAPIReady = function() {
                video.loadPlayer(domElement, youtubeID);
            };
        } else {
            video.loadPlayer(domElement, youtubeID);
		} // conditional

	}, // youtube tracking

	loadPlayer: function (domElement, youtubeID) {
		console.log(youtubeID);
		videoPlayer = new YT.Player(domElement, {
		    width: 560,
		    height: 315,
			videoId: youtubeID,
			events: {
			  'onReady': video.onPlayerReady,
			  'onStateChange': video.onPlayerStateChange
			},
			playerVars: { 
				enablejsapi: 1,
				wmode: 'opaque',
				modestbranding: 1,
				html5: 0,
				autoplay: 0
			}
		});

	}, // load player

	onPlayerStateChange: function (event) {
		var currentState = videoPlayer.getPlayerState();
		//console.log(currentState);
		console.log(event);
		//console.log(videoPlayer.getCurrentTime());
		if (currentState === 0) {
			console.log('ended at ' + videoPlayer.getCurrentTime());
		} else if (currentState === 1) {
			console.log('started playing at ' + videoPlayer.getCurrentTime());
			openTracking();
		} else if (event.data === 2) {
			console.log('paused at ' + videoPlayer.getCurrentTime());
		} 

	}, // player state change

	onPlayerReady: function (event) {
		video.ready = true;
		//video.onPlayerStateChange(event);
		event.target.playVideo();
		/*video.pollState = setInterval( function() {
			video.onPlayerStateChange(event);
		}, 100);*/
	}, // on player ready

	stopVideo: function () {
		videoPlayer.stopVideo();
	},

	openTracking: function(){
		console.log('openTracking');

	}

} // end video

//video.xrx_youtube_tracking(domElement, youtubeID);


/*
*** known issues with youtube api:

- onstatechange does not fire, known youtube api issue:
	https://code.google.com/p/gdata-issues/issues/detail?id=4706

- using work around in above code by polling getPlayerState, but getPlayerState returns inconsistently:
	http://stackoverflow.com/questions/30874707/function-getplayerstate-get-incorrect-state
	

- console will throw chromecast extension errors if user does not have chromecast extension installed; not make or break but seems to interfere with youtube api: 
	http://stackoverflow.com/questions/25814914/chrome-youtube-cast-sender-js-console-error
	http://stackoverflow.com/questions/24490323/google-chrome-cast-sender-error-if-chrome-cast-extension-is-not-installed-or-usi/26095117#26095117

*/