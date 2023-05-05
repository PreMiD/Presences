const presence = new Presence({
		clientId: "1103408220921397349",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

enum Assets {
	Logo = "https://i.imgur.com/H9fXid0.png",
	Paused = "paused",
	Playing = "playing",
}

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
		presenceData.smallImageKey = Assets.Paused;
		presenceData.smallImageText = Assets.Paused;
		delete presenceData.startTimestamp;
	} else {
		const [startTimestamp, endTimestamp] = getTimestamps(
			Math.floor(video.currentTime),
			Math.floor(video.duration)
		);
		presenceData.startTimestamp = startTimestamp;
		presenceData.endTimestamp = endTimestamp;
		presenceData.smallImageKey = Assets.Playing;
		presenceData.smallImageText = Assets.Playing;
	}
	return presenceData;
};

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: Assets.Logo,
			startTimestamp: browsingTimestamp,
		},
		{ pathname } = document.location;

	if (pathname === "/") presenceData.details = "Browsing home page";
	else if (pathname === "/movies") presenceData.details = "Browsing movies";
	else if (pathname.includes("/movies/details")) {
		const currentPresenceData = getVideoStatus(
			presenceData,
			document.querySelector<HTMLVideoElement>("video")
		);
		currentPresenceData.details = "Watching";
		currentPresenceData.state = document.querySelector(
			"div.consumptionMetaDiv > div > h1"
		).textContent;
	} else if (pathname.includes("tv-shows/details")) {
		const currentPresenceData = getVideoStatus(
			presenceData,
			document.querySelector<HTMLVideoElement>("video")
		);
		currentPresenceData.details = `Watching ${
			document.querySelector("div.consumptionMetaDiv >  a  > h2").textContent
		}`;
		currentPresenceData.state = `${
			document.querySelector("div.consumptionMetaDiv >  div  > h1").textContent
		} ${
			document.querySelector("div.consumptionMetaDiv >  div  > p").textContent
		}`;
	} else if (pathname.includes("web-series/details")) {
		const currentPresenceData = getVideoStatus(
			presenceData,
			document.querySelector<HTMLVideoElement>("video")
		);
		currentPresenceData.details = `Watching ${
			document.querySelector("div.consumptionMetaDiv >  a  > h2").textContent
		}`;
		currentPresenceData.state = `${
			document.querySelector("div.consumptionMetaDiv >  div  > h1").textContent
		} ${
			document.querySelector("div.consumptionMetaDiv >  div  > p").textContent
		}`;
	} else if (pathname === "tv-shows")
		presenceData.details = "Browsing Tv shows";
	else if (pathname.includes("/premium"))
		presenceData.details = "Browsing premium";
	else if (pathname.includes("/web-series"))
		presenceData.details = "Browsing web series";
	else if (pathname.includes("/news")) presenceData.details = "Browsing news";
	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
