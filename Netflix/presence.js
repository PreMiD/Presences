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
				paused: 'presence.playback.paused',
				browsing: 'presence.activity.browsing'
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
	live = false,
	data,
	videoTimestamps,
	browsingSinceTimestamp,
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
			document.querySelector('.button-nfplayerNextEpisode')
				? document.querySelector('.button-nfplayerNextEpisode').click()
				: document.querySelector('.button-nfplayerFastForward').click();
			break;
		case 'previousTrack':
			document.querySelector('.button-nfplayerBackTen').click();
			break;
	}
}

/**
 * Update Data when priorityTab focused
 */
function updateData() {
	if (oldUrl != window.location.pathname) {
		oldUrl = window.location.pathname;
		browsingSinceTimestamp = Math.floor(Date.now() / 1000);
	}

	if (window.location.pathname.includes('/browse') || window.location.pathname.includes('/title')) {
		data = {
			clientID: '499981204045430784',
			presenceData: {
				details: extensionData.strings.browsing,
				largeImageKey: 'nflix_lg',
				largeImageText: extensionData.version,
				videoTimestamps: getTimestamps(currentTime, duration),
				startTimestamp: browsingSinceTimestamp
			},
			trayTitle: '',
			playback: true,
			service: 'Netflix'
		};
	}

	if (window.location.pathname.includes('/watch/')) {
		videoStream = document.querySelector('.VideoContainer video');

		//* Return if no video stream or duration
		if (!videoStream || isNaN(videoStream.duration)) return;

		duration = Math.floor(videoStream.duration);
		currentTime = Math.floor(videoStream.currentTime);
		paused = videoStream.paused;

		data = {
			clientID: '499981204045430784',
			presenceData: {
				largeImageKey: 'nflix_lg',
				largeImageText: extensionData.version,
				videoTimestamps: getTimestamps(currentTime, duration),
				smallImageKey: paused ? 'pause' : 'play',
				smallImageText: paused ? extensionData.strings.paused : extensionData.strings.playing
			},
			playback: !paused,
			service: 'Netflix'
		};

		//* If paused remove timestamps else update them
		if (!paused) {
			videoTimestamps = getTimestamps(currentTime, duration);
			data.presenceData.startTimestamp = live ? watchingSinceTimestamp : videoTimestamps[0];
			data.presenceData.endTimestamp = videoTimestamps[1];
		} else {
			delete data.presenceData.startTimestamp;
			delete data.presenceData.endTimestamp;
		}

		//* If series else movie
		if (document.querySelectorAll('.video-title span').length > 0) {
			data.presenceData.details = document.querySelector('.video-title h4').textContent;
			data.presenceData.state = `${document.querySelector('.video-title span')
				.textContent} - ${document.querySelectorAll('.video-title span')[1].textContent}`;
			data.trayTitle = `${document.querySelector('.video-title h4').textContent} | ${document.querySelector(
				'.video-title span'
			).textContent}`;
		} else {
			data.presenceData.details = document.querySelector('.video-title').textContent;
			data.trayTitle = document.querySelector('.video-title').textContent;
		}
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
