var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var presence = new Presence({
    clientId: "609774216430092298",
    mediaKeys: false
}), presenceData;
presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    if (document.location.pathname == ("/home")) {
        presenceData = {
            details: "Viewing the homepage",
            largeImageKey: "logo"
        };
    }
    else if (document.location.pathname.startsWith("/home/download")) {
        presenceData = {
            details: "downloading the game",
            largeImageKey: "logo"
        };
    }
    else if (document.location.pathname.startsWith("/beatmapsets")) {
        presenceData = {
            details: "Searching for new beatmaps",
            largeImageKey: "logo"
        };
    }
    else if (document.location.pathname.startsWith("/store")) {
        presenceData = {
            details: "Browsing through the store",
            largeImageKey: "logo"
        };
    }
    else if (document.location.pathname.startsWith("/rankings")) {
        presenceData = {
            details: "Browsing through the rankings",
            largeImageKey: "logo"
        };
    }
    else if (document.location.pathname.startsWith("/forums")) {
        presenceData = {
            details: "Browsing through the forum",
            largeImageKey: "logo"
        };
    }
    else if (document.location.pathname.startsWith("/home/search")) {
        presenceData = {
            details: "is searching something",
            largeImageKey: "logo"
        };
    }
    else if (document.location.pathname.startsWith("/home/account/edit")) {
        presenceData = {
            details: "changing their account settings",
            largeImageKey: "logo"
        };
    }
    else if (document.location.pathname.startsWith("/wiki")) {
        presenceData = {
            details: "Browsing through the wiki",
            largeImageKey: "logo"
        };
    }
    else if (document.location.pathname.startsWith("/users")) {
        presenceData = {
            details: "Looking at " + document.querySelector(".profile-info__name").innerText + "'s Profile",
            state: "Rank: " + document.querySelector(".value-display__value").innerText,
            largeImageKey: "logo"
        };
    }
    else {
        presenceData = {
            details: "seems to be somewhere wrongly",
            largeImageKey: "logo"
        };
    }
    presence.setActivity(presenceData);
}));
presence.on('iFrameData', function (data) {
    console.log(data);
});
function getTimestamps(videoTime, videoDuration) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
