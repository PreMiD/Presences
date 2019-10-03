// 629355416714739732
let presence = new Presence({
    clientId: "629355416714739732",
    mediaKeys: false
}),
    strings = presence.getStrings({
        play: "presence.playback.playing",
        pause: "presence.playback.paused"
});

presence.on("UpdateData", async () => {
    const path = document.location.pathname;
    let presenceData: presenceData = {
        largeImageKey: "animepahe",
        details: "loading",
        state: "animepahe"
    }
    if (!path.includes('anime')) {
        presenceData.smallImageKey = "presence_browsing_home";
        presenceData.smallImageText = "Home";
        presenceData.details = "Browsing Latest Releases";
        presenceData.state = "animepahe";
    } else if (path == "/anime") {
        presenceData.smallImageKey = "presence_browsing_all";
        presenceData.smallImageText = "Anime";
        presenceData.details = "Browsing Complete A-Z List";
        presenceData.state = "animepahe";
    } else if (!path.split("anime/")[1].includes('/')) {
        presenceData.smallImageKey = "presence_browsing_season";
        presenceData.smallImageText = "Season";
        presenceData.details = `${document.getElementsByClassName("title-wrapper")[0].children[1].textContent}`;
        presenceData.state = "Viewing Season";
    } else {
        presenceData.smallImageKey = "presence_playback_paused";
    }

    presence.setActivity(presenceData, false);
});

/**
 * Get Timestamps
 * @param {Number} videoTime Current video time seconds
 * @param {Number} videoDuration Video duration seconds
 */
function getTimestamps(videoTime: number, videoDuration: number) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}