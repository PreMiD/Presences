const presence = new Presence({
	clientId: "691325899307483197",
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

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/utYCZOS.png",
	};

	if (document.location.pathname === "/") presenceData.details = "Home";
	else if (document.location.pathname.includes("/dashboard")) {
		presenceData.details = "Dashboard";
		presenceData.state = "Choosing a server...";
	} else if (document.location.pathname.includes("/server/")) {
		presenceData.details = `Edit a server : ${
			document.querySelector(".title").textContent
		}`;
		if (!document.location.pathname.split("/")[3]) presenceData.state = "Main";
		else presenceData.state = document.querySelector("a.is-active").textContent;
	} else if (document.location.pathname.includes("/status")) {
		presenceData.details = "Status";
		presenceData.state = "Watching current status of Koya";
	} else if (document.location.pathname.includes("/commands")) {
		presenceData.details = "Commands";
		presenceData.state = document.querySelector(
			"a.cat-toggle.is-active"
		).textContent;
	} else if (document.location.pathname.includes("/premium")) {
		presenceData.details = "Premium";
		presenceData.state = "Watching premium page";
	}

	if (!presenceData.details) presence.setActivity();
	else {
		presenceData.state ??= "Navigating...";
		presence.setActivity(presenceData);
	}
});
