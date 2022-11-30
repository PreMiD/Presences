const presence = new Presence({
		clientId: "1047546230525415535",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/zN7rsOi.png",
		startTimestamp: browsingTimestamp,
	};

	presence.setActivity(presenceData);
});
