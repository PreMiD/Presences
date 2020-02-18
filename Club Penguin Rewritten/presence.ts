var presence = new Presence({
    clientId: "619984959247220750",
    mediaKeys: false
});

var elapsed = Math.floor(Date.now()/1000);

presence.on("UpdateData", async () => {

    let data: presenceData = {
        largeImageKey: "cprlogo"
    };
    presence.setActivity(data);
});
