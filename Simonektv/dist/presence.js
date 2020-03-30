var presence = new Presence({
    clientId: "676411728925294605",
    
});
var browsingStamp = Math.floor(Date.now() / 1000);
presence.on("UpdateData", () => {
    let data = {
        largeImageKey: "orbazzo"
    };
    data.details = "Guarda",
    data.state = "ORBAZZO FIERO"
    data.startTimestamp = browsingStamp;
    presence.setActivity(data);
    }
);
