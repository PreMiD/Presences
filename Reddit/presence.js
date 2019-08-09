let presence = new Presence({
    clientId: "609183409440555018"
}),
startedBrowsingTimestamp = Math.floor(Date.now() / 1000),
presenceData = {
    largeImageKey: "reddit_logo",
    startTimestamp: startedBrowsingTimestamp,
    state: ""
},
subReddit,
postTitle,
profile;

presence.on("UpdateData", () => {
    presenceData.startTimestamp = startedBrowsingTimestamp;
    if (window.location.pathname.includes("comments")) {
        postTitle = document.querySelectorAll("div._2SdHzo12ISmrC8H86TgSCp._29WrubtjAcKqzJSPdQqQ4h")[0].textContent;
        subReddit = document.querySelectorAll('span._1GieMuLljOrqnVpRAwz7VP')[0].textContent;
        subReddit = subReddit == "Home" ? document.querySelectorAll('a._3ryJoIoycVkA88fy40qNJc')[51].textContent : subReddit;
        presenceData.details = "Reading '" + postTitle + "'";
        presenceData.state = subReddit; 
    } else if (window.location.pathname.includes("user")) {
        profile = document.querySelectorAll('span._1GieMuLljOrqnVpRAwz7VP')[0].textContent,
        nickname = document.querySelectorAll('h4._3W1eUu5jHdcamkzFiJDITJ')[0]
        presenceData.details = nickname == undefined ? "Viewing a profile" : "Viewing " + nickname.textContent + "'s profile";
        presenceData.state = profile;
    } else {
        subReddit = document.querySelectorAll('span._1GieMuLljOrqnVpRAwz7VP')[0].textContent;
        presenceData.details = "Browsing...";
        presenceData.state = subReddit;
    }
    presence.setActivity(presenceData, true);
});