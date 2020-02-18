var presence = new Presence({
    clientId: "679008701063102512",
    mediaKeys: false
});

var elapsed = Math.floor(Date.now()/1000);

presence.on("UpdateData", async () => {
    if (document.URL.includes("/#/login")) {
        let data: presenceData = {
            largeImageKey: "cprlogo",
            details: "In-Game", //Or logging in
            startTimestamp: elapsed
        };
        presence.setActivity(data);
    } else if (document.URL.includes("/#/redeem")) {
        let data: presenceData = {
            largeImageKey: "redeemred",
            details: "Redeeming a Code",
            startTimestamp: elapsed
        };
        presence.setActivity(data);
    } else {
        let data: presenceData = {
            largeImageKey: "idlepuffle",
            details: "Viewing Homepage",
            startTimestamp: elapsed
        };
        presence.setActivity(data);
    }
});
