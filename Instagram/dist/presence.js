var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var presence = new Presence({
    clientId: "547436289960574977",
    mediaKeys: false
});
presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    if (document.location.pathname == ("/")) {
        let homepagePresence = {
            details: "Viewing the homepage",
            largeImageKey: "logo"
        };
        presence.setActivity(homepagePresence);
    }
    else if (document.location.pathname.startsWith("/stories")) {
        let presenceData = {
            details: "Viewing a story",
            state: document.location.pathname.split("/")[2],
            largeImageKey: "logo"
        };
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname.startsWith("/accounts")) {
        let presenceData = {
            details: "Settings",
            state: "Changing their Settings",
            largeImageKey: "logo"
        };
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname.startsWith("/p")) {
        let author = document.getElementsByClassName("FPmhX notranslate nJAzx")[0].textContent;
        let presenceData = {
            details: "Viewing a post",
            state: author,
            largeImageKey: "logo"
        };
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname.startsWith("/explore")) {
        let presenceData = {
            details: "Exploring...",
            largeImageKey: "logo"
        };
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname.startsWith("/nametag")) {
        let presenceData = {
            largeImageKey: "logo"
        };
        presence.setActivity(presenceData);
    }
    else {
        let presenceData = {
            details: "Viewing a profile",
            state: document.location.pathname.split("/")[1],
            largeImageKey: "logo"
        };
        presence.setActivity(presenceData);
    }
}));
presence.on('iFrameData', function (data) {
    console.log(data);
});
function getTimestamps(videoTime, videoDuration) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
