var presence = new Presence({
    clientId: "641955799869947914",
    mediaKeys: true
});

presence.on("UpdateData", () => {
    var presenceData = {
        largeImageKey: "default",
        smallImageKey: "logo-square",
        smallImageText: "bargrooves.live",
        spectateSecret: "MTIzNDV8MTIzNDV8MTMyNDU0",
        details: "Bargrooves.live",
        state: "Luxury House Music",
        startTimestamp: 0,
        endTimestamp: 0
    };

    if (window.location.pathname == "/") {
        if (document.getElementById("play-pause-i").classList.value.includes("fa-pause")) {
            presenceData.details = "Listening to the radio";
            presenceData.state = document.getElementById("song").innerHTML + " - " + document.getElementById("artist").innerHTML;
            presenceData.smallImageKey = "play";
        } else {
            presenceData.details = "On website,";
            presenceData.state = "Browsing " + document.title.replace("Bargrooves FM - ", "");
            presenceData.smallImageKey = "pause";
        }
    } else if (window.location.pathname == "/player/") {
        if (document.getElementsByClassName("play-toggle")[0].classList.value.includes("fa-play")) {
            presenceData.details = "Browsing the player";
            presenceData.state = 'Looking at ' + document.title.replace("Bargrooves FM - ", "");
            presenceData.smallImageKey = "pause";
        } else {
            presenceData.details = "Listening to the player";
            presenceData.state = document.getElementById("csong").innerHTML + " - " + document.getElementById("cartist").innerHTML;
            presenceData.smallImageKey = "play";
        }
    }

    if (presenceData.details == null) {
        presence.setTrayTitle();
        presence.setActivity();
    } else {
        presence.setActivity(presenceData);
    }
});
