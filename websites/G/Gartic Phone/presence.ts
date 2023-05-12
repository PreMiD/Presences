const presence = new Presence({
		clientId: "803366782722244638",
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
			largeImageKey: "https://i.imgur.com/jT44n8u.png",
			startTimestamp: browsingTimestamp,
		},
		privacyDraw = await presence.getSetting<boolean>("privacyDraw"),
		privacyAlbum = await presence.getSetting<boolean>("privacyAlbum");

	if (window.location.hostname.includes("garticphone")) {
		if (window.location.pathname.endsWith("lobby"))
			presenceData.details = "Awaiting the launch of the game...";
		else if (window.location.pathname.endsWith("start"))
			presenceData.details = "Start a story";
		else if (window.location.pathname.endsWith("draw")) {
			if (privacyDraw) presenceData.details = "Drawing...";
			else {
				presenceData.details = "Drawing:";
				presenceData.state = `${
					document.querySelector(".jsx-1934821697 h3").textContent
				}`;
			}
		} else if (window.location.pathname.endsWith("write"))
			presenceData.details = "Writing...";
		else if (window.location.pathname.endsWith("book")) {
			if (privacyAlbum) presenceData.details = "Look at the album";
			else {
				presenceData.details = "Look at the album of:";
				presenceData.state = `${
					document.querySelector(".jsx-1186471753 span").textContent
				}`;
			}
		} else {
			presenceData.details = "Browsing the home page";
			delete presenceData.endTimestamp;
		}
	}
	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
