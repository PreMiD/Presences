var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var presence = new Presence({
    clientId: "630896385889271819",
    mediaKeys: false
}), strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
});
var browsingStamp = Math.floor(Date.now() / 1000);
var user;
var typing;
presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    let presenceData = {};
    if (document.location.pathname.includes("/videocall/")) {
        presenceData.largeImageKey = "messenger";
        presenceData.startTimestamp = browsingStamp;
        user = document.querySelector("#u_0_0 > div.r30xiam5.m0q0jmkx.alrytcbg.hp5uecnq.g2121wdl > div > div:nth-child(5) > div > div > div > div > div.prklkq8o.t7elcel3.sd0tyowg.ocjcko58.p3f4w9ai.f5zavhip.foed1vyy > div > div > div.ocjcko58.foed1vyy > div > p");
        if (user == null || user.innerText == null) {
            user = "user not found.";
            presenceData.details = "In videocall with someone";
            presenceData.smallImageKey = "videocall";
        }
        else {
            user = user.innerText;
            presenceData.details = "In call with someone";
            presenceData.smallImageKey = "call";
        }
        presenceData.state = "(Hidden until presence settings.)";
    }
    else if (document.location.pathname.includes("/t/")) {
        presenceData.largeImageKey = "messenger";
        presenceData.startTimestamp = browsingStamp;
        user = document.querySelector('._3oh-');
        typing = document.querySelector("body > div > div > div > div:nth-child(2) > span > div._20bp > div._4_j4 > div._4rv3._7og6 > div > div._7kpk > div > div > div:nth-child(1) > div > div > div > div > div > div > span > span");
        if (typing == null) {
            presenceData.details = "Reading messages from:";
            presenceData.smallImageKey = "reading";
        }
        else {
            presenceData.details = "Writing to:";
            presenceData.smallImageKey = "writing";
        }
        presenceData.state = "(Hidden until presence settings.)";
    }
    else if (document.location.pathname.includes("/new")) {
        presenceData.largeImageKey = "messenger";
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Composing a new message";
        presenceData.smallImageKey = "writing";
    }
    else if (document.location.pathname.includes("/about")) {
        presenceData.largeImageKey = "messenger";
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Viewing the about page";
    }
    presence.setActivity(presenceData);
}));
function getTimestamps(videoTime, videoDuration) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
