var state = ["Being epic", "Just browsing", "Chilling", "You should check this out", "Now this, is epic"][Math.floor(Math.random() * 3)]
var smolimage = ["You should cop an email", "Hello there!", "Smol doggo"][Math.floor(Math.random() * 3)]

var presence = new Presence({
    clientId: "782635291105689631"
}),

strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
});

presence.on("UpdateData", async () => {
	var presenceData: PresenceData = {
        largeImageKey: "woman",
        smallImageKey: "doggo",
        smallImageText: smolimage,
        details: "On: " + location.hostname,
        state: state,
        startTimestamp: Date.now()
    };
	console.log("Why")
	
    if (presenceData.details == null) {
        presence.setTrayTitle();
        presence.setActivity();
    } else {
        presence.setActivity(presenceData);
	}
});
