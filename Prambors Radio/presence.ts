const presence = new Presence({
    clientId: "630428033966276612",
    mediaKeys: false
})
const strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
})
let presenceData: presenceData = {
    largeImageKey: "logo"
};

presence.on("UpdateData", async () => {
    if (document.location.hostname.startsWith("streaming")) {
        const status = document.querySelector("#playerBtn") ? document.querySelector("#playerBtn").className : null;
        if (status === "stopped") {
            presenceData.smallImageKey = "pause";
            presenceData.smallImageText = (await strings).pause;
        } else if (status === "playing") {
            presenceData.smallImageKey = "live";
            presenceData.smallImageText = "Streaming";
        } else {
            presenceData.smallImageKey = "play";
            presenceData.smallImageText = (await strings).play;
        };
        presenceData.state = document.querySelectorAll("span[data-radium=true]").item(3).textContent;
        presenceData.details = document.querySelectorAll("span[data-radium=true]").item(2).textContent;
        presenceData.startTimestamp = Date.now();
    } else {
        presenceData = null;
    };
    presenceData ? presence.setActivity(presenceData) : presence.setActivity();
});