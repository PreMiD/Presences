const presence = new Presence({
	clientId: "934701636251680768",
});

let video = {
	duration: 0,
	currentTime: 0,
	paused: true,
};

presence.on(
	"iFrameData",
	(data: { duration: number; currentTime: number; paused: boolean }) => {
		video = data;
	}
);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/jPl7EfZ.png",
		},
		[showCover, timestamps, joinButton] = await Promise.all([
			presence.getSetting<boolean>("cover"),
			presence.getSetting<boolean>("timestamps"),
			presence.getSetting<boolean>("watch2getherJoinRoomButton"),
		]);

	if (
		video &&
		!isNaN(video.duration) &&
		document.location.pathname.includes("/watch/")
	) {
		const [startTimestamp, endTimestamp] = presence.getTimestamps(
				Math.floor(video.currentTime),
				Math.floor(video.duration)
			),
			coverArt = document.querySelector<HTMLImageElement>("#w-info img")?.src,
			seasonNumber = document.querySelector(".seasons.swiper-wrapper")
				? String(
						Array.from(
							document.querySelector(".seasons.swiper-wrapper").children
						).findIndex(x => x.className.includes(" active")) + 1
				  )
				: "",
			episodeNumber = document.querySelector(
				"#w-servers .tip > div > b"
			).textContent,
			episodeName = document.querySelector(
				"li > a.active > .d-title"
			)?.textContent;

		presenceData.details = document.querySelector("#w-info .title").textContent;
		presenceData.state = document
			.querySelector<HTMLAnchorElement>(".bmeta > .meta a")
			.href.endsWith("movie")
			? "Movie"
			: seasonNumber
			? `S${seasonNumber}:E${episodeNumber.match(/[1-9]{1}[0-9]{0,}/)[0]} ${
					episodeName ?? episodeNumber
			  }`
			: `${episodeNumber}${
					!episodeName || episodeName === episodeNumber
						? ""
						: ` • ${episodeName}`
			  }`;

		if (coverArt && showCover) presenceData.largeImageKey = coverArt;

		presenceData.smallImageKey = video.paused ? "pause" : "play";
		presenceData.smallImageText = video.paused ? "Paused" : "Playing";
		if (timestamps) {
			presenceData.startTimestamp = startTimestamp;
			presenceData.endTimestamp = endTimestamp;
		}

		if (video.paused) {
			delete presenceData.startTimestamp;
			delete presenceData.endTimestamp;
		}
	} else if (document.location.pathname.includes("/watch2gether/room/")) {
		const [startTimestamp, endTimestamp] = presence.getTimestamps(
				Math.floor(video.currentTime),
				Math.floor(video.duration)
			),
			coverArt =
				document.querySelector<HTMLImageElement>(".anime-info img")?.src;

		presenceData.details = "In a watch2gether room, watching";
		presenceData.state = `${
			document.querySelector(".name.d-title").textContent
		} • ${document.querySelector(".dot.ep").textContent}`;

		if (coverArt && showCover) presenceData.largeImageKey = coverArt;

		presenceData.smallImageKey = video.paused ? "pause" : "play";
		presenceData.smallImageText = video.paused ? "Paused" : "Playing";
		if (timestamps) {
			presenceData.startTimestamp = startTimestamp;
			presenceData.endTimestamp = endTimestamp;
		}

		if (video.paused) {
			delete presenceData.startTimestamp;
			delete presenceData.endTimestamp;
		}

		if (joinButton) {
			presenceData.buttons = [
				{
					label: "Join Room",
					url: location.href,
				},
			];
		}
	} else {
		presenceData.details = "Browsing...";
		presenceData.smallImageKey = "search";
	}

	presence.setActivity(presenceData);
});
