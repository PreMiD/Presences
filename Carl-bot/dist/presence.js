var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var presence = new Presence({
    clientId: "653372675166568481",
    mediaKeys: false
}), strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
});
var browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    let presenceData = {
        largeImageKey: "carllogo"
    };
    console.log("Test")
    if (document.location.hostname == "carl.gg") {
        presenceData.startTimestamp = browsingStamp;
        if (document.location.pathname.includes("/dashboard/")) {
            presenceData.details = "Managing the settings of";
            title = document.getElementById('__BVID__16__BV_button_').innerText
            presenceData.state = "server: " + title;
        } else if (document.location.pathname.includes("/servers")) {
            presenceData.details = "Browsing through";
            presenceData.state = "servers";
        } else if (document.location.pathname.includes("/premium")) {
            presenceData.details = "Viewing Premium Plans";
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