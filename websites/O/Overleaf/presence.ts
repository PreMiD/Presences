const presence = new Presence({
		clientId: "784954155747377162",
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
			largeImageKey: "https://i.imgur.com/DcEM56x.png",
			smallImageKey: "whitelogo",
			smallImageText: "Overleaf",
			startTimestamp: browsingTimestamp,
		},
		pth = window.location.pathname.toLowerCase();

	//Projects page (hub)
	if (pth === "/project" || pth === "/project/") {
		presenceData.details = "Browsing Projects";
		const actif = document
				.querySelectorAll(".project-list-sidebar")[0]
				.querySelectorAll(".active"),
			maybecustom = actif[0].querySelectorAll(".name.ng-binding");
		if (maybecustom.length !== 0)
			presenceData.state = maybecustom[0].textContent;
		//Take care of (i) logo
		else presenceData.state = actif[0].querySelectorAll("a")[0].textContent;
	} else if (pth.includes("/project")) {
		//Project page
		presenceData.details = document.title.replace(
			"- Online LaTeX Editor Overleaf",
			""
		);
		presenceData.state = document
			.querySelectorAll(".file-tree-list")[0]
			.querySelectorAll(".selected")[0]
			.querySelectorAll("span")[0].textContent;
	} else if (pth.includes("/learn")) {
		//Documentation
		presenceData.details = "Browsing Documentation";
		if (pth === "/learn" || pth === "/learn/") presenceData.state = "Main Page";
		else {
			presenceData.state = document.title.replace(
				"- Overleaf, Online LaTeX Editor",
				""
			);
		}
	} else {
		//Random other pages
		presenceData.details = "Browsing:";
		presenceData.state = document.title.replace(
			"- Overleaf, Online LaTeX Editor",
			""
		);
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
