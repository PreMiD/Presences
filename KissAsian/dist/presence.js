var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var presence = new Presence({
    clientId: "641402862961950733",
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
var iFrameVideo, currentTime, duration, paused, playback, video, timestamps;
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
presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    let presenceData = {
        largeImageKey: "ka"
    };
    if (document.location.hostname == "kissasian.sh") {
        if (document.location.pathname == "/") {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing home page";
        }
        else if (document.querySelector("#selectEpisode") !== null) {
            video = document.querySelector("#my_video_1_html5_api") || document.querySelector("#centerDivVideo > div > div > video") || document.querySelector('video');
            if (video !== null) {
                currentTime = video.currentTime;
                duration = video.duration;
                paused = video.paused;
            }
            title = document.querySelector("#navsubbar > p > a").textContent.replace("information", "").replace("Drama", "");
            user = document.querySelector("head > title").textContent.replace("Watch", "").replace("online with English sub | KissAsian", "");
            timestamps = getTimestamps(Math.floor(currentTime), Math.floor(duration));
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
                presenceData.details = "Looing at:";
                presenceData.state = user;
            }
        }
        else if (document.location.pathname.includes("/Drama/")) {
            presenceData.startTimestamp = browsingStamp;
            user = document.querySelector("#leftside > div:nth-child(1) > div.barContent > div:nth-child(2) > a");
            presenceData.details = "Viewing drama:";
            presenceData.state = user.textContent;
            presenceData.smallImageKey = "reading";
        }
        else if (document.location.pathname.includes("/DramaList")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing drama list";
            presenceData.smallImageKey = "reading";
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
