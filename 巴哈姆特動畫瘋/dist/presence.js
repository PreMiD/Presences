var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var presence = new Presence({
    clientId: "640194732718292992",
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
        largeImageKey: "ani"
    };
    if (document.location.hostname == "ani.gamer.com.tw") {
        if (document.location.pathname == "/") {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing home page";
        }
        else if (document.querySelector("#ani_video_html5_api") !== null) {
            var video, videoDuration, videoCurrentTime, paused, timestamps;
            video = document.querySelector("#ani_video_html5_api");
            videoDuration = video.duration;
            videoCurrentTime = video.currentTime;
            paused = video.paused;
            timestamps = getTimestamps(Math.floor(videoCurrentTime), Math.floor(videoDuration));
            if (!isNaN(videoDuration)) {
                presenceData.smallImageKey = paused ? "pause" : "play";
                presenceData.smallImageText = paused ? (yield strings).pause : (yield strings).play;
                presenceData.startTimestamp = timestamps[0];
                presenceData.endTimestamp = timestamps[1];
                title = document.querySelector("#BH_background > div.container-player > div.anime-title > div.anime-option > section.videoname > div.anime_name > h1");
                presenceData.details = title.innerText;
                user = document.querySelector("#BH_background > div.container-player > div.anime-title > div.anime-option > section.videoname > div.anime_name > div > p");
                if (user !== null) {
                    presenceData.state = user.innerText;
                }
                if (paused) {
                    delete presenceData.startTimestamp;
                    delete presenceData.endTimestamp;
                }
            }
            else if (isNaN(videoDuration)) {
                presenceData.startTimestamp = browsingStamp;
                presenceData.details = "Looking at: ";
                title = document.querySelector("#BH_background > div.container-player > div.anime-title > div.anime-option > section.videoname > div.anime_name > h1");
                presenceData.state = title.innerText;
                presenceData.smallImageKey = "reading";
            }
        }
        else if (document.location.pathname.includes("/animeList")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing all animes";
        }
    }
    if (presenceData.details == null) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Viewing page:";
        presenceData.state = document.querySelector("head > title").textContent.replace(" - 巴哈姆特動畫瘋", "");
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
