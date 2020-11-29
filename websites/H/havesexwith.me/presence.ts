const state = ["Being epic", "Just browsing", "Chilling", "You should check this out", "Now this, is epic"][Math.floor(Math.random() * 3)];
const smolimage = ["You should cop an email", "Hello there!", "Smol doggo"][Math.floor(Math.random() * 3)];

const presence = new Presence({
    clientId: "782635291105689631"
}),

strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
});

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
        largeImageKey: "woman",
        smallImageKey: "doggo",
        smallImageText: smolimage,
        details: "On: " + location.hostname,
        state: state,
        startTimestamp: Date.now()
    };
	
    if (presenceData.details == null) {
        presence.setTrayTitle();
        presence.setActivity();
    } else {
        presence.setActivity(presenceData);
	}
});
