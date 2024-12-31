const presence = new Presence({
	clientId: "708314580304003124",
});

let oldUrl: string, elapsed: number;

presence.on("UpdateData", async () => {
	const path = location.pathname.replace(/\/?$/, "/"),
		video: HTMLVideoElement = document.querySelector("video"),
		presenceData: PresenceData = {
			details: "Browsing",
			type: ActivityType.Watching,
			largeImageKey:
				"https://cdn.rcd.gg/PreMiD/websites/G/GoPlay/assets/logo.png",
		};

	if (oldUrl !== path) {
		oldUrl = path;
		elapsed = Math.floor(Date.now() / 1000);
	}

	if (elapsed) presenceData.startTimestamp = elapsed;
	if (video) {
		const state = Array.from(
			document.querySelector<HTMLElement>("#infotitle").childNodes
		).flatMap(node => node.textContent.trim() || []);

		presenceData.smallImageKey = video.paused ? Assets.Pause : Assets.Play;
		presenceData.smallImageText = video.paused ? "Paused" : "Playing";

		if (!video.paused) {
			[presenceData.startTimestamp, presenceData.endTimestamp] =
				presence.getTimestampsfromMedia(video);
		}

		if (state[1] !== "Feature Film")
			[presenceData.details, presenceData.state] = state;
		else [presenceData.details] = state;

		if (presence.getSetting<boolean>("cover")) {
			presenceData.largeImageKey = document.querySelector<HTMLMetaElement>(
				"meta[property='og:image']"
			).content;
		}
	}

	if (document.location.search.includes("search"))
		presenceData.details = "Searching for something";

	presence.setActivity(presenceData);
});
