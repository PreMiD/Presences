var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var presence = new Presence({
    clientId: "611657413350654010",
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
        document.querySelector("#player > div.jw-wrapper.jw-reset > div.jw-media.jw-reset > video") !== null
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
    var video = document.querySelector("#player > div.jw-wrapper.jw-reset > div.jw-media.jw-reset > video");
    if (video !== null) {
        var videoTitle;
        videoTitle = document.querySelector("div.playlistAssistir > div.infosAtulEpisodio > div.nomeAnime");
        var episode = document.querySelector("div.playlistAssistir > div.infosAtulEpisodio > div.epEpisodio"), timestamps = getTimestamps(Math.floor(video.currentTime), Math.floor(video.duration)), presenceData = {
            details: videoTitle.innerText,
            state: episode.innerText,
            largeImageKey: "lg",
            smallImageKey: video.paused ? "pause" : "play",
            smallImageText: video.paused
                ? (yield strings).pause
                : (yield strings).play,
            startTimestamp: timestamps[0],
            endTimestamp: timestamps[1]
        };
        presence.setTrayTitle(videoTitle.innerText);
        presenceData.details = videoTitle.innerText;
        presenceData.state = episode.innerText;
        presenceData.startTimestamp = browsingStamp;
        presence.setActivity(presenceData, true);
    }
}));
presence.on("MediaKeys", (key) => {
    switch (key) {
        case "pause":
            var video = document.querySelector("#player > div.jw-wrapper.jw-reset > div.jw-media.jw-reset > video");
            video.paused ? video.play() : video.pause();
            break;
    }
});
function getTimestamps(videoTime, videoDuration) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
