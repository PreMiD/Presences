var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var presence = new Presence({
    clientId: "639616115873546261",
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
var playing;
presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    let presenceData = {
        largeImageKey: "rock"
    };
    if (document.location.hostname == "www.rockradio.com") {
        if (document.location.pathname == "/") {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Browsing...";
        }
        else if (document.querySelector("#now-playing > div.info-container > div.progress-container > div > span > span > span.total") !== null) {
            user = document.querySelector("#now-playing > div.info-container > div.progress-container > div > span > span > span.remain");
            title = document.querySelector("#now-playing > div.info-container > div.title-container > div > span > span.artist-name");
            replace = document.querySelector("#now-playing > div.info-container > div.title-container > div > span > span.track-name");
            presenceData.details = title.innerText + replace.innerText;
            presenceData.state = user.innerText.replace("-", "") + " left";
            playing = document.querySelector("#play-button > div > a").className == "ico icon-pause" ? "play" : "pause";
            presenceData.smallImageKey = playing;
        }
        else if (document.querySelector("#channel-title") !== null) {
            title = document.querySelector("#channel-title");
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing channel:";
            presenceData.state = title.innerText;
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
