const presence = new Presence({
    clientId: "831829384884518923"
}), timestamp = Math.floor(Date.now() / 1000);
presence.on("UpdateData", () => {
    const presenceData = {
        largeImageKey: "bot1",
        smallImageKey: "view",
        smallImageText: "Viewing",
        details: "Viewing the main page",
        state: "Viewing",
        startTimestamp: timestamp
    };
    if (window.location.pathname.endsWith("/commands")) {
        presenceData.details = "Viewing the page Commands";
        presenceData.state = "Searching for a command";
        presenceData.smallImageKey = "search";
        presenceData.smallImageText = "Searching";
    }
    else if (window.location.pathname.endsWith("/contact")) {
        presenceData.details = "Viewing the page Contacts";
        presenceData.state = "Viewing contacts info";
        presenceData.smallImageKey = "view";
        presenceData.smallImageText = "Viewing";
    }
    else if (window.location.pathname.endsWith("/thank")) {
        presenceData.details = "Added Draid to a discord server!";
        presenceData.state = "Celebrating";
        presenceData.smallImageKey = "view";
        presenceData.smallImageText = "Viewing";
    }
    if (!presenceData.details) {
        presence.setTrayTitle();
        presence.setActivity();
    }
    else
        presence.setActivity(presenceData);
});
