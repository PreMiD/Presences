const presence = new Presence({
		clientId: "1145899076760637460",
	}),
	gameTime = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/UV7X7U4.jpg",
		details: "In Menus",
		startTimestamp: gameTime,
	};

	if (document.querySelector("#game-container").classList[0] === "hidden")
		presenceData.details = "In Menus";
	else if (document.querySelector("header.header")) {
		presenceData.details = `Mode: ${
			document.querySelector("header.header").innerHTML
		}`;
	} else presenceData.details = "Mode: Marathon";

	presence.setActivity(presenceData);
});
