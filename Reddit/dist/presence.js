var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let presence = new Presence({
    clientId: "609183409440555018"
}), startedBrowsingTimestamp = Math.floor(Date.now() / 1000), presenceData = {
    largeImageKey: "reddit_lg",
    startTimestamp: startedBrowsingTimestamp
}, subReddit, postTitle, profile, nickname, rpanTitle, path, strings = presence.getStrings({
    browsing: "presence.activity.browsing",
    live: "presence.activity.live"
});
presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    path = window.location.pathname;
    presenceData.startTimestamp = startedBrowsingTimestamp;
    if (path.includes("comments")) {
        postTitle = document.querySelector("div._2SdHzo12ISmrC8H86TgSCp._29WrubtjAcKqzJSPdQqQ4h") != undefined ? document.querySelector("div._2SdHzo12ISmrC8H86TgSCp._29WrubtjAcKqzJSPdQqQ4h").textContent : "";
        subReddit = document.querySelector('span._1GieMuLljOrqnVpRAwz7VP').textContent;
        subReddit = subReddit == "Home" && document.querySelectorAll('._19bCWnxeTjqzBElWZfIlJb')[1] != undefined ? document.querySelectorAll('._19bCWnxeTjqzBElWZfIlJb')[1].textContent : subReddit;
        presenceData.details = "Reading '" + postTitle + "'";
        presenceData.state = subReddit;
        delete presenceData.smallImageKey;
    }
    else if (path.includes("user")) {
        profile = document.querySelector('span._1GieMuLljOrqnVpRAwz7VP').textContent;
        nickname = document.querySelector('h4._3W1eUu5jHdcamkzFiJDITJ') ? document.querySelector('h4._3W1eUu5jHdcamkzFiJDITJ').textContent : "";
        presenceData.details = nickname == "" ? "Viewing a profile" : "Viewing " + nickname + "'s profile";
        presenceData.state = profile;
        delete presenceData.smallImageKey;
    }
    else if (path.includes('search')) {
        presenceData.details = "Searching...";
        delete presenceData.state;
        presenceData.smallImageKey = "search";
        presenceData.smallImageText = "Searching";
    }
    else if (path.includes('rpan')) {
        rpanTitle = document.querySelector('._17PXlsAvhmFm8yKmnpboBI') ? document.querySelector('._17PXlsAvhmFm8yKmnpboBI').textContent : "Loading title...";
        presenceData.details = "Watching RPAN";
        presenceData.state = rpanTitle;
        presenceData.smallImageKey = "live";
        presenceData.smallImageText = (yield strings).live;
    }
    else {
        subReddit = document.querySelector('span._1GieMuLljOrqnVpRAwz7VP').textContent;
        presenceData.details = (yield strings).browsing;
        presenceData.state = subReddit;
        delete presenceData.smallImageKey;
    }
    presence.setActivity(presenceData, true);
}));
