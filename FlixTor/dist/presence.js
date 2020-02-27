var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var presence = new Presence({
    clientId: "616754182858342426",
    mediaKeys: true
}), strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
});
var lastPlaybackState = null;
var playback;
var browsingStamp = Math.floor(Date.now() / 1000);
var season, episode;
if (lastPlaybackState != playback) {
    lastPlaybackState = playback;
    browsingStamp = Math.floor(Date.now() / 1000);
}
presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    playback =
        document.querySelector("#player > div.jw-media.jw-reset > video") !== null
            ? true : false;
    if (!playback) {
        presenceData: presenceData = {
            largeImageKey: "lg"
        };
        presenceData.details = "Browsing...";
        presenceData.startTimestamp = browsingStamp;
        delete presenceData.state;
        delete presenceData.smallImageKey;
        presence.setActivity(presenceData);
    }
    var video = document.querySelector("#player > div.jw-media.jw-reset > video");
    if (video !== null && !isNaN(video.duration)) {
        var videoTitle;
        videoTitle = document.querySelector("div.watch-header.h4.mb-0.font-weight-normal.link.hidden-sm-down");
        season = document.querySelector("#playercontainer span.outPes");
        episode = document.querySelector("#playercontainer span.outPep");
        var uploader = '', timestamps = getTimestamps(Math.floor(video.currentTime), Math.floor(video.duration)), presenceData = {
            largeImageKey: "lg",
            smallImageKey: video.paused ? "pause" : "play",
            smallImageText: video.paused
                ? (yield strings).pause
                : (yield strings).play,
            startTimestamp: timestamps[0],
            endTimestamp: timestamps[1]
        };
        presence.setTrayTitle(video.paused ? "" : videoTitle.innerText);
        if (season && episode) {
            presenceData.details = videoTitle.innerText;
            presenceData.state = "Season " + season.innerText + ", Episode " + episode.innerText;
        }
        else if (!season && episode) {
            presenceData.details = videoTitle.innerText;
            presenceData.state = "Episode " + episode.innerText;
        }
        else {
            presenceData.details = "Watching";
            presenceData.state = videoTitle.innerText;
        }
        if (video.paused) {
            delete presenceData.startTimestamp;
            delete presenceData.endTimestamp;
        }
        if (videoTitle !== null) {
            presence.setActivity(presenceData, !video.paused);
        }
    }
}));
presence.on("MediaKeys", (key) => {
    switch (key) {
        case "pause":
            var video = document.querySelector("#player > div.jw-media.jw-reset > video");
            video.paused ? video.play() : video.pause();
            break;
    }
});
function getTimestamps(videoTime, videoDuration) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
