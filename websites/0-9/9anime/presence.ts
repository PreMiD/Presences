const presence = new Presence({
		clientId: "934701636251680768",
	}),
	strings = presence.getStrings({
		play: "presence.playback.playing",
		pause: "presence.playback.paused",
		browsing: "presence.activity.browsing",
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
		largeImageKey: "9anime",
	};

	if (
		video &&
		!isNaN(video.duration) &&
		document.location.pathname.includes("/watch")
	) {
		const [startTimestamp, endTimestamp] = presence.getTimestamps(
				Math.floor(video.currentTime),
				Math.floor(video.duration)
			),
			coverArt = document.querySelector<HTMLImageElement>("#info img")?.src,
			showCover = await presence.getSetting<boolean>("cover");

		presenceData.details = document.querySelector(
			".film-name.dynamic-name"
		).textContent;
		presenceData.state = `Ep ${document
			.querySelector(".ep-item.active")
			.textContent.replace(/\D/g, "")}`;

		if (coverArt && showCover) presenceData.largeImageKey = coverArt;

		presenceData.smallImageKey = video.paused ? "pause" : "play";
		presenceData.smallImageText = video.paused
			? (await strings).pause
			: (await strings).play;
		presenceData.startTimestamp = startTimestamp;
		presenceData.endTimestamp = endTimestamp;

		if (video.paused) {
			delete presenceData.startTimestamp;
			delete presenceData.endTimestamp;
		}

		presence.setActivity(presenceData, !video.paused);
	} else {
		presenceData.details = (await strings).browsing;
		presenceData.smallImageKey = "search";
		presenceData.smallImageText = (await strings).browsing;
		presence.setActivity(presenceData);
	}
});
