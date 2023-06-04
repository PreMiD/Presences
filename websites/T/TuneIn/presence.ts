const presence = new Presence({
		clientId: "844108776793178122",
	}),
	strings = presence.getStrings({
		play: "general.playing",
		pause: "general.paused",
		live: "general.live",
	});

let title, author;

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey:
			"https://cdn.rcd.gg/PreMiD/websites/T/TuneIn/assets/logo.png",
		startTimestamp: Math.floor(Date.now() / 1000),
	};
	if (
		document
			.querySelector("#innerAppContent")
			.querySelectorAll('[data-testid="player"]')
	) {
		const liveCheck = document.querySelector("#scrubberElapsed");
		presenceData.largeImageKey =
			document.querySelector("#playerArtwork").getAttribute("src") ?? "logo";
		if (!liveCheck) return presence.setActivity();
		if (liveCheck.textContent === "LIVE") {
			const pauseCheck = document
				.querySelector("#innerAppContent")
				.querySelectorAll('[data-testid="player-status-stopped"]');
			title = document.querySelector("#playerTitle").textContent;
			author = document.querySelector("#playerSubtitle").textContent;

			presenceData.details = title;
			if (title.length > 128)
				presenceData.details = `${title.substring(0, 125)}...`;

			presenceData.state = author;
			if (author.length > 128)
				presenceData.state = `${author.substring(0, 125)}...`;
			if (pauseCheck[0]) {
				presenceData.smallImageKey = Assets.Pause;
				presenceData.smallImageText = (await strings).pause;
			} else {
				presenceData.smallImageKey = "live";
				presenceData.smallImageText = (await strings).live;
			}
		} else {
			title = document.querySelector("#playerTitle").textContent;
			author = document.querySelector("#playerSubtitle").textContent;
			const timestamps = presence.getTimestamps(
					presence.timestampFromFormat(
						document.querySelector("#scrubberElapsed").textContent
					),
					presence.timestampFromFormat(
						document.querySelector("#scrubberDuration").textContent
					)
				),
				paused = document
					.querySelector("#innerAppContent")
					.querySelectorAll('[data-testid="player-status-paused"]');

			presenceData.details = title;
			if (title.length > 128)
				presenceData.details = `${title.substring(0, 125)}...`;

			presenceData.state = author;
			if (author.length > 128)
				presenceData.state = `${author.substring(0, 125)}...`;

			if (paused[0]) {
				delete presenceData.startTimestamp;
				delete presenceData.endTimestamp;
				presenceData.smallImageKey = Assets.Pause;
				presenceData.smallImageText = (await strings).pause;
			} else {
				presenceData.smallImageKey = Assets.Play;
				presenceData.smallImageText = (await strings).play;
			}
			presenceData.endTimestamp = timestamps.pop();
		}
		if (!presenceData.details) presence.setActivity();
		else presence.setActivity(presenceData);
	} else presence.setActivity();
});
