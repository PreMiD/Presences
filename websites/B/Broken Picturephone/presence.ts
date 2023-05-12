const presence = new Presence({
	clientId: "756196794727399617",
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

presence.on("UpdateData", async () => {
	const browsingTimestamp = Math.floor(Date.now() / 1000),
		valor = document.querySelectorAll("button").length,
		players = document.querySelectorAll(".userActive"),
		presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/34NoyFW.png",
			startTimestamp: browsingTimestamp,
		};

	if (valor === 1) {
		presenceData.details = "Creating a room";
		presenceData.smallImageKey = "home";
		presenceData.smallImageText = "On homepage";
	}
	if (valor >= 6) {
		const numLimit = parseFloat(document.querySelector(".line b").textContent);
		presenceData.details = "Waiting";
		presenceData.state = `Playing ${`(${players.length} of ${numLimit})`}`;
		presenceData.smallImageKey = Assets.Play;
		presenceData.smallImageText = "On game";

		if (players.length > numLimit)
			presenceData.state = `(${numLimit} of ${numLimit} players)`;
	}

	if (document.querySelector("#writeEntryundefined"))
		presenceData.details = "Typing...";

	if (document.querySelectorAll(".ptro-crp-el").length >= 1)
		presenceData.details = "Drawing";

	if (document.querySelectorAll(".presentationSection").length >= 1)
		presenceData.details = "Viewing the presentation";

	if (document.querySelectorAll(".waitingSet.rounded").length >= 1)
		presenceData.details = "On waitlist";

	if (!presenceData.details) presence.setActivity();
	else presence.setActivity(presenceData);
});
