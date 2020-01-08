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

    regex = RegExp("https:\\/\\/www\\.amazon\\.(.*?)\\/\\b(?:Prime-Video|gp\\/video)\\b");


presence.on("UpdateData", async () => {
    var presenceData: presenceData = { largeImageKey: "prime-video" };;
    var video = document.querySelector("video");

    if (video != null) {
        browsingStamp = Math.floor(Date.now() / 1000);
        presenceData.details = document.querySelector("#dv-web-player > div > div:nth-child(1) > div > div " +
            "> div:nth-child(2) > div > div > div.scalingUiContainerBottom > div > div.controlsOverlay " +
            "> div.controlsOverlayTop > div.controlsOverlayTopMain > div.controlsOverlayTopRight > div > div.center " +
            "> div > div.title"
        ).innerText;
        presenceData.state = document.querySelector(
            "#dv-web-player > div > div:nth-child(1) > div > div > div:nth-child(2) > div > div " +
            "> div.scalingUiContainerBottom > div > div.controlsOverlay > div.controlsOverlayTop " +
            "> div.controlsOverlayTopMain > div.controlsOverlayTopRight > div > div.center > div > div.subtitle"
        ).innerText;

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

    if (! regex.test(window.location.href)) {
        presence.clearActivity();
    }
    else if (presenceData.details == null) {
        presence.setTrayTitle();
        presence.setActivity();
    } else {
        presence.setActivity(presenceData);
    }
});
