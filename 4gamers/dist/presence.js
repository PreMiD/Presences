var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var presence = new Presence({
    clientId: "648494004870184981",
    mediaKeys: true
}), strings = presence.getStrings({
    reading: "presence.playback.reading"
});
var browsingStamp = Math.floor(Date.now() / 1000);
var user;
var title;
var replace;
var search;
presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    let presenceData = {
        largeImageKey: "4gamers"
    };
    if (document.location.hostname == "www.4gamers.com.tw") {
        if (document.location.pathname == "/") {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing home page";
        }
        else if (document.location.pathname.includes("/new")) {
            var title = document.getElementsByClassName("news-header-title")[0].innerHTML;
            var category = document.getElementsByClassName("news-header-category ")[0].innerHTML;
            presenceData.details = title;
            presenceData.state = "Category: " + category;
        }
        else if (document.location.pathname.includes("magazine")) {
            var title = document.getElementsByClassName("magazine-content-title")[0].innerHTML;
            var time = document.getElementsByClassName("magazine-content-time")[0].innerHTML;
            presenceData.details = title;
            presenceData.state = "Publish Date: " + time;
        }
        else if (document.location.pathname.includes("tournament")) {
            presenceData.details = "賽事專欄";
        }
    }
    if (presenceData.details == null) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Viewing site:";
        presenceData.state = "4gamers";
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