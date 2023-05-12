const presence = new Presence({
		clientId: "635213174144237601",
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
let title;
const viewString = "Viewing ",
	torrentString = "'s torrents";

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/FGXtWsm.png",
		startTimestamp: browsingTimestamp,
	};

	if (new URLSearchParams(window.location.search).has("q")) {
		presenceData.details = "Searching for:";
		presenceData.state = document.querySelector("input").value;
		presenceData.smallImageKey = Assets.Search;
	} else if (document.location.pathname === "/")
		presenceData.details = "Viewing home page";
	else if (document.location.pathname.includes("/rules")) {
		presenceData.smallImageKey = Assets.Reading;
		presenceData.details = "Reading the rules";
	} else if (document.location.pathname.includes("/help")) {
		presenceData.smallImageKey = Assets.Reading;
		presenceData.details = "Reading the help section";
	} else if (document.location.pathname.includes("/upload")) {
		presenceData.smallImageKey = Assets.Uploading;
		presenceData.details = "Uploading a torrent";
	} else if (document.location.pathname.includes("/view/")) {
		presenceData.details = "Viewing torrent:";
		title = document.querySelector("h3.panel-title").textContent.trim();
		presenceData.state = title;
	} else if (document.location.pathname.includes("/user/")) {
		presenceData.details =
			viewString +
			document.querySelector("body > div > div > h3 > span").textContent +
			torrentString;
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
