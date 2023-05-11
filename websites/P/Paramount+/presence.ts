const presence = new Presence({
		clientId: "821433038335377418",
	}),
	strings = presence.getStrings({
		play: "general.playing",
		pause: "general.paused",
		live: "general.live",
		search: "general.searching",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

let title: string, seasonEpisode: string, liveTitle: string;

function pathIncludes(path: string, str: string) {
	return path.includes(str);
}

presence.on("UpdateData", async () => {
	let video: HTMLVideoElement = null;
	const vidArea = document.querySelector(".video__player-area"),
		presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/VWrl85V.jpg",
			startTimestamp: browsingTimestamp,
		},
		{ pathname: path } = window.location;

	switch (true) {
		case pathIncludes(path, "/home"):
			presenceData.details = "Browsing...";
			presenceData.state = "Viewing home page";
			break;

		case pathIncludes(path, "/search"):
			presenceData.details = "Searching...";
			presenceData.smallImageKey = "search";
			presenceData.smallImageText = "Looking for something good...";
			break;

		case pathIncludes(path, "/shows"): {
			if (vidArea && pathIncludes(path, "/video")) {
				const data = JSON.parse(
					document.querySelector('[type="application/ld+json"]').textContent
				);

				video = document.querySelector("video");

				title = data.partOfSeries.name;

				seasonEpisode = `S${data.partOfSeason.seasonNumber}:E${data.episodeNumber} - ${data.name}`;

				if (title) presenceData.details = title;

				if (seasonEpisode) presenceData.state = seasonEpisode;

				presenceData.smallImageKey = video.paused ? "pause" : "play";
				presenceData.smallImageText = video.paused
					? (await strings).pause
					: (await strings).play;
				presenceData.largeImageKey =
					data.image || "https://i.imgur.com/VWrl85V.jpg";

				[presenceData.startTimestamp, presenceData.endTimestamp] =
					presence.getTimestampsfromMedia(video);

				if (video.paused) {
					delete presenceData.startTimestamp;
					delete presenceData.endTimestamp;
				}
			} else if (
				!vidArea &&
				document.querySelector('[type="application/ld+json"]') !== null
			) {
				presenceData.details = "Viewing series...";
				presenceData.state = JSON.parse(
					document.querySelector('[type="application/ld+json"]').textContent
				).name;
			} else {
				presenceData.details = "Browsing...";
				presenceData.state = "Viewing Shows";
			}
			break;
		}

		case pathIncludes(path, "/movies"):
			// check if the video area is present and if the video's class is "marqueeVideo"
			if (
				vidArea &&
				document.querySelector("video.marqueeVideo") &&
				!vidArea.querySelector("video")
			) {
				presenceData.details = "Previewing a movie...";
				presenceData.state = JSON.parse(
					document.querySelector('[type="application/ld+json"]').textContent
				).name;
			} else if (vidArea && vidArea.querySelector("video")) {
				const movData = JSON.parse(
					document.querySelector('[type="application/ld+json"]').textContent
				);

				video = vidArea.querySelector("video");

				if (movData.name) presenceData.state = movData.name;
				presenceData.details = "Watching a movie";

				presenceData.smallImageKey = video.paused ? "pause" : "play";
				presenceData.smallImageText = video.paused
					? (await strings).pause
					: (await strings).play;

				[presenceData.startTimestamp, presenceData.endTimestamp] =
					presence.getTimestampsfromMedia(video);

				if (video.paused) {
					delete presenceData.startTimestamp;
					delete presenceData.endTimestamp;
				}
			} else {
				presenceData.details = "Browsing...";
				presenceData.state = "Viewing Movies";
			}
			break;

		case pathIncludes(path, "/live"):
			liveTitle = document.querySelector(
				".video__metadata.padded-container > p"
			).textContent;

			presenceData.details = "Watching Live TV";
			presenceData.state = liveTitle;
			presenceData.smallImageKey = "live";

			break;

		case pathIncludes(path, "/brands"):
			if (path.includes("/cbs/")) {
				presenceData.details = "Browsing Brand:";
				presenceData.state = "CBS";
				presenceData.smallImageKey = "cbs";
			} else if (path.includes("/bet/")) {
				presenceData.details = "Browsing Brand:";
				presenceData.state = "BET";
				presenceData.smallImageKey = "bet";
			} else if (path.includes("/comedy-central/")) {
				presenceData.details = "Browsing Brand:";
				presenceData.state = "Comedy Central";
				presenceData.smallImageKey = "comedycentral";
			} else if (path.includes("/mtv/")) {
				presenceData.details = "Browsing Brand:";
				presenceData.state = "MTV";
				presenceData.smallImageKey = "mtv";
			} else if (path.includes("/nickelodeon/")) {
				presenceData.details = "Browsing Brand:";
				presenceData.state = "Nickelodeon";
				presenceData.smallImageKey = "nickeloden";
			} else if (path.includes("/smithsonian-channel/")) {
				presenceData.details = "Browsing Brand:";
				presenceData.state = "Smithsonian Channel";
				presenceData.smallImageKey = "smithsonian";
			} else {
				presenceData.details = "Browsing Brands";
				presenceData.state = "Viewing Brands";
			}

			break;

		case pathIncludes(path, "/my-list"):
			presenceData.details = "Browsing My List";
			break;

		case pathIncludes(path, "/news"):
			presenceData.details = "Browsing News";
			break;

		case pathIncludes(path, "/collections/sports-hub/"):
			presenceData.details = "Browsing Sports Hub";
			break;
	}

	presence.setActivity(presenceData);
});
