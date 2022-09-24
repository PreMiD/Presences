const presence = new Presence({
		clientId: "1023277091392868372",
	}),
	browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		startTimestamp: browsingStamp,
	};

	presence.setActivity(presenceData);
});
