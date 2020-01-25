var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var presence = new Presence({
    clientId: "636614830698004480",
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
        largeImageKey: "rlswaps"
    };
    title = document.querySelector("#offer-balance");
    user = document.querySelector("#receive-balance");
    if (document.location.pathname.includes("/history")) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Viewing their history";
    }
    else if (title.innerText !== "0.00" || user.innerText !== "0.00") {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Trading...";
        presenceData.state = title.innerText + " keys worth for " + user.innerText + "worth of items";
    }
    else {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Going to trade...";
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
