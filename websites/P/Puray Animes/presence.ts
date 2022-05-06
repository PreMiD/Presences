const presence = new Presence({
		clientId: "972246349917610054"
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "https://imgur.com/8MP205p.png",
		startTimestamp: browsingTimestamp
	};
	presence.setActivity(presenceData);
});
