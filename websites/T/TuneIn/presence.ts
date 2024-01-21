const presence = new Presence({
	clientId: "844108776793178122",
});

presence.on("UpdateData", async () => {
	const settings = {
			lang: await presence.getSetting("lang"),
			timestamps: await presence.getSetting("timestamps"),
			cover: await presence.getSetting("cover"),
			private: await presence.getSetting("privacy"),
		},
		strings = await presence.getStrings({
			play: "general.playing",
			pause: "general.paused",
			browse: "general.browsing",
			live: "general.live",
			listening: "general.listeningMusic",
		}),
		conditions = {
			isPaused: document.querySelector('[data-testid="player-status-paused"]'),
			isStopped: document.querySelector(
				'[data-testid="player-status-stopped"]'
			),
			isConnecting: document.querySelector(
				'[data-testid="player-status-connecting"]'
			),
			isLive: document.querySelector("#scrubberElapsed"),
		},
		presenceData: PresenceData = {
			largeImageKey:
				"https://cdn.rcd.gg/PreMiD/websites/T/TuneIn/assets/logo.png",
			details: strings.browse,
		};

	if (
		document.querySelector('[data-testid="player"]') &&
		!conditions.isConnecting
	) {
		if (conditions.isLive) {
			if (settings.private) presenceData.details = strings.listening;
			else {
				const title = document.querySelector("#playerTitle").textContent,
					author = document.querySelector("#playerSubtitle").textContent,
					artwork = document
						.querySelector("#playerArtwork")
						.getAttribute("src");

				if (title) {
					if (title.length > 128)
						presenceData.details = `${title.substring(0, 125)}...`;
					else presenceData.details = title;
				}

				if (author) {
					if (author.length > 128)
						presenceData.state = `${author.substring(0, 125)}...`;
					else presenceData.state = author;
				}

				if (artwork && settings.cover) presenceData.largeImageKey = artwork;
			}

			if (conditions.isLive.textContent === "") {
				if (conditions.isStopped) {
					delete presenceData.startTimestamp;
					presenceData.smallImageKey = Assets.Pause;
					presenceData.smallImageText = strings.pause;
				} else {
					if (!settings.private && settings.timestamps) {
						const timeElapsed = presence.timestampFromFormat(
							document
								.querySelector("#scrubberElapsed")
								.getAttribute("data-elapsedtime")
						);
						presenceData.startTimestamp =
							Math.floor(Date.now() / 1000) - timeElapsed;
					}
					presenceData.smallImageKey = Assets.Live;
					presenceData.smallImageText = strings.live;
				}
			} else {
				if (!settings.private && settings.timestamps) {
					const elapsed =
							document.querySelector("#scrubberElapsed").textContent,
						duration = document.querySelector("#scrubberDuration").textContent;

					if (elapsed !== "00:00" || duration !== "") {
						const timestamps = presence.getTimestamps(
							presence.timestampFromFormat(elapsed),
							presence.timestampFromFormat(duration)
						);

						presenceData.startTimestamp = timestamps[0];
						presenceData.endTimestamp = timestamps[1];
					}
				} else {
					delete presenceData.startTimestamp;
					delete presenceData.endTimestamp;
				}

				if (conditions.isPaused) {
					delete presenceData.startTimestamp;
					delete presenceData.endTimestamp;
					presenceData.smallImageKey = Assets.Pause;
					presenceData.smallImageText = strings.pause;
				} else if (conditions.isStopped) {
					delete presenceData.startTimestamp;
					delete presenceData.endTimestamp;
					presenceData.smallImageKey = Assets.Stop;
					presenceData.smallImageText = strings.pause;
				} else {
					presenceData.smallImageKey = Assets.Play;
					presenceData.smallImageText = strings.play;
				}
			}
		} else return presence.setActivity(presenceData);
	}
	presence.setActivity(presenceData);
});
