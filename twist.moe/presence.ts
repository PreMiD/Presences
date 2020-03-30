var presence = new Presence({
		clientId: "607881666836561930"
	}),
	strings = presence.getStrings({
		play: "presence.playback.playing",
		pause: "presence.playback.paused"
	});

var lastPlaybackState = null;
var playback;
var browsingStamp = Math.floor(Date.now() / 1000);

if (lastPlaybackState != playback) {
	lastPlaybackState = playback;
	browsingStamp = Math.floor(Date.now() / 1000);
}

presence.on("UpdateData", async () => {
	playback = document.querySelector(".AT-player video") !== null ? true : false;

	if (!playback) {
		presenceData: presenceData = {
			largeImageKey: "lg"
		};

		presenceData.details = "Browsing...";
		presenceData.startTimestamp = browsingStamp;

		delete presenceData.state;
		delete presenceData.smallImageKey;

		presence.setActivity(presenceData, true);
	}

	var video: HTMLVideoElement = document.querySelector(".AT-player video");

	if (video !== null && !isNaN(video.duration)) {
		var videoTitle: any;
		var seasonepisode;

		videoTitle = document.querySelector(".series-title span");
		seasonepisode = document.querySelector(".series-episode");

		var timestamps = getTimestamps(
				Math.floor(video.currentTime),
				Math.floor(video.duration)
			),
			presenceData: presenceData = {
				largeImageKey: "lg",
				smallImageKey: video.paused ? "pause" : "play",
				smallImageText: video.paused
					? (await strings).pause
					: (await strings).play,
				startTimestamp: timestamps[0],
				endTimestamp: timestamps[1]
			};

		presence.setTrayTitle(video.paused ? "" : videoTitle.innerText);

		presenceData.details = videoTitle.innerText;
		presenceData.state = seasonepisode.innerText;

		if (video.paused) {
			delete presenceData.startTimestamp;
			delete presenceData.endTimestamp;
		}

		if (videoTitle !== null) {
			presence.setActivity(presenceData, !video.paused);
		}
	}
});

/**
 * Get Timestamps
 * @param {Number} videoTime Current video time seconds
 * @param {Number} videoDuration Video duration seconds
 */
function getTimestamps(videoTime: number, videoDuration: number) {
	var startTime = Date.now();
	var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
	return [Math.floor(startTime / 1000), endTime];
}
