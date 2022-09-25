const presence = new Presence({
		clientId: "1023383174027415572",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/DRlJvzX.png",
		startTimestamp: browsingTimestamp
	};

	presence.setActivity(presenceData);
});
