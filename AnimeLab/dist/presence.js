var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var presence = new Presence({
    clientId: "641432995764633612",
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
        largeImageKey: "al"
    };
    if (document.location.hostname == "www.animelab.com") {
        if (document.location.pathname == "/") {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing home page";
        }
        else if (document.location.pathname.includes("/player/")) {
            var currentTime, duration, paused, timestamps, video;
            video = document.querySelector("#video-component");
            title = document.querySelector("#video-info-container > div > h1").textContent;
            user = document.querySelector("#video-info-container > div > h3").textContent;
            currentTime = video.currentTime;
            duration = video.duration;
            paused = video.paused;
            timestamps = getTimestamps(Math.floor(currentTime), Math.floor(duration));
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
                presenceData.details = "Looing at:";
                presenceData.state = title + " | " + user;
            }
        }
        else if (document.location.pathname.includes("/shows/")) {
            if (document.querySelector("body > div.site-wrapper > div.show-info-wrapper > div > div.row > div > div.show-info > h1") !== null) {
                presenceData.startTimestamp = browsingStamp;
                presenceData.details = "Viewing show:";
                presenceData.state = document.querySelector("body > div.site-wrapper > div.show-info-wrapper > div > div.row > div > div.show-info > h1").textContent;
            }
            else if (document.location.pathname.includes("/search")) {
                presenceData.startTimestamp = browsingStamp;
                presenceData.smallImageKey = "search";
                presenceData.details = "Searching for:";
                presenceData.state = document.querySelector("body > div.site-wrapper > div.listing-block.restricted > div > h2").textContent.replace("Search results for ", "").replace(document.querySelector("body > div.site-wrapper > div.listing-block.restricted > div > h2 > span").textContent, "");
            }
            else {
                presenceData.startTimestamp = browsingStamp;
                presenceData.details = "Browsing for shows...";
            }
        }
        else if (document.location.pathname.includes("/genres/")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing genre:";
            presenceData.state = document.querySelector("body > div.site-wrapper > div.listing-block.genre-header > div > h1").textContent;
            presenceData.smallImageKey = "reading";
        }
        else if (document.location.pathname.includes("/genres")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Browsing genres...";
        }
        else if (document.location.pathname.includes("/simulcasts")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Browsing simulcasts...";
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
