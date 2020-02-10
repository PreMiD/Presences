var presence = new Presence({
    clientId: "676411728925294605",
    mediaKeys: false
});
var browsingStamp = Math.floor(Date.now() / 1000);
presence.on("UpdateData", () => {
    let data = {
        largeImageKey: "orbazzo"
    };
		 if (document.location.pathname == ("/")) {
    data.details = "Guarda",
    data.state = "ORBAZZO FIERO"
    data.startTimestamp = browsingStamp;
    presence.setActivity(data);
    } else
    data.details = "Guarda",
    data.state = "ORBAZZO FIERO"
    data.startTimestamp = browsingStamp;
    presence.setActivity(data);
});
