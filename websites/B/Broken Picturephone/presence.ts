var presence = new Presence({
    clientId: "756196794727399617"
});

presence.on("UpdateData", async () => {

    var browsingStamp = Math.floor(Date.now() / 1000);

    var button = document.getElementsByTagName('button');
    var valor = button.length;
    const players = document.getElementsByClassName('userActive');
    const nump = `(${players.length} of 6 players)`;

        const data: PresenceData = {
            largeImageKey: "large_image",
            startTimestamp: browsingStamp
                }

        if (valor == 1) {
            data.details = "Creating a Room";
            data.smallImageKey = "home";
            data.smallImageText = "On homepage";
        }
        if (valor >= 6) {
            data.details = "Playing";
            data.state = nump;
            data.smallImageKey = "playing";
            data.smallImageText = "On game";
            data.startTimestamp = browsingStamp
        }
        if (players.length > 6) {
            data.state = "(6 of 6 players)";
        }
        if (data.details == null) {
            presence.setTrayTitle();
            presence.setActivity();
        }
        else {
            presence.setActivity(data);
        }
});