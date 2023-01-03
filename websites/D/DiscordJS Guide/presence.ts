const presence = new Presence({
		clientId: "819865300173324288",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/Zt4i2l3.png",
		startTimestamp: browsingTimestamp,
	};

	presenceData.details = "Viewing Docs";
	presenceData.state = `Page: ${document
		.querySelectorAll("h1")[0]
		.textContent.replace("#", "")}`;

	if (!presenceData.details) presence.setActivity();
	else presence.setActivity(presenceData);
});
