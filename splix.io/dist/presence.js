var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var presence = new Presence({
    clientId: "640321591108042762",
    mediaKeys: false
}), strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
});
var browsingStamp = Math.floor(Date.now() / 1000);
var ui;
presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    let presenceData = {
        largeImageKey: "splix"
    };
    if (document.location.pathname == "/") {
        ui = document.querySelector("#playUI");
        if (ui.style.cssText == "display: none;") {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Getting ready...";
        }
        else {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = document.querySelector("#scoreBlock > span:nth-child(5)").textContent + " " + document.querySelector("#scoreBlock > span:nth-child(1)").textContent;
            presenceData.state = document.querySelector("#scoreBlock > span:nth-child(7)").textContent;
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
