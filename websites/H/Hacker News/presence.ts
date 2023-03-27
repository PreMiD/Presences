const presence = new Presence({
		clientId: "1089948109225861200",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/xWtIX5I.png",
		startTimestamp: browsingTimestamp,
	};

	presence.setActivity(presenceData);
});
