const presence = new Presence({
		clientId: "972647321970016316",
	}),
	getStrings = async () =>
		presence.getStrings(
			{
				playing: "general.playing",
				paused: "general.paused",
			},
			await presence.getSetting<string>("lang").catch(() => "tr")
		),
	browsingTimestamp = Math.floor(Date.now() / 1000);

let video: HTMLVideoElement, strings: Awaited<ReturnType<typeof getStrings>>;

presence.on("iFrameData", async (msg: HTMLVideoElement) => {
	if (!msg) return;
	video = msg;
});

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/T1Vk10O.png",
			details: "Ana Sayfada Göz Gezdiriyor",
			startTimestamp: browsingTimestamp,
		},
		{ pathname } = document.location,
		timestamp = await presence.getSetting<boolean>("button");

	presenceData.state = document.title.slice(0, document.title.length - 35);
	switch (pathname.split("/")[1]) {
		case "":
			presenceData.details = "Ana Sayfada Göz Gezdiriyor";
			break;
		case "anime":
			presenceData.details = "Bir animeye bakıyor";
			break;
		case "watch":
			presenceData.details = "Bir anime izleme sayfasında";
			if (video?.duration) {
				presenceData.smallImageKey = video.paused ? "pause" : "play";
				presenceData.smallImageText = video.paused
					? strings.paused
					: strings.playing;
				presenceData.details = "Anime izliyor";
				if (!video.paused && video.duration) {
					[presenceData.startTimestamp, presenceData.endTimestamp] =
						presence.getTimestamps(
							Math.floor(video.currentTime),
							Math.floor(video.duration)
						);
				}
			}
			break;
		case "team":
			presenceData.details = "Takım sayfasında";
			break;
		case "browse":
			presenceData.details = "Bir anime arıyor";
			break;
		case "users":
			presenceData.details = "Bir kullanıcıya bakıyor";
			break;
	}
	if (!timestamp) delete presenceData.startTimestamp;
	presence.setActivity(presenceData);
});
