//! DO NOT REMOVE | USED FOR CHECKING IF ALREADY INJECTED
var PreMiD_Presence = true;

//* PreMiD events
window.addEventListener('PreMiD_MediaKeys', handleMediaKeys);
window.addEventListener('PreMiD_UpdateData', updateData);

//* Request data from PreMiD
setTimeout(function() {
	var event = new CustomEvent('PreMiD_RequestExtensionData', {
		detail: {
			strings: {
				playing: 'presence.playback.playing',
				paused: 'presence.playback.paused'
			},
			version: "chrome.runtime.getManifest().name + ' V' + chrome.runtime.getManifest().version"
		}
	});

	//* Trigger the event
	window.dispatchEvent(event);
});

//* Receive data from PreMiD
window.addEventListener('PreMiD_ReceiveExtensionData', function(data) {
	extensionData = data.detail;
});

//* Presence specific variables
var duration,
	currentTime,
	paused,
	title,
	author,
	videoStream = null,
	data,
	videoTimestamps,
	watchingSinceTimestamp,
	oldUrl;

/**
 * Media keys received from application
 * @param {Object} mediaKey 
 */
function handleMediaKeys(mediaKey) {
	if (!videoStream) return;

	switch (mediaKey.detail) {
		case 'pause':
			paused ? videoStream.play() : videoStream.pause();
			break;
		case 'nextTrack':
			document.querySelector('.next-button').click();
			break;
		case 'previousTrack':
			document.querySelector('.previous-button').click();
			break;
	}
}

/**
 * Update Data when priorityTab focused
 */
function updateData() {
	if (oldUrl != window.location.href) {
		oldUrl = window.location.href;
		watchingSinceTimestamp = Math.floor(Date.now() / 1000);
	}

	if (
		document.querySelector('.video-stream') != undefined &&
		document.querySelectorAll('.title.style-scope.ytmusic-player-bar') != null
	) {
		videoStream = document.querySelector('.video-stream');
		if (isNaN(videoStream.duration)) return;

		duration = Math.floor(videoStream.duration);
		currentTime = Math.floor(videoStream.currentTime);
		paused = videoStream.paused;
		title = document.querySelectorAll('.title.style-scope.ytmusic-player-bar')[0].innerText;
		author = document.querySelector('.byline.style-scope.ytmusic-player-bar').innerText;

		data = {
			clientID: '463151177836658699',
			presenceData: {
				details: title,
				state: author,
				largeImageKey: 'ytm_lg',
				largeImageText: extensionData.version,
				smallImageKey: paused ? 'pause' : 'play',
				smallImageText: paused ? extensionData.strings.paused : extensionData.strings.playing
			},
			trayTitle: title,
			playback: !paused,
			service: 'YouTube Music'
		};

		if (!paused) {
			videoTimestamps = getTimestamps(currentTime, duration);
			data.presenceData.startTimestamp = videoTimestamps[0];
			data.presenceData.endTimestamp = videoTimestamps[1];
		} else {
			delete data.presenceData.startTimestamp;
			delete data.presenceData.endTimestamp;
		}
	} else {
		videoStream = null;
		data = {
			clientID: '463151177836658699',
			service: 'YouTube Music',
			hidden: true
		};
	}

	//* Send data back to PreMiD
	var event = new CustomEvent('PreMiD_UpdatePresence', { detail: data });
	window.dispatchEvent(event);
}

/**
 * Get Timestamps
 * @param {Number} videoTime Current video time seconds
 * @param {Number} videoDuration Video duration seconds
 */
function getTimestamps(videoTime, videoDuration) {
	var startTime = Date.now();
	var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
	return [ Math.floor(startTime / 1000), endTime ];
}
