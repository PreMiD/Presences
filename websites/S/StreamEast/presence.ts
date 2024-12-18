const presence = new Presence({
		clientId: "1316661139672797236",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "https://i.ibb.co/gr5gcV8/file.jpg",
		startTimestamp: browsingTimestamp,
	};

	if (document.title.includes("vs")) {
		presenceData.details = `[${window.location.pathname
			.match(/^\/([^/]+)\//)[1]
			.toUpperCase()}] ${document.title.replace(
			" Live Stream - StreamEast",
			""
		)}`;
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
