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
}), presenceData = {
    largeImageKey: "logo"
};
presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    if (document.location.pathname == ("/home")) {
        presenceData.details = "Viewing the homepage";
    }
    else if (document.location.pathname.startsWith("/home/download")) {
        presenceData.details = "downloading the game";
    }
    else if (document.location.pathname.startsWith("/beatmapsets")) {
        presenceData.details = "Searching for new beatmaps";
    }
    else if (document.location.pathname.startsWith("/store")) {
        presenceData.details = "Browsing through the store";
    }
    else if (document.location.pathname.startsWith("/rankings")) {
        presenceData.details = "Browsing through the rankings";
    }
    else if (document.location.pathname.startsWith("/forums")) {
        presenceData.details = "Browsing through the forum";
    }
    else if (document.location.pathname.startsWith("/home/search")) {
        presenceData.details = "is searching something";
    }
    else if (document.location.pathname.startsWith("/home/account/edit")) {
        presenceData.details = "changing their account settings";
    }
    else if (document.location.pathname.startsWith("/wiki")) {
        presenceData.details = "Browsing through the wiki";
    }
    else if (document.location.pathname.startsWith("/users")) {
        presenceData.details = "Looking at " + document.querySelector(".profile-info__name").innerText + "'s Profile";
        presenceData.state = "Rank: " + document.querySelector(".value-display__value").innerText + " / " + document.querySelector('.value-display--pp .value-display__value').innerText + "pp";
    }
    else {
        presenceData.details = "seems to be somewhere wrongly";
    }
    presence.setActivity(presenceData);
}));
presence.on('iFrameData', function (data) {
    console.log(data);
});
