const presence = new Presence({
	clientId: "1175537518746279956",
});

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/1hI3nKp.png",
		startTimestamp: Date.now(),
	};
	if (document.title === "draw.io")
		presenceData.details = "Creating a new diagram";
	else {
		presenceData.details = "Editing a diagram";
		if (!(await presence.getSetting<boolean>("privacy")))
			presenceData.state = document.title.replace(/ - draw.io$/, "");
	}
	presence.setActivity(presenceData);
});
