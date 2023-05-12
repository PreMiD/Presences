const presence = new Presence({
		clientId: "266624760782258186",
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
let title: Element;

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/vUk6eWg.png",
	};

	if (document.location.hostname === "skyra.pw") {
		presenceData.startTimestamp = browsingTimestamp;

		if (document.location.pathname.includes("/guilds/")) {
			presenceData.details = "Managing server settings";
			title = document.querySelector("[data-premid='server-title']");
			presenceData.state = `server: ${title.textContent}`;
			presenceData.smallImageKey = Assets.Writing;
		} else if (document.location.pathname.includes("/music/")) {
			presenceData.details = "Spinning the turntables";
			title = document.querySelector("[data-premid='music-title']");

			if (title) presenceData.state = `Currently Playing: ${title.textContent}`;

			presenceData.smallImageKey = Assets.Play;
		} else if (document.location.pathname === "/commands") {
			presenceData.details = "Browsing Skyra's commands";
			presenceData.smallImageKey = Assets.Reading;
		} else {
			presenceData.details = "Checking out Skyra";
			presenceData.smallImageKey = Assets.Reading;
		}
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
