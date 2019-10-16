var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var presence = new Presence({
    clientId: "633801594541965334",
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
        largeImageKey: "dyno"
    };
    if (document.location.hostname == "dyno.gg") {
        presenceData.startTimestamp = browsingStamp;
        if (document.location.pathname.includes("/bot")) {
            presenceData.details = "Reading about the bot";
            presenceData.smallImageKey = "reading";
        }
        else if (document.location.pathname.includes("/account")) {
            presenceData.details = "Viewing their account";
        }
        else if (document.location.pathname.includes("/manage/")) {
            presenceData.details = "Managing the settings of";
            title = document.querySelector("#dashboard-mount > div > div.column.nav-sidebar > aside > div.guild-header > h3 > div > div");
            presenceData.state = "server: " + title.innerText;
            presenceData.smallImageKey = "writing";
        }
        else if (document.location.pathname.includes("/servers")) {
            presenceData.details = "Browsing through the";
            presenceData.state = "server listings";
        }
        else if (document.location.pathname.includes("/commands")) {
            presenceData.details = "Viewing all the commands";
        }
        else if (document.location.pathname.includes("faq")) {
            presenceData.details = "Reading the FAQ";
            presenceData.smallImageKey = "reading";
        }
        else if (document.location.pathname.includes("/status")) {
            presenceData.details = "Viewing the status";
        }
        else if (document.location.pathname.includes("/upgrade")) {
            presenceData.details = "Viewing Dyno Premium Plans";
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
