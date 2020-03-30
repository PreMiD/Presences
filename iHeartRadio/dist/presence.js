var presence = new Presence({
    clientId: "620283906234777600"
}), strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused",
    live: "presence.activity.live"
});
var elapsed = Math.floor(Date.now() / 1000);
presence.on("UpdateData", async () => {
    let data = {
        largeImageKey: "iheartradio-logo"
    };
    var playerCheck = document.querySelector("div.css-s6sc4j.e14pqrjs0")
        ? true
        : false;
    if (playerCheck) {
        var liveCheck = document.querySelector("div.css-1gs73tw.e1ka8agw0 time[data-test='player-current-time']")
            ? false
            : true;
        if (liveCheck) {
            var playCheck = document.querySelector("button.ekca8d00 span[aria-labelledby='Stop']")
                ? true
                : false;
            if (playCheck) {
                var title = document.querySelector(".css-19ebljp").textContent;
                var author = document.querySelector(".css-zzaxa6").textContent;
                var song = document.querySelector(".css-9be0f7").textContent;
                var subtitle = author + " - " + song;
                title = checkLength(title);
                data.details = title;
                subtitle = checkLength(subtitle);
                data.state = subtitle;
                data.smallImageKey = "live";
                data.smallImageText = (await strings).live;
                if (elapsed === null) {
                    elapsed = Math.floor(Date.now() / 1000);
                }
                data.startTimestamp = elapsed;
                presence.setActivity(data);
            }
            else {
                elapsed = null;
                presence.clearActivity();
            }
        }
        else {
            var title = document.querySelector(".css-19ebljp").textContent;
            try {
                var author = document.querySelector(".css-x5q5qs").textContent;
                var song = document.querySelector(".css-9be0f7").textContent;
                var subtitle = author + " - " + song;
            }
            catch {
                var author = document.querySelector(".css-x5q5qs").textContent;
                var song = document.querySelector(".css-1uhpu6r").textContent;
                var subtitle = song + " - " + author;
            }
            var audioTime = document.querySelector(".css-9dpnv0").textContent;
            var audioDuration = document.querySelector(".css-xf5pff").textContent;
            var timestamps = getTimestamps(audioTime, audioDuration);
            const paused = document.querySelector("button.ekca8d00 span[aria-labelledby='Play']")
                ? true
                : false;
            title = checkLength(title);
            data.details = title;
            subtitle = checkLength(subtitle);
            data.state = subtitle;
            (data.smallImageKey = paused ? "pause" : "play"),
                (data.smallImageText = paused
                    ? (await strings).pause
                    : (await strings).play),
                (data.startTimestamp = timestamps[0]),
                (data.endTimestamp = timestamps[1]);
            if (paused) {
                delete data.startTimestamp;
                delete data.endTimestamp;
            }
            presence.setActivity(data);
        }
    }
    else {
        presence.clearActivity();
    }
});
function checkLength(string) {
    if (string.length > 128) {
        return string.substring(0, 125) + "...";
    }
    else {
        return string;
    }
}
function getTimestamps(audioTime, audioDuration) {
    var splitAudioTime = audioTime.split(":").reverse();
    var splitAudioDuration = audioDuration.split(":").reverse();
    var parsedAudioTime = getTime(splitAudioTime);
    var parsedAudioDuration = getTime(splitAudioDuration);
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - parsedAudioTime + parsedAudioDuration;
    return [Math.floor(startTime / 1000), endTime];
}
function getTime(list) {
    var ret = 0;
    for (let index = list.length - 1; index >= 0; index--) {
        ret += parseInt(list[index]) * 60 ** index;
    }
    return ret;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQzlCLENBQUMsRUFDRixPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUM3QixJQUFJLEVBQUUsMkJBQTJCO0lBQ2pDLEtBQUssRUFBRSwwQkFBMEI7SUFDakMsSUFBSSxFQUFFLHdCQUF3QjtDQUM5QixDQUFDLENBQUM7QUFFSixJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQztBQUU1QyxRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxLQUFLLElBQUksRUFBRTtJQUNwQyxJQUFJLElBQUksR0FBaUI7UUFDeEIsYUFBYSxFQUFFLGtCQUFrQjtLQUNqQyxDQUFDO0lBRUYsSUFBSSxXQUFXLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQywwQkFBMEIsQ0FBQztRQUNuRSxDQUFDLENBQUMsSUFBSTtRQUNOLENBQUMsQ0FBQyxLQUFLLENBQUM7SUFDVCxJQUFJLFdBQVcsRUFBRTtRQUNoQixJQUFJLFNBQVMsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUNyQyxpRUFBaUUsQ0FDakU7WUFDQSxDQUFDLENBQUMsS0FBSztZQUNQLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFDUixJQUFJLFNBQVMsRUFBRTtZQUNkLElBQUksU0FBUyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQ3JDLDhDQUE4QyxDQUM5QztnQkFDQSxDQUFDLENBQUMsSUFBSTtnQkFDTixDQUFDLENBQUMsS0FBSyxDQUFDO1lBQ1QsSUFBSSxTQUFTLEVBQUU7Z0JBQ2QsSUFBSSxLQUFLLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxjQUFjLENBQUMsQ0FBQyxXQUFXLENB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