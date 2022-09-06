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
			largeImageKey: "animeswatch",
			details: "Ana Sayfada Göz Gezdiriyor",
		},
		{ pathname } = document.location,
		title = document.title.slice(0, document.title.length - 14);

	switch (pathname.split("/")[1]) {
		case "":
			presenceData.details = "Ana Sayfada Göz Gezdiriyor";
			break;
		case "anime":
			presenceData.details = "Bir animeye bakıyor";
			presenceData.state = title;
			break;
		case "watch":
			presenceData.details = "Bir anime izleme sayfasında";
			presenceData.state = title;

			if (video) {
				presenceData.smallImageKey = video.paused ? "pause" : "play";
				presenceData.smallImageText = video.paused
					? (await strings).paused
					: (await strings).playing;
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
			presenceData.state = title;
			break;
		case "browse":
			presenceData.details = "Bir anime arıyor";
			presenceData.state = title;
			break;
		case "users":
			presenceData.details = "Bir kullanıcıya bakıyor";
			presenceData.state = title;
	}
	if (await presence.getSetting("timestamp"))
		presenceData.startTimestamp = browsingTimestamp;
	if (await presence.getSetting("button"))
		presenceData.buttons = [
			{ label: "Sayfaya Git", url: document.location.href },
			{ label: "Discord", url: "https://animeswatch.com/discord" },
		];

	presence.setActivity(presenceData);
});
