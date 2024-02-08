const presence = new Presence({
	clientId: "609531561389588480",
});

let lastPlaybackState = null,
	playback: boolean,
	browsingTimestamp = Math.floor(Date.now() / 1000);

if (lastPlaybackState !== playback) {
	lastPlaybackState = playback;
	browsingTimestamp = Math.floor(Date.now() / 1000);
}

presence.on("UpdateData", async () => {
	playback =
		document.querySelector("video.dplayer-video.dplayer-video-current") !== null
			? true
			: false;

	if (!playback) {
		const presenceData: PresenceData = {
			largeImageKey:
				"https://cdn.rcd.gg/PreMiD/websites/D/dlive/assets/logo.png",
		};

		presenceData.details = "Browsing...";
		presenceData.startTimestamp = browsingTimestamp;

		presence.setActivity(presenceData, true);
	}

	if (document.querySelector("video.dplayer-video.dplayer-video-current")) {
		const presenceData: PresenceData = {
			largeImageKey:
				"https://cdn.rcd.gg/PreMiD/websites/D/dlive/assets/logo.png",
			smallImageKey: Assets.Live,
		};

		presenceData.details = document.querySelector<HTMLElement>(
			".info-line-left.flex-box .flex-column.flex-justify-center div"
		).textContent;
		presenceData.state = document.querySelector<HTMLElement>(
			"div.channel-header span.dlive-name span.overflow-ellipsis"
		).textContent;
		presenceData.startTimestamp = browsingTimestamp;

		presence.setActivity(presenceData, true);
	}
});
