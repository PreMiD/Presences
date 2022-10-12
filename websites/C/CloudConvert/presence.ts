const presence = new Presence({
		clientId: "1029595348844429382",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/zn1sM5L.png",
		startTimestamp: browsingTimestamp
	};

	presence.setActivity(presenceData);
});
