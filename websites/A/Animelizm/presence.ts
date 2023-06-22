const presence = new Presence({
		clientId: "715536733227450379",
	}),
	strings = presence.getStrings({
		play: "general.playing",
		pause: "general.paused",
		browsing: "general.browsing",
	});

let video = {
	current: 0,
	duration: 0,
	paused: true,
};

presence.on(
	"iFrameData",
	(data: { current: number; duration: number; paused: boolean }) => {
		video = data;
	}
);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey:
			"https://cdn.rcd.gg/PreMiD/websites/A/Animelizm/assets/logo.png",
	};

	if (isNaN(video.duration) || video.duration <= 0) {
		presenceData.details = "Browsing...";

		return presence.setActivity(presenceData);
	}

	const Info = document.querySelector(".ez-detail-title").textContent;
	let episode;

	if (Info.includes("ตอนที่")) {
		const info = Info.split("ตอนที่");
		episode = info.pop();

		if (episode.includes("ซับไทย"))
			episode = episode.replace("ซับไทย", "").trim();
		else if (episode.includes("พากย์ไทย"))
			episode = episode.replace("พากย์ไทย", "").trim();

		episode = `ตอนที่ ${episode}`;
		presenceData.state = episode;
		[presenceData.details] = info;
	} else presenceData.details = Info;

	presenceData.smallImageKey = video.paused ? Assets.Pause : Assets.Play;
	presenceData.smallImageText = video.paused
		? (await strings).pause
		: (await strings).play;

	if (!video.paused) {
		[presenceData.startTimestamp, presenceData.endTimestamp] =
			presence.getTimestamps(
				Math.floor(video.current),
				Math.floor(video.duration)
			);
	} else {
		delete presenceData.startTimestamp;
		delete presenceData.endTimestamp;
	}

	presence.setActivity(presenceData);
});
