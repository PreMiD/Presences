const presence: Presence = new Presence({
		clientId: "632479205707350037",
	}),
	strings = presence.getStrings({
		play: "general.playing",
		pause: "general.paused",
	}),
	startTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey:
				"https://cdn.rcd.gg/PreMiD/websites/J/JioCinema/assets/logo.png",
			startTimestamp,
		},
		url = window.location.href;
	if (url.includes("/watch/")) {
		const [video] = document.querySelectorAll("video");
		presenceData.details =
			document.querySelectorAll(".meta-data-title")[0].textContent;
		presenceData.largeImageKey =
			"https://cdn.rcd.gg/PreMiD/websites/J/JioCinema/assets/logo.png";
		presenceData.smallImageKey = video.paused ? Assets.Pause : Assets.Play;
		presenceData.smallImageText = video.paused
			? (await strings).pause
			: (await strings).play;
		[presenceData.startTimestamp, presenceData.endTimestamp] =
			presence.getTimestamps(
				Math.floor(video.currentTime),
				Math.floor(video.duration)
			);
		if (url.includes("/tv/")) {
			presenceData.state = (
				document.querySelectorAll("div.now-playing") as NodeListOf<HTMLElement>
			)[0].offsetParent
				.querySelectorAll("span.jioTitle")[1]
				.textContent.replace("| ", "");
		} else if (url.includes("/movies/")) presenceData.state = "Movie";
		else if (url.includes("/playlist/")) presenceData.state = "Music Video";
		else presenceData.state = "Video";

		if (video.paused) {
			delete presenceData.startTimestamp;
			delete presenceData.endTimestamp;
		}
	} else if (url.includes("/search/")) {
		presenceData.details = "Searching...";
		presenceData.smallImageKey = Assets.Search;
	} else presenceData.details = "Browsing";

	presence.setActivity(presenceData, true);
});
