var presence = new Presence({
    clientId: "620432609847148544",
    mediaKeys: true
}),

    strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
});

presence.on("UpdateData", async () => {

    var video: HTMLVideoElement = document.querySelector(".vp-video-wrapper .vp-video video");
    
    if (video && !isNaN(video.duration)) {
    var title = document.querySelector("._1fHNK").textContent;
    var uploader = document.querySelector(".js-user_link").textContent;
    var timestamps = getTimestamps(Math.floor(video.currentTime),Math.floor(video.duration));

    let data: presenceData = {
        details: title,
        state: uploader,
        largeImageKey: "vimeo-logo",
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

    if (title !== null && uploader !== null) {
        presence.setActivity(data, !video.paused);
    }

    } else {
        let browsingPresence: presenceData = {
            details: "Browsing...",
            largeImageKey: "vimeo-logo",
        };
        presence.setActivity(browsingPresence);
    }
});

presence.on("MediaKeys", (key: string) => {
    switch (key) {
      case "pause":
        var video = document.querySelector(".vp-video-wrapper .vp-video video") as HTMLVideoElement;
        video.paused ? video.play() : video.pause();
        break;
    }
  });

function getTimestamps(videoTime: number, videoDuration: number) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
  }