var presence = new Presence({
    clientId: "619817171928743938"
}), strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused",
    live: "presence.activity.live"
});
var elapsed = Math.floor(Date.now() / 1000);
presence.on("UpdateData", async () => {
    let data = {
        largeImageKey: "tunein-logo"
    };
    var playerCheck = document.querySelector(".player__playerContainer___JEJ2U")
        ? true
        : false;
    if (playerCheck) {
        var liveCheck = document.querySelector("#scrubberElapsed").textContent == "LIVE"
            ? true
            : false;
        if (liveCheck) {
            var playCheck = document.querySelector(".player-play-button__playerPlayButton___1Kc2Y[data-testid='player-status-playing']")
                ? true
                : false;
            if (playCheck) {
                var title = document.querySelector("#playerTitle").textContent;
                var author = document.querySelector("#playerSubtitle").textContent;
                data.details = title;
                if (title.length > 128) {
                    data.details = title.substring(0, 125) + "...";
                }
                data.state = author;
                if (author.length > 128) {
                    data.state = author.substring(0, 125) + "...";
                }
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
            var title = document.querySelector("#playerTitle").textContent;
            var author = document.querySelector("#playerSubtitle").textContent;
            var audioTime = document.querySelector("#scrubberElapsed").textContent;
            var audioDuration = document.querySelector("#scrubberDuration")
                .textContent;
            var timestamps = getTimestamps(audioTime, audioDuration);
            const paused = document.querySelector(".player-play-button__playerPlayButton___1Kc2Y[data-testid='player-status-paused']")
                ? true
                : false;
            data.details = title;
            if (title.length > 128) {
                data.details = title.substring(0, 125) + "...";
            }
            data.state = author;
            if (author.length > 128) {
                data.state = author.substring(0, 125) + "...";
            }
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
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQzlCLENBQUMsRUFDRixPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUM3QixJQUFJLEVBQUUsMkJBQTJCO0lBQ2pDLEtBQUssRUFBRSwwQkFBMEI7SUFDakMsSUFBSSxFQUFFLHdCQUF3QjtDQUM5QixDQUFDLENBQUM7QUFFSixJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQztBQUU1QyxRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxLQUFLLElBQUksRUFBRTtJQUNwQyxJQUFJLElBQUksR0FBaUI7UUFDeEIsYUFBYSxFQUFFLGFBQWE7S0FDNUIsQ0FBQztJQUVGLElBQUksV0FBVyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsa0NBQWtDLENBQUM7UUFDM0UsQ0FBQyxDQUFDLElBQUk7UUFDTixDQUFDLENBQUMsS0FBSyxDQUFDO0lBQ1QsSUFBSSxXQUFXLEVBQUU7UUFDaEIsSUFBSSxTQUFTLEdBQ1osUUFBUSxDQUFDLGFBQWEsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLFdBQVcsSUFBSSxNQUFNO1lBQy9ELENBQUMsQ0FBQyxJQUFJO1lBQ04sQ0FBQyxDQUFDLEtBQUssQ0FBQztRQUNWLElBQUksU0FBUyxFQUFFO1lBQ2QsSUFBSSxTQUFTLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FDckMsb0ZBQW9GLENBQ3BGO2dCQUNBLENBQUMsQ0FBQyxJQUFJO2dCQUNOLENBQUMsQ0FBQyxLQUFLLENBQUM7WUFDVCxJQUFJLFNBQVMsRUFBRTtnQkFDZCxJQUFJLEtBQUssR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLGNBQWMs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