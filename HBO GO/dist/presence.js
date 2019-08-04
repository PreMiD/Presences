var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var presence = new Presence({
    clientId: "605437254776651786",
    mediaKeys: true
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
presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    playback =
        document.querySelector("#hbo-sdk--controller-container #hbo-sdk--controller-osd #hbo-sdk--vid #hbo-sdk--vid_Clpp_html5_mse_smooth_api") !== null &&
            document.querySelector('#hbo-sdk--controller-osd #hbo-sdk--player-header span#player-title') !== null
            ? true : false;
    var video = document.querySelector("#hbo-sdk--controller-container #hbo-sdk--controller-osd #hbo-sdk--vid #hbo-sdk--vid_Clpp_html5_mse_smooth_api");
    if (!playback || video.paused && video[0] == null) {
        presenceData: presenceData = {
            largeImageKey: "lg"
        };
        presenceData.details = "Browsing...";
        presenceData.startTimestamp = browsingStamp;
        delete presenceData.state;
        delete presenceData.smallImageKey;
        presence.setActivity(presenceData, true);
    }
    if (video[0] !== null && !isNaN(video.duration)) {
        var videoTitle, state, playerTitle;
        var a = document.querySelector('#hbo-sdk--controller-osd #hbo-sdk--player-header #player-title span');
        playerTitle = document.querySelector('#hbo-sdk--controller-osd #hbo-sdk--player-header span#player-title');
        if (a.innerText.length > 0) {
            videoTitle = playerTitle.firstChild.nodeValue;
            state = document.querySelector('#hbo-sdk--controller-osd #hbo-sdk--player-header #player-title span');
        }
        else {
            videoTitle = "Watching";
            state = document.querySelector('#hbo-sdk--controller-osd #hbo-sdk--player-header #player-title');
        }
        var uploader = document.querySelector(".video-actions-container .video-info-row .usernameWrap a"), timestamps = getTimestamps(Math.floor(video.currentTime), Math.floor(video.duration)), presenceData = {
            details: videoTitle,
            state: state.innerText,
            largeImageKey: "lg",
            smallImageKey: video.paused ? "pause" : "play",
            smallImageText: video.paused
                ? (yield strings).pause
                : (yield strings).play,
            startTimestamp: timestamps[0],
            endTimestamp: timestamps[1]
        };
        presence.setTrayTitle(video.paused ? "" : videoTitle.innerText);
        if (video.paused) {
            delete presenceData.startTimestamp;
            delete presenceData.endTimestamp;
        }
        if (videoTitle !== null && state !== null) {
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
            var video = document.querySelector("#hbo-sdk--controller-container #hbo-sdk--controller-osd #hbo-sdk--vid #hbo-sdk--vid_Clpp_html5_mse_smooth_api");
            video.paused ? video.play() : video.pause();
            break;
    }
});
function getTimestamps(videoTime, videoDuration) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
