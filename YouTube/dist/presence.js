var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var presence = new Presence({
    clientId: "463097721130188830",
    mediaKeys: true
}), strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused",
    live: "presence.activity.live"
});
presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    var video = document.querySelector(".video-stream");
    if (video !== null && !isNaN(video.duration)) {
        var oldYouTube = null;
        var title;
        document.querySelector(".watch-title") !== null
            ? (oldYouTube = true)
            : (oldYouTube = false);
        if (!oldYouTube) {
            title =
                document.location.pathname !== "/watch"
                    ? document.querySelector(".ytd-miniplayer .title")
                    : document.querySelector(".title.ytd-video-primary-info-renderer");
        }
        else {
            if (document.location.pathname == "/watch")
                title = document.querySelector(".watch-title");
        }
        var uploader = document.querySelector("#owner-name a") !== null
            ? document.querySelector("#owner-name a")
            : document.querySelector(".yt-user-info a"), timestamps = getTimestamps(Math.floor(video.currentTime), Math.floor(video.duration)), live = Boolean(document.querySelector(".ytp-live")), presenceData = {
            details: title.innerText,
            state: uploader.textContent,
            largeImageKey: "yt_lg",
            smallImageKey: video.paused ? "pause" : "play",
            smallImageText: video.paused
                ? (yield strings).pause
                : (yield strings).play,
            startTimestamp: timestamps[0],
            endTimestamp: timestamps[1]
        };
        presence.setTrayTitle(video.paused ? "" : title.innerText);
        if (video.paused || live) {
            delete presenceData.startTimestamp;
            delete presenceData.endTimestamp;
            if (live) {
                presenceData.smallImageKey = "live";
                presenceData.smallImageText = (yield strings).live;
            }
        }
        if (video && title !== null && uploader !== null) {
            presence.setActivity(presenceData, !video.paused);
        }
    }
    else {
        presence.setActivity();
        presence.setTrayTitle();
    }
}));
presence.on("MediaKeys", (key) => {
    switch (key) {
        case "pause":
            var video = document.querySelector(".video-stream");
            video.paused ? video.play() : video.pause();
            break;
        case "nextTrack":
            document.querySelector(".ytp-next-button").click();
            break;
        case "previousTrack":
            document.querySelector(".ytp-prev-button").click();
            break;
    }
});
function getTimestamps(videoTime, videoDuration) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
