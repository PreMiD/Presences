const presence = new Presence({
		clientId: "1089962805270171689",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/uCstmQE.png",
		startTimestamp: browsingTimestamp,
	};

	presence.setActivity(presenceData);
});
