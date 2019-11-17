var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var presence = new Presence({
    clientId: "633795089600348160",
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
        largeImageKey: "logo_y"
    };
    if (document.location.hostname == "yagpdb.xyz") {
        presenceData.startTimestamp = browsingStamp;
        if (document.URL == "yagpdb.xyz") {
            presenceData.details = "Viewing the homepage";
        }
        else if (document.URL == "yagpdb.xyz/#features") {
            presenceData.details = "Viewing the features";
        }
        else if (document.URL == "yagpdb.xyz/#about") {
            presenceData.details = "Viewing the about section";
        }
        else if (document.querySelector("#main-content > header > h2") !== null) {
            title = document.querySelector("#main-content > header > h2");
            presenceData.details = "Control Panel - Editing:";
            presenceData.smallImageKey = "writing";
            presenceData.state = title.innerText;
            if (title.innerText == "News and updates") {
                presenceData.details = "Reading the news";
                presenceData.smallImageKey = "reading";
                delete presenceData.state;
            }
        }
        else if (document.location.pathname.includes("/manage/")) {
            presenceData.details = "Viewing the Control Panel";
        }
    }
    else if (document.location.hostname == "docs.yagpdb.xyz") {
        title = document.querySelector("head > title");
        search = document.querySelector("#__GITBOOK__ROOT__ > div > div.reset-3c756112--bodyContent-2f98451b > div > div.reset-3c756112--backdrop-1322b68a--sheetBackdrop-457fd54f > div > div.reset-3c756112--sheetHeader-2187bd71--small-2783b5d4 > div.reset-3c756112--sheetHeaderInner-96159b50 > div > div > div.reset-3c756112--inputInnerSizer-756c9114 > input");
        presenceData.startTimestamp = browsingStamp;
        if (search !== null) {
            if (search.value != "") {
                presenceData.details = "Docs searching for:";
                presenceData.state = search.value;
                presenceData.smallImageKey = "searching";
            }
            else {
                presenceData.details = "Docs going to search something up";
                presenceData.smallImageKey = "searching";
            }
        }
        else if (title.innerText == "MEE6 Helpdesk") {
            presenceData.details = "Browsing the helpdesk";
        }
        else {
            presenceData.details = "Docs viewing:";
            presenceData.state = title.innerText.replace(" - YAGPDB", "");
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
