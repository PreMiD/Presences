var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var presence = new Presence({
    clientId: "611668948131512321",
    mediaKeys: false
}), strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused",
}), presenceData = {
    largeImageKey: "logo"
};
presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    var video = document.querySelector("#dmp_Video");
    if (video !== null && !isNaN(video.duration)) {
        var title, uploader, timestamps, live;
        title = document.querySelector(".VideoInfoTitle__videoTitle___3WLlw");
        uploader = document.querySelector(".ChannelLine__channelName___3JE1B");
        timestamps = getTimestamps(Math.floor(video.currentTime), Math.floor(video.duration));
        presenceData.details = title.innerText;
        presenceData.state = uploader.textContent;
        presenceData.largeImageKey = "logo";
        presenceData.smallImageKey = video.paused ? "pause" : "play";
        presenceData.smallImageText = video.paused ? (yield strings).pause : (yield strings).play;
        presenceData.startTimestamp = timestamps[0];
        presenceData.endTimestamp = timestamps[1];
        presence.setTrayTitle(video.paused ? "" : title.innerText);
        if (video.paused) {
            delete presenceData.startTimestamp;
            delete presenceData.endTimestamp;
        }
        if (video && title !== null && uploader !== null) {
            presence.setActivity(presenceData, !video.paused);
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
