var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var presence = new Presence({
    clientId: "622375113702113281",
    mediaKeys: false
}), strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused",
}), presenceData = {
    largeImageKey: "logo"
};
var playback;
var iFrameVideo, currentTime, duration, paused;
presence.on("iFrameData", data => {
    playback =
        data.iframe_video.dur !== null
            ? true : false;
    if (playback) {
        iFrameVideo = data.iframe_video.iFrameVideo;
        currentTime = data.iframe_video.currTime;
        duration = data.iframe_video.dur;
        paused = data.iframe_video.paused;
    }
});
presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    if (iFrameVideo != false && !isNaN(duration)) {
        var videoTitle, timestamps, brand;
        videoTitle = document.querySelector("div > div.title-views.flex.column > h1");
        brand = document.querySelector("div.hvpi-main.flex.column > div > div > div:nth-child(1) > a");
        timestamps = getTimestamps(Math.floor(currentTime), Math.floor(duration)),
            presenceData.details = videoTitle.innerText;
        presenceData.state = brand.innerText;
        presenceData.largeImageKey = "logo";
        presenceData.smallImageKey = paused ? "pause" : "play";
        presenceData.smallImageText = paused ? (yield strings).pause : (yield strings).play;
        presenceData.startTimestamp = timestamps[0];
        presenceData.endTimestamp = timestamps[1];
        presence.setTrayTitle(paused ? "" : videoTitle.innerText);
        if (paused) {
            delete presenceData.startTimestamp;
            delete presenceData.endTimestamp;
        }
        if (iFrameVideo && videoTitle !== null) {
            presence.setActivity(presenceData, !paused);
        }
    }
    else {
        var pageData = {
            details: "Browsing..",
            largeImageKey: "logo"
        };
        presence.setActivity(pageData);
    }
}));
function getTimestamps(videoTime, videoDuration) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
