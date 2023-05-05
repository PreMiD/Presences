const presence = new Presence({
		clientId: "1103408220921397349",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

function getTimestamps(videoTime: number, videoDuration: number): number[] {
	const startTime = Date.now();
	return [
		Math.floor(startTime / 1000),
		Math.floor(startTime / 1000) - videoTime + videoDuration,
	];
}

const getVideoStatus = (
	presenceData: PresenceData,
	video: HTMLVideoElement
) => {
	if (video.paused) {
		presenceData.smallImageKey = "paused";
		presenceData.smallImageText = "paused";
		delete presenceData.startTimestamp;
	} else {
		const [startTimestamp, endTimestamp] = getTimestamps(
			Math.floor(video.currentTime),
			Math.floor(video.duration)
		);
		presenceData.startTimestamp = startTimestamp;
		presenceData.endTimestamp = endTimestamp;
		presenceData.smallImageKey = "playing";
		presenceData.smallImageText = "playing";
	}
	return presenceData;
};

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/H9fXid0.png",
		startTimestamp: browsingTimestamp,
	};

	if (document.location.pathname === "/")
		presenceData.details = "Browsing home page";
	else if (document.location.pathname === "/movies")
		presenceData.details = "Browsing movies";
	else if (document.location.pathname.includes("/movies/details")) {
		const currentPresenceData = getVideoStatus(
			presenceData,
			document.querySelector<HTMLVideoElement>(
				"div.playerContainer > div > video"
			)
		);
		currentPresenceData.details = "Watching";
		currentPresenceData.state = document.querySelector<HTMLElement>(
			"div.movieDetailContainer > div > div > div > div.metaDataDiv > div.consumptionMetaDiv > div > h1 "
		).textContent;
	} else if (document.location.pathname.includes("tv-shows/details")) {
		const currentPresenceData = getVideoStatus(
			presenceData,
			document.querySelector<HTMLVideoElement>(
				"div.playerContainer > div >video"
			)
		);
		currentPresenceData.details = "Watching";
		currentPresenceData.state = document.querySelector<HTMLElement>(
			"div.episodeDetailContainer > div > div > div > div.metaDataDiv > div.consumptionMetaDiv >  div  > h1 "
		).textContent;
	} else if (document.location.pathname.includes("web-series/details")) {
		const currentPresenceData = getVideoStatus(
			presenceData,
			document.querySelector<HTMLVideoElement>(
				"div.playerContainer > div >video"
			)
		);
		currentPresenceData.details = `Watching ${
			document.querySelector<HTMLElement>(
				" div > div > div > div.metaDataDiv > div.consumptionMetaDiv >  a  > h2 "
			).textContent
		}`;
		currentPresenceData.state = `${
			document.querySelector<HTMLElement>(
				" div > div > div > div.metaDataDiv > div.consumptionMetaDiv >  div  > h1 "
			).textContent
		} ${
			document.querySelector<HTMLElement>(
				" div > div > div > div.metaDataDiv > div.consumptionMetaDiv >  div  > p "
			).textContent
		}`;
	} else if (document.location.pathname === "tv-shows")
		presenceData.details = "Browsing Tv shows";
	else if (document.location.pathname.includes("/premium"))
		presenceData.details = "Browsing premium";
	else if (document.location.pathname.includes("/web-series"))
		presenceData.details = "Browsing web series";
	else if (document.location.pathname.includes("/news"))
		presenceData.details = "Browsing news";
	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
