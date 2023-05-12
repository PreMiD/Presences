const presence = new Presence({
		clientId: "653372675166568481",
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
	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/2yPwE4a.png",
		startTimestamp: browsingTimestamp,
	};

	if (document.location.hostname === "carl.gg") {
		if (document.location.pathname.startsWith("/dashboard/")) {
			presenceData.details = "Managing the settings of:";
			presenceData.state = document
				.querySelector(
					"body > div.app > header > ul.navbar-nav.ml-auto.d-none.d-sm-inline-block > div > div"
				)
				.textContent.split("Jump to")[0]
				.trim();
		} else if (document.location.pathname.startsWith("/servers")) {
			presenceData.details = "Browsing through";
			presenceData.state = "servers";
		} else if (document.location.pathname.startsWith("/status")) {
			presenceData.details = "Viewing a page:";
			presenceData.state = "Carl-bot Status";
		}
	}

	if (document.location.hostname === "docs.carl.gg") {
		presenceData.smallImageKey = Assets.Reading;
		presenceData.details = "Documentation";

		presenceData.state = document.querySelector("h1").textContent;
	}

	presence.setActivity(presenceData);
});
