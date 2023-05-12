const presence = new Presence({
		clientId: "768437292486361129",
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

presence.on("UpdateData", () => {
	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/VshdY7t.png",
		startTimestamp: browsingTimestamp,
	};

	if (document.location.hostname === "hacktoberfest.digitalocean.com") {
		if (document.location.pathname.includes("/faq")) {
			presenceData.details = "Reading Page:";
			presenceData.state = "FAQ";
		} else if (document.location.pathname.includes("/profile")) {
			presenceData.details = "Viewing Page:";
			presenceData.state = "Checking Profile";
		} else if (document.location.pathname.includes("/details")) {
			presenceData.details = "Reading Page:";
			presenceData.state = "Resources";
		} else if (document.location.pathname.includes("/events")) {
			presenceData.details = "Viewing Page:";
			presenceData.state = "All events";
		} else if (document.location.pathname.includes("/eventkit")) {
			presenceData.details = "Viewing Page:";
			presenceData.state = "Event Organizer Kit";
		} else if (document.location.pathname.includes("/updates")) {
			presenceData.details = "Reading Page:";
			presenceData.state = "Hacktoberfest Update";
		} else if (document.location.pathname.includes("/login")) {
			presenceData.details = "Viewing Page:";
			presenceData.state = "Login";
		}
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
