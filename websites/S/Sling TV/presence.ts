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
			largeImageKey:
				"https://cdn.rcd.gg/PreMiD/websites/S/Sling%20TV/assets/logo.png",
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
			const live = video.duration === Infinity;

			if (title) presenceData.state = getStateText(video.paused, live);

			presenceData.smallImageKey = live
				? Assets.Live
				: video.paused
				? Assets.Pause
				: Assets.Play;
			presenceData.smallImageText = live
				? (await strings).live
				: video.paused
				? (await strings).pause
				: (await strings).play;

			if (!live) {
				[presenceData.startTimestamp, presenceData.endTimestamp] =
					presence.getTimestampsfromMedia(video);
			}
			if (video.paused) {
				delete presenceData.startTimestamp;
				delete presenceData.endTimestamp;
			}
		}
	}

	presence.setActivity(presenceData, video ? !video.paused : true);
});
