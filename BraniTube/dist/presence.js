var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const presence = new Presence({
    clientId: "611657413350654010",
    mediaKeys: true
});
const stringsPromise = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
});
const startTimestamp = Math.floor(Date.now() / 1000);
presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    const presenceData = {
        largeImageKey: "lg"
    };
    const videoElement = document.querySelector("#player > div.jw-media.jw-reset > video");
    if (videoElement !== null) {
        const videoTitle = document.querySelector("div.playlistAssistir > div.infosAtulEpisodio > div.nomeAnime");
        const episode = document.querySelector("div.playlistAssistir > div.infosAtulEpisodio > div.epEpisodio");
        const timestamps = getTimestamps(Math.floor(videoElement.currentTime), Math.floor(videoElement.duration));
        const strings = yield stringsPromise;
        presenceData.details = videoTitle.innerText;
        presenceData.state = episode.innerText;
        presenceData.smallImageKey = videoElement.paused ? "pause" : "play";
        presenceData.smallImageText =
            strings[videoElement.paused ? "pause" : "play"];
        presenceData.startTimestamp = timestamps[0];
        presenceData.endTimestamp = timestamps[1];
        presence.setTrayTitle(videoTitle.innerText);
    }
    else {
        presenceData.details = "Browsing...";
        presenceData.startTimestamp = startTimestamp;
        presence.setTrayTitle();
    }
    presence.setActivity(presenceData, true);
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
