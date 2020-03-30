let presence = new Presence({
	clientId: "666074265233260555"
});

let strings = presence.getStrings({
	playing: "presence.playback.playing",
	paused: "presence.playback.paused",
	browsing: "presence.activity.browsing"
});

let startTimestamp = Math.floor(Date.now() / 1000);

let video: HTMLVideoElement;

presence.on("iFrameData", async msg => {
	if (!msg) return;
	video = msg;
});

presence.on("UpdateData", async () => {
	let presenceData: presenceData = {
		largeImageKey: "turkanime"
	};

	let title = document.querySelector(
		"#arkaplan > div:nth-child(3) > div.col-xs-8 > div > div:nth-child(3) > div > div.panel-ust > ol > li:nth-child(1) > a"
	);
	let ep = document.querySelector(
		"#arkaplan > div:nth-child(3) > div.col-xs-8 > div > div:nth-child(3) > div > div.panel-ust > ol > li:nth-child(2) > a"
	);

	if (!title || !ep) {
		video = null;
	}

	// Series

	if (title && ep) {
		presenceData.details = title.textContent;
		presenceData.state = ep.textContent.replace(
			title.textContent
				.split(" ")
				.slice(1)
				.join(" "),
			""
		);
	}

	// Browsing
	else {
		presenceData.details = (await strings).browsing;
		presenceData.startTimestamp = startTimestamp;
	}

	if (video) {
		presenceData.smallImageKey = video.paused ? "pause" : "play";
		presenceData.smallImageText = video.paused
			? (await strings).paused
			: (await strings).playing;

		if (!video.paused && video.duration) {
			let timestamps = getTimestamps(
				Math.floor(video.currentTime),
				Math.floor(video.duration)
			);
			presenceData.startTimestamp = timestamps[0];
			presenceData.endTimestamp = timestamps[1];
		}
	}

	presence.setActivity(presenceData);
});

function getTimestamps(videoTime: number, videoDuration: number) {
	var startTime = Date.now();
	var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
	return [Math.floor(startTime / 1000), endTime];
}
