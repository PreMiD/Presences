const presence = new Presence({
		clientId: "872656825890254849",
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
	},
	Sub: string;
// Const thing
const browsingTimestamp = Math.floor(Date.now() / 1000),
	title =
		document.querySelector(".panel-heading")?.textContent ?? "ไม่ทราบชื่อ",
	titlemovie =
		document.querySelector(".panel-heading")?.textContent ??
		"ไม่ทราบชื่อเรื่อง",
	ep =
		document.querySelector(".panel-heading")?.textContent ?? "ไม่ทราบชื่อตอน",
	playvdo =
		document.querySelector(
			"body > div:nth-child(3) > div > div.col-lg-9 > div > div.panel-heading > h3"
		)?.textContent ?? "ไม่ทราบชื่อเรื่อง",
	path = document.location;

presence.on(
	"iFrameData",
	(data: { current: number; duration: number; paused: boolean }) => {
		video = data;
	}
);

presence.on("UpdateData", async () => {
	const [time, privacy, buttons] = await Promise.all([
			presence.getSetting<boolean>("timestamps"),
			presence.getSetting<boolean>("privacy"),
			presence.getSetting<boolean>("buttons"),
		]),
		presenceData: PresenceData = {
			largeImageKey:
				"https://cdn.rcd.gg/PreMiD/websites/A/Anime-D/assets/logo.jpg",
			startTimestamp: browsingTimestamp,
		};

	// Presence
	if (document.location.pathname === "/")
		presenceData.state = "อนิเมะอัพเดตล่าสุด";
	else if (path.pathname.includes("index.html"))
		presenceData.state = "อนิเมะอัพเดตล่าสุด";
	else if (path.pathname.includes("genre")) {
		presenceData.startTimestamp = browsingTimestamp;
		presenceData.details = "ประเภท ";
		presenceData.state = title;
	} else if (path.pathname.includes("catalog")) {
		presenceData.startTimestamp = browsingTimestamp;
		presenceData.details = "หมวดหมู่ ";
		presenceData.state = title;
	} else if (path.search.includes("search")) {
		presenceData.startTimestamp = browsingTimestamp;
		presenceData.details = "ค้นหา ";
		presenceData.state = title;
	} else if (path.pathname.includes("play")) {
		let episode, Movie;
		presenceData.startTimestamp = browsingTimestamp;
		if (playvdo.includes("ตอนที่")) {
			const info = playvdo.split("ตอนที่");
			episode = info.pop();

			if (episode.includes("ซับไทย"))
				episode = episode.replace((Sub = "ซับไทย"), "").trim();
			else if (episode.includes("พากย์ไทย"))
				episode = episode.replace((Sub = "พากย์ไทย"), "").trim();

			episode = `ตอนที่  ${episode} ${Sub}`;
			[presenceData.details] = info;
			presenceData.state = episode;
		} else if (
			titlemovie.includes(
				"The Movie" || "เดอะมูวี่" || "เดอะมูฟวี่" || "มูฟวี่"
			)
		) {
			const info = titlemovie.split("The Movie" || "พากย์ไทย");
			Movie = info.pop();
			if (Movie.includes("ซับไทย"))
				Movie = Movie.replace((Sub = "ซับไทย"), "").trim();
			else if (Movie.includes("พากย์ไทย"))
				Movie = Movie.replace((Sub = "พากย์ไทย"), "").trim();

			Movie = `เดอะมูวี่ ${Movie} ${Sub}`;
			[presenceData.details] = info;
			presenceData.state = Movie;
		} else {
			let info;
			if (ep.includes("ซับไทย")) info = ep.replace("ซับไทย", "").trim();
			else if (ep.includes("พากย์ไทย"))
				info = ep.replace("พากย์ไทย", "").trim();

			episode = "กำลังดู";
			presenceData.details = info;
			presenceData.state = episode;
		}
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
		}
		if (buttons) {
			presenceData.buttons = [
				{
					label: "ดูอนิเมะ",
					url: document.location.href.replace(/#\d+/, ""),
				},
			];
		}
	} else if (path.href) {
		delete presenceData.startTimestamp;
		presenceData.details = ep;
		presenceData.state = "เลือกตอน ";
	} else {
		delete presenceData.startTimestamp;
		delete presenceData.endTimestamp;
	}
	if (!time) {
		delete presenceData.startTimestamp;
		delete presenceData.endTimestamp;
	}
	if (privacy) {
		delete presenceData.details;
		delete presenceData.buttons;
	}
	if (!presenceData.state) presence.setActivity();
	else presence.setActivity(presenceData);
});
