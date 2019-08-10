var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var presence = new Presence({
    clientId: "609531561389588480",
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
        document.querySelector("video.dplayer-video.dplayer-video-current") !== null
            ? true : false;
    if (!playback) {
        let presenceData = {
            largeImageKey: "lg"
        };
        presenceData.details = "Browsing...";
        presenceData.startTimestamp = browsingStamp;
        delete presenceData.state;
        delete presenceData.smallImageKey;
        presence.setActivity(presenceData, true);
    }
    var video = document.querySelector("video.dplayer-video.dplayer-video-current");
    if (video !== null) {
        var videoTitle, streamer;
        videoTitle = document.querySelector('.info-line-left.flex-box .flex-column.flex-justify-center div');
        streamer = document.querySelector('div.channel-header span.dlive-name span.overflow-ellipsis');
        let presenceData = {
            largeImageKey: "lg",
            smallImageKey: "live"
        };
        presence.setTrayTitle(videoTitle.innerText);
        presenceData.details = videoTitle.innerText;
        presenceData.state = streamer.innerText;
        presenceData.startTimestamp = browsingStamp;
        presence.setActivity(presenceData, true);
    }
}));
presence.on("MediaKeys", (key) => {
    switch (key) {
        case "pause":
            var video = document.querySelector(".jw-video video");
            video.paused ? video.play() : video.pause();
            break;
    }
});
function getTimestamps(videoTime, videoDuration) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
