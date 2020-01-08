var presence = new Presence({
        clientId: "664568915325747230",
        mediaKeys: false
    }),

    strings = presence.getStrings({
        browsing: "presence.activity.browsing",
        paused: "presence.playback.paused",
        playing: "presence.playback.playing",
    }),

    browsingStamp = Math.floor(Date.now() / 1000),

    regex = RegExp("https:\\/\\/www\\.amazon\\.(.*?)\\/\\b(?:Prime-Video|Prime-Instant-Video|gp\\/video)\\b");


presence.on("UpdateData", async () => {
    var presenceData: presenceData = { largeImageKey: "prime-video" };;
    var video = document.querySelector("video");
    var title = document.querySelector("div.center > div > div.title");
    var subtitle = document.querySelector("div.center > div > div.subtitle");

    if (video != null && title) {
        console.log("asd");
        browsingStamp = Math.floor(Date.now() / 1000);
        presenceData.details = title.innerText;
        if (subtitle && subtitle.innerText) {
            console.log("yeet");
            presenceData.state = subtitle.innerText;
        }

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

    if (! regex.test(document.location.href) && document.location.hostname != "www.primevideo.com") {
        presence.clearActivity();
    } else if (presenceData.details == null) {
        presence.setTrayTitle();
        presence.setActivity();
    } else {
        presence.setActivity(presenceData);
    }
});
