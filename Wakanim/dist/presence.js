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
    clientId: "662841394171346955",
    
}), strings = presence.getStrings({
    browsing: "presence.activity.browsing",
    paused: "presence.playback.paused",
    playing: "presence.playback.playing",
}), browsingStamp = Math.floor(Date.now() / 1000);
function capitalize(str) {
    var text = str.toLowerCase().split(" ");
    for (var i = 0, x = text.length; i < x; i++) {
        text[i] = text[i][0].toUpperCase() + text[i].substr(1);
    }
    return text.join(" ");
}
presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    var presenceData = { largeImageKey: "wakanim" };
    var path = document.location.pathname;
    var video = document.querySelector("video");
    var title = document.querySelector(".episode_title");
    var subtitle = document.querySelector(".episode_subtitle");
    if (path.includes("/v2/catalogue/episode/") && video != null && title) {
        browsingStamp = Math.floor(Date.now() / 1000);
        presenceData.details = title.innerHTML;
        if (subtitle && subtitle.innerText) {
            presenceData.state = capitalize(subtitle.innerText);
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
    if (presenceData.details == null) {
        presence.setTrayTitle();
        presence.setActivity();
    }
    else {
        presence.setActivity(presenceData);
    }
}));
