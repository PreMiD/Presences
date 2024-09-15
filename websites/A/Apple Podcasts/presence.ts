const presence = new Presence({
		clientId: "1281538997235224596",
		injectOnComplete: true,
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

const enum Assets { // Other default assets can be found at index.d.ts
	Logo = "https://i.imgur.com/ibW2CvC.png",
}

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: Assets.Logo,
			startTimestamp: browsingTimestamp,
		},
		strings = await presence.getStrings({
			play: "general.playing",
			pause: "general.paused",
		}),
		[privacy] = await Promise.all([presence.getSetting("privacy")]),
		shadowRootDir = document.querySelector(".lcd").shadowRoot;
	// document.querySelectorAll(".player > .artwork-container > .artwork-component > picture > img")[0].currentSrc
	if (shadowRootDir?.querySelector(".lcd__active").ariaHidden !== "true") {
		presenceData.type = ActivityType.Listening;

		const episodeImage = (
				shadowRootDir.querySelectorAll(
					".lcd__artwork > picture > img"
				)[0] as HTMLImageElement
			).src.replace("88x88", "450x450"),
			playingShadow = document.querySelector(".chrome-player").shadowRoot;

		presenceData.name = shadowRootDir.querySelectorAll(
			".lcd-meta-line__fragment"
		)[0].textContent;
		presenceData.largeImageKey = episodeImage;
		const progress = shadowRootDir.querySelectorAll("#playback-progress")[0],
			elapsedSeconds = Number(progress.ariaValueNow);

		if (
			playingShadow.querySelector(".playback-play__pause").ariaHidden !== "true"
		) {
			const ts = Date.now() / 1000;
			presenceData.startTimestamp = ts - elapsedSeconds;
			presenceData.endTimestamp =
				ts + Number(progress.ariaValueMax) - elapsedSeconds;

			presenceData.smallImageKey = Assets.Play;
			presenceData.smallImageText = strings.play;
		} else if (
			playingShadow.querySelector(".playback-play__play").ariaHidden !== "true"
		) {
			presenceData.startTimestamp = browsingTimestamp;
			presenceData.smallImageKey = Assets.Pause;
			presenceData.smallImageText = strings.pause;
		}
		presenceData.details = shadowRootDir.querySelectorAll(
			".lcd-meta-line__fragment"
		)[2].textContent;
		presenceData.state = "on Apple Podcasts";
	} else if (document.location.pathname.includes("/podcast")) {
		presenceData.details = `Might listen to ${
			document.querySelectorAll(".headings > .headings__title")[0].textContent
		}`;
		presenceData.state = `by ${
			document.querySelectorAll(".headings > .headings__subtitles")[0]
				.textContent
		}`;
		presenceData.largeImageKey = (
			document.querySelector("picture > img") as HTMLImageElement
		).currentSrc;
	} else if (document.location.pathname.includes("/home"))
		presenceData.details = "On the home page";
	else if (document.location.pathname.includes("/charts"))
		presenceData.details = "Viewing top charts";
	else if (document.location.pathname.includes("/library"))
		presenceData.details = "Viewing library";
	else if (document.location.pathname.includes("/settings"))
		presenceData.details = "Viewing settings";
	else if (document.location.pathname.includes("/search")) {
		presenceData.details = "Searching for podcasts";
		if (document.location.search.includes("?term="))
			presenceData.details = `Searched for ${decodeURIComponent(
				document.location.search.split("?term=")[1]
			)}`;
		else {
			presenceData.smallImageKey = Assets.Search;
			presenceData.details = "Searching...";
		}
	} else presenceData.details = "Browsing...";

	if (presenceData.state && privacy) delete presenceData.state;

	if (presenceData.details && privacy) delete presenceData.details;

	if (presenceData.details) presence.setActivity(presenceData);
	else {
		presenceData.type = ActivityType.Listening;
		presence.setActivity();
	}
});
