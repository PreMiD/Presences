var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var presence = new Presence({
    clientId: "607916330271768579",
    mediaKeys: false
}), strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
});
var lastPlaybackState = null;
var reading;
var browsingStamp = Math.floor(Date.now() / 1000);
if (lastPlaybackState != reading) {
    lastPlaybackState = reading;
    browsingStamp = Math.floor(Date.now() / 1000);
}
presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    reading =
        document.querySelector("._2ymbc a") !== null &&
            document.querySelector("._2d0an.lefgy select") !== null
            ? true : false;
    var title, chapter, selected;
    if (reading) {
        title = document.querySelector("._2ymbc a");
        chapter = document.querySelector("._2d0an.lefgy select");
        selected = chapter.selectedOptions[0].text;
        let presenceData = {
            details: title.innerText,
            state: selected,
            largeImageKey: "lg"
        };
        presence.setActivity(presenceData, true);
    }
    else {
        let presenceData = {
            largeImageKey: "lg"
        };
        presenceData.details = "Browsing...";
        presenceData.startTimestamp = browsingStamp;
        delete presenceData.state;
        delete presenceData.smallImageKey;
        presence.setActivity(presenceData, true);
    }
}));
function getTimestamps(videoTime, videoDuration) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
