const presence = new Presence({
		clientId: "864631234339930132",
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

let username: HTMLElement;

presence.on("UpdateData", async () => {
	const privacy: boolean = await presence.getSetting<boolean>("privacy"),
		showTimestamp: boolean = await presence.getSetting<boolean>("timestamp"),
		presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/a1L2Mi2.png",
			smallImageKey: "small",
			startTimestamp: browsingTimestamp,
		};

	if (!showTimestamp) delete presenceData.startTimestamp;

	if (document.location.pathname === "/mall/") {
		username = document.querySelector(".username");
		presenceData.details = "Browsing GeForce NOW";
	} else if (
		document.location.pathname === "/games" &&
		!document.querySelector("gfn-evidence-panel-tile")
	) {
		presenceData.details = `Playing ${document.title.replace(
			" on GeForce NOW",
			""
		)}`;
	} else if (document.location.pathname === "/games") {
		presenceData.details = `Viewing ${
			(
				document.querySelector(
					"gfn-evidence-panel-tile .evidence-panel-title span"
				) as HTMLElement
			).textContent
		}`;
	} else presenceData.details = "Unknown Page";

	if (username && !privacy) presenceData.smallImageText = username.textContent;
	else {
		delete presenceData.smallImageText;
		delete presenceData.smallImageKey;
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
