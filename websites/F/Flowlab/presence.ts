const presence = new Presence({ clientId: "991160367629750372" }),
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
			largeImageKey: "https://i.imgur.com/XpyDbbv.png",
			startTimestamp: browsingTimestamp,
		},
		{ pathname, hostname } = document.location;

	if (hostname === "flowlab.io") {
		switch (pathname) {
			case "/": {
				presenceData.details = "Viewing home page";
				break;
			}
			case "/game/list": {
				presenceData.details = "Viewing their games";
				break;
			}
			case "/game/browse": {
				presenceData.details = "Viewing games page";
				break;
			}
		}
	}
	if (pathname.includes("/profile")) {
		presenceData.details = `Viewing ${document
			.querySelectorAll(".username")
			.item(0)
			.textContent.trim()}'s profile`;
	} else if (pathname.includes("/view/")) {
		presenceData.details = `Editing "${
			document.querySelector("#game_title").textContent
		}"`;
		presenceData.state = document.querySelector("#game_author").textContent;
	} else if (pathname.includes("/play/")) {
		(presenceData.details = `Playing "${
			document.querySelector("#game_title").textContent
		}"`),
			(presenceData.state = `${
				document.querySelector("#game_author").textContent
			}`);
	} else if (pathname === "/resources")
		presenceData.details = "Viewing Flowlab examples";
	else if (pathname === "/lab/blog/")
		presenceData.details = "Viewing Flowlab blog";
	else if (pathname.includes("/blog/")) {
		presenceData.state = "Reading blog entry";
		presenceData.details = document
			.querySelectorAll(".display-2.text-white")
			.item(0).textContent;
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
