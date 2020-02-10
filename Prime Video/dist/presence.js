var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var presence = new Presence({
    clientId: "664568915325747230",
    mediaKeys: false
}), strings = presence.getStrings({
    browsing: "presence.activity.browsing",
    paused: "presence.playback.paused",
    playing: "presence.playback.playing",
}), browsingStamp = Math.floor(Date.now() / 1000), regex = RegExp("https:\\/\\/www\\.amazon\\.(.*?)\\/\\b(?:Prime-Video|Prime-Instant-Video|Amazon-Video|gp\\/video)\\b");
presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    var presenceData = { largeImageKey: "prime-video" };
    ;
    var video = document.querySelector("video");
    var title = document.querySelector("div.center > div > div.title");
    var subtitle = document.querySelector("div.center > div > div.subtitle");
    if (video != null && title) {
        browsingStamp = Math.floor(Date.now() / 1000);
        presenceData.details = title.textContent;
        if (subtitle && subtitle.textContent) {
            presenceData.state = subtitle.textContent;
        }
        if (video.paused) {
            presenceData.smallImageKey = "paused";
            presenceData.smallImageText = (yield strings).paused;
        }
        else {
            presenceData.startTimestamp = Math.floor(Date.now() / 1000);
            presenceData.endTimestamp = Math.floor(presenceData.startTimestamp + (video.duration - video.currentTime));
            presenceData.smallImageKey = "playing";
            presenceData.smallImageText = (yield strings).playing;
        }
    }
    else {
        presenceData.details = (yield strings).browsing;
        presenceData.startTimestamp = browsingStamp;
    }
    if (!regex.test(document.location.href) && document.location.hostname != "www.primevideo.com") {
        presence.clearActivity();
    }
    else if (presenceData.details == null) {
        presence.setTrayTitle();
        presence.setActivity();
    }
    else {
        presence.setActivity(presenceData);
    }
}));
