const presence = new Presence({
	clientId: "817777535584567366"
});

presence.on("UpdateData", async() => {
	const presenceData: PresenceData = {
		details: "on an epic adventure...",
		largeImageKey: "idleon_large"
	};
	presence.setActivity(presenceData);
});