let presence : Presence = new Presence({
    clientId: "609183409440555018"
}),
startedBrowsingTimestamp : number = Math.floor(Date.now() / 1000),
presenceData : presenceData = {
    largeImageKey: "reddit_lg",
    startTimestamp: startedBrowsingTimestamp
},
subReddit : string,
postTitle : string,
profile : string,
nickname : string,
rpanTitle : string,
path : string,
strings = presence.getStrings({
    browsing: "presence.activity.browsing",
    live: "presence.activity.live"
});

presence.on("UpdateData", async () => {
    path = window.location.pathname;
    presenceData.startTimestamp = startedBrowsingTimestamp;
    if (path.includes("comments")) {
        postTitle = document.querySelector("div._2SdHzo12ISmrC8H86TgSCp._29WrubtjAcKqzJSPdQqQ4h") != undefined ? document.querySelector("div._2SdHzo12ISmrC8H86TgSCp._29WrubtjAcKqzJSPdQqQ4h").textContent : "";
        subReddit = document.querySelector('span._1GieMuLljOrqnVpRAwz7VP').textContent;
        subReddit = subReddit == "Home" && document.querySelectorAll('._19bCWnxeTjqzBElWZfIlJb')[1] != undefined ? document.querySelectorAll('._19bCWnxeTjqzBElWZfIlJb')[1].textContent : subReddit;
        presenceData.details = "Reading '" + postTitle + "'";
        presenceData.state = subReddit;
        delete presenceData.smallImageKey;
    } else if (path.includes("user")) {
        profile = document.querySelector('span._1GieMuLljOrqnVpRAwz7VP').textContent;
        nickname = document.querySelector('h4._3W1eUu5jHdcamkzFiJDITJ') ? document.querySelector('h4._3W1eUu5jHdcamkzFiJDITJ').textContent : "";
        presenceData.details = nickname == "" ? "Viewing a profile" : "Viewing " + nickname + "'s profile";
        presenceData.state = profile;
        delete presenceData.smallImageKey;
    } else if (path.includes('search')) {
        presenceData.details = "Searching...";
        delete presenceData.state;
        presenceData.smallImageKey = "search";
        presenceData.smallImageText = "Searching";
    } else if (path.includes('rpan')) {
        rpanTitle = document.querySelector('._17PXlsAvhmFm8yKmnpboBI') ? document.querySelector('._17PXlsAvhmFm8yKmnpboBI').textContent : "Loading title...";
        presenceData.details = "Watching RPAN";
        presenceData.state = rpanTitle;
        presenceData.smallImageKey = "live";
        presenceData.smallImageText = (await strings).live;
    } else {
        subReddit = document.querySelector('span._1GieMuLljOrqnVpRAwz7VP').textContent;
        presenceData.details = (await strings).browsing;
        presenceData.state = subReddit;
        delete presenceData.smallImageKey;
    }
    presence.setActivity(presenceData, true);
});
