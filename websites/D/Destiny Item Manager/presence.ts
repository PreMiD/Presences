const presence = new Presence({
		clientId: "811198714726449183",
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
		largeImageKey: "https://i.imgur.com/OwMBJAm.png",
		startTimestamp: browsingTimestamp,
	};

	if (window.location.host === "destinyitemmanager.com")
		presenceData.details = "Browsing...";
	else if (window.location.host.startsWith("app")) {
		if (window.location.pathname.includes("inventory")) {
			const guardian = document
				.querySelector(
					"#content > div.inventory-container.destiny2 > div > div.store-row.store-header > div:nth-child(1) > div:nth-child(1) > div > div._2mo8C > div._1zQrq > div.ohqoA > div.FZBlR"
				)
				.textContent.trim();

			presenceData.details = "Inventory";
			presenceData.state = guardian;
			presenceData.smallImageText = `${guardian} - ${document
				.querySelector(
					"#content > div.inventory-container.destiny2 > div > div.store-row.store-header > div:nth-child(1) > div:nth-child(1) > div > div._2mo8C > div._1zQrq > div.ohqoA > div._1FuuK"
				)
				.textContent.trim()}`;

			switch (guardian) {
				case "Titan": {
					presenceData.smallImageKey = "guardian-titan";
					break;
				}
				case "Warlock": {
					presenceData.smallImageKey = "guardian-warlock";
					break;
				}
				case "Hunter":
					{
						presenceData.smallImageKey = "guardian-hunter";
						// No default
					}
					break;
			}
		} else if (window.location.pathname.includes("progress"))
			presenceData.details = "Progress";
		else if (window.location.pathname.includes("vendors"))
			presenceData.details = "Vendors";
		else if (window.location.pathname.includes("records"))
			presenceData.details = "Records";
		else if (window.location.pathname.includes("optimizer"))
			presenceData.details = "Loadout Optimizer";
		else if (window.location.pathname.includes("organizer"))
			presenceData.details = "Organizer";
		else if (window.location.pathname.includes("settings"))
			presenceData.details = "Settings";
		else if (window.location.pathname.includes("about"))
			presenceData.details = "About";
		else if (window.location.pathname.includes("whats-new"))
			presenceData.details = "DIM Changes";
	} else presenceData.details = "Browsing...";

	presence.setActivity(presenceData);
});
