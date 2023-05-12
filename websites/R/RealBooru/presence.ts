const presence = new Presence({
	clientId: "620304668710535207",
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

presence.on("UpdateData", () => {
	const urlParams = new URLSearchParams(window.location.search);
	let presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/g09SOs0.png",
	};
	if (document.location.pathname === "/") presence.setActivity(presenceData);
	else if (
		urlParams.get("page") &&
		urlParams.get("s") &&
		urlParams.get("page") === "post"
	) {
		if (urlParams.get("s") === "list") {
			if (urlParams.get("tags")) {
				presenceData = {
					details: "Searching...",
					state: urlParams.get("tags").replace(" ", ", "),
					largeImageKey: "https://i.imgur.com/g09SOs0.png",
				};
				presence.setActivity(presenceData);
			} else {
				presenceData = {
					details: "Viewing Posts List...",
					largeImageKey: "https://i.imgur.com/g09SOs0.png",
				};
				presence.setActivity(presenceData);
			}
		} else if (urlParams.get("s") === "view" && urlParams.get("id")) {
			presenceData = {
				details: "Viewing a Post...",
				state: `Post ${urlParams.get("id")}`,
				largeImageKey: "https://i.imgur.com/g09SOs0.png",
			};
			presence.setActivity(presenceData);
		} else {
			presenceData = {
				largeImageKey: "https://i.imgur.com/g09SOs0.png",
			};
			presence.setActivity(presenceData);
		}
	} else {
		presenceData = {
			largeImageKey: "https://i.imgur.com/g09SOs0.png",
		};
		presence.setActivity(presenceData);
	}
});
