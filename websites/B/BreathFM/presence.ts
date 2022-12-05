const presence = new Presence({
		clientId: "846282107462352927"
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000),
	strings = presence.getStrings({
		play: "presence.playback.playing",
		pause: "presence.playback.paused"
	});

presence.on("UpdateData", async () => {
	let presenceData: PresenceData;
	if ("mediaSession" in navigator && navigator.mediaSession.metadata !== null) {
		presenceData = {
			largeImageKey: navigator.mediaSession.metadata.artwork[0].src,
			details: navigator.mediaSession.metadata.title,
			state: navigator.mediaSession.metadata.artist,
		};
	} else if (location.pathname === "/history") {
		presenceData = {
			details: "Schaut die Historie an",
			largeImageKey: "https://pbs.twimg.com/profile_images/1436408219904135171/8xqklEOk_400x400.jpg",
			startTimestamp: browsingTimestamp
		};
	} else if (location.pathname === "/bots") {
		presenceData = {
			details: "Interresiert sich für die Bots",
			largeImageKey: "https://pbs.twimg.com/profile_images/1436408219904135171/8xqklEOk_400x400.jpg",
			startTimestamp: browsingTimestamp
		};
	} else {
		presenceData = {
			details: "Durch Stöbert die Webseite",
			largeImageKey: "https://pbs.twimg.com/profile_images/1436408219904135171/8xqklEOk_400x400.jpg",
			startTimestamp: browsingTimestamp
		};
	}
	presence.setActivity(presenceData);
});
