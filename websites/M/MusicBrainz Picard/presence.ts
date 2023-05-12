const presence = new Presence({
		clientId: "1017593958546821160",
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

presence.on("UpdateData", () => {
	const presenseData: PresenceData = {
			largeImageKey: "https://i.imgur.com/hkrB6W8.png",
			startTimestamp: browsingTimestamp,
		},
		{ hostname, pathname } = window.location;
	switch (hostname) {
		case "picard.musicbrainz.org": {
			presenseData.details = "Browsing...";
			switch (pathname.split("/")[1]) {
				case "": {
					presenseData.state = "Home page";
					break;
				}
				case "docs": {
					presenseData.details = "Browsing documentation";
					presenseData.state = document.querySelector("h1").textContent;
					break;
				}
				default: {
					presenseData.state = document.title.match(
						/(.*?)( - MusicBrainz Picard$|$)/
					)[1];
				}
			}
			break;
		}
		case "picard-docs.musicbrainz.org": {
			presenseData.details = "Browsing documentation...";
			if (pathname.match(/^(?:\/v[\d.]+)?\/[a-z]{2}\/(.*)/)[1] === "index.html")
				presenseData.state = "Home page";
			else {
				const { textContent } = document.querySelector("h1");
				presenseData.state = textContent.substring(0, textContent.length - 1);
			}
			break;
		}
	}
	presence.setActivity(presenseData);
});
