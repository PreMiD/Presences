var presence = new Presence({
    clientId: "607697998490894356"
});
var strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
});
presence.on("UpdateData", async () => {
    var player = document.querySelector(".playControls__elements");
    if (player) {
        var player_button = document.querySelector(".playControls__play");
        var paused = player_button.classList.contains("playing") === false;
        try {
            var title = document.querySelector(".playbackSoundBadge__titleLink > span:nth-child(2)").textContent;
            var author = document.querySelector(".playbackSoundBadge__lightLink")
                .textContent;
            var audioTime = document.querySelector("#app > div.playControls.g-z-index-control-bar.m-visible > section > div > div > div > div > div.playbackTimeline__timePassed > span:nth-child(2)").textContent;
            var audioDuration = document.querySelector("#app > div.playControls.g-z-index-control-bar.m-visible > section > div > div > div > div > div.playbackTimeline__duration > span:nth-child(2)").textContent;
            var timestamps = getTimestamps(audioTime, audioDuration);
        }
        catch (err) { }
        var data = {
            details: title,
            state: author,
            largeImageKey: "soundcloud",
            smallImageKey: paused ? "pause" : "play",
            smallImageText: paused ? (await strings).pause : (await strings).play,
            startTimestamp: timestamps[0],
            endTimestamp: timestamps[1]
        };
        if (paused) {
            delete data.startTimestamp;
            delete data.endTimestamp;
        }
        if (title !== null && author !== null) {
            presence.setActivity(data, !paused);
        }
    }
    else {
        presence.clearActivity();
    }
});
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUNILElBQUksT0FBTyxHQUFHLFFBQVEsQ0FBQyxVQUFVLENBQUM7SUFDaEMsSUFBSSxFQUFFLDJCQUEyQjtJQUNqQyxLQUFLLEVBQUUsMEJBQTBCO0NBQ2xDLENBQUMsQ0FBQztBQUVILFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBQ25DLElBQUksTUFBTSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMseUJBQXlCLENBQUMsQ0FBQztJQUUvRCxJQUFJLE1BQU0sRUFBRTtRQUNWLElBQUksYUFBYSxHQUFzQixRQUFRLENBQUMsYUFBYSxDQUMzRCxxQkFBcUIsQ0FDdEIsQ0FBQztRQUVGLElBQUksTUFBTSxHQUFHLGFBQWEsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEtBQUssQ0FBQztRQUVuRSxJQUFJO1lBQ0YsSUFBSSxLQUFLLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FDaEMsb0RBQW9ELENBQ3JELENBQUMsV0FBVyxDQUFDO1lBQ2QsSUFBSSxNQUFNLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxnQ0FBZ0MsQ0FBQztpQkFDbEUsV0FBVyxDQUFDO1lBQ2YsSUFBSSxTQUFTLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FDcEMsa0pBQWtKLENBQ25KLENBQUMsV0FBVyxDQUFDO1lBQ2QsSUFBSSxhQUFhLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FDeEMsZ0pBQWdKLENBQ2pKLENBQUMsV0FBVyxDQUFDO1lBQ2QsSUFBSSxVQUFVLEdBQUcsYUFBYSxDQUFDLFNBQVMsRUFBRSxhQUFhLENBQUMsQ0FBQztTQUMxRDtRQUFDLE9BQU8sR0FBRyxFQUFFLEdBQUU7UUFFaEIsSUFBSSxJQUFJLEdBQWlCO1lBQ3ZCLE9BQU8sRUFBRSxLQUFLO1lBQ2QsS0FBSyxFQUFFLE1BQU07WUFDYixhQUFhLEVBQUUsWUFBWTtZQUMzQixhQUFhLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLE1BQU07WUFDeEMsY0FBYyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLE9BQU8sQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLE9BQU8sQ0FBQyxDQUFDLElBQUk7WUFDckUsY0FBYyxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUM7WUFDN0IsWUFBWSxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUM7U0FDNUIsQ0FBQztRQUVGLElBQUksTUFBTSxFQUFFO1lBQ1YsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDO1lBQzNCLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQztTQUMxQjtRQUVELElBQUksS0FBSyxLQUFLLElBQUksSUFBSSxNQUFNLEtBQUssSUFBSSxFQUFFO1lBQ3JDLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDckM7S0FDRjtTQUFNO1FBQ0wsUUFBUSxDQUFDLGFBQWEsRUFBRSxDQUFDO0tBQzFCO0FBQ0gsQ0FBQyxDQUFDLENBQUM7QUFFSCxTQUFTLGFBQWEsQ0FBQyxTQUFpQixFQUFFLGFBQXFCO0lBQzdELElBQUksY0FBYyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDcEQsSUFBSSxrQkFBa0IsR0FBRyxhQUFhLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBRTVELElBQUksZUFBZSxHQUFHLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUM5QyxJQUFJLG1CQUFtQixHQUFHLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0lBRXRELElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUMzQixJQUFJLE9BQU8sR0FDVCxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsR0FBRyxlQUFlLEdBQUcsbUJBQW1CLENBQUM7SUFDdkUsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQ2pELENBQUM7QUFFRCxTQUFTLE9BQU8sQ0FBQyxJQUFjO0lBQzdCLElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQztJQUNaLEtBQUssSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsS0FBSyxJQUFJLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRTtRQUNyRCxHQUFHLElBQUksUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLEVBQUUsSUFBSSxLQUFLLENBQUM7S0FDNUM7SUFDRCxPQUFPLEdBQUcsQ0FBQztBQUNiLENBQUMifQ==