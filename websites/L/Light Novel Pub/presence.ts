const presence = new Presence({ clientId: "952854435711819796" }),
	browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "logo",
		details: "Browsing...",
		startTimestamp: browsingStamp
	};
	if (presenceData) presence.setActivity(presenceData);
});
