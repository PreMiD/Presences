const presence = new Presence({
		clientId: "883446187099840562",
	}),
	strings = presence.getStrings({
		play: "general.playing",
		pause: "general.paused",
		live: "general.live",
	});

let channel: string, channelTimestamp: number;

presence.on("UpdateData", async () => {
	let presenceData: PresenceData = {
		largeImageKey: "tv",
	};

	const pages: Record<string, PresenceData> = {
			"#!": {
				details: "Browsing",
			},
			search: {
				details: "Searching",
				state:
					document.querySelector<HTMLInputElement>("#searchFieldInput")?.value,
				smallImageKey: "search",
				smallImageText: "Searching",
			},
			loginSplash: {
				details: "Logging In",
			},
			channels: {
				details: "Browsing Channels",
			},
			watchlist: {
				details: "Viewing Watchlist",
			},
			settings: {
				details: "Viewing Settings",
			},
			privacy: {
				details: "Viewing Privacy Policy",
			},
			livetv: {
				details: "Browsing Live TV",
			},
			"livetv/replaytv": {
				details: "Browsing Replay TV",
			},
			"livetv/guide": {
				details: "Browsing Live TV Guide",
			},
			"onDemand/FILMS": {
				details: "Browsing Films",
			},
			"onDemand/SERIES": {
				details: "Browsing Series",
			},
			"onDemand/MOVIES_CLUB": {
				details: "Browsing Movies Club",
			},
			"onDemand/SPORTS": {
				details: "Browsing Sports",
			},
			"onDemand/DOCUMENTARIES": {
				details: "Browsing Documentaries",
			},
			"onDemand/KIDS": {
				details: "Browsing Kids Content",
			},
		},
		[logo, timestamps] = await Promise.all([
			presence.getSetting<boolean>("logo"),
			presence.getSetting<boolean>("timestamps"),
		]);

	for (const [path, data] of Object.entries(pages)) {
		if (document.location.hash.includes(path))
			presenceData = { ...presenceData, ...data };
	}

	if (document.querySelector<HTMLDivElement>("div[ng-if='showPlayer']")) {
		const { paused, currentTime, duration } =
			document.querySelector<HTMLVideoElement>("video#arxPlayer");
		// TV
		if (
			document.querySelector<HTMLImageElement>(
				"div[ng-if='details.channelLogoWide'] > .wide-logo"
			)
		) {
			presenceData.details = document.querySelector<HTMLSpanElement>(
				".meta-title[ng-bind='details.title']"
			)?.textContent;
			presenceData.state = document.querySelector<HTMLSpanElement>(
				".meta-title[ng-bind='details.channel.title']"
			)?.textContent;
			if (logo) {
				presenceData.largeImageKey = document
					.querySelector<HTMLImageElement>(
						"div[ng-if='details.channelLogoWide'] > .wide-logo"
					)
					?.src.replace("-wide", "-normal");
			}

			// Live
			if (document.querySelector<HTMLSpanElement>(".meta-remain")) {
				if (channel !== presenceData.state || !channelTimestamp)
					channelTimestamp = Math.floor(Date.now() / 1000);

				presenceData.startTimestamp = channelTimestamp;

				presenceData.smallImageKey = paused ? "pause" : "live";
				presenceData.smallImageText = paused
					? (await strings).pause
					: (await strings).live;
			} else {
				// Replay / Timeshift
				[presenceData.startTimestamp, presenceData.endTimestamp] =
					presence.getTimestamps(
						presence.timestampFromFormat(
							document.querySelector<HTMLSpanElement>("#VcurrentTime")
								.textContent
						),
						presence.timestampFromFormat(
							document.querySelector<HTMLSpanElement>("#Vduration").textContent
						)
					);

				presenceData.smallImageKey = paused ? "pause" : "play";
				presenceData.smallImageText = paused
					? (await strings).pause
					: (await strings).play;
			}
			channel = presenceData.state;
		} else {
			// On Demand
			presenceData.details = document.querySelector<HTMLSpanElement>(
				".meta-title[ng-bind='details.title']"
			).textContent;
			// Series
			if (
				document.querySelector<HTMLSpanElement>(
					"span[ng-bind='details.seriesSubs']"
				)?.textContent.length > 0
			) {
				const episode = document
					.querySelector<HTMLSpanElement>("span[ng-bind='details.seriesSubs']")
					.textContent.split(" / ", 3)
					.map(str => str.trim());

				switch (episode.length) {
					case 3:
						if (
							presenceData.details !== episode[2] &&
							!episode[2].endsWith(` ${episode[1]}`) &&
							!episode[2].endsWith(` ${episode[1].replace("Ε", "E")}`)
						)
							presenceData.state = `${episode[0]}:${episode[1]} ${episode[2]}`;
						else {
							presenceData.state = `${episode[0]
								.replace("S", "Season ")
								.replace("Κ", "Κύκλος ")} ${episode[1]
								.replace("E", "Episode ")
								.replace("Ε", "Επεισόδιο ")}`;
						}
						break;
					case 2:
						presenceData.state = episode[0]
							.replace("E", "Episode ")
							.replace("Ε", "Επεισόδιο ");
						if (
							presenceData.details !== episode[1] &&
							!episode[1].endsWith(` ${episode[0]}`)
						)
							presenceData.state += `: ${episode[1]}`;
						break;
					case 1:
						presenceData.state = episode[0];
				}
			}

			presenceData.endTimestamp = presence
				.getTimestamps(Math.floor(currentTime), Math.floor(duration))
				.pop();

			presenceData.smallImageKey = paused ? "pause" : "play";
			presenceData.smallImageText = paused
				? (await strings).pause
				: (await strings).play;
		}

		if (paused || !timestamps) {
			delete presenceData.startTimestamp;
			delete presenceData.endTimestamp;
			channelTimestamp = null;
		}
	}
	presence.setActivity(presenceData);
});
