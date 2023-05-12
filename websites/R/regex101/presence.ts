const presence = new Presence({
		clientId: "959518817573302323",
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

presence.on("UpdateData", () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/ZSHQyex.png",
			startTimestamp: browsingTimestamp,
		},
		{ pathname } = location;

	if (pathname === "/" || pathname.startsWith("/r/")) {
		const regexLine = document.querySelector(".CodeMirror-line");
		presenceData.details = "Testing a regex";
		if (!regexLine.querySelector("[cm-text]")) {
			presenceData.state = `/${regexLine.textContent}${
				document.querySelector('[aria-label="Set Regex Options"').textContent
			}`;
		} else presenceData.details = "Browsing the home page";
	} else {
		switch (pathname) {
			case "/library": {
				presenceData.details = "Searching the library";
				presenceData.state =
					document.querySelector<HTMLInputElement>(
						"header ~ div:nth-of-type(2) h2 + label input"
					).value || null;
				break;
			}
			case "/account/mine": {
				presenceData.details = "Viewing their regexes";
				break;
			}
			case "/account/favorites": {
				presenceData.details = "Viewing their favorites";
				break;
			}
			case "/account/library": {
				presenceData.details = "Viewing their library entries";
				break;
			}
			case "/quiz": {
				presenceData.details = "Viewing the regex quiz";
				break;
			}
			default:
				if (pathname.startsWith("/quiz/")) {
					presenceData.details = "Taking regex quiz";
					presenceData.state = document.querySelector(
						"header ~ div:nth-of-type(2) > div > div:nth-of-type(2) h2"
					).textContent;
				} else if (pathname === "/settings")
					presenceData.details = "Viewing settings";
		}
	}

	presence.setActivity(presenceData);
});
