var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var presence = new Presence({
    clientId: "641243628903333900",
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
        largeImageKey: "ao"
    };
    if (document.location.hostname == "www.animesonline.cz") {
        if (document.location.pathname == "/") {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing home page";
        }
        else if (document.location.pathname.includes("/animes-dublado/")) {
            presenceData.startTimestamp = browsingStamp;
            user = document.querySelector("#wrapper > div.container > div.row > div:nth-child(3) > div:nth-child(1) > div.panel.panel-primary > div.panel-heading > h1 > span");
            presenceData.details = "Viewing anime dubbed:";
            presenceData.state = user.textContent;
            presenceData.smallImageKey = "reading";
        }
        else if (document.location.pathname.includes("/animes-dublado")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Browsing for anime dubbeds...";
        }
        else if (document.location.pathname.includes("/anime/")) {
            presenceData.startTimestamp = browsingStamp;
            user = document.querySelector("#wrapper > div.container > div.row > div:nth-child(3) > div:nth-child(1) > div.panel.panel-primary > div.panel-heading > h1 > span");
            presenceData.details = "Viewing anime:";
            presenceData.state = user.textContent;
            presenceData.smallImageKey = "reading";
        }
        else if (document.location.pathname.includes("/anime")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Browsing for anime...";
        }
        else if (document.location.pathname.includes("/genero")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing a genre...";
        }
        else if (document.location.pathname.includes("/videos/")) {
            var currentTime, duration, paused, timestamps, video;
            video = document.querySelector("#playersdbeta > div.jw-wrapper.jw-reset > div.jw-media.jw-reset > video");
            title = document.querySelector("#wrapper > div.container > div:nth-child(1) > div:nth-child(2) > h1").textContent;
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
                presenceData.details = "Looing at:";
                presenceData.state = title;
            }
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
