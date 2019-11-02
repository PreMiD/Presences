var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var presence = new Presence({
    clientId: "640146822257573928",
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
        largeImageKey: "valtox"
    };
    if (document.location.hostname == "valtoxgaminggroup.com") {
        if (document.location.pathname == "/") {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing home page";
        }
        else if (document.location.pathname.includes("/profile/")) {
            presenceData.startTimestamp = browsingStamp;
            user = document.querySelector("body > div:nth-child(3) > div > div:nth-child(2) > h2");
            presenceData.details = "Viewing user:";
            presenceData.state = user.innerText.replace("Sign out", "").replace(document.querySelector("body > div:nth-child(3) > div > div:nth-child(2) > h2 > span").textContent, "");
        }
        else if (document.location.pathname.includes("/logistics")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Reading about the logistics";
            presenceData.smallImageKey = "reading";
        }
        else if (document.location.pathname.includes("/about")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Reading about Valtox";
            presenceData.smallImageKey = "reading";
        }
        else if (document.location.pathname.includes("/fivem")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Reading about";
            presenceData.state = "Valtox FiveM";
            presenceData.smallImageKey = "reading";
        }
        else if (document.location.pathname.includes("/minecraft")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Reading about";
            presenceData.state = "Valtox Minecraft";
            presenceData.smallImageKey = "reading";
        }
        else if (document.location.pathname.includes("/tag")) {
            title = document.querySelector("#container > div.page > div.main-wrap > div.profile > section > header > h1");
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing tag:";
            presenceData.state = title.innerText;
        }
    }
    else if (document.location.hostname == "vtc.valtoxgaminggroup.com") {
        if (document.location.pathname.includes("/truckinglive")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing the trucking";
            presenceData.state = "live tracker";
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
