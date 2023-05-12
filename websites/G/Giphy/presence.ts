const presence = new Presence({
	clientId: "630507230852022273",
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

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/pVwjovM.png",
	};

	if (document.location.pathname === "/") {
		presenceData.details = "Browsing Gifs...";
		presenceData.state = "at Homepage";
		presenceData.smallImageKey = "browsing";
		presenceData.smallImageText = "browsing";
	} else if (document.location.pathname.includes("create/gifmaker")) {
		presenceData.details = "Creating a Gif";
		presenceData.state = "at Creation page";
		presenceData.smallImageKey = "creating";
		presenceData.smallImageText = "creating";
	} else {
		const at = document.location.pathname;
		let doing;
		if (at.includes("entertainment")) doing = "Entertainment";
		else if (at.includes("sports")) doing = "Sports";
		else if (at.includes("stickers")) doing = "Stickers";
		else if (at.includes("artist")) doing = "Artists";
		else if (at.includes("reaction")) doing = "Reactions";

		presenceData.details = "Browsing Gifs...";
		presenceData.state = `at ${doing} page`;
		presenceData.smallImageKey = "browsing";
		presenceData.smallImageText = "browsing";
	}

	presence.setActivity(presenceData);
});
