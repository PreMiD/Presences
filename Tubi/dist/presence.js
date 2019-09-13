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
    clientId: "621835880474345473",
    mediaKeys: true
}), strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
});
presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    let data = {
        largeImageKey: "tubi-logo"
    };
    var video = document.querySelector("video#videoPlayerComponent");
    if (video && !isNaN(video.duration)) {
        var title = document.querySelector("h1._1PDoZ._1nW6s").textContent;
        var timestamps = getTimestamps(Math.floor(video.currentTime), Math.floor(video.duration));
        var subtitleCheck = document.querySelector("h2._29XQF._24NNJ") ? false : true;
        if (subtitleCheck) {
            subtitle = "Movie";
        }
        else {
            var subtitle = document.querySelector("h2._29XQF._24NNJ").textContent;
        }
        data.details = title,
            data.state = subtitle;
        data.smallImageKey = video.paused ? "pause" : "play",
            data.smallImageText = video.paused ? (yield strings).pause : (yield strings).play,
            data.startTimestamp = timestamps[0],
            data.endTimestamp = timestamps[1];
        if (video.paused) {
            delete data.startTimestamp;
            delete data.endTimestamp;
        }
        if (title !== null && subtitle !== null) {
            presence.setActivity(data, !video.paused);
        }
    }
    else {
        data.details = "Browsing...";
        presence.setActivity(data);
    }
}));
function getTimestamps(videoTime, videoDuration) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
