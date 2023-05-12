const presence = new Presence({
		clientId: "639603634451120138",
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
let title: HTMLElement;

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/MExOoiX.png",
	};

	if (document.location.hostname === "www.speedrun.com") {
		if (document.location.pathname === "/") {
			presenceData.startTimestamp = browsingTimestamp;
			presenceData.details = "Viewing home page";
		} else if (document.location.pathname.includes("/games")) {
			presenceData.startTimestamp = browsingTimestamp;
			presenceData.details = "Viewing all games";
		} else if (document.location.pathname.includes("/streams")) {
			presenceData.startTimestamp = browsingTimestamp;
			presenceData.details = "Viewing all streams";
		} else if (document.location.pathname.includes("/thread/")) {
			title = document.querySelector(
				"#centerbar > div > div:nth-child(1) > span"
			);
			presenceData.smallImageKey = Assets.Reading;
			presenceData.startTimestamp = browsingTimestamp;
			presenceData.details = "Viewing forum post:";
			if (title.textContent.length > 128)
				presenceData.state = `${title.textContent.substring(0, 125)}...`;
			else presenceData.state = title.textContent;
		} else if (document.location.pathname.includes("/forum")) {
			presenceData.startTimestamp = browsingTimestamp;
			presenceData.details = "Browsing the forums...";
		}
	}

	if (!presenceData.details) {
		title = document.querySelector("head > title");
		presenceData.state = title.textContent.replace(" - speedrun.com", "");
		presenceData.details = "Viewing:";
		presenceData.startTimestamp = browsingTimestamp;
		presence.setActivity(presenceData);
	} else presence.setActivity(presenceData);
});
