const presence = new Presence({
		clientId: "639616115873546261",
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
let user: HTMLElement,
	title: HTMLElement,
	replace: HTMLElement,
	playing: string;

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/fEecbHy.png",
	};

	if (document.location.hostname === "www.rockradio.com") {
		if (document.location.pathname === "/") {
			presenceData.startTimestamp = browsingTimestamp;
			presenceData.details = "Browsing...";
		} else if (
			document.querySelector(
				"#now-playing > div.info-container > div.progress-container > div > span > span > span.total"
			) !== null
		) {
			user = document.querySelector(
				"#now-playing > div.info-container > div.progress-container > div > span > span > span.remain"
			);
			title = document.querySelector(
				"#now-playing > div.info-container > div.title-container > div > span > span.artist-name"
			);
			replace = document.querySelector(
				"#now-playing > div.info-container > div.title-container > div > span > span.track-name"
			);
			presenceData.details = title.textContent + replace.textContent;
			presenceData.state = `${user.textContent.replace("-", "")} left`;
			playing =
				document.querySelector("#play-button > div > a").className ===
				"ico icon-pause"
					? "play"
					: "pause";
			presenceData.smallImageKey = playing;
		} else if (document.querySelector("#channel-title")) {
			title = document.querySelector("#channel-title");
			presenceData.startTimestamp = browsingTimestamp;
			presenceData.details = "Viewing channel:";
			presenceData.state = title.textContent;
		}
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
