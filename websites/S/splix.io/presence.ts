const presence = new Presence({
		clientId: "640321591108042762",
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
let ui: HTMLElement;

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/rD9lZrN.png",
	};

	if (document.location.pathname === "/") {
		ui = document.querySelector("#playUI");
		if (ui.style.cssText === "display: none;") {
			presenceData.startTimestamp = browsingTimestamp;
			presenceData.details = "Getting ready...";
		} else {
			presenceData.startTimestamp = browsingTimestamp;
			presenceData.details = `${
				document.querySelector("#scoreBlock > span:nth-child(5)").textContent
			} ${
				document.querySelector("#scoreBlock > span:nth-child(1)").textContent
			}`;
			presenceData.state = document.querySelector(
				"#scoreBlock > span:nth-child(7)"
			).textContent;
		}
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
