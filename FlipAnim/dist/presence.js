var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var presence = new Presence({
    clientId: "642119548803219466",
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
        largeImageKey: "fa"
    };
    if (document.location.hostname == "flipanim.com") {
        if (document.location.pathname == "/") {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing home page";
            presenceData.smallImageKey = "writing";
        }
        else if (document.location.pathname.includes("/anim")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing anim:";
            presenceData.state = document.querySelector("#mainDivActive > div:nth-child(6) > div").textContent.trim() + " by: " + document.querySelector("#mainDivActive > div:nth-child(10) > div:nth-child(2) > div.anim_author > a:nth-child(1)").textContent;
            presenceData.smallImageKey = "reading";
        }
        else if (document.location.pathname.includes("/profile")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing profile of:";
            presenceData.state = document.querySelector("#mainDivActive > div:nth-child(4) > div.profileAvatar > div.text_normal").textContent;
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
