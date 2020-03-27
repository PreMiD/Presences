var presence = new Presence({
    clientId: "660894911331172372",
    mediaKeys: false
}), strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
});
var browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", () => {
    let presenceData = {
        largeImageKey: "logo"
    };

    if (document.location.hostname == "status.discordlabs.org") {
        presenceData.details = "Viewing:";
        presenceData.state = ('Service Status')

    } else if (document.location.hostname == "discordlabs.org") {
        presenceData.details = "Viewing:";
        presenceData.state = ('Main Page')

        if (document.location.pathname.includes("/partners")) {
            presenceData.details = "Viewing Page:";
            presenceData.state = ('Partners')
        }

    } else if (document.location.hostname == "bots.discordlabs.org") {
        presenceData.details = "Viewing Page:";
        presenceData.state = ('Bot List')

        if (document.location.pathname.includes("/profile/")) {
            var priceEls = document.getElementsByClassName("uname");
            for (var i = 0; i < priceEls.length; i++) {
                var profilename = priceEls[i].innerText;
                presenceData.details = "Viewing a profile:";
                presenceData.state = profilename
            }

        } else if (document.location.pathname.includes("/submit")) {
            presenceData.details = "Viewing Page:";
            presenceData.state = "Bot Sumbit";

        } else if (document.location.pathname.includes("/search/")) {
            presenceData.details = `Search for:`;
            presenceData.state = window.location.href.slice(39).replace(/\+|%20/g, ' ')

        } else if (document.location.pathname.includes("/bot/")) {
            var priceEls = document.getElementsByClassName("botname");
            for (var i = 0; i < priceEls.length; i++) {
                var botname = priceEls[i].innerText;
                presenceData.details = "Viewing a Discord bot:";
                presenceData.state = botname
            }
        } else {
            presenceData.details = "Viewing Page:";
            presenceData.state = "Main Page"
        }
    }
    if (presenceData.details == null) {
        presence.setTrayTitle();
        presence.setActivity();
    } else {
        presence.setActivity(presenceData);
    }
});
