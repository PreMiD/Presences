var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var presence = new Presence({
    clientId: "641394369651277834",
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
        largeImageKey: "globo"
    };
    if (document.location.hostname == "globoplay.globo.com") {
        if (document.location.pathname == "/") {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing home page";
        }
        else if (document.location.pathname.includes("/categorias/")) {
            presenceData.startTimestamp = browsingStamp;
            user = document.querySelector("#app > div > div > div > div.application-controller__view > span > div > div > div > div.page-template__header > h1");
            presenceData.details = "Viewing category:";
            presenceData.state = user.textContent;
            presenceData.smallImageKey = "reading";
        }
        else if (document.location.pathname.includes("/busca")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Getting ready to";
            presenceData.state = "search something up...";
            search = document.querySelector("#search-bar-input");
            if (search.value.length > 2) {
                presenceData.details = "Searching for:";
                presenceData.state = search.value;
            }
        }
        else if (document.location.pathname.includes("/programacao")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing the schedule";
        }
        else if (document.location.pathname.includes("/configuracoes")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing my settings";
        }
        else if (document.location.pathname.includes("/minha-lista")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing my watch list";
        }
        else if (document.location.pathname.includes("/p/")) {
            presenceData.startTimestamp = browsingStamp;
            user = document.querySelector("#app > div > div > div > div.application-controller__view > span > div > div > div.program-header > div > div.playkit-container > div > div.playkit-media-cover__header > h1");
            presenceData.details = "Viewing show:";
            presenceData.state = user.textContent;
            presenceData.smallImageKey = "reading";
        }
        else if (document.location.pathname.includes("/t/")) {
            presenceData.startTimestamp = browsingStamp;
            user = document.querySelector("#app > div > div > div > div.application-controller__view > span > div > div > div.title-header > div > div.playkit-container > div > div.playkit-media-cover__header > h1");
            presenceData.details = "Viewing movie:";
            presenceData.state = user.textContent;
            presenceData.smallImageKey = "reading";
        }
        else if (document.location.pathname.includes("/v/")) {
            var currentTime, duration, paused, timestamps, video;
            video = document.querySelector('video');
            currentTime = video.currentTime,
            duration = video.duration,
            paused = video.paused;
            if (document.location.pathname.includes("/programa/")) {
                title = document.querySelector('.playkit-video-info__link-text').textContent;
                presenceData.state = document.querySelector('.playkit-video-info__ep-title').textContent;
            }
            else {
                title = document.querySelector('.playkit-video-info__ep-title').textContent;
            }
            if (!isNaN(duration)) {
                timestamps = getTimestamps(Math.floor(currentTime), Math.floor(duration));
                presenceData.smallImageKey = paused ? "pause" : "play";
                presenceData.smallImageText = paused ? (yield strings).pause : (yield strings).play;
                presenceData.startTimestamp = timestamps[0];
                presenceData.endTimestamp = timestamps[1];
                presenceData.details = title;
                if (paused) {
                    delete presenceData.startTimestamp;
                    delete presenceData.endTimestamp;
                }
            }
            else if (isNaN(duration)) {
                presenceData.startTimestamp = browsingStamp;
                presenceData.details = "Looking at:";
                presenceData.state = title;
            }
        }
        else if (document.location.pathname.includes("/agora-na-globo/")) {
            presenceData.details = document.querySelector('.playkit-channels-navigation__program-name').textContent;
            presenceData.state = document.querySelector('.playkit-channels-navigation__program-time').textContent;
            presenceData.smallImageKey = "live";
            presenceData.startTimestamp = browsingStamp;
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