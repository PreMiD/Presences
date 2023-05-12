const presence = new Presence({
	clientId: "1031628776209141892",
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
			largeImageKey: "https://i.imgur.com/fpqx5Mn.png",
		},
		{ pathname } = window.location;

	if (pathname === "/") {
		const remainingSeconds = +document
				.querySelector("h3")
				?.textContent.match(/\d+,\d+/)[0]
				.replace(/,/, ""),
			privacyMode = await presence.getSetting<boolean>("privacyMode"),
			letterInput =
				document.querySelector<HTMLTextAreaElement>("#letter-textarea"),
			messageContainer = document.querySelector<HTMLDivElement>("#message");

		if (!isNaN(remainingSeconds)) {
			presenceData.endTimestamp =
				Math.floor(Date.now() / 1000) + remainingSeconds;
		}

		if (document.querySelector<HTMLDivElement>("#report"))
			presenceData.details = "Reporting a letter";
		else if (letterInput === document.activeElement) {
			presenceData.details = "Writing a letter";
			if (!privacyMode) presenceData.state = letterInput.value;
		} else if (
			document
				.querySelector<HTMLAnchorElement>("#message > div > p:last-child > a")
				?.href.startsWith("mailto:F")
		) {
			presenceData.details = "Reading main letter";
			if (!privacyMode) presenceData.state = messageContainer.textContent;
		} else {
			presenceData.details = "Reading a letter";
			if (!privacyMode) presenceData.state = messageContainer.textContent;
		}
	} else if (pathname.startsWith("/privacy"))
		presenceData.details = "Reading the privacy policy";
	else if (pathname.startsWith("/tos"))
		presenceData.details = "Reading the terms of service";

	presence.setActivity(presenceData);
});
