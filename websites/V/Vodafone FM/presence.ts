const presence = new Presence({
		clientId: "1061398473368412210",
	}),
	strings = presence.getStrings({
		play: "presence.playback.playing",
		pause: "presence.playback.paused",
	});

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "logo_512",
		details: "Jamming fr fr...",
		startTimestamp: Math.floor(Date.now() / 1000),
	};

	presence.setActivity(presenceData);
});
