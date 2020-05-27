const presence = new Presence({
    clientId: "714833704131887175"
});

presence.on("UpdateData", async () => {
    const data: PresenceData = {
        largeImageKey: "logo"
    };

    const Player = document.querySelector(".player").classList;
    const Info = document.querySelector(".playing").textContent;

    if (Info) {
        const InfoSplit = Info.split('-');

        if (InfoSplit[0] && InfoSplit[1]) {
            data.details = InfoSplit[0].trim();
            data.state = InfoSplit[1].trim();
        } else {
            data.details = "Listening to :";
            data.state = Info;
        }
    }

    if (Player.contains('jp-state-playing') && !Player.contains('jp-state-seeking')) {
        data.startTimestamp = Date.now();
        data.smallImageKey = "live";
        data.smallImageText = "Live";
    } else {
        delete data.startTimestamp;
        data.smallImageKey = "pause";
        data.smallImageText = "Playback paused";
    }
  
    presence.setActivity(data);
});