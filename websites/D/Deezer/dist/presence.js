var presence = new Presence({
    clientId: "607651992567021580"
});
var strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused",
    live: "presence.activity.live"
});
function getTimestamps(audioTime, audioDuration) {
    var splitAudioTime = audioTime.split(":");
    var splitAudioDuration = audioDuration.split(":");
    var parsedAudioTime = parseInt(splitAudioTime[0]) * 60 + parseInt(splitAudioTime[1]);
    var parsedAudioDuration = parseInt(splitAudioDuration[0]) * 60 + parseInt(splitAudioDuration[1]);
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - parsedAudioTime + parsedAudioDuration;
    return [Math.floor(startTime / 1000), endTime];
}
var live, prevLive, elapsed, author, title, timestamps;
presence.on("UpdateData", async () => {
    var player = document.querySelector(".page-player");
    if (player) {
        var paused = document.querySelector(".svg-icon-group-item:nth-child(3) .svg-icon-pause") === null;
        var on_air = document.querySelector(".track-label");
        if (on_air && on_air.textContent == "ON AIR") {
            live = true;
            if (prevLive !== live) {
                prevLive = live;
                elapsed = Math.floor(Date.now() / 1000);
            }
        }
        else {
            live = false;
        }
        if (!live) {
            title = document.querySelector(".track-link:nth-child(1)").textContent;
            author = document.querySelector(".track-link:nth-child(2)").textContent;
            var audioTime = document.querySelector(".slider-counter-current")
                .textContent;
            var audioDuration = document.querySelector(".slider-counter-max")
                .textContent;
            timestamps = getTimestamps(audioTime, audioDuration);
        }
        else {
            title = document.querySelector(".marquee-content").textContent;
            author = "On Air";
            timestamps = [elapsed, undefined];
        }
        var data = {
            details: title,
            state: author,
            largeImageKey: "deezer",
            smallImageKey: paused ? "pause" : "play",
            smallImageText: paused ? (await strings).pause : (await strings).play,
            startTimestamp: timestamps[0],
            endTimestamp: timestamps[1]
        };
        if (live) {
            data.smallImageKey = "live";
            data.smallImageText = (await strings).live;
        }
        if (paused) {
            delete data.startTimestamp;
            delete data.endTimestamp;
        }
        if (timestamps[0] === timestamps[1]) {
            var details = "Browsing...";
            var state = undefined;
            var header = document.querySelector("div.header-infos.ellipsis > h1");
            var playlist = document.querySelector("#page_naboo_playlist");
            if (playlist) {
                details = "Viewing Playlist";
            }
            var album = document.querySelector("#page_naboo_album");
            if (album) {
                details = "Viewing Album";
            }
            var artist = document.querySelector("#page_naboo_artist");
            if (artist) {
                details = "Viewing Artist";
            }
            var podcast = document.querySelector("#page_naboo_podcast");
            if (podcast) {
                details = "Viewing Podcast";
            }
            if (header) {
                state = header.textContent;
            }
            presence.setActivity({
                details: details,
                state: state,
                largeImageKey: "deezer"
            }, true);
        }
        else if (title !== null && author !== null) {
            presence.setActivity(data, !paused);
        }
    }
    else {
        presence.clearActivity();
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUNILElBQUksT0FBTyxHQUFHLFFBQVEsQ0FBQyxVQUFVLENBQUM7SUFDaEMsSUFBSSxFQUFFLDJCQUEyQjtJQUNqQyxLQUFLLEVBQUUsMEJBQTBCO0lBQ2pDLElBQUksRUFBRSx3QkFBd0I7Q0FDL0IsQ0FBQyxDQUFDO0FBRUgsU0FBUyxhQUFhLENBQ3BCLFNBQWlCLEVBQ2pCLGFBQXFCO0lBRXJCLElBQUksY0FBYyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDMUMsSUFBSSxrQkFBa0IsR0FBRyxhQUFhLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRWxELElBQUksZUFBZSxHQUNqQixRQUFRLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNqRSxJQUFJLG1CQUFtQixHQUNyQixRQUFRLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsUUFBUSxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFekUsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQzNCLElBQUksT0FBTyxHQUNULElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxHQUFHLGVBQWUsR0FBRyxtQkFBbUIsQ0FBQztJQUN2RSxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFDakQs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