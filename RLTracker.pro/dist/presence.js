var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var presence = new Presence({
    clientId: "636659890927960064",
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
        largeImageKey: "rlt"
    };
    if (document.location.pathname == "/") {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Viewing the home page";
    }
    else if (document.location.pathname.includes("/profiles/search")) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Searching a profile";
        presenceData.smallImageKey = "search";
    }
    else if (document.location.pathname.includes("/profiles/")) {
        presenceData.startTimestamp = browsingStamp;
        title = document.querySelector("#rip_col > div.fav_no_category.main_box.main_stats_box > h4");
        presenceData.details = "Viewing stats of:";
        presenceData.state = title.innerText.split("Last update")[0];
    }
    else if (document.location.pathname.includes("/trades")) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Viewing trades";
    }
    else if (document.location.pathname.includes("live_tracker")) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Viewing the live tracker";
    }
    else if (document.location.pathname.includes("/prices")) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Viewing the price changes";
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
