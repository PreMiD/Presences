const presence = new Presence({
    clientId: "994723983415062548",
}), strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused",
}), browsingTimestamp = Math.floor(Date.now() / 1000);
presence.on("UpdateData", async () => {
    const presenceData = {
        largeImageKey: "dcsslogo",
        startTimestamp: browsingTimestamp,
    };
    if (window.location.hash === "#lobby")
        presenceData.details = "Browsing lobby..";
    else if (window.location.hash.startsWith("#watch")) {
        presenceData.details = `Spectating: ${document.querySelector("#stats_titleline").textContent}`;
        presenceData.state = `XL: ${document.querySelector("#stats_xl").textContent} | Location: ${document.querySelector("#stats_place").textContent}`;
        presenceData.buttons =
            [
                {
                    label: "Spectate",
                    url: document.location.href
                }
            ];
    }
    else if (window.location.hash.startsWith("#play-dcss-")) {
        presenceData.details = `Playing as: ${document.querySelector("#stats_titleline").textContent}`;
        presenceData.state = `XL: ${document.querySelector("#stats_xl").textContent} | Location: ${document.querySelector("#stats_place").textContent}`;
        presenceData.buttons =
            [
                {
                    label: "Spectate",
                    url: `http://crawl.akrasiac.org:8080/#watch-${document.querySelector("#stats_titleline").textContent.split("the")[0].trim()}`
                }
            ];
    }
    if (presenceData.details)
        presence.setActivity(presenceData);
    else
        presence.setActivity();
});
