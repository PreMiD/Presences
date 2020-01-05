var presence = new Presence({
    clientId: "662841394171346955",
    mediaKeys: false
}),

strings = presence.getStrings({
    browsing: "presence.activity.browsing",
    paused: "presence.playback.paused",
    playing: "presence.playback.playing",
}),

browsingStamp = Math.floor(Date.now() / 1000);


function capitalize(str) {
    var text = str.toLowerCase().split(" ");
    for (var i = 0, x = text.length; i < x; i++) {
        text[i] = text[i][0].toUpperCase() + text[i].substr(1);
    }

    return text.join(" ");
}


presence.on("UpdateData", async () => {
    var presenceData: presenceData = { largeImageKey: "wakanim" };
    var path = document.location.pathname;
    var video = document.querySelector("video");

    if (path.includes("/v2/catalogue/episode/") && video != null) {
        browsingStamp = Math.floor(Date.now() / 1000);
        presenceData.details = document.querySelector(".episode_title").innerHTML;
        presenceData.state = capitalize(document.querySelector(".episode_subtitle").innerText);

        if (video.paused) {
            presenceData.smallImageKey = "paused";
            presenceData.smallImageText = (await strings).paused;
        } else {
            presenceData.startTimestamp = Math.floor(Date.now() / 1000);
            presenceData.endTimestamp = Math.floor(presenceData.startTimestamp + (video.duration - video.currentTime));
            presenceData.smallImageKey = "playing";
            presenceData.smallImageText = (await strings).playing;
        }
    } else {
        presenceData.details = (await strings).browsing;
        presenceData.startTimestamp = browsingStamp;
    }

    if (presenceData.details == null) {
        presence.setTrayTitle();
        presence.setActivity();
    } else {
        presence.setActivity(presenceData);
    }
});
