var presence = new Presence({
    clientId: "630480510753308694",
    mediaKeys: true
}),

    strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
});

presence.on("UpdateData", async () => {

    var video: HTMLVideoElement = document.querySelector("video.vjs-tech");
    
    if (video && !isNaN(video.duration)) {
    var title = document.querySelector(".adn-player-header a").textContent;
    var subtitle = document.querySelector(".adn-player-header span").textContent;
    var timestamps = getTimestamps(Math.floor(video.currentTime),Math.floor(video.duration));

    let data: presenceData = {
        details: title,
        state: subtitle,
        largeImageKey: "adn-logo",
        smallImageKey: video.paused ? "pause" : "play",
        smallImageText: video.paused
          ? (await strings).pause
          : (await strings).play,
        startTimestamp: timestamps[0],
        endTimestamp: timestamps[1]
    }

    if (video.paused) {
        delete data.startTimestamp;
        delete data.endTimestamp;
    }

    if (title !== null && subtitle !== null) {
        presence.setActivity(data, !video.paused);
    }

    } else {
        let browsingPresence: presenceData = {
            details: "Browsing...",
            largeImageKey: "adn-logo",
        };
        presence.setActivity(browsingPresence);
    }
});

function getTimestamps(videoTime: number, videoDuration: number) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
  }