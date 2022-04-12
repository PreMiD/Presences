const presence = new Presence({
		clientId: "962856626342207568"
	}),
	time = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		details: "Hacking",
		startTimestamp: time,
		largeImageKey: "logo"
	};
	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
