var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var presence = new Presence({
    clientId: "612704158826496028",
    mediaKeys: false
}), strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
});
var browsingStamp = Math.floor(Date.now() / 1000);
var doodleTitle;
var homepageImage;
var resultsInfo, searchTab;
var pageInput, homepageInput;
homepageInput = document.querySelector("#tsf > div:nth-child(2) > div > div.RNNXgb > div > div.a4bIc > input");
homepageImage = document.querySelector("#hplogo");
presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    let presenceData = {
        details: "In construction",
        state: "-",
        largeImageKey: "lg"
    };
    if (document.location.pathname.includes("/") && homepageInput && homepageImage || !document.location.pathname) {
        presenceData.state = "Home";
        presenceData.startTimestamp = browsingStamp;
        delete presenceData.details;
    }
    else if (document.location.pathname.startsWith("/doodles/")) {
        var searchURL = new URL(document.location.href);
        var doodleResult = searchURL.searchParams.get("q");
        doodleTitle = document.querySelector("#title-card > div > h2");
        if (document.location.pathname.includes("/about")) {
            presenceData.details = "Doodles";
            presenceData.state = "About";
            presenceData.startTimestamp = browsingStamp;
        }
        else if (doodleTitle != null) {
            presenceData.details = "Viewing a doodle:";
            presenceData.state = doodleTitle.innerText;
            presenceData.startTimestamp = browsingStamp;
        }
        else if (doodleResult && document.location.pathname == "/doodles/") {
            presenceData.details = "Searching for a doodle:";
            presenceData.state = doodleResult;
            presenceData.startTimestamp = browsingStamp;
            presenceData.smallImageKey = "search";
        }
        else {
            presenceData.details = "Current page:";
            presenceData.state = "Doodles";
            presenceData.startTimestamp = browsingStamp;
        }
    }
    else if (document.location.pathname.startsWith("/search")) {
        var searchURL = new URL(document.location.href);
        searchTab = searchURL.searchParams.get("tbm");
        resultsInfo = document.querySelector("#resultStats");
        presenceData.smallImageKey = "search";
        if (!searchTab) {
            presenceData.details = "Searching for " + homepageInput.value;
            presenceData.state = resultsInfo.innerText;
            presenceData.startTimestamp = browsingStamp;
        }
        else if (searchTab == "isch") {
            presenceData.details = "Google Images";
            presenceData.state = "Searching for " + homepageInput.value;
            presenceData.startTimestamp = browsingStamp;
        }
        else if (searchTab == "vid") {
            pageInput = document.querySelector("#lst-ib");
            presenceData.details = "Google Videos";
            presenceData.state = "Searching for " + pageInput.value;
            presenceData.startTimestamp = browsingStamp;
        }
        else if (searchTab == "nws") {
            pageInput = document.querySelector("#lst-ib");
            presenceData.details = "Google News";
            presenceData.state = "Searching for " + pageInput.value;
            presenceData.startTimestamp = browsingStamp;
        }
        else if (searchTab == "bks") {
            pageInput = document.querySelector("#lst-ib");
            presenceData.details = "Google Books";
            presenceData.state = "Searching for " + pageInput.value;
            presenceData.startTimestamp = browsingStamp;
        }
        else if (searchTab == "fin") {
            pageInput = document.querySelector("#lst-ib");
            presenceData.details = "Google Finance";
            presenceData.state = "Searching for " + pageInput.value;
            presenceData.startTimestamp = browsingStamp;
        }
        else if (searchTab == "pers") {
            pageInput = document.querySelector("#lst-ib");
            presenceData.details = "Google Personal";
            presenceData.state = "Searching for " + pageInput.value;
            presenceData.startTimestamp = browsingStamp;
        }
    }
    presence.setActivity(presenceData);
}));
function getTimestamps(videoTime, videoDuration) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
