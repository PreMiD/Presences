const presence = new Presence({
		clientId: "1077743931460177972",
	}),
	watchingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/gJBDsCE.png",
			startTimestamp: watchingTimestamp,
		},
		currentStreams = document.location.pathname
			.split("/")
			.filter(function (str) {
				return str !== "";
			});
	if (currentStreams.length === 0) presenceData.details = "On the home screen";
	else {
		presenceData.details = `Watching ${currentStreams.length} ${
			currentStreams.length > 1 ? "streams" : "stream"
		}`;
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
