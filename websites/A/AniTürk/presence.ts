const presence = new Presence({
		clientId: "708082807775428678",
	}),
	strings = presence.getStrings({
		playing: "general.playing",
		paused: "general.paused",
		browsing: "general.browsing",
	}),
	startTimestamp = Math.floor(Date.now() / 1000);

let video: IFrameData;

interface IFrameData {
	duration: number;
	paused: boolean;
	currentTime: number;
}

presence.on("iFrameData", async (data: IFrameData) => {
	if (!data) return;
	video = data;
});

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey:
				"https://cdn.rcd.gg/PreMiD/websites/A/AniT%C3%BCrk/assets/logo.png",
		},
		title = document.querySelector(
			"html > body > div.konter > a > div.icerik-bilgi"
		),
		episode = document.querySelector(
			"html > body > div.konter > div.icerik-baslik"
		);

	if (!title || !episode) video = null;

	//Episode part
	if (title && episode) {
		presenceData.details = title.textContent;
		presenceData.state = episode.textContent.replace(
			title.textContent.split(" ").slice(1).join(" "),
			""
		);
	} else {
		//Home page part
		presenceData.details = (await strings).browsing;
		presenceData.startTimestamp = startTimestamp;
	}

	if (video) {
		presenceData.smallImageKey = video.paused ? Assets.Pause : Assets.Play;
		presenceData.smallImageText = video.paused
			? (await strings).paused
			: (await strings).playing;

		if (!video.paused && video.duration) {
			[presenceData.startTimestamp, presenceData.endTimestamp] =
				presence.getTimestamps(
					Math.floor(video.currentTime),
					Math.floor(video.duration)
				);
		}
	}

	presence.setActivity(presenceData);
});
