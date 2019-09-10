var presence = new Presence({
    clientId: "620829310399545344",
    mediaKeys: false
});

var elapsed = Math.floor(Date.now()/1000);

presence.on("UpdateData", async () => {

    let data: presenceData = {
        largeImageKey: "skribblio-logo"
    };
    var inGame = document.querySelector("#containerGamePlayers").textContent === "" ? false : true;
    if(inGame) {
        var round = document.querySelector("#round").textContent;
        data.details = round
        if (elapsed == null) {
            elapsed = Math.floor(Date.now()/1000);
        }
        data.startTimestamp = elapsed
    } else {
        data.details = "Viewing the Homepage"
        elapsed = null;
    }
    presence.setActivity(data);
});