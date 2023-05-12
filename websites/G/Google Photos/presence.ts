const presence = new Presence({
		clientId: "925204937225416704",
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
			largeImageKey: "https://i.imgur.com/H4jjKhD.png",
			startTimestamp: browsingTimestamp,
		},
		path = document.location.pathname;
	if (path === "" || path === "/") presenceData.details = "Browsing photos";
	else if (path.startsWith("/memory")) {
		presenceData.details = "Playing back a memory:";
		[presenceData.state] = document.title.split(/-/, 1);
	} else if (path.includes("/photo")) presenceData.details = "Viewing a photo";
	else if (path.startsWith("/search")) {
		presenceData.details = "Searching for:";
		[presenceData.state] = document.title.split(/-/, 1);
	} else if (path === "/albums") presenceData.details = "Browsing albums";
	else if (path.startsWith("/album")) {
		presenceData.details = "Viewing an album";
		{
			if (await presence.getSetting<boolean>("albumname"))
				[presenceData.state] = document.title.split(/-/, 1);
		}
	} else if (path.startsWith("/archive"))
		presenceData.details = "Viewing the archive";
	presence.setActivity(presenceData);
});
