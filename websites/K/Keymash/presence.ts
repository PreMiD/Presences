const presence = new Presence({
	clientId: "719415069460529163",
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

presence.on("UpdateData", () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/vDGvohb.png",
		},
		[, path, query] = document.location.pathname.split("/");

	switch (path) {
		case "":
			presenceData.details = "Main Menu";
			break;
		case "play":
			presenceData.details = "Waiting to play";
			break;
		case "game":
			presenceData.details = "Currently in game";
			break;
		case "settings":
			presenceData.details = "Changing settings";
			break;
		case "login":
			presenceData.details = "Logging in";
			break;
		case "learn":
			if (query) {
				presenceData.details = "Playing Lesson";
				presenceData.state = query.replace("_", " ");
			} else presenceData.details = "Viewing Learn";
			break;
		case "blogs":
			presenceData.details = "Newsletter";
			break;
		case "leaderboards":
			presenceData.details = "Viewing Leaderboards";
			if (query) {
				presenceData.state = `${
					query.charAt(0).toUpperCase() + query.slice(1)
				} Leaders`;
			}
			break;
		case "profile":
			if (query) {
				presenceData.details = "Viewing profile";
				presenceData.state = query.replace("-", "#");
			} else presenceData.details = "Viewing profile";
			break;
		default:
			presenceData.details = "Browsing...";
			break;
	}

	presence.setActivity(presenceData);
});
