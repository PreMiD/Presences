const presence = new Presence({
	clientId: "719757905888542730",
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

let actionTimestamp: number = null;

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/1h1N9Rp.png",
	};

	if (location.hostname === "app.gitbook.com") {
		// In dashboard?
		if (document.querySelector("[class*=--dashboardBody-")) {
			const dashName = document.querySelector(
				"[class*=--dashboardMenu-] [class*=--headerText-]"
			);
			presenceData.details = dashName
				? `In ${dashName.textContent}'s Dashboard`
				: "In a Dashboard";
			actionTimestamp = null;
		} else {
			presenceData.smallImageKey = Assets.Writing;
			presenceData.smallImageText = "Editing";

			const docName = document.querySelector("[class*='logoText-'] span"),
				pageName = document.querySelector("[class*=--navButtonOpened-] span");

			actionTimestamp ??= Date.now();
			if (docName) presenceData.details = `Editing ${docName.textContent}`;
			if (pageName) presenceData.state = `on ${pageName.textContent}`;
			presenceData.startTimestamp = actionTimestamp;
		}
	} else {
		presenceData.smallImageKey = Assets.Reading;
		presenceData.smallImageText = "Viewing";

		const docName = document.querySelector("[class*='logoText-'] span"),
			pageName = document.querySelector("[class*=--navButtonOpened-] span");

		actionTimestamp ??= Date.now();
		if (docName) presenceData.details = `Viewing ${docName.textContent}`;
		if (pageName) presenceData.state = `on ${pageName.textContent}`;
		presenceData.startTimestamp = actionTimestamp;
	}

	// If data doesn't exist clear else set activity to the presence data
	if (!presenceData.details) {
		// Clear tray
		presence.setActivity(); // Clear activity
	} else presence.setActivity(presenceData);
});
