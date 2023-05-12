const presence = new Presence({
	clientId: "833689728774832168",
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

let videoData: {
	duration: number;
	paused: boolean;
	currentTime: number;
};

presence.on("iFrameData", (data: typeof videoData) => {
	videoData = data;
});

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/9MxXOK3.png",
	};

	if (document.location.pathname === "/") {
		presenceData.details = "| Startseite";
		presenceData.state = "Starrt auf die neuen Sachen";
	} else if (document.location.pathname.startsWith("/anime/list")) {
		presenceData.details = "| Suche";
		presenceData.state = "Sucht nach einem neuen Lieblingsanime";
	} else if (
		document.location.pathname.startsWith("/anime") &&
		!document.location.pathname.includes("/watch")
	) {
		presenceData.details = "| Übersicht";
		presenceData.state = document.title.split("›").map(s => s.trim())[2];
	} else if (document.location.pathname === "/static/calendar") {
		presenceData.details = "| Kalendar";
		presenceData.state = "Schaut sich die neuen Releases an";
	} else if (document.URL.includes("/user/me?page=delete")) {
		presenceData.details = "| Account Löschen";
		presenceData.state = "Eine Straftat begehen";
	} else if (document.location.pathname.includes("/user/me")) {
		presenceData.details = "| Einstellungen";
		presenceData.state = "Macht irgendwas kaputt";
	} else if (document.location.pathname.includes("/user/")) {
		presenceData.details = "| Benutzerinfo";
		presenceData.state = `Profil von ${document.title.split("Profil von ")[1]}`;
	} else if (document.location.pathname === "/easteregg") {
		presenceData.details = "| Easteregg?";
		presenceData.state = "Jup, Easeregg!";
	} else if (document.location.pathname.startsWith("/static/")) {
		presenceData.details = "| Hilfe & Infos";
		presenceData.state = "Ließt intensiv durch die Infoseiten";
	} else if (
		document.location.pathname.includes("/anime") &&
		document.location.pathname.includes("/watch")
	) {
		const titleSplit = document.title.split("›").map(s => s.trim());
		presenceData.details = `| schaut ${titleSplit[2]}`;
		presenceData.state = titleSplit[3];

		if (videoData) {
			presenceData.smallImageKey = videoData.paused ? "pause" : "play";
			presenceData.smallImageText = videoData.paused ? "Pausiert" : "Spielt";

			[, presenceData.endTimestamp] = presence.getTimestamps(
				videoData.currentTime,
				videoData.duration
			);

			if (videoData.paused) delete presenceData.endTimestamp;
		}
	} else if (document.location.pathname === "/login") {
		presenceData.details = "| Login";
		presenceData.state = "Willkommen zurück!";
	} else if (document.location.pathname === "/register") {
		presenceData.details = "| Registrieren";
		presenceData.state = "Ein neuer User!";
	} else {
		presenceData.details = "| Error";
		presenceData.state = "Wie bist du hier gelandet?";
	}

	presence.setActivity(presenceData);
});
