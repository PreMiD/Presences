const presence = new Presence({
	clientId: "777530802887983124",
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

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/OiPOkMA.png",
		},
		podcastTitle =
			document.querySelectorAll(".Ut8Gr").length > 0 &&
			document.querySelectorAll(".Ut8Gr")[1].textContent;

	if (podcastTitle) {
		presenceData.details = (
			document.querySelector(".GmW3rb > .BhVIWc") as HTMLImageElement
		).alt;
		presenceData.state = podcastTitle;

		const isPaused =
			(document.querySelector(".DPvwYc.ERYGad") as HTMLSpanElement).style
				.display !== "none";
		presenceData.smallImageKey = isPaused ? "pause" : "play";
		if (!isPaused) {
			presenceData.smallImageKey = Assets.Play;
			const ts = Math.round(Date.now() / 1000),
				elapsedSeconds = parseLength(
					document.querySelector(".oG0wpe").children[0].textContent
				);
			presenceData.startTimestamp = ts - elapsedSeconds;
			presenceData.endTimestamp =
				ts +
				parseLength(document.querySelector(".oG0wpe").children[1].textContent) -
				elapsedSeconds;
		}
	} else if (document.location.pathname === "/")
		presenceData.details = "Browsing podcasts";
	else if (document.location.pathname.includes("feed/")) {
		presenceData.details = "Viewing podcast";
		// It's quite tricky to locate the right podcast title because
		// website makes new element for each of them
		for (const element of document.querySelectorAll(".dbCu3e")) {
			if (element.children[0].textContent === document.title)
				presenceData.state = `${document.title} by ${element.children[1].textContent}`;
		}
	} else if (document.location.pathname.includes("/subscriptions"))
		presenceData.details = "Browsing subscriptions";
	else if (document.location.pathname.includes("/queue"))
		presenceData.details = "Browsing queue";
	else if (document.location.pathname.includes("/subscribe-by-rss-feed"))
		presenceData.details = "Subscribing by RSS feed";
	else if (document.location.pathname.includes("/settings"))
		presenceData.details = "Browsing settings";
	else if (document.location.pathname.includes("search/")) {
		presenceData.details = "Searching for podcast";
		presenceData.state = document.location.pathname.replace("/search/", "");
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});

// Function that convert lengths like 01:13 to seconds like 73
function parseLength(length: string) {
	let result = 0;
	for (const [i, element] of length.split(":").reverse().entries())
		if (!isNaN(Number(element))) result += Number(element) * Math.pow(60, i);

	return result;
}
