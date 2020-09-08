let presence = new Presence({
    clientId: "727550263786995792"
});
let browsingStamp = Math.floor(Date.now() / 1000);
presence.on("UpdateData", async () => {
    const presenceData = {
        largeImageKey: "radiot"
    };
    if (document.location.hostname == "www.radio-suomi.com") {
        if (document.location.pathname == "/") {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "🌐 Etusivulla";
        }
        else if (presenceData.details = document.querySelector(".song-name")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = `📻 ${document.querySelector(".mdc-typography--display1").textContent}`;
            presenceData.state = `🎵 ${document.querySelector(".song-name").textContent}`;
        } else {
            presenceData.details = `📻 ${document.querySelector(".mdc-typography--display1").textContent}`;
            presenceData.state = `🎵 Not Available`;
        }
    }
    if (presenceData.details == null) {
        presence.setTrayTitle();
        presence.setActivity();
    }
    else {
        presence.setActivity(presenceData);
    }
});