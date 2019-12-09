var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var presence = new Presence({
    clientId: "642122988925485086",
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
        largeImageKey: "sh"
    };
    if (document.location.hostname == "www.skillshare.com") {
        if (document.location.pathname == "/" || document.location.pathname == "/home") {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing home page";
        }
        else if (document.location.pathname.includes("/classes/")) {
            var currentTime, duration, paused, timestamps, video;
            video = document.querySelector("#vjs_video_3_html5_api");
            if (video == null) {
                video = document.querySelector(".video-player-module > div > video");
            }
            title = document.querySelector(".class-details-header-name").textContent.trim();
            user = document.querySelector(".class-details-header-teacher").textContent.trim().replace(document.querySelector(".follow-button-wrapper-class-details").textContent, "");
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
                presenceData.state = user.replace(title.trim(), "");
                if (paused) {
                    delete presenceData.startTimestamp;
                    delete presenceData.endTimestamp;
                }
            }
            else if (isNaN(duration)) {
                presenceData.startTimestamp = browsingStamp;
                presenceData.details = "Viewing class:";
                presenceData.state = title;
                presenceData.smallImageKey = "reading";
            }
        }
        else if (document.location.pathname.includes("/profile/")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing profile of:";
            presenceData.state = document.querySelector(".full-name").textContent;
        }
        else if (document.location.pathname.includes("/workshops/")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing workshop:";
            presenceData.state = document.querySelector(".header-text").textContent;
            presenceData.smallImageKey = "reading";
        }
        else if (document.location.pathname.includes("/workshops")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Browsing for workshops...";
            presenceData.smallImageKey = "search";
        }
        else if (document.location.pathname.includes("/browse")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Browsing in type:";
            presenceData.state = document.querySelector(".main-header").textContent;
            presenceData.smallImageKey = "search";
        }
        else if (document.location.pathname.includes("/search")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Searching for:";
            presenceData.state = document.querySelector("#search-form > div > div > div.search-input-wrapper.clear > div.ellipsis.query-placeholder.left").textContent;
            presenceData.smallImageKey = "search";
        }
        else if (document.location.pathname.includes("/your-classes")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing their classes";
            presenceData.smallImageKey = "reading";
        }
        else if (document.location.pathname.includes("/my-workshops")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing their workshops";
            presenceData.smallImageKey = "reading";
        }
        else if (document.location.pathname.includes("/teach")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Writing their teacher application";
            presenceData.smallImageKey = "writing";
        }
        else if (document.location.pathname.includes("/lists/saved-classes")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing their saved classes";
            presenceData.smallImageKey = "reading";
        }
        else if (document.location.pathname.includes("/lists/watch-history")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing their watch history";
            presenceData.smallImageKey = "reading";
        }
        else if (document.location.pathname.includes("/settings")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Changing their settings...";
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
