const presence = new Presence({
		clientId: "808668919635247104",
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
			largeImageKey: "https://i.imgur.com/JkOc5Vo.png",
			startTimestamp: browsingTimestamp,
		},
		path = document.location.pathname;
	if (path === "/") presenceData.details = "Viewing the Homepage";
	else if (path === "/rooms") presenceData.details = "Viewing Rooms";
	else if (
		document.location.pathname.split("/")[1].match(/^\d/) ||
		path === "/room"
	) {
		if (document.querySelector(".infosUsers")) {
			presenceData.details = "Setting up Info to Join";
			presenceData.state = `Players: ${
				document.querySelector(".infosRoom li:last-child span strong")
					.textContent
			}`;
		} else {
			presenceData.details = `${
				document.querySelector(".you .nick").textContent
			} - ${document
				.querySelector(".you .points")
				.textContent.split("pts")[0]
				.trim()} points`;
			presenceData.state = `Lobby: ${
				document.querySelector("title").textContent.split("-")[0]
			}`;
		}
	} else presenceData.details = "Somewhere on-site";

	presence.setActivity(presenceData);
});
