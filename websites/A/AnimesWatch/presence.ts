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

	if (pathname === "/") {
		presenceData.details = "Ana Sayfada";
		presenceData.state = "Anime Arıyor";
	} else if (pathname.includes("/browse")) {
		presenceData.details = "Keşfet ";
		presenceData.state = "Animelere Göz Gezdiriyor";
	} else if (pathname.includes("/team")) {
		presenceData.details = "Ekibimiz";
		presenceData.state = "Ekibimiz Hakkında Bilgi Ediniyor";
	} else if (pathname.includes("/anime")) {
		presenceData.details = title;
		presenceData.state = "Animenin Detaylarını İnceliyor";
	} else if (pathname.includes("/users")) {
		presenceData.details = "Profil Sayfasında";
		presenceData.state = title + " kullanıcısının profilinde";
	} else if (pathname.includes("/watch")) {
		presenceData.details = title;
		presenceData.state = "Anime izleme sayfasında";

		if (video) {
			presenceData.smallImageKey = video.paused ? "pause" : "play";
			presenceData.smallImageText = video.paused
				? (await strings).paused
				: (await strings).playing;
			presenceData.state = "Anime İzliyor";
			if (!video.paused && video.duration) {
				[presenceData.startTimestamp, presenceData.endTimestamp] =
					presence.getTimestamps(
						Math.floor(video.currentTime),
						Math.floor(video.duration)
					);
			}
		}
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
