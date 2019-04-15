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
				live: 'presence.playback.live'
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
			document.querySelector('.ytp-next-button').click();
			break;
		case 'previousTrack':
			document.querySelector('.ytp-prev-button').click();
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
		document.querySelector('.video-stream') != null &&
		document.querySelectorAll('h1.title.ytd-video-primary-info-renderer')[0].innerText != ''
	) {
		videoStream = document.querySelector('.video-stream');
		if (isNaN(videoStream.duration)) return;

		duration = Math.floor(videoStream.duration);
		currentTime = Math.floor(videoStream.currentTime);
		paused = videoStream.paused;
		title = document.querySelectorAll('h1.title.ytd-video-primary-info-renderer')[0].innerText;
		author = document.querySelector('#owner-name a').innerText;
		live = Boolean(document.querySelector('.ytp-live'));

		data = {
			clientID: '463097721130188830',
			presenceData: {
				details: title,
				state: author,
				largeImageKey: 'yt_lg',
				largeImageText: extensionData.version,
				smallImageKey: paused ? 'pause' : 'play',
				smallImageText: paused ? extensionData.strings.paused : extensionData.strings.playing
			},
			trayTitle: title,
			playback: !paused,
			service: 'YouTube'
		};

		if (!paused) {
			videoTimestamps = getTimestamps(currentTime, duration);
			data.presenceData.startTimestamp = live ? watchingSinceTimestamp : videoTimestamps[0];

			if (live) {
				data.presenceData.smallImageKey = 'live';
				data.presenceData.smallImageText = extensionData.strings.live;
			} else data.presenceData.endTimestamp = videoTimestamps[1];
		} else {
			delete data.presenceData.startTimestamp;
			delete data.presenceData.endTimestamp;
		}
	} else {
		videoStream = null;
		data = {
			clientID: '463097721130188830',
			service: 'YouTube',
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
