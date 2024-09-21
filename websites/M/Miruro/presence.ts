const presence = new Presence({
		clientId: "1280494760418738247",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

const enum Assets {
	Logo = "https://i.imgur.com/Wwd5S5f.png",
}

presence.on("UpdateData", async () => {
	const { pathname, href } = document.location,
		presenceData: PresenceData = {
			name: "Miruro",
			details: "Browsing",
			largeImageKey: Assets.Logo,
			startTimestamp: browsingTimestamp,
			type: ActivityType.Watching,
		};

	if (pathname.startsWith("/info")) {
		const infoTitle = document
				.querySelector<HTMLElement>("h1.sc-eZxvvn.cywezh")
				?.firstChild?.textContent.trim(),
			infoCover = document.querySelector<HTMLImageElement>(
				"img.sc-fVHand.bPLeEN"
			)?.src;

		if (infoTitle) presenceData.details = infoTitle;
		presenceData.state = "Diving into Details";
		if (infoCover) {
			presenceData.largeImageKey = infoCover;
			presenceData.smallImageKey = Assets.Reading;
			presenceData.smallImageText = "Reading info";
		}
	} else if (pathname.startsWith("/watch")) {
		const video = document.querySelector<HTMLVideoElement>("video"),
			currentAnimeTitle =
				document.querySelector<HTMLElement>(".anime-title a")?.textContent,
			episodeNumber = document
				.querySelector<HTMLElement>(".ep-number")
				?.textContent?.match(/\d+/)?.[0],
			currentAnimeCover = document.querySelector<HTMLImageElement>(
				"a.sc-dqMHui.bSMGmG img.sc-cgxxSg.kiWytg"
			)?.src;

		if (currentAnimeTitle) {
			presenceData.details = currentAnimeTitle;
			if (episodeNumber) presenceData.state = `Episode ${episodeNumber}`;
			presenceData.buttons = [{ label: "Watch Along", url: href }];
		}
		if (currentAnimeCover) presenceData.largeImageKey = currentAnimeCover;

		if (video) {
			if (!video.paused) {
				[presenceData.startTimestamp, presenceData.endTimestamp] =
					presence.getTimestampsfromMedia(video);
				presenceData.smallImageKey = Assets.Play;
				presenceData.smallImageText = "Now Watching";
			} else {
				presenceData.smallImageKey = Assets.Pause;
				presenceData.smallImageText = "Paused";
			}
		} else {
			presenceData.smallImageKey = Assets.Logo;
			presenceData.smallImageText = "miruro.com";
		}
	} else {
		switch (pathname) {
			case "/":
				presenceData.details = "Browsing the Homepage";
				presenceData.state = "Finding a Gem";
				break;

			case "/trending":
				presenceData.details = "Exploring Trending Anime";
				presenceData.state = "Discovering Popular Hits";
				break;

			case "/airing-schedule":
				presenceData.details = "Checking Airing Schedule";
				presenceData.state = "Planning Next Watch";
				break;

			case "/history":
				presenceData.details = "Reviewing Watch History";
				presenceData.state = "Reliving Epic Scenes";
				break;

			case "/profile":
				presenceData.details = "Viewing Profile";
				presenceData.state = "Tracking the Journey";
				break;

			case "/profile/settings":
				presenceData.details = "Customizing Settings";
				presenceData.state = "Fine-Tuning Preferences";
				break;

			default:
				presenceData.details = "Browsing Miruro";
				presenceData.state = "Finding a Gem";
				break;
		}
	}

	presence.setActivity(presenceData);
});
