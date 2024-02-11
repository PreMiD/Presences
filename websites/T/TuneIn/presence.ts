const presence = new Presence({
	clientId: "844108776793178122",
});

async function getStrings() {
	return presence.getStrings({
		play: "general.playing",
		pause: "general.paused",
		browse: "general.browsing",
		live: "general.live",
		listening: "general.listeningMusic",
	});
}

let strings: Awaited<ReturnType<typeof getStrings>>,
	oldLang: string = null;

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey:
				"https://cdn.rcd.gg/PreMiD/websites/T/TuneIn/assets/logo.png",
		},
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
		[newLang, timestamps, cover, private] = await Promise.all([
			presence.getSetting<string>("lang").catch(() => "en"),
			presence.getSetting<boolean>("timestamps"),
			presence.getSetting<boolean>("cover"),
			presence.getSetting<boolean>("privacy"),
		]);

	if (oldLang !== newLang) {
		oldLang = newLang;
		strings = await getStrings();
	}

	if (!conditions.isConnecting && conditions.isLive) {
		if (private) presenceData.details = strings.listening;
		else {
			const title = document.querySelector("#playerTitle").textContent,
				author = document.querySelector("#playerSubtitle").textContent,
				artwork = document.querySelector("#playerArtwork").getAttribute("src");

			if (title) presenceData.details = title;

			if (author) presenceData.state = author;

			if (artwork && cover) presenceData.largeImageKey = artwork;
		}

		if (conditions.isLive.textContent === "") {
			if (conditions.isStopped) {
				delete presenceData.startTimestamp;
				presenceData.smallImageKey = Assets.Pause;
				presenceData.smallImageText = strings.pause;
			} else {
				if (!private && timestamps) {
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
			if (!private && timestamps) {
				const elapsed = document.querySelector("#scrubberElapsed").textContent,
					duration = document.querySelector("#scrubberDuration").textContent;

				if (elapsed !== "00:00" || duration !== "") {
					const timestamps = presence.getTimestamps(
						presence.timestampFromFormat(elapsed),
						presence.timestampFromFormat(duration)
					);

					presenceData.startTimestamp = timestamps[0];
					presenceData.endTimestamp = timestamps[1];
				}
			}

			if (conditions.isPaused) {
				delete presenceData.startTimestamp;
				delete presenceData.endTimestamp;
				presenceData.smallImageKey = Assets.Pause;
				presenceData.smallImageText = strings.pause;
			} else if (conditions.isStopped) {
				presenceData.smallImageKey = Assets.Stop;
				presenceData.smallImageText = strings.pause;
			} else {
				presenceData.smallImageKey = Assets.Play;
				presenceData.smallImageText = strings.play;
			}
		}
	} else presenceData.details = strings.browse;

	presence.setActivity(presenceData);
});
