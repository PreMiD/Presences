const presence = new Presence({
		clientId: "",
	}),
	strings = presence.getStrings({
		play: "presence.playback.playing",
		pause: "presence.playback.paused",
	});

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {};

	presence.setActivity(presenceData);
});
