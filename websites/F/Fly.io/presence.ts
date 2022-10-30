const presence = new Presence({
		clientId: "1036066765735727144",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/1rey7rc.png",
		startTimestamp: browsingTimestamp,
	};

	presence.setActivity(presenceData);
});
