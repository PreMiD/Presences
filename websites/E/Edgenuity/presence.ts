const presence = new Presence({
	clientId: "943391951611396106",
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

let courseName: HTMLElement,
	lessonName: HTMLElement,
	lessonActivity: HTMLElement;

presence.on("UpdateData", async () => {
	const info = await presence.getSetting<boolean>("eSI"),
		classInfo = await presence.getSetting<boolean>("eCI"),
		presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/FDv2y9V.png",
		};
	if (info) {
		if (document.location.pathname === "/")
			presenceData.details = "Viewing Edgenuity Home";
		else if (document.location.pathname === "/Login/Login/Student")
			presenceData.details = "Logging in...";

		if (classInfo) {
			if (document.location.pathname === "/Player/") {
				courseName = document.querySelector("span.course");
				lessonName = document.querySelector("[data-bind='html: Title']");
				lessonActivity = document.querySelector(
					"[data-bind='html: ActivityName']"
				);
				presenceData.details = courseName.textContent;
				presenceData.state = `${lessonName.textContent} - ${lessonActivity.textContent}`;
			}
		} else if (document.location.pathname === "/Player/")
			presenceData.details = "Working on Classwork";
		else presenceData.details = "Can't read page";
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
