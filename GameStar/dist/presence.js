var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var presence = new Presence({
    clientId: "640969147911503910",
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
        largeImageKey: "star"
    };
    if (document.location.hostname == "www.gamestar.de") {
        if (document.location.pathname == "/") {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Betrachtet die Startseite";
        }
        else if (document.location.pathname.includes("/artikel/")) {
            presenceData.startTimestamp = browsingStamp;
            user = document.querySelector("#content > div:nth-child(3) > div > div > div.col-xs-12.div-article-title > div:nth-child(6) > div:nth-child(1) > h1");
            presenceData.details = "Liest Artikel:";
            presenceData.state = user.textContent;
            presenceData.smallImageKey = "reading";
        }
        else if (document.location.pathname.includes("/videos/")) {
            var currentTime, duration, paused, timestamps, video;
            video = document.querySelector("#playerID > div.jw-wrapper.jw-reset > div.jw-media.jw-reset > video");
            title = document.querySelector("#content > div:nth-child(3) > div > div > div > div:nth-child(3) > div > h1").textContent;
            currentTime = video.currentTime;
            duration = video.duration;
            paused = video.paused;
            timestamps = getTimestamps(Math.floor(currentTime), Math.floor(duration));
            if (!isNaN(duration)) {
                presenceData.smallImageKey = paused ? "pause" : "play";
                presenceData.smallImageText = paused ? (yield strings).pause : (yield strings).play;
                presenceData.startTimestamp = timestamps[0];
                presenceData.endTimestamp = timestamps[1];
                presenceData.details = title.split("-")[0];
                presenceData.state = title.replace(title.split("-")[0] + "- ", "");
                if (paused) {
                    delete presenceData.startTimestamp;
                    delete presenceData.endTimestamp;
                }
            }
            else if (isNaN(duration)) {
                presenceData.startTimestamp = browsingStamp;
                presenceData.details = "Betrachtet:";
                presenceData.state = title;
            }
        }
    }
    if (presenceData.details == null) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Betrachtet Seite:";
        presenceData.state = document.querySelector("head > title").textContent;
        presence.setActivity(presenceData);
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
