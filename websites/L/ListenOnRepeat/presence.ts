const presence = new Presence({
		clientId: "639534386538348565",
	}),
	strings = presence.getStrings({
		play: "general.playing",
		pause: "general.paused",
	});

let timestamps: number[],
	iFrameVideo: boolean,
	currentTime: number,
	duration: number,
	paused: boolean,
	playback: boolean,
	lastPlaybackState: boolean,
	browsingTimestamp = Math.floor(Date.now() / 1000);

interface IFrameData {
	iframeVideo: {
		iFrameVideo: true;
		currTime: number;
		dur: number;
		paused: boolean;
	};
}
presence.on("iFrameData", (data: IFrameData) => {
	playback = data.iframeVideo.dur ? true : false;

	if (playback) {
		({ iFrameVideo, paused } = data.iframeVideo);
		currentTime = data.iframeVideo.currTime;
		duration = data.iframeVideo.dur;
	}
});

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey:
				"https://cdn.rcd.gg/PreMiD/websites/L/ListenOnRepeat/assets/logo.png",
		},
		[sGlobalRepeat, sFormatRepeat, sFormatGlobalRepeat] = await Promise.all([
			presence.getSetting<boolean>("sGlobalRepeat"),
			presence.getSetting<string>("sFormatRepeat"),
			presence.getSetting<string>("sFormatGlobalRepeat"),
		]),
		//TODO language selector and translation strings
		repeatsTrans = "Repeats",
		repeats = document
			.querySelector(
				"#content > div.main-area-offset > div:nth-child(2) > div.player-card > div > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > button:nth-child(2) > div > div > span"
			)
			.textContent.split(":")[1]
			.split("(")[0]
			.trim(),
		globalRepeats = document
			.querySelector(
				"#content > div.main-area-offset > div:nth-child(2) > div.player-card > div > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > button:nth-child(1) > div > div > span"
			)
			.textContent.split(":")[1]
			.split("(")[0]
			.trim();

	if (lastPlaybackState !== playback) {
		lastPlaybackState = playback;
		browsingTimestamp = Math.floor(Date.now() / 1000);
	}

	if (iFrameVideo === true && !isNaN(duration)) {
		timestamps = presence.getTimestamps(
			Math.floor(currentTime),
			Math.floor(duration)
		);
		presenceData.smallImageKey = paused ? Assets.Pause : Assets.Repeat;
		presenceData.smallImageText = paused
			? (await strings).pause
			: (await strings).play;
		[presenceData.startTimestamp, presenceData.endTimestamp] = timestamps;
		[presenceData.details] = document.title.split(" - Listen On Repeat");

		if (globalRepeats) {
			if (sGlobalRepeat) {
				presenceData.state = sFormatGlobalRepeat
					.replace("%repeatm%", repeatsTrans)
					.replace("%repeats%", repeats)
					.replace("%grepeatm%", "Global Repeats")
					.replace("%grepeats%", globalRepeats);
			} else {
				presenceData.state = sFormatRepeat
					.replace("%repeatm%", repeatsTrans)
					.replace("%repeats%", repeats);
			}
		} else {
			presenceData.state = sFormatRepeat
				.replace("%repeatm%", repeatsTrans)
				.replace("%repeats%", repeats);
		}

		if (paused) {
			delete presenceData.startTimestamp;
			delete presenceData.endTimestamp;
		}
	} else if (iFrameVideo === null && isNaN(duration)) {
		presenceData.startTimestamp = browsingTimestamp;
		presenceData.details = "Loading video...";
		[presenceData.state] = document.title.split(" - Listen On Repeat");
		presenceData.smallImageKey = Assets.Reading;
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
