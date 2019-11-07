var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var presence = new Presence({
    clientId: "642111645774118944",
    mediaKeys: false
}), strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
});
var browsingStamp = Math.floor(Date.now() / 1000);
var user;
var title;
var replace;
var search;
presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    let presenceData = {
        largeImageKey: "vg"
    };
    if (document.location.hostname == "vuighe.net") {
        if (document.location.pathname == "/") {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Đang xem trang chủ";
        }
        else if (document.querySelector("#player > video.player-video") !== null) {
            var currentTime, duration, paused, timestamps, video;
            video = document.querySelector("#player > video.player-video");
            if (video == null) {
                video = document.querySelector("#centerDivVideo > div > div > video");
            }
            title = document.querySelector("body > div.container > div.film-info > h1").textContent;
            user = document.querySelector("body > div.container > div.film-info > div.film-info-views").textContent;
            if (video !== null) {
                currentTime = video.currentTime;
                duration = video.duration;
                paused = video.paused;
                timestamps = getTimestamps(Math.floor(currentTime), Math.floor(duration));
            }
            if (!isNaN(duration)) {
                presenceData.smallImageKey = paused ? "pause" : "play";
                presenceData.smallImageText = paused ? (yield strings).pause : (yield strings).play;
                presenceData.startTimestamp = timestamps[0];
                presenceData.endTimestamp = timestamps[1];
                presenceData.details = title;
                presenceData.state = user;
                if (paused) {
                    delete presenceData.startTimestamp;
                    delete presenceData.endTimestamp;
                }
            }
            else if (isNaN(duration)) {
                presenceData.startTimestamp = browsingStamp;
                presenceData.details = "Đang xem:";
                presenceData.state = title;
            }
        }
        else if (document.location.pathname.includes("/anime")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Đang xem:";
            presenceData.state = "Anime - " + document.querySelector("body > div.container > div.genre > a.genre-item.activated").textContent;
            presenceData.smallImageKey = "reading";
        }
        else if (document.location.pathname.includes("/bang-xep-hang")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Đang xem:";
            presenceData.state = "Bảng xếp hạng anime";
            presenceData.smallImageKey = "reading";
        }
        else if (document.location.pathname.includes("/tim-kiem")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.smallImageKey = "search";
            presenceData.details = document.querySelector("body > div.container > section > div.tray-title").textContent.split(": ")[0];
            presenceData.state = document.querySelector("body > div.container > section > div.tray-title").textContent.split(": ")[1];
        }
    }
    if (presenceData.details == null) {
        presence.setTrayTitle();
        presence.setActivity();
    }
    else {
        presence.setActivity(presenceData);
    }
}));
function getTimestamps(videoTime, videoDuration) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
