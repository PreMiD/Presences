var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var presence = new Presence({
    clientId: "463151177836658699",
    mediaKeys: true
}), strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
});
presence.on("MediaKeys", (key) => {
    switch (key) {
        case "pause": {
            var video = document.querySelector(".video-stream");
            video.paused ? video.play() : video.pause();
            break;
        }
        case "nextTrack":
            document.querySelector(".next-button").click();
            break;
        case "previousTrack":
            document.querySelector(".previous-button").click();
            break;
    }
});
presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    var title = document.querySelector(".ytmusic-player-bar.title").innerText, video = document.querySelector(".video-stream");
    if (title !== "" && !isNaN(video.duration)) {
        var timestamps = getTimestamps(Math.floor(video.currentTime), Math.floor(video.duration)), presenceData = {
            details: title,
            state: getAuthorString(),
            largeImageKey: "ytm_lg",
            smallImageKey: video.paused ? "pause" : "play",
            smallImageText: video.paused
                ? (yield strings).pause
                : (yield strings).play,
            startTimestamp: timestamps[0],
            endTimestamp: timestamps[1]
        };
        if (video.paused) {
            delete presenceData.startTimestamp;
            delete presenceData.endTimestamp;
            presence.setTrayTitle();
        }
        else
            presence.setTrayTitle(title);
        presence.setActivity(presenceData);
    }
    else
        presence.setActivity();
}));
function getAuthorString() {
    var authors = document.querySelectorAll("span yt-formatted-string.ytmusic-player-bar a"), authorsArray, authorString;
    if (authors.length > 1) {
        var year = document.querySelector("span yt-formatted-string.ytmusic-player-bar ").textContent;
        year = year.slice(year.length - 4, year.length);
        authorsArray = Array.from(authors);
        authorString = `${authorsArray
            .slice(0, authorsArray.length - 1)
            .map(a => a.innerText)
            .join(", ")} - ${authorsArray[authorsArray.length - 1].innerText} (${year})`;
    }
    else
        authorString = document.querySelector("span yt-formatted-string.ytmusic-player-bar").innerText;
    return authorString;
}
function getTimestamps(videoTime, videoDuration) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
