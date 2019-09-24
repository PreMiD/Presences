var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var presence = new Presence({
    clientId: "622436057866043434",
    mediaKeys: false
}), presenceData = {
    largeImageKey: "logo"
};
presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    var audio = document.querySelector("#jp_audio_0");
    if (audio !== null) {
        var title = document.querySelector(".brg-player-title");
        presenceData.details = title.innerText;
        presenceData.largeImageKey = "logo";
        presence.setTrayTitle(audio.paused ? "" : title.innerText);
        if (audio && title !== null) {
            presence.setActivity(presenceData, !audio.paused);
        }
    }
    else {
        var pageData = {
            details: "Browsing..",
            largeImageKey: "logo"
        };
        presence.setActivity(pageData);
    }
}));
function getTimestamps(videoTime, videoDuration) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
