var presence = new Presence({
    clientId: "692810788196581376",
    mediaKeys: false
})

presence.on("UpdateData", () => {
    let presenceData = {
        largeImageKey: "logo"
    };

    if(document.location.hostname == "docs.statcord.com") {
        presenceData.details = "Viewing:";
        presenceData.state = 'Statcord Api'
    } else if (document.location.hostname == "statcord.com") {
        presenceData.details = "Viewing Page:";
        presenceData.state = 'Main Page'
    
        if (document.location.pathname.includes("/bot/")) {
            presenceData.details = "Viewing Statistics:";
            presenceData.state = document.querySelector("#content > div.container-fluid > div:nth-child(3) > div:nth-child(1) > div > div > div > div.col.mr-2 > div.h5.mb-0.font-weight-bold").textContent

        } else if (document.location.pathname.includes("/login")) {
            presenceData.details = `Viewing Page:`;
            presenceData.state = `Login Page`;

        } else if (document.location.pathname.includes("/add")) {
            presenceData.details = `Viewing Page:`;
            presenceData.state = `Add Bot Page`;

        } else if (document.location.pathname.includes("/profile/")) {
            presenceData.details = `Viewing Page:`;
            presenceData.state = `My Bots Page`;
        }
    }
    presence.setActivity(presenceData);
    presence.setTrayTitle();
})