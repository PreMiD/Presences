const presence = new Presence({
		clientId: "700338425953386587",
	}),
	strings = presence.getStrings({
		play: "general.playing",
		pause: "general.paused",
		browsing: "general.browsing",
		searching: "general.searching",
		reading: "general.reading",
	});

function parseQueryString(queryString?: string) {
	queryString ??= window.location.search.substring(1);

	const params: { [queryKey: string]: string } = {},
		queries = queryString.split("&");
	for (const indexQuery in queries) {
		const indexPair = indexQuery.split("=");
		params[decodeURIComponent(indexPair[0])] = decodeURIComponent(
			indexPair.length > 1 ? indexPair[1] : ""
		);
	}
	return params;
}

enum Assets {
	Play = "https://i.imgur.com/q57RJjs.png",
	Pause = "https://i.imgur.com/mcEXiZk.png",
	Stop = "https://i.imgur.com/aLYu3Af.png",
	Search = "https://i.imgur.com/B7FxcD4.png",
	Question = "https://i.imgur.com/pIIJniP.png",
	Live = "https://i.imgur.com/0HVm46z.png",
	Reading = "https://i.imgur.com/5m10TTT.png",
	Writing = "https://i.imgur.com/Pa00qZh.png",
	Call = "https://i.imgur.com/y4YKRZG.png",
	Vcall = "https://i.imgur.com/6wG9ZvM.png",
	Downloading = "https://i.imgur.com/ryrDrz4.png",
	Uploading = "https://i.imgur.com/SwNDR5U.png",
	Repeat = "https://i.imgur.com/Ikh95KU.png",
	RepeatOne = "https://i.imgur.com/qkODaWg.png",
	Premiere = "https://i.imgur.com/Zf8FSUR.png",
	PremiereLive = "https://i.imgur.com/yC4j9Lg.png",
	Viewing = "https://i.imgur.com/fpZutq6.png",
}

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/eOauOMV.png",
		},
		pageTitle = document.querySelector("title").textContent.split(" | "),
		browsingTimestamp = Math.floor(Date.now() / 1000),
		route = document.location.pathname.split("/"),
		query = await parseQueryString(document.location.hash).search;

	if (document.location.pathname === "/") {
		presenceData.details = (await strings).browsing;
		presenceData.startTimestamp = browsingTimestamp;
	} else if (document.location.pathname.includes("/videos/")) {
		if (document.location.pathname.includes("/category/")) {
			presenceData.details = query
				? (await strings).searching
				: (await strings).browsing;
			const routes = [
				"humour",
				"malaise",
				"game",
				"musique",
				"insolite",
				"18",
				"18-gore",
				"18-insolite",
				"18-vr",
			];
			for (const r of routes) {
				if (route[3] === `${r}`) {
					presenceData.state = `${pageTitle[0]} - page ${
						route[4] ? route[5] : 1
					}`;
				}
			}
			presenceData.startTimestamp = browsingTimestamp;
		} else {
			const video: HTMLVideoElement = document.querySelector(
				".mejs-mediaelement > mediaelementwrapper > video"
			);
			[presenceData.details] = pageTitle;
			presenceData.smallImageKey = video.paused ? "pause" : "play";
			presenceData.smallImageText = video.paused
				? (await strings).pause
				: (await strings).play;
			[presenceData.startTimestamp, presenceData.endTimestamp] =
				presence.getTimestamps(
					Math.floor(video.currentTime),
					Math.floor(video.duration)
				);
			if (video.paused) {
				delete presenceData.startTimestamp;
				delete presenceData.endTimestamp;
			}
		}
	} else if (document.location.pathname.includes("/upload")) {
		[presenceData.details] = pageTitle;
		presenceData.smallImageKey = Assets.Uploading;
	} else {
		[presenceData.details] = pageTitle;
		presenceData.state = (await strings).reading;
		presenceData.startTimestamp = browsingTimestamp;
	}
	if (query) {
		presenceData.smallImageKey = Assets.Search;
		presenceData.smallImageText = (await strings).searching;
		presenceData.details = `${(await strings).searching} : ${query}`;
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
