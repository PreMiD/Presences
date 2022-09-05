const presence = new Presence({
		clientId: "972647321970016316",
	}),
	strings = presence.getStrings({
		playing: "general.playing",
		paused: "general.paused",
		browsing: "general.browsing",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

let video: HTMLVideoElement;

presence.on("iFrameData", async (msg: HTMLVideoElement) => {
	if (!msg) return;
	video = msg;
});

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "animeswatch",
		details: "Ana Sayfada Göz Gezdiriyor",
		startTimestamp: browsingTimestamp,
	};
	if (document.location.pathname === "/") {
		presenceData.details = "Ana Sayfada";
		presenceData.state = "Anime Arıyor";
	} else if (document.location.pathname.includes("/browse")) {
		presenceData.details = "Keşfet ";
		presenceData.state = "Animelere Göz Gezdiriyor";
	} else if (document.location.pathname.includes("/team")) {
		presenceData.details = "Ekibimiz";
		presenceData.state = "Ekibimiz Hakkında Bilgi Ediniyor";
	} else if (document.location.pathname.includes("/anime")) {
		presenceData.details = document.title.slice(0, document.title.length - 14);
		presenceData.state = "Animenin Detaylarını İnceliyor";
	}
	if (video) {
		presenceData.smallImageKey = video.paused ? "pause" : "play";
		presenceData.smallImageText = video.paused
			? (await strings).paused
			: (await strings).playing;
		presenceData.state = "Anime İzliyor";
		presenceData.details = document.title.slice(0, document.title.length - 14);
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
