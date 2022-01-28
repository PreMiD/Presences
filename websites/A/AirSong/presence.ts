const presence = new Presence({
	clientId: "936448491373359105"
});

presence.on("UpdateData", () => {
	if (document.querySelector<HTMLAnchorElement>("a.as-logo")) {
		const presenceData: PresenceData = {
				largeImageKey: "logo"
			},
			paused = document
				.querySelector<HTMLAnchorElement>("#as-player-play")
				.className.includes("fa-play");
		presenceData.details =
			document.querySelector<HTMLDivElement>("#as-player-title").textContent;
		presenceData.state =
			document.querySelector<HTMLDivElement>("#as-player-artist").textContent;
		if (!paused) {
			presenceData.endTimestamp =
				Date.now() / 1000 +
				presence.timestampFromFormat(
					document.querySelector<HTMLSpanElement>("span.mejs-duration")
						.textContent
				) -
				presence.timestampFromFormat(
					document.querySelector<HTMLSpanElement>("span.mejs-currenttime")
						.textContent
				);
		}
		presenceData.smallImageKey = paused ? "pause" : "play";
		presenceData.smallImageText = paused ? "Paused" : "Playing";

		presence.setActivity(presenceData);
	}
});
