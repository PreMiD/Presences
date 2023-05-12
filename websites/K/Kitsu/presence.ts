const presence = new Presence({
		clientId: "629413852391669791",
	}),
	presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/LlascQj.png",
	};

let path, user: string;
const strings = presence.getStrings({
	browsing: "general.browsing",
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
	path = window.location.pathname;

	if (path === "/" || path.startsWith("/explore")) {
		presenceData.details = (await strings).browsing;
		delete presenceData.state;
	} else if (path.includes("/users")) {
		user = document.querySelector(".cover-username").textContent.trim();
		presenceData.details = `Viewing ${user} profile`;

		switch (path.split("/")[3]) {
			case "library":
				presenceData.state = "Viewing their library";
				break;
			case "reactions":
				presenceData.state = "Viewing their reactions";
				break;
			case "followers":
				presenceData.state = "Viewing their followers";
				break;
			case "following":
				presenceData.state = "Viewing who they follow";
				break;
			case "groups":
				presenceData.state = "Viewing their groups";
				break;
			default:
				presenceData.state = "Viewing their activity";
		}
	} else if (path.startsWith("/anime")) {
		presenceData.details = "Looking through anime";
		if (path.split("/")[2]) {
			presenceData.state = `Viewing ${document
				.querySelector("h3")
				.textContent.trim()}`;
		} else delete presenceData.state;
	} else if (path.startsWith("/manga")) {
		presenceData.details = "Looking through manga";
		if (path.split("/")[2]) {
			presenceData.state = `Viewing ${document
				.querySelector("h3")
				.textContent.trim()}`;
		} else delete presenceData.state;
	} else if (path.startsWith("/groups")) {
		presenceData.details = "Looking through groups";
		if (path.split("/")[2]) {
			presenceData.state = `Viewing ${document
				.querySelector(".cover-username")
				.textContent.trim()}`;
		} else delete presenceData.state;
	} else if (path.startsWith("/feedback")) {
		presenceData.details = "Browsing feedback section";
		switch (path.split("/")[2]) {
			case "bugs":
				presenceData.state = "Viewing bugs";
				break;
			case "feature-requests":
				presenceData.state = "Viewing feature requests";
				break;
			case "database-requests":
				presenceData.state = "Viewing database requests";
				break;
			case "mobile-bugs":
				presenceData.state = "Viewing mobile bugs";
				break;
			case "mobile-features":
				presenceData.state = "Viewing mobile features";
				break;
			default:
				presenceData.state = "some unknown place";
		}
	} else if (path.startsWith("/api")) {
		presenceData.details = "Messing with the kitsu API";

		delete presenceData.state;
	}

	presence.setActivity(presenceData, true);
});
