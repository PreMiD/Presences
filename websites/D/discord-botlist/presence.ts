var presence = new Presence({
    clientId: "739615293474603068"
}),

strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
});

presence.on("UpdateData", async () => {
    var needState = false
    var whichState = 0
    var browsingStamp = Math.floor(Date.now() / 1000);

    const titleArray = document.title.split("|")
    var titlenName = ""
    if(titleArray[1] == " Your Discord Bot List") {
        titlenName = "main page"
    } else if(titleArray[0] == "Partner") {
        titlenName = "partner page"
    } else if(titleArray[0] == "Login ") {
        titlenName = "login page"
    } else if(titleArray[0] == "Submit your Bot") {
        titlenName = "submit page"
    } else if(titleArray[1] == " All Bots") {
        titlenName = "all bots"
    } else if(titleArray[1] == " LPTP1.de") {
        titlenName = "status page"
    } else if(document.title.split("-")[1]) {
        const botTitleArray = document.title.split("-")
        titlenName = botTitleArray[0]
        needState = true
        whichState = 1 //1 = Botpage
    } else if(titleArray[1] == " Vote") {
        needState = true
        titlenName = titleArray[0]
        whichState = 2 //2 = Votepage
    } else {
        titlenName = "a page"
    }

    var presenceData: PresenceData = {
        largeImageKey: "dbl_eu-logo", 
        details: "Viewing "+titlenName,
        startTimestamp: browsingStamp, 
    };

    if(needState) {
        if(whichState == 1) {
            presenceData.state = "Botpage";
        } else if(whichState == 2) {
            presenceData.state = "Votepage";
        }
    }

    if (presenceData.details == null) {
        presence.setTrayTitle(); 
        presence.setActivity();
    } else {
        presence.setActivity(presenceData); 
    }
});
