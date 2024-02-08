const presence = new Presence({
	clientId: "756196794727399617",
});

presence.on("UpdateData", async () => {
	const browsingTimestamp = Math.floor(Date.now() / 1000),
		valor = document.querySelectorAll("button").length,
		players = document.querySelectorAll(".userActive"),
		presenceData: PresenceData = {
			largeImageKey:
				"https://cdn.rcd.gg/PreMiD/websites/B/Broken%20Picturephone/assets/logo.png",
			startTimestamp: browsingTimestamp,
		};

	if (valor === 1) {
		presenceData.details = "Creating a room";
		presenceData.smallImageKey =
			"https://cdn.rcd.gg/PreMiD/websites/B/Broken%20Picturephone/assets/0.png";
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
