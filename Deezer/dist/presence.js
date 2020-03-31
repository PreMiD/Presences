var presence = new Presence({
    clientId: "607651992567021580"
});
var strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused",
    live: "presence.activity.live"
});
var live, prevLive, elapsed;
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
            var title = document.querySelector(".track-link:nth-child(1)")
                .textContent;
            var author = document.querySelector(".track-link:nth-child(2)")
                .textContent;
            var audioTime = document.querySelector(".slider-counter-current")
                .textContent;
            var audioDuration = document.querySelector(".slider-counter-max")
                .textContent;
            var timestamps = getTimestamps(audioTime, audioDuration);
        }
        else {
            var title = document.querySelector(".marquee-content").textContent;
            var author = "On Air";
            var timestamps = [elapsed, undefined];
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
function getTimestamps(audioTime, audioDuration) {
    var splitAudioTime = audioTime.split(":");
    var splitAudioDuration = audioDuration.split(":");
    var parsedAudioTime = parseInt(splitAudioTime[0]) * 60 + parseInt(splitAudioTime[1]);
    var parsedAudioDuration = parseInt(splitAudioDuration[0]) * 60 + parseInt(splitAudioDuration[1]);
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - parsedAudioTime + parsedAudioDuration;
    return [Math.floor(startTime / 1000), endTime];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUNILElBQUksT0FBTyxHQUFHLFFBQVEsQ0FBQyxVQUFVLENBQUM7SUFDaEMsSUFBSSxFQUFFLDJCQUEyQjtJQUNqQyxLQUFLLEVBQUUsMEJBQTBCO0lBQ2pDLElBQUksRUFBRSx3QkFBd0I7Q0FDL0IsQ0FBQyxDQUFDO0FBRUgsSUFBSSxJQUFJLEVBQUUsUUFBUSxFQUFFLE9BQU8sQ0FBQztBQUU1QixRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxLQUFLLElBQUksRUFBRTtJQUNuQyxJQUFJLE1BQU0sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBRXBELElBQUksTUFBTSxFQUFFO1FBQ1YsSUFBSSxNQUFNLEdBQ1IsUUFBUSxDQUFDLGFBQWEsQ0FDcEIsbURBQW1ELENBQ3BELEtBQUssSUFBSSxDQUFDO1FBRWIsSUFBSSxNQUFNLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUVwRCxJQUFJLE1BQU0sSUFBSSxNQUFNLENBQUMsV0FBVyxJQUFJLFFBQVEsRUFBRTtZQUM1QyxJQUFJLEdBQUcsSUFBSSxDQUFDO1lBQ1osSUFBSSxRQUFRLEtBQUssSUFBSSxFQUFFO2dCQUNyQixRQUFRLEdBQUcsSUFBSSxDQUFDO2dCQUNoQixPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7YUFDekM7U0FDRjthQUFNO1lBQ0wsSUFBSSxHQUFHLEtBQUssQ0FBQztTQUNkO1FBRUQsSUFBSSxDQUFDLElBQUksRUFBRTtZQUNULElBQUksS0FBSyxHQUFHLFFBQVEs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