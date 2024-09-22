import { getEpisode, getImage, getTitle } from "./utils";

const presence = new Presence({
		clientId: "1287450399120294051",
	}),
	startTimestamp = Math.floor(Date.now() / 1000);

let watchTimestamp = 0,
	lastEp = 0;

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			startTimestamp,
		},
		video = document.querySelector("video"),
		{ pathname, href } = document.location;

	if (pathname === "/") presenceData.state = "Browsing the home page...";

	if (pathname === "/search") presenceData.state = "Search for anime...";

	if (pathname === "/trending")
		presenceData.state = "Browsing the trending page...";

	if (pathname === "/history") presenceData.state = "Viewing anime history...";

	if (pathname === "/profile") presenceData.state = "Viewing a profile...";
	if (pathname === "/profile/settings")
		presenceData.state = "Configuring the settings...";

	if (pathname === "/airing-schedule")
		presenceData.state = "Viewing the schedule...";

	if (pathname === "/info") {
		presenceData.largeImageKey = getImage();
		presenceData.details = getTitle();
		presenceData.state = "Browsing the anime page...";

		presenceData.buttons = [
			{
				label: "View Anime",
				url: href,
			},
		];
	}

	if (pathname === "/watch" && video) {
		const episode = getEpisode();

		if (lastEp !== episode) watchTimestamp = Math.floor(Date.now() / 1000);
		lastEp = episode;

		if (!video.ended) {
			presenceData.smallImageKey = !video.paused ? Assets.Play : Assets.Pause;
			presenceData.smallImageText = !video.paused ? "Playing" : "Paused";
		}

		presenceData.type = ActivityType.Watching;
		presenceData.largeImageKey = getImage();
		presenceData.startTimestamp = watchTimestamp;
		presenceData.details = getTitle();
		presenceData.state = `Episode ${episode}`;
		presenceData.buttons = [
			{
				label: "Watch Anime",
				url: href,
			},
		];
	} else lastEp = null;

	presence.setActivity(presenceData);
});
