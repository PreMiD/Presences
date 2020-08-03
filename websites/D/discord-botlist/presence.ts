var presence = new Presence({
    clientId: "739615293474603068"
}),

strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
});

presence.on("UpdateData", async () => {
    const linkArray = document.URL.replace("https://", "").split("/")

    const titleArray = document.title.split("|")
    const botTitleArray = document.title.split("-")

    var presenceData: PresenceData = {
        largeImageKey: "dbl_eu-logo"
    };

    if(!linkArray[1]) {
        presenceData.details = "Viewing a page:"
        presenceData.state = "Home page"
        if(titleArray[1] == "LPTP1.de") {
            presenceData.details = "Viewing a page:"
            presenceData.state = "Statuspage"
        }
    } else if(linkArray[1] == "users") {
        presenceData.details = "Viewing user profile:"
        presenceData.state = botTitleArray[0]
    } else if(linkArray[1] == "bots") {
        if(linkArray[2] == "all") {
            presenceData.details = "Viewing a page:"
            presenceData.state = "All Bots"
        } else if(linkArray[2] == "new") {
            presenceData.details = "Viewing a page:"
            presenceData.state = "Submit a bot"
        } else {
            if(linkArray[3] == "vote") {
                presenceData.details = "Voting for bot:"
                presenceData.state = titleArray[0]
            } else {
                presenceData.details = "Viewing bot page:"
                presenceData.state = botTitleArray[0]
            }
        }
    } else if(linkArray[1] == "login_err") {
        presenceData.details = "Viewing a page:"
        presenceData.state = "Login"
    } else if(linkArray[1] == "partner") {
        presenceData.details = "Viewing a page:"
        presenceData.state = "Partners"
    }
    if (presenceData.details == null) {
        presence.setTrayTitle(); 
        presence.setActivity();
    } else {
        presence.setActivity(presenceData); 
    }
});
