var presence = new Presence({
        clientId: "630533580119998496"
    }),
    strings = presence.getStrings({
        play: "presence.playback.playing",
        pause: "presence.playback.paused"
    });

presence.on("UpdateData", async () => {
    let data: presenceData = {
        largeImageKey: "comedycentral"
    };

    if (document.location.pathname.startsWith("/episodes")) {
        var player: HTMLVideoElement = document.querySelector(
            ".edge-player-content-element"
        );

        var show = document.querySelector(".header h3 a").textContent;
        var epTitle = document.querySelector(".sub-header h1").textContent;
        var epNumber: any = document.querySelector(".meta span");
        if (epNumber) {
            var epNumber: any =
                epNumber.textContent
                    .replace("Season ", "S")
                    .replace(" Ep ", ":E") + " ";
        } else {
            var epNumber: any = "";
        }
        var timestamps = getTimestamps(
            Math.floor(player.currentTime),
            Math.floor(player.duration)
        );

        data.details = show;
        data.state = epNumber + epTitle;
        data.startTimestamp = timestamps[0];
        data.endTimestamp = timestamps[1];
        data.smallImageKey = player.paused ? "pause" : "play";
        data.smallImageText = player.paused
            ? (await strings).pause
            : (await strings).play;

        if (player.paused) {
            delete data.startTimestamp;
            delete data.endTimestamp;
        }

        presence.setActivity(data);
    } else {
        data.details = "Browsing...";
        data.startTimestamp = Date.now();

        presence.setActivity(data);
    }
});

function getTimestamps(videoTime: number, videoDuration: number) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
