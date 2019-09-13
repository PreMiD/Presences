var presence = new Presence({
    clientId: "617741834701242406",
    mediaKeys: true
}),

    strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused",
    live: "presence.activity.live"
});

presence.on("UpdateData", async () => {
    var video: HTMLVideoElement = document.querySelector("#main-container > div > video");
    
    if (video && !isNaN(video.duration)) {
        var title = document.querySelector("#player-video-overlay .player-title .player-title-name").textContent;
        if (document.location.pathname.includes("/live")) {
            var description = document.querySelector("#player-video-overlay .player-title div span").textContent;
        } else {
            var description = document.querySelector("#player-video-overlay .player-title div").textContent;
        }

        if (description.trim() == title) {
            description = "Movie";
        }

        var timestamps = getTimestamps(
            Math.floor(video.currentTime),
            Math.floor(video.duration)
        );

        var currentState,
            smallImageKey,
            smallImageText;
        if (description.includes("ON NOW")) {
            currentState = "Live TV";
            timestamps[0] = 0;
            timestamps[1] = 0;
            smallImageKey = "live";
            smallImageText = (await strings).live;
        } else {
            currentState = description.substring(description.lastIndexOf("  ") + 1);
            smallImageKey = video.paused ? "pause" : "play";
            smallImageText = video.paused ? (await strings).pause : (await strings).play;
        }

        var data: presenceData = {
            details: title,
            state: currentState,
            largeImageKey: "showtime-logo",
            smallImageKey: smallImageKey,
            smallImageText: smallImageText,
            startTimestamp: timestamps[0],
            endTimestamp: timestamps[1]
            
        };

        if (video.paused) {
            delete data.startTimestamp;
            delete data.endTimestamp;
        }

        if (title !== null && description !== null) {
            presence.setActivity(data, !video.paused);
        }
    } else {
        let browsingPresence: presenceData = {
            details: "Browsing...",
            largeImageKey: "showtime-logo",
        };
        presence.setActivity(browsingPresence);
    }
});

presence.on("MediaKeys", (key: string) => {
    switch (key) {
      case "pause":
        var video = document.querySelector("#main-container > div > video#player-video") as HTMLVideoElement;
        video.paused ? video.play() : video.pause();
        break;
    }
  });

function getTimestamps(videoTime: number, videoDuration: number) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
  }