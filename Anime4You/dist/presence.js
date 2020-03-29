var presence = new Presence({
    clientId: "470178791428325376"
});
presence.on("UpdateData", async () => {
    if (document.location.pathname.startsWith("/show")) {
        let homepagePresence = {
            details: document.getElementsByClassName("titel")[0].getElementsByTagName("h3")[0].innerText,
            largeImageKey: "logo"
        };
        presence.setActivity(homepagePresence);
    }
    else if (document.location.pathname.startsWith("/speedsuche") || document.location.pathname.startsWith("/suche")) {
        let searchingPresence = {
            details: "Sucht...",
            state: "Sucht nach einem Anime",
            largeImageKey: "logo"
        };
        presence.setActivity(searchingPresence);
    }
    else if (document.location.pathname == "/") {
        let homepagePresence = {
            details: "Inaktiv...",
            state: "Hängt auf der Startseite ab",
            largeImageKey: "logo"
        };
        presence.setActivity(homepagePresence);
    }
    else if (document.location.pathname.startsWith("/animes")) {
        let overviewPresence = {
            details: "Schaut sich um...",
            state: "Sucht nach Animes",
            largeImageKey: "logo"
        };
        presence.setActivity(overviewPresence);
    }
    else if (document.location.pathname.startsWith("/kalender")) {
        let calenderPresence = {
            details: "Schaut in den Kalender",
            largeImageKey: "logo"
        };
        presence.setActivity(calenderPresence);
    }
    else {
        let inactivePresence = {
            details: "Inaktiv...",
            largeImageKey: "logo"
        };
        presence.setActivity(inactivePresence);
    }
});
presence.on('iFrameData', function (data) {
    console.log(data);
});
function getTimestamps(videoTime, videoDuration) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
