const presence = new Presence({
	clientId: "858886158045806602",
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

let prevURL = "",
	timestamp = Date.now(),
	details = "",
	state = "";
presence.on("UpdateData", async () => {
	if (prevURL !== window.location.pathname) {
		prevURL = window.location.pathname;
		timestamp = Date.now();
	}
	if (window.location.pathname === "/") details = "Browsing Home Page";
	else if (window.location.pathname === "/portal/learning")
		details = "Netacad Portal";
	else if (window.location.pathname.startsWith("/course/")) {
		details = "Viewing course";
		state = document.querySelectorAll("h3")[0].textContent;
	} else if (window.location.pathname.startsWith("/grade/report/")) {
		details = "Viewing grades";
		state = document.querySelectorAll("h3")[0].textContent;
	} else if (window.location.pathname.startsWith("/local/mail/"))
		details = "Viewing messages";
	else if (window.location.pathname.startsWith("/calendar/")) {
		details = "Viewing calendar";
		state = document.querySelectorAll("h3")[0].textContent;
	} else if (window.location.pathname.startsWith("/mod/")) {
		if (
			document
				.querySelectorAll("h2")[0]
				.textContent.toUpperCase()
				.includes("EXAM")
		)
			details = "Viewing exam";
		else details = "Viewing course content";

		state = document.querySelectorAll("h3")[0].textContent;
	} else if (window.location.pathname.startsWith("/srwe-dl/")) {
		details = "Viewing course content";
		state = document.querySelectorAll("h1")[0].textContent;
	} else if (window.location.pathname.includes("assessment_history"))
		details = "Viewing Assesment History";
	else details = "Browsing";

	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/pvz4KSf.png",
		details,
		state,
		startTimestamp: timestamp,
	};
	if (!state) delete presenceData.state;

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
