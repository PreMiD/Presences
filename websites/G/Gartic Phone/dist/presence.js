console.log('yes');
const presence = new Presence({
    clientId: "803366782722244638"
});
let path;
let strings;
let clipTitle;
let clipAuthor;
let clipTimeLeft;
const browsingStamp = Math.floor(Date.now() / 1000);
presence.on("UpdateData", async () => {
    strings = await presence.getStrings({
        live: "presence.activity.live",
        play: "presence.playback.playing",
        pause: "presence.playback.paused"
    });
    const presenceData = {
        largeImageKey: "glogo"
    };
    if (window.location.hostname.includes("garticphone")) {
        if (window.location.pathname.endsWith('lobby')) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Browsing lobby";
        }
        else if (window.location.pathname.endsWith('start')) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Start a story";
        }
        else if (window.location.pathname.endsWith('draw')) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Drawing...";
        }
        else if (window.location.pathname.endsWith('write')) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Writing...";
        }
        else if (window.location.pathname.endsWith('book')) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Look at the album";
        }
        else {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Browsing the home page";
        }
    }
    if (presenceData.details == null) {
        presence.setTrayTitle();
        presence.setActivity();
    }
    else {
        presence.setActivity(presenceData);
    }
});
