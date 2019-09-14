var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var presence = new Presence({
    clientId: "614388233886760972",
    mediaKeys: true
}), strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
});
var browsingStamp = Math.floor(Date.now() / 1000);
var title, views, air, air2;
var iFrameVideo, currentTime, duration, paused;
var video, videoDuration, videoCurrentTime;
var lastPlaybackState = null;
var playback;
var browsingStamp = Math.floor(Date.now() / 1000);
if (lastPlaybackState != playback) {
    lastPlaybackState = playback;
    browsingStamp = Math.floor(Date.now() / 1000);
}
if (document.location.pathname.includes(".html")) {
    presence.on("iFrameData", data => {
        playback =
            data.iframe_video.duration !== null
                ? true : false;
        if (playback) {
            iFrameVideo = data.iframe_video.iFrameVideo;
            currentTime = data.iframe_video.currTime;
            duration = data.iframe_video.dur;
            paused = data.iframe_video.paused;
        }
    });
}
presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    video = document.querySelector("#mediaplayer > div.jw-wrapper.jw-reset > div.jw-media.jw-reset > video");
    if (document.location.pathname.includes(".html") && document.location.pathname.includes("/pages/")) {
        presence.setActivity();
        presence.setTrayTitle();
    }
    else if (document.location.pathname.includes(".html")) {
        if (iFrameVideo == true && !isNaN(duration)) {
            var a = '', timestamps = getTimestamps(Math.floor(currentTime), Math.floor(duration)), presenceData = {
                largeImageKey: "ksow123stack",
                smallImageKey: paused ? "pause" : "play",
                smallImageText: paused
                    ? (yield strings).pause
                    : (yield strings).play,
                startTimestamp: timestamps[0],
                endTimestamp: timestamps[1]
            };
            title = document.querySelector("#player > div.alert.alert-info.hidden-xs > div.media > div > a > h1");
            views = document.querySelector("#player > div.alert.alert-info.hidden-xs > div.media > div > p:nth-child(7)");
            presenceData.details = title.innerText;
            air = document.querySelector("#player > div.alert.alert-info.hidden-xs > div.media > div > p:nth-child(9)");
            air2 = document.querySelector("#player > div.alert.alert-info.hidden-xs > div.media > div > p:nth-child(8)");
            if (air !== null && air.innerText.includes("Air on:")) {
                presenceData.state = views.innerText.replace("Status: ", "") + ", " + air.innerText;
            }
            else if (air2 !== null && air2.innerText.includes("Air on:")) {
                presenceData.state = views.innerText.replace("Status: ", "") + ", " + air2.innerText;
            }
            else {
                presenceData.state = views.innerText;
            }
            if (paused) {
                delete presenceData.startTimestamp;
                delete presenceData.endTimestamp;
            }
            presence.setActivity(presenceData);
        }
        else if (iFrameVideo == null && isNaN(duration)) {
            title = document.querySelector("#player > div.alert.alert-info.hidden-xs > div.media > div > a > h1");
            var a = '', timestamps = getTimestamps(Math.floor(currentTime), Math.floor(duration)), presenceData = {
                largeImageKey: "ksow123stack",
                smallImageKey: paused ? "pause" : "play",
                smallImageText: paused
                    ? (yield strings).pause
                    : (yield strings).play,
                startTimestamp: timestamps[0],
                endTimestamp: timestamps[1]
            };
            delete presenceData.endTimestamp;
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Looking at: ";
            presenceData.state = title.innerText;
            delete presenceData.smallImageText;
            presenceData.smallImageKey = "reading";
            presence.setActivity(presenceData);
        }
    }
    else if (document.location.pathname == "/") {
        var a = '', presenceData = {
            largeImageKey: "ksow123stack"
        };
        presenceData.details = "Browsing through";
        presenceData.state = "the main page";
        delete presenceData.endTimestamp;
        presenceData.startTimestamp = browsingStamp;
        delete presenceData.smallImageText;
        presenceData.smallImageKey = "reading";
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname == "/show/latest/") {
        var a = '', presenceData = {
            largeImageKey: "ksow123stack"
        };
        presenceData.details = "Browsing through";
        presenceData.state = "the latest shows";
        delete presenceData.endTimestamp;
        presenceData.startTimestamp = browsingStamp;
        delete presenceData.smallImageText;
        presenceData.smallImageKey = "reading";
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname == "/show/popular/") {
        var a = '', presenceData = {
            largeImageKey: "ksow123stack"
        };
        presenceData.details = "Browsing through";
        presenceData.state = "the most popular shows";
        delete presenceData.endTimestamp;
        presenceData.startTimestamp = browsingStamp;
        delete presenceData.smallImageText;
        presenceData.smallImageKey = "reading";
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname == "/show/rated/") {
        var a = '', presenceData = {
            largeImageKey: "ksow123stack"
        };
        presenceData.details = "Browsing through";
        presenceData.state = "the highest rated shows";
        delete presenceData.endTimestamp;
        presenceData.startTimestamp = browsingStamp;
        delete presenceData.smallImageText;
        presenceData.smallImageKey = "reading";
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname == "/show/") {
        var a = '', presenceData = {
            largeImageKey: "ksow123stack"
        };
        presenceData.details = "Browsing through";
        presenceData.state = "a list of all shows";
        delete presenceData.endTimestamp;
        presenceData.startTimestamp = browsingStamp;
        delete presenceData.smallImageText;
        presenceData.smallImageKey = "reading";
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname.includes("/show/")) {
        var a = '', presenceData = {
            largeImageKey: "ksow123stack"
        };
        views = document.querySelector("#info > div.media > div > h1 > a");
        presenceData.details = "Browsing through all episodes of:";
        presenceData.state = views.innerText;
        delete presenceData.endTimestamp;
        presenceData.startTimestamp = browsingStamp;
        delete presenceData.smallImageText;
        presenceData.smallImageKey = "reading";
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname.includes("/search/")) {
        var a = '', presenceData = {
            largeImageKey: "ksow123stack"
        };
        views = document.querySelector("#featured > div.page-header > h3");
        presenceData.details = "Searching for:";
        presenceData.state = views.innerText;
        delete presenceData.endTimestamp;
        presenceData.startTimestamp = browsingStamp;
        delete presenceData.smallImageText;
        presenceData.smallImageKey = "search";
        presence.setActivity(presenceData);
    }
    else {
        presence.setActivity();
        presence.setTrayTitle();
    }
}));
presence.on("MediaKeys", (key) => {
    switch (key) {
        case "pause":
            var video = document.querySelector(".jw-video video");
            video.paused ? video.play() : video.pause();
            break;
    }
});
function getTimestamps(videoTime, videoDuration) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
