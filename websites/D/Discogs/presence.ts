const presence = new Presence({
		clientId: "1042567470738837534",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/2LZSDR9.png",
		startTimestamp: browsingTimestamp
	};

	presence.setActivity(presenceData);
});
