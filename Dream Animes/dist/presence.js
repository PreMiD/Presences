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
			document.querySelector('.proximo').click();
			break;
		case 'previousTrack':
			//document.querySelector('.proximo').click();
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

	if (window.location.pathname.includes('/lista-completa') || window.location.pathname.includes('/temporadas') || window.location.pathname.includes('/lancamentos')) {
		data = {
			clientID: '477937036423331872',
			presenceData: {
				details: extensionData.strings.browsing,
				largeImageKey: 'drim_sonhos2',
				largeImageText: extensionData.version,
				videoTimestamps: getTimestamps(currentTime, duration),
				startTimestamp: browsingSinceTimestamp
			},
			trayTitle: '',
			playback: true,
			service: 'Dream Animes'
		};
	}

	if (window.location.pathname.includes('/online/')) {
		videoStream = document.querySelectorAll('video')[0];

		//* Return if no video stream or duration
		if (!videoStream || isNaN(videoStream.duration)) return;

		duration = Math.floor(videoStream.duration);
		currentTime = Math.floor(videoStream.currentTime);
		paused = videoStream.paused;

		data = {
			clientID: '477937036423331872',
			presenceData: {
				largeImageKey: 'drim_sonhos2',
				largeImageText: extensionData.version,
				videoTimestamps: getTimestamps(currentTime, duration),
				smallImageKey: paused ? 'pause' : 'play',
				smallImageText: paused ? extensionData.strings.paused : extensionData.strings.playing
			},
			playback: !paused,
			service: 'Dream Animes'
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

		const title = document.querySelector('h1.baseline').innerText;
		data.presenceData.details = title;
		data.trayTitle = title;
	}
console.log(data);
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