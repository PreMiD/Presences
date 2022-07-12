const presence = new Presence({
		clientId: "996453486696878144",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "neovel_logo",
		startTimestamp: browsingTimestamp,
	};

	presenceData.details = "test";

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
