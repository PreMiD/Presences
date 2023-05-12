const presence = new Presence({
		clientId: "925643552208355378",
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

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/nwBDM8Q.png",
			startTimestamp: browsingTimestamp,
		},
		path = document.location.pathname;
	if (path.startsWith("/mail")) {
		if (
			document.querySelector<HTMLDivElement>(
				"#ReadingPaneContainerId > div > div > div > div:nth-child(1) > div._3Ot6xv41uIO58lh-I36wdt > div:nth-child(1) > div > div._1LtJxmUY1w2weHRM-NvCf9 > div"
			) ||
			path.includes("compose")
		)
			presenceData.details = "Composing an email";
		else if (path.includes("id")) {
			presenceData.details = "Reading an email";
			if (await presence.getSetting<boolean>("title")) {
				presenceData.state = document.querySelector<HTMLSpanElement>(
					"#ReadingPaneContainerId div._2bnn4NUZa-NanNIO4GItP0.allowTextSelection._3FNHkYLZYD6Y3-QNc7ZBo2 > span"
				).textContent;
			}
		} else if (path.includes("inbox")) presenceData.details = "Viewing inbox";
		else if (path.includes("archive")) presenceData.details = "Viewing archive";
		else if (path.includes("junkemail"))
			presenceData.details = "Viewing junk emails";
		else if (path.includes("drafts")) presenceData.details = "Viewing drafts";
		else if (path.includes("sentitems"))
			presenceData.details = "Viewing sent emails";
		else if (path.includes("conversationhistory"))
			presenceData.details = "Viewing conversation history";
		else presenceData.details = "Browsing emails";
	} else if (path.startsWith("/calendar"))
		presenceData.details = "Viewing calendar";
	else if (path.startsWith("/files")) presenceData.details = "Browsing files";
	else if (path.startsWith("/people"))
		presenceData.details = "Viewing contact list";
	presence.setActivity(presenceData);
});
