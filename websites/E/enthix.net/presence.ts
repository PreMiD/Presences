const presence = new Presence({
		clientId: "662715886662057994",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", () => {
	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/pFmxUh4.png",
		startTimestamp: browsingTimestamp,
	};
	if (document.location.hostname === "enthix.net") {
		presenceData.details = "Viewing Home Page";
		presenceData.state = `${
			document.querySelector(
				"body > div.container > div.playercount > p > span.sip"
			).textContent
		} Players Online`;
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
