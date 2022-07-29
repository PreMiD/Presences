const presence = new Presence({
		clientId: "1002575262292131910",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "artfight-logo",
		startTimestamp: browsingTimestamp,
	};

	presence.setActivity(presenceData);
});
