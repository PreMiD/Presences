var presence = new Presence({
    clientId: "661150919584514067",
    mediaKeys: false
})

presence.on("UpdateData", () => {
    let presenceData = {
        largeImageKey: "logo"
    };

    if (document.location.hostname == "docs.usercord.org") {
        presenceData.details = "Viewing:";
        presenceData.state = 'UserCord Api'
    } else if (document.location.hostname == "usercord.org") {
        presenceData.details = "Viewing Page:";
        presenceData.state = 'Main Page'
    
        if (document.location.pathname.includes("/leaderboard")) {
            presenceData.details = "Viewing Page:";
            presenceData.state = ('Leaderboard')

        } else if (document.location.pathname.includes("/search/")) {
            presenceData.details = `Searching for user:`;
            presenceData.state = window.location.href.slice(31).replace(/\+|%20/g, ' ')

        } else if (document.location.pathname.includes("/member")) {
            presenceData.details = `Viewing Page:`;
            presenceData.state = `Members List`;

        } else if (document.location.pathname.includes("/edit")) {
            presenceData.details = `Editing Info For:`;
            presenceData.state = 'Own Profile';

        } else if (document.location.pathname.includes("/login")) {
            presenceData.details = `Viewing Page:`;
            presenceData.state = `Login Page`;

        } else if (document.location.pathname.includes("/reports")) {
            presenceData.details = `Viewing Page:`;
            presenceData.state = `Reports Page`;

        } else if (document.location.pathname.includes("/pro/")) {
            presenceData.details = `Viewing Page:`;
            presenceData.state = `Pro Users`;

        } else if (document.location.pathname.includes("/discord")) {
            presenceData.details = `Joining Discord..`;
            presenceData.state = `Name: DiscordLabs`;

        } else if (document.location.pathname.includes("/u/")) {
            var priceEls = document.getElementsByClassName("usertitle");
            for (var i = 0; i < priceEls.length; i++) {
                var profilename = priceEls[i].innerText;
                presenceData.details = "Viewing a profile:";
                presenceData.state = profilename
            }
        } else {
            presenceData.details = "Viewing a profile:";
            presenceData.state = profilename
        }
    }
    presence.setActivity(presenceData);
    presence.setTrayTitle();
})