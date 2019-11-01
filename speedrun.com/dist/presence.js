var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var presence = new Presence({
    clientId: "639603634451120138",
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
        largeImageKey: "run"
    };
    if (document.location.hostname == "www.speedrun.com") {
        if (document.location.pathname == "/") {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing home page";
        }
        else if (document.location.pathname.includes("/games")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing all games";
        }
        else if (document.location.pathname.includes("/streams")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing all streams";
        }
        else if (document.location.pathname.includes("/thread/")) {
            title = document.querySelector("#centerbar > div > div:nth-child(1) > span");
            presenceData.smallImageKey = "reading";
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing forum post:";
            if (title.innerText.length > 128) {
                presenceData.state = title.innerText.substring(0, 125) + "...";
            }
            else {
                presenceData.state = title.innerText;
            }
        }
        else if (document.location.pathname.includes("/forum")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Browsing the forums...";
        }
    }
    if (presenceData.details == null) {
        title = document.querySelector("head > title");
        presenceData.state = title.innerText.replace(" - speedrun.com", "");
        presenceData.details = "Viewing:";
        presenceData.startTimestamp = browsingStamp;
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
