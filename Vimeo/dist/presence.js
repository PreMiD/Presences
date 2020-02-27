var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var presence = new Presence({
    clientId: "620432609847148544",
    mediaKeys: true
}), strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
});
presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    var video = document.querySelector(".vp-video-wrapper .vp-video video");
    if (video && !isNaN(video.duration)) {
        var title = document.querySelector("._1fHNK").textContent;
        var uploader = document.querySelector(".js-user_link").textContent;
        var timestamps = getTimestamps(Math.floor(video.currentTime), Math.floor(video.duration));
        let data = {
            details: title,
            state: uploader,
            largeImageKey: "vimeo-logo",
            smallImageKey: video.paused ? "pause" : "play",
            smallImageText: video.paused
                ? (yield strings).pause
                : (yield strings).play,
            startTimestamp: timestamps[0],
            endTimestamp: timestamps[1]
        };
        if (video.paused) {
            delete data.startTimestamp;
            delete data.endTimestamp;
        }
        if (title !== null && uploader !== null) {
            presence.setActivity(data, !video.paused);
        }
    }
    else {
        let browsingPresence = {
            details: "Browsing...",
            largeImageKey: "vimeo-logo",
        };
        presence.setActivity(browsingPresence);
    }
}));
presence.on("MediaKeys", (key) => {
    switch (key) {
        case "pause":
            var video = document.querySelector(".vp-video-wrapper .vp-video video");
            video.paused ? video.play() : video.pause();
            break;
    }
});
function getTimestamps(videoTime, videoDuration) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
