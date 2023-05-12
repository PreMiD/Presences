const presence = new Presence({
		clientId: "640969147911503910",
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
let user: HTMLElement;

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/fQZETmM.png",
	};

	if (document.location.hostname === "www.gamestar.de") {
		if (document.location.pathname === "/") {
			presenceData.startTimestamp = browsingTimestamp;
			presenceData.details = "Betrachtet die Startseite";
		} else if (document.location.pathname.includes("/artikel/")) {
			presenceData.startTimestamp = browsingTimestamp;
			user = document.querySelector(
				"#content > div:nth-child(3) > div > div > div.col-xs-12.div-article-title > div:nth-child(6) > div:nth-child(1) > h1"
			);
			presenceData.details = "Liest Artikel:";
			presenceData.state = user.textContent;
			presenceData.smallImageKey = Assets.Reading;
		} else if (document.location.pathname.includes("/videos/")) {
			const video: HTMLVideoElement = document.querySelector(
					"#playerID > div.jw-wrapper.jw-reset > div.jw-media.jw-reset > video"
				),
				title = document.querySelector(
					"#content > div:nth-child(3) > div > div > div > div:nth-child(3) > div > h1"
				).textContent;
			if (!isNaN(video.duration)) {
				presenceData.smallImageKey = video.paused ? "pause" : "play";
				presenceData.smallImageText = video.paused
					? (await strings).pause
					: (await strings).play;
				[presenceData.startTimestamp, presenceData.endTimestamp] =
					presence.getTimestamps(
						Math.floor(video.currentTime),
						Math.floor(video.duration)
					);

				[presenceData.details] = title.split("-");
				presenceData.state = title.replace(`${title.split("-")[0]}- `, "");

				if (video.paused) {
					delete presenceData.startTimestamp;
					delete presenceData.endTimestamp;
				}
			} else if (isNaN(video.duration)) {
				presenceData.startTimestamp = browsingTimestamp;
				presenceData.details = "Betrachtet:";
				presenceData.state = title;
			}
		}
	}

	if (!presenceData.details) {
		presenceData.startTimestamp = browsingTimestamp;
		presenceData.details = "Betrachtet Seite:";
		presenceData.state = document.querySelector("head > title").textContent;
		presence.setActivity(presenceData);
	} else presence.setActivity(presenceData);
});
