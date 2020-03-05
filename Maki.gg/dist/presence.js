var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var presence = new Presence({
    clientId: "563434444321587202",
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
        largeImageKey: "maki"
    };
    if (document.location.hostname == "maki.gg") {
        presenceData.startTimestamp = browsingStamp;
        if (document.location.pathname.includes("/dashboard/")) {
            title = document.querySelector("div.app-content.content > div.content-wrapper > div.content-body > section.users-edit > div.card > div.card-content > div.card-body > div.tab-content > #general > div.media.mb-2 > div.media-body.mt-50 > h4.media-heading");
            presenceData.details = "Dashboard";
            presenceData.state = title.innerText;
        }
        else if (document.location.pathname.includes("/premium")) {
            presenceData.details = "Premium";
        }
        else if (document.location.pathname.includes("/commands")) {
            presenceData.details = "Commands";
        }
        else if (document.location.pathname.includes("/status")) {
            presenceData.details = "Status";
        }
        else if (document.location.pathname.includes("/profile")) {
            title = document.querySelector("div.app-content.content > div.content-wrapper > div.content-body > section.page-users-view > div.row > div.col-12 > div.card > div.card-body > div.row > div.col-12.col-sm-9.col-md-6.col-lg-5 > table > tbody > tr > tb.font-weight-bold");
            presenceData.details = "Profile";
            presenceData.state = title.innerText;
        }
        else if (document.location.pathname.includes("/verify")) {
            presenceData.details = "Verification";
        }
        else if (document.location.pathname == "/") {
            presenceData.details = "Homepage";
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
