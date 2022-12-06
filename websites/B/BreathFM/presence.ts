const presence = new Presence({
		clientId: "846282107462352927",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	let presenceData: PresenceData;
	if ("mediaSession" in navigator && navigator.mediaSession.metadata !== null) {
		presenceData = {
			largeImageKey: navigator.mediaSession.metadata.artwork[0].src,
			details: navigator.mediaSession.metadata.title,
			state: navigator.mediaSession.metadata.artist,
		};
		presence.setActivity(presenceData);
		return;
	} else if (location.pathname === "/history") {
		presenceData = {
			details: "Schaut die Historie an",
		};
	} else if (location.pathname === "/bots") {
		presenceData = {
			details: "Interresiert sich für die Bots",
		};
	} else {
		presenceData = {
			details: "Durch Stöbert die Webseite",
		};
	}
	presenceData.startTimestamp = browsingTimestamp;
	presenceData.largeImageKey = "https://i.imgur.com/C8eRVDU.jpg";
	presence.setActivity(presenceData);
});
