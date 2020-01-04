var presence = new Presence({
    clientId: "661198037175238665",
    mediaKeys: false
}), strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
});
var browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", () => {
    let presenceData = {
        largeImageKey: "logo",
        smallImageKey: "reading",
        smallImageText: "Reading Node.js Doc's"
    };
    if (document.location.hostname == "nodejs.org") {
        presenceData.details = "Viewing Page:";
        presenceData.state = ('Viewing At Home Page')

    if (document.location.pathname.includes("/about")) {
          presenceData.details = "Viewing Page:";
          presenceData.state = ('About Node.js')
    
    } else if (document.location.pathname.includes("/download")) {
            presenceData.details = `Viewing Page:`; 
            presenceData.state = `Node.js Downloads`;

    } else if (document.location.pathname.includes("/docs")) {
            presenceData.details = `Viewing Page:`; 
            presenceData.state = 'About Docs';

    } else if (document.location.pathname.includes("/get-involved")) {
        presenceData.details = `Viewing Page:`; 
        presenceData.state = `Get Involved`;

    } else if (document.location.pathname.includes("/security")) {
        presenceData.details = `Viewing Page:`; 
        presenceData.state = `Security`;

    } else if (document.location.pathname.includes("/blog")) {
        presenceData.details = `Viewing Page:`; 
        presenceData.state = `Node.js News`;
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
function getTimestamps(videoTime, videoDuration) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}