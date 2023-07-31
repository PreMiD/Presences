const presence = new Presence({
	clientId: "1102272266278027296",
});
const enum Assets {
	FRAnimeLogo = "https://i.imgur.com/YKxUCs3.png",
	FRAnimeLogoBg = "https://i.imgur.com/byFtXWd.png",
}
const presenceStrings = {
		browsing: "Parcours le catalogue",
		branding: "Animes gratuit & sans pub",
		websiteName: "FRAnime.fr",
		onPage: "Sur la page",
		watchOn: "Regarder sur FRAnime.fr",
	},
	animeBrowsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {},
		{ href, pathname } = document.location,
		params = new URLSearchParams(new URL(href).search.slice(1)),
		scriptElement = document.querySelector<HTMLScriptElement>(
			'script[type="application/ld+json"]'
		),
		jsonLD = scriptElement ? JSON.parse(scriptElement.textContent || "") : null;

	// Home page
	if (pathname === "/") {
		presenceData.details = presenceStrings.browsing;
		presenceData.state = presenceStrings.branding;
		presenceData.smallImageText = presenceStrings.websiteName;
		presenceData.largeImageKey = Assets.FRAnimeLogoBg;
		presenceData.smallImageKey = Assets.Search;
		presenceData.startTimestamp = animeBrowsingTimestamp;

		// Anime page
	} else if (params.get("ep") === "") {
		presenceData.details = `${presenceStrings.onPage} ${jsonLD.name}`;
		presenceData.state = presenceStrings.branding;
		presenceData.smallImageText = presenceStrings.websiteName;
		presenceData.largeImageKey = jsonLD.thumbnailUrl;
		presenceData.smallImageKey = Assets.Search;
		presenceData.startTimestamp = animeBrowsingTimestamp;
		presenceData.buttons = [
			{
				label: presenceStrings.watchOn,
				url: href,
			},
		];

		// Watching page
	} else if (document.querySelector("#play_button")) {
		presenceData.details = `${jsonLD.name} - S${params.getAll(
			"s"
		)}, EP${params.getAll("ep")}`;

		presenceData.state = presenceStrings.branding;
		presenceData.smallImageText = presenceStrings.websiteName;
		presenceData.smallImageKey = Assets.Pause;
		presenceData.largeImageKey = jsonLD.thumbnailUrl;
		presenceData.buttons = [
			{
				label: presenceStrings.watchOn,
				url: href,
			},
		];

		// The anime is loading, so we delete the timestamp
		delete presenceData.startTimestamp;
		delete presenceData.endTimestamp;

		// player is loaded
	} else if (document.querySelectorAll("video")) {
		const video = document.querySelector("video"),
			[startTimestamp, endTimestamp] = presence.getTimestampsfromMedia(video);

		presenceData.details = `${jsonLD.name} - S${params.getAll(
			"s"
		)}, EP${params.getAll("ep")}`;

		presenceData.state = presenceStrings.branding;
		presenceData.smallImageText = presenceStrings.websiteName;
		presenceData.startTimestamp = startTimestamp;
		presenceData.endTimestamp = endTimestamp;
		presenceData.largeImageKey = jsonLD.thumbnailUrl;
		presenceData.buttons = [
			{
				label: presenceStrings.watchOn,
				url: href,
			},
		];

		if (!video.paused) presenceData.smallImageKey = Assets.Play;
		else {
			presenceData.smallImageKey = Assets.Pause;
			delete presenceData.startTimestamp;
			delete presenceData.endTimestamp;
		}
	}
	presence.setActivity(presenceData);
});
