const presence = new Presence({
		clientId: "764916517895798796",
	}),
	strings = presence.getStrings({
		play: "general.playing",
		pause: "general.paused",
		live: "general.live",
		search: "general.searching",
	});

/**
 * Get the current state text
 * @param {boolean} paused Is the video paused
 * @param {boolean} live Is it a live video
 */
function getStateText(paused: boolean, live: boolean) {
	return live ? "Live" : paused ? "Paused" : "Watching";
}

let elapsed: number, oldUrl: string, title;

presence.on("UpdateData", async () => {
	/* eslint-disable no-one-time-vars/no-one-time-vars */
	let video: HTMLVideoElement = null,
		details,
		state,
		smallImageKey,
		smallImageText,
		startTimestamp,
		endTimestamp;
	/* eslint-enable no-one-time-vars/no-one-time-vars */

	const { href, pathname } = window.location,
		presenceData: PresenceData = {
			details,
			state,
			largeImageKey: "https://i.imgur.com/iTHexWR.png",
			smallImageKey,
			smallImageText,
			startTimestamp,
			endTimestamp,
		};

	if (href !== oldUrl) {
		oldUrl = href;
		elapsed = Math.floor(Date.now() / 1000);
	}

	presenceData.startTimestamp = elapsed;

	if (pathname.includes("/watch")) {
		video = document.querySelector(".bitmovinplayer-container video");
		if (video) {
			title = document.querySelector("title");
			const [startTimestamp, endTimestamp] = presence.getTimestamps(
					Math.floor(video.currentTime),
					Math.floor(video.duration)
				),
				live = endTimestamp === Infinity;

			if (title) presenceData.state = getStateText(video.paused, live);

			presenceData.smallImageKey = live
				? "live"
				: video.paused
				? "pause"
				: "play";
			presenceData.smallImageText = live
				? (await strings).live
				: video.paused
				? (await strings).pause
				: (await strings).play;
			presenceData.startTimestamp = live ? elapsed : startTimestamp;
			if (!live) presenceData.endTimestamp = endTimestamp;
			if (video.paused) {
				delete presenceData.startTimestamp;
				delete presenceData.endTimestamp;
			}
		}
	}

	presence.setActivity(presenceData, video ? !video.paused : true);
});
