const presence = new Presence({
		clientId: "641969062083035146",
	}),
	strings = presence.getStrings({
		play: "general.playing",
		pause: "general.paused",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

enum Assets {
	Play = "https://i.imgur.com/q57RJjs.png",
	Pause = "https://i.imgur.com/mcEXiZk.png",
	Stop = "https://i.imgur.com/aLYu3Af.png",
	Search = "https://i.imgur.com/B7FxcD4.png",
	Question = "https://i.imgur.com/pIIJniP.png",
	Live = "https://i.imgur.com/0HVm46z.png",
	Reading = "https://i.imgur.com/5m10TTT.png",
	Writing = "https://i.imgur.com/Pa00qZh.png",
	Call = "https://i.imgur.com/PFdbnIf.png",
	Vcall = "https://i.imgur.com/6wG9ZvM.png",
	Downloading = "https://i.imgur.com/ryrDrz4.png",
	Uploading = "https://i.imgur.com/SwNDR5U.png",
	Repeat = "https://i.imgur.com/Ikh95KU.png",
	RepeatOne = "https://i.imgur.com/wh885z3.png",
	Premiere = "https://i.imgur.com/Zf8FSUR.png",
	PremiereLive = "https://i.imgur.com/yC4j9Lg.png",
	Viewing = "https://i.imgur.com/fpZutq6.png",
}

let user: string,
	title: string,
	currentTime: number,
	duration: number,
	paused: boolean,
	startTimestamp: number,
	endTimestamp: number;

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/iHYxLW2.png",
	};

	if (
		document.location.pathname === "/" ||
		document.location.pathname === "/index"
	) {
		presenceData.startTimestamp = browsingTimestamp;
		presenceData.details = "צופה בדף הבית";
	} else if (document.location.pathname === "/series") {
		presenceData.startTimestamp = browsingTimestamp;
		presenceData.details = "צופה ברשימת הסדרות";
	} else if (document.location.pathname.includes("/watch/")) {
		const video =
			document.querySelector<HTMLVideoElement>("#playerDiv > div > video") ??
			document.querySelector("#videojs_html5_api");

		title = document.querySelector(
			"#watchEpisode > div.poster > div > h1"
		).textContent;
		user = document.querySelector("#player > div.head > p").textContent;
		if (user.includes(" - ")) [, user] = user.split(" - ");

		if (video) {
			({ currentTime, duration, paused } = video);
			[startTimestamp, endTimestamp] = presence.getTimestamps(
				Math.floor(currentTime),
				Math.floor(duration)
			);
		}

		if (!isNaN(duration)) {
			presenceData.smallImageKey = paused ? "pause" : "play";
			presenceData.smallImageText = paused
				? (await strings).pause
				: (await strings).play;
			presenceData.startTimestamp = startTimestamp;
			presenceData.endTimestamp = endTimestamp;

			presenceData.details = title;
			presenceData.state = user;

			if (paused) {
				delete presenceData.startTimestamp;
				delete presenceData.endTimestamp;
			}
		} else if (isNaN(duration)) {
			presenceData.startTimestamp = browsingTimestamp;
			presenceData.details = ":צופה ב";
			presenceData.state = `${title} - ${user}`;
		}
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
