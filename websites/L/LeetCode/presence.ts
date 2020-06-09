var presence = new Presence({
    // The client ID of the Application created at https://discordapp.com/developers/applications
    clientId: "719373053028728894"
}),

    // contains strings for our presence
    strings = presence.getStrings({
        play: "presence.playback.playing",
        pause: "presence.playback.paused"
    });

presence.on("UpdateData", async () => {
    var example: PresenceData = {
        largeImageKey: "logo", // metadata key of the large image on the presence
        smallImageText: "Some hover text", // the text which is displayed when hovering over the small image
        details: questionTitle, // The upper section of the presence text
        state: "Reading section A", // The lower section of the presence text
        startTimestamp: 1577232000, //The unix epoch timestamp for when to start counting from
    };

    if (document.location.pathname == "/") {
        const homepagePresence: PresenceData = {
            details: "Homepage",
            largeImageKey: "logo"
        };
        presence.setActivity(homepagePresence);
    } else if (document.location.pathname.startsWith("/problemset")) {
        const presenceData: PresenceData = {
            details: "Viewing Problems",
            largeImageKey: "logo"
        };
        presence.setActivity(presenceData);
    } else if (document.location.pathname.startsWith("/problems")) {
        var questionTitle: string = document.getElementsByClassName("css-v3d350")[0].innerHTML
        const presenceData: PresenceData = {
            details: questionTitle,
            state: "#Question Number, Difficulty",
            largeImageKey: "logo"
        };
        presence.setActivity(presenceData);
    } else if (document.location.pathname.startsWith("/explore")) {
        const presenceData: PresenceData = {
            details: "Explore",
            state: "Visiting Explore Modules",
            largeImageKey: "logo"
        };
        presence.setActivity(presenceData);
    } else if (document.location.pathname.startsWith("/articles")) {
        const presenceData: PresenceData = {
            details: "Reading Solutions",
            largeImageKey: "logo"
        };
        presence.setActivity(presenceData);
    } else if (document.location.pathname.startsWith("/discuss")) {
        const presenceData: PresenceData = {
            details: "Browsing Forums",
            largeImageKey: "logo"
        };
        presence.setActivity(presenceData);
    } else if (document.location.pathname.startsWith("/interview")) {
        const presenceData: PresenceData = {
            details: "Mock Interviewing...",
            largeImageKey: "logo"
        };
        presence.setActivity(presenceData);
    } else {
        const presenceData: PresenceData = {
            details: document.title
        };
        presence.setActivity(presenceData);
    }
});