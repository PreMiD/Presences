var presence = new Presence({
    clientId: "607651992567021580",
});
var strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused",
    live: "presence.activity.live",
});
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
            endTimestamp: timestamps[1],
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
                largeImageKey: "deezer",
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUNILElBQUksT0FBTyxHQUFHLFFBQVEsQ0FBQyxVQUFVLENBQUM7SUFDaEMsSUFBSSxFQUFFLDJCQUEyQjtJQUNqQyxLQUFLLEVBQUUsMEJBQTBCO0lBQ2pDLElBQUksRUFBRSx3QkFBd0I7Q0FDL0IsQ0FBQyxDQUFDO0FBRUgsSUFBSSxJQUFJLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLFVBQVUsQ0FBQztBQUV2RCxRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxLQUFLLElBQUksRUFBRTtJQUNuQyxJQUFJLE1BQU0sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBRXBELElBQUksTUFBTSxFQUFFO1FBQ1YsSUFBSSxNQUFNLEdBQ1IsUUFBUSxDQUFDLGFBQWEsQ0FDcEIsbURBQW1ELENBQ3BELEtBQUssSUFBSSxDQUFDO1FBRWIsSUFBSSxNQUFNLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUVwRCxJQUFJLE1BQU0sSUFBSSxNQUFNLENBQUMsV0FBVyxJQUFJLFFBQVEsRUFBRTtZQUM1QyxJQUFJLEdBQUcsSUFBSSxDQUFDO1lBQ1osSUFBSSxRQUFRLEtBQUssSUFBSSxFQUFFO2dCQUNyQixRQUFRLEdBQUcsSUFBSSxDQUFDO2dCQUNoQixPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7YUFDekM7U0FDRjthQUFNO1lBQ0wsSUFBSSxHQUFHLEtBQUssQ0FBQztTQUNkO1FBRUQsSUFBSSxDQUFDLElBQUks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