const presence = new Presence({
		clientId: "844109673618735144",
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
			largeImageKey: "https://i.imgur.com/1uePEgT.png",
			startTimestamp: browsingTimestamp,
		},
		privacy = await presence.getSetting("privacy"),
		{ pathname } = document.location;
	if (document.querySelector('[data-test-id="message-group-subject-text"]')) {
		presenceData.details = "Reading an email";
		presenceData.smallImageKey = Assets.Reading;
	} else if (
		document.querySelector<HTMLInputElement>('[role="combobox"]')?.value
	) {
		presenceData.details = "Searching";
		presenceData.smallImageKey = Assets.Search;
	} else if (document.querySelector('[data-test-id="recipient-input"]'))
		presenceData.details = "Composing an email";
	else if (privacy) {
		if (pathname.includes("/folders/") || pathname.includes("/search/")) {
			if (pathname.includes("messages"))
				presenceData.details = "Viewing an email";
			else presenceData.details = "Viewing mail";
		} else presenceData.details = "Browsing";
	} else if (document.querySelector('[data-test-is-active="true"]')) {
		presenceData.details = `Viewing ${document
			.querySelector('[data-test-is-active="true"]')
			.textContent.replace(/[0-9]*/gm, "")}`;
	} else presenceData.details = "Browsing";

	presence.setActivity(presenceData);
});
