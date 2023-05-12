const presence = new Presence({
	clientId: "645051733961211934",
});

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

let elapsed: number, oldURL: string;

presence.on("UpdateData", async () => {
	if (window.location.href !== oldURL) {
		oldURL = window.location.href;
		elapsed = Math.floor(Date.now() / 1000);
	}

	const { title } = document,
		presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/gRExMjS.png",
			startTimestamp: elapsed,
		};

	if (
		document.location.pathname.includes("/gallery/") ||
		document.location.pathname.includes("/story/")
	) {
		presenceData.details = "Reading: ";
		presenceData.state = title.replace(" | WIRED", "");
	} else if (document.location.pathname.includes("/video/watch/")) {
		presenceData.details = "Watching: ";
		presenceData.state = title.replace(" | WIRED Video | CNE", "");
	} else {
		presenceData.details = "Browsing: ";
		presenceData.state = title.replace(" | WIRED", "");
	}

	presence.setActivity(presenceData);
});
