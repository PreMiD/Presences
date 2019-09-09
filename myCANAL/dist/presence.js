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
    clientId: "620678620041576478",
    mediaKeys: true
}), strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused",
    live: "presence.activity.live"
});
var elapsed = Math.floor(Date.now() / 1000);
presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    let data = {
        largeImageKey: "mycanal-logo"
    };
    var video = document.querySelector(".aPWk0-TaQEzvggxIT6qvP");
    if (video && !isNaN(video.duration)) {
        var Ad = document.querySelector("._3uUpH58Juk_Qbizq6j5ThG") ? true : false;
        if (!Ad) {
            var path = document.location.pathname;
            if (path.includes("/live/")) {
                var title = document.querySelector("._3tdt8zwgvMCJ6v_sElXneQ").textContent;
                data.smallImageKey = "live";
                data.smallImageText = (yield strings).live;
                data.startTimestamp = elapsed;
            }
            else {
                var title = document.querySelector(".bodyTitle___DZEtt").textContent;
                var timestamps = getTimestamps(Math.floor(video.currentTime), Math.floor(video.duration));
                data.smallImageKey = video.paused ? "pause" : "play";
                data.smallImageText = video.paused ? (yield strings).pause : (yield strings).play;
                data.startTimestamp = timestamps[0],
                    data.endTimestamp = timestamps[1];
            }
            var subtitle = document.querySelector("._39WJKEhrSYo7ftwMlFjZtA  ._3tdt8zwgvMCJ6v_sElXneQ").textContent;
            data.details = title;
            data.state = subtitle;
            if (video.paused) {
                delete data.startTimestamp;
                delete data.endTimestamp;
            }
            if (title !== null && subtitle !== null) {
                presence.setActivity(data, !video.paused);
            }
        }
        else {
            data.details = "Watching an Ad",
                presence.setActivity(data);
        }
    }
    else {
        data.details = "Browsing...",
            presence.setActivity(data);
    }
}));
function getTimestamps(videoTime, videoDuration) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
