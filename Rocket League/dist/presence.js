var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var presence = new Presence({
    clientId: "636649694109499393",
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
        largeImageKey: "rl"
    };
    title = document.querySelector("#offer-balance");
    user = document.querySelector("#receive-balance");
    if (document.location.hostname == "www.rocketleagueesports.com") {
        title = document.querySelector("head > title");
        presenceData.details = "Esports - Viewing:";
        presenceData.state = title.innerText.replace(" | Rocket League Esports", "");
    }
    else {
        if (document.location.pathname == "/") {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing the home page";
        }
        else if (document.location.pathname.includes("/game-info/")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Browsing through";
            presenceData.state = "the game info";
        }
        else if (document.location.pathname.includes("/news/")) {
            presenceData.startTimestamp = browsingStamp;
            if (document.querySelector("#content > div:nth-child(1) > div > div > div:nth-child(1) > h1") !== null) {
                title = document.querySelector("#content > div:nth-child(1) > div > div > div:nth-child(1) > h1");
                presenceData.details = "Reading article:";
                presenceData.state = title.innerText;
                presenceData.smallImageKey = "reading";
            }
            else {
                presenceData.details = "Browsing through";
                presenceData.state = "latest news";
            }
        }
        else if (document.location.pathname.includes("/livefeed")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Browsing through";
            presenceData.state = "the live feed";
        }
        else if (document.location.pathname.includes("/training/")) {
            if (document.location.pathname.includes("/sequence/")) {
                presenceData.startTimestamp = browsingStamp;
                presenceData.details = "Viewing training sequence:";
                title = document.querySelector("#rlg-training-page > div.row > div.col-3-3 > h1");
                presenceData.state = title.innerText;
            }
            else {
                presenceData.startTimestamp = browsingStamp;
                presenceData.details = "Browsing training maps";
            }
        }
        else if (document.location.pathname.includes("/items")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Browsing through";
            presenceData.state = "the item database";
        }
        else if (document.location.pathname.includes("/achievements")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Browsing through";
            presenceData.state = "the achievements";
        }
        else if (document.location.pathname.includes("/apply")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Browsing through";
            presenceData.state = "the applications";
        }
        else if (document.location.pathname.includes("/faq")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Browsing through";
            presenceData.state = "the FAQ";
        }
        else if (document.location.pathname.includes("/proleague")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing the proleague";
        }
        else if (document.location.pathname.includes("/rocketroyale")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing the rocketroyale";
        }
        else if (document.location.pathname.includes("/about")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing about the site";
        }
        else if (document.location.pathname.includes("/contact")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing contact details";
        }
        else if (document.location.pathname.includes("/trading")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing trading offers";
        }
        else if (document.location.pathname.includes("/trade/")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing trade of user:";
            title = document.querySelector("body > main > div > div > div > div.col-3-3.rlg-trade-page > div.rlg-trade-display-container.is--user > div.rlg-trade-display-header > a > div > div.rlg-trade-platform-name > span:nth-child(1)");
            presenceData.state = title.innerText;
        }
        else if (document.location.pathname.includes("/media")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Browsing all media stuff";
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
