const presence = new Presence({
		clientId: "651671730905153539",
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
	const page = document.location.pathname,
		tagged = document.querySelector(
			"#root > div.more > div.divider-title > h1"
		),
		user = document.querySelector(
			"#root > div.profile-author > div.name > strong"
		),
		posttitle = document.querySelector(
			"#root > div.story.story-container > h1"
		),
		presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/SyFFEUw.png",
			startTimestamp: browsingTimestamp,
		};

	if (page.includes("/tagged") && tagged && tagged.textContent !== "") {
		presenceData.details = "Viewing Tag:";
		presenceData.state = `${tagged.textContent}`;
	} else if (posttitle && posttitle.textContent !== "") {
		presenceData.details = "Reads a Post:";
		presenceData.state = posttitle.textContent;
	} else if (page.includes("/search")) {
		presenceData.details = "Searching:";
		presenceData.state = document.querySelector<HTMLInputElement>(
			"#searchbox > div > form > input"
		).value;
		presenceData.smallImageKey = "hn-logo";
	} else if (user && user.textContent !== "") {
		presenceData.details = "Viewing User Profile:";
		presenceData.state = user.textContent;
	} else {
		presenceData.details = "Viewing Page:";
		presenceData.state = "Homepage";
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
