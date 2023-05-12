const presence = new Presence({
		clientId: "709308577701036074",
	}),
	strings = presence.getStrings({
		play: "general.playing",
		pause: "general.paused",
		browsing: "general.browsing",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000),
	title1 =
		document.querySelector(
			"body > div:nth-child(3) > div > div.col-lg-9 > div > div.panel-heading > h3"
		)?.textContent ?? "ไม่ทราบชื่อ",
	ep1 =
		document.querySelector(
			"body > div:nth-child(3) > div > div.col-lg-9 > div > div.panel-body > center:nth-child(2) > h3"
		)?.textContent ?? "ไม่ทราบชื่อตอน",
	path = document.location;

let video = {
	current: 0,
	duration: 0,
	paused: true,
};

enum Assets {
	Play = "https://i.imgur.com/q57RJjs.png",
	Pause = "https://i.imgur.com/mcEXiZk.png",
	Stop = "https://i.imgur.com/aLYu3Af.png",
	Search = "https://i.imgur.com/B7FxcD4.png",
	Question = "https://i.imgur.com/pIIJniP.png",
	Live = "https://i.imgur.com/0HVm46z.png",
	Reading = "https://i.imgur.com/5m10TTT.png",
	Writing = "https://i.imgur.com/Pa00qZh.png",
	Call = "https://i.imgur.com/y4YKRZG.png",
	Vcall = "https://i.imgur.com/6wG9ZvM.png",
	Downloading = "https://i.imgur.com/ryrDrz4.png",
	Uploading = "https://i.imgur.com/SwNDR5U.png",
	Repeat = "https://i.imgur.com/Ikh95KU.png",
	RepeatOne = "https://i.imgur.com/qkODaWg.png",
	Premiere = "https://i.imgur.com/Zf8FSUR.png",
	PremiereLive = "https://i.imgur.com/yC4j9Lg.png",
	Viewing = "https://i.imgur.com/fpZutq6.png",
}

presence.on(
	"iFrameData",
	(data: { current: number; duration: number; paused: boolean }) => {
		video = data;
	}
);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/DfHT5E8.png",
	};

	// Presence
	if (path.hostname === "anime-sugoi.com" || path.hostname.includes("www.")) {
		if (document.location.pathname === "/") {
			presenceData.startTimestamp = browsingTimestamp;
			presenceData.details = "อนิเมะอัพเดตล่าสุด";
		} else if (path.pathname.includes("index.html")) {
			presenceData.startTimestamp = browsingTimestamp;
			presenceData.details = "อนิเมะอัพเดตล่าสุด";
		} else if (path.pathname.includes("catalog")) {
			presenceData.startTimestamp = browsingTimestamp;
			presenceData.details = "หมวดหมู่ ";
			presenceData.state = title1;
		} else if (path.pathname.includes("tag")) {
			presenceData.startTimestamp = browsingTimestamp;
			presenceData.details = "หมวดหมู่ ";
			presenceData.state = title1;
		} else if (path.search.includes("search")) {
			presenceData.startTimestamp = browsingTimestamp;
			presenceData.details = "ค้นหา ";
			presenceData.state = title1;
		} else if (path.pathname.includes("play")) {
			let episode;
			if (title1.includes("ตอนที่")) {
				const info = title1.split("ตอนที่");
				episode = info.pop();

				if (episode.includes("ซับไทย"))
					episode = episode.replace("ซับไทย", "").trim();
				else if (episode.includes("พากย์ไทย"))
					episode = episode.replace("พากย์ไทย", "").trim();

				episode = `ตอนที่ ${episode}`;
				[presenceData.state] = info;
				presenceData.details = episode;
			} else {
				let info;
				if (title1.includes("ซับไทย"))
					info = title1.replace("ซับไทย", "").trim();
				else if (title1.includes("พากย์ไทย"))
					info = title1.replace("พากย์ไทย", "").trim();

				episode = "Movie";
				presenceData.state = info;
				presenceData.details = episode;
			}

			presenceData.smallImageKey = video.paused ? "pause" : "playing";
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
		} else if (path.href) {
			presenceData.startTimestamp = browsingTimestamp;
			presenceData.details = "เลือกตอน ";
			presenceData.state = ep1;
		} else {
			delete presenceData.startTimestamp;
			delete presenceData.endTimestamp;
		}
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
