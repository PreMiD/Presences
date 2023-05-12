const presence = new Presence({
	clientId: "652773935829614592",
});

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

presence.on("UpdateData", () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/di7LB5b.png",
		},
		page = window.location.pathname,
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

	presenceData.startTimestamp = browsingTimestamp;

	if (page.endsWith("/editcard"))
		presenceData.details = "Editing their profile card";
	else if (page.endsWith("/inventory"))
		presenceData.details = "Viewing their inventory";
	else if (page.endsWith("/settings"))
		presenceData.details = "Editing their settings";
	else if (page.startsWith("/blog")) presenceData.details = "Viewing all blogs";
	else if (page.startsWith("/article")) {
		presenceData.details = "Reading an article:";
		presenceData.state = document.querySelector(
			"#__next > main > div.css-vxgrp0 > main > div > div.css-17cwizr > div > h1"
		).textContent;
	} else if (page.endsWith("/servers")) presenceData.details = "On dashboard";
	else if (page.startsWith("/server"))
		presenceData.details = "Managing/Viewing a server";
	else if (page.startsWith("/shops")) presenceData.details = "On shop menu";
	else if (page.startsWith("/profile"))
		presenceData.details = "Viewing their profile";

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
