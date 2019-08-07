var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var presence = new Presence({
    clientId: "608240091126824972",
    mediaKeys: false
}), strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
});
var lastPlaybackState = null;
var playback;
var browsingStamp = Math.floor(Date.now() / 1000);
if (lastPlaybackState != playback) {
    lastPlaybackState = playback;
    browsingStamp = Math.floor(Date.now() / 1000);
}
var iFrameVideo, currentTime, duration, paused;
presence.on("iFrameData", data => {
    playback =
        data.iv !== null
            ? true : false;
    if (playback) {
        iFrameVideo = data.iv.iFrameVideo;
        currentTime = data.iv.currTime;
        duration = data.iv.dur;
        paused = data.iv.paused;
    }
    else {
        iFrameVideo = null;
        currentTime = null;
        duration = null;
        paused = null;
    }
});
presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    if (!playback) {
        presenceData: presenceData = {
            largeImageKey: "lg"
        };
        presenceData.details = "Browsing...";
        presenceData.startTimestamp = browsingStamp;
        delete presenceData.state;
        delete presenceData.smallImageKey;
        presence.setActivity(presenceData, true);
    }
    if (iFrameVideo !== null && !isNaN(duration)) {
        var videoTitle, brand;
        videoTitle = document.querySelector('.title-views.flex.column h1.tv-title');
        brand = document.querySelector('.hvpimbc-item.full a');
        console.log(videoTitle.innerText + " ---- " + brand.innerText);
        if (videoTitle && brand) {
            var a = '', timestamps = getTimestamps(Math.floor(currentTime), Math.floor(duration)), presenceData = {
                largeImageKey: "lg",
                smallImageKey: paused ? "pause" : "play",
                smallImageText: paused
                    ? (yield strings).paused
                    : (yield strings).play,
            };
            presence.setTrayTitle(paused ? "" : videoTitle.innerText);
            presenceData.details = videoTitle.innerText;
            presenceData.state = "Brand: " + brand.innerText;
            if (paused) {
                delete presenceData.startTimestamp;
                delete presenceData.endTimestamp;
            }
            if (videoTitle !== null) {
                presence.setActivity(presenceData, !paused);
            }
        }
    }
}));
function getTimestamps(videoTime, videoDuration) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
