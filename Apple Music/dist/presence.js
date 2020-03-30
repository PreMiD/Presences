var presence = new Presence({
    clientId: "621819308481445934"
}), strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
});
var elapsed = Math.floor(Date.now() / 1000);
presence.on("UpdateData", async () => {
    let data = {
        largeImageKey: "applemusic-logo"
    };
    var playerCheck = document.querySelector(".web-chrome-playback-controls__playback-btn[disabled]")
        ? false
        : true;
    if (playerCheck) {
        var title = document
            .querySelector(".web-chrome-playback-lcd__song-name-scroll-inner-text-wrapper")
            .textContent.trim();
        var author = document
            .querySelector(".web-chrome-playback-lcd__sub-copy-scroll")
            .textContent.split("—")[0];
        var audioTime = document.querySelector(".web-chrome-playback-lcd__time-remaining").textContent;
        var timestamps = getTimestamps(audioTime);
        var paused = document.querySelector(".web-chrome-playback-controls__playback-btn[aria-label='Play']")
            ? true
            : false;
        data.details = title;
        data.state = author;
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
    else {
        presence.clearActivity();
    }
});
function getTimestamps(audioDuration) {
    var splitAudioDuration = audioDuration.split(":").reverse();
    var parsedAudioDuration = getTime(splitAudioDuration);
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) + parsedAudioDuration;
    return [Math.floor(startTime / 1000), endTime];
}
function getTime(list) {
    var ret = 0;
    for (let index = list.length - 1; index >= 0; index--) {
        ret += parseInt(list[index]) * 60 ** index;
    }
    return ret;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQzlCLENBQUMsRUFDRixPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUM3QixJQUFJLEVBQUUsMkJBQTJCO0lBQ2pDLEtBQUssRUFBRSwwQkFBMEI7Q0FDakMsQ0FBQyxDQUFDO0FBRUosSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7QUFFNUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsS0FBSyxJQUFJLEVBQUU7SUFDcEMsSUFBSSxJQUFJLEdBQWlCO1FBQ3hCLGFBQWEsRUFBRSxpQkFBaUI7S0FDaEMsQ0FBQztJQUVGLElBQUksV0FBVyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQ3ZDLHVEQUF1RCxDQUN2RDtRQUNBLENBQUMsQ0FBQyxLQUFLO1FBQ1AsQ0FBQyxDQUFDLElBQUksQ0FBQztJQUNSLElBQUksV0FBVyxFQUFFO1FBQ2hCLElBQUksS0FBSyxHQUFHLFFBQVE7YUFDbEIsYUFBYSxDQUNiLCtEQUErRCxDQUMvRDthQUNBLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNyQixJQUFJLE1BQU0sR0FBRyxRQUFRO2FBQ25CLGFBQWEsQ0FBQywyQ0FBMkMsQ0FBQzthQUMxRCxXQUFXLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzVCLElBQUksU0FBUyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQ3JDLDBDQUEwQyxDQUMxQyxDQUFDLFdBQVcsQ0FBQztRQUNkLElBQUksVUFBVSxHQUFHLGFBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUMxQyxJQUFJLE1BQU0sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUNsQyxnRUFBZ0UsQ0FDaEU7WUFDQSxDQUFDLENBQUMsSUFBSTtZQUNOLENBQUMsQ0FBQyxLQUFLLENBQUM7UUFFVCxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztRQUNyQixJQUFJLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQztRQUNwQixDQUFDLElBQUksQ0FBQyxhQUFhLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztZQUMvQyxDQUFDLElBQUksQ0FBQyxjQUFjLEdBQUcsTUFBTTtnQkFDNUIsQ0FBQyxDQUFDLENBQUMsTUFBTSxPQUFPLENBQUMsQ0FBQyxLQUFLO2dCQUN2QixDQUFDLENBQUMsQ0FBQyxNQUFNLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQztZQUN4QixDQUFDLElBQUksQ0FBQyxjQUFjLEdBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3JDLENBQUMsSUFBSSxDQUFDLFlBQVksR0FBRyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUVyQyxJQUFJLE1BQU0sRUFBRTtZQUNYLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQztZQUMzQixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUM7U0FDekI7UUFFRCxRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQzNCO1NBQU07UUFDTixRQUFRLENBQUMsYUFBYSxFQUFFLENBQUM7S0FDekI7QUFDRixDQUFDLENBQUMsQ0FBQztBQUVILFNBQVMsYUFBYSxDQUFDLGFBQXFCO0lBQzNDLElBQUksa0JBQWtCLEdBQUcsYUFBYSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUU1RCxJQUFJLG1CQUFtQixHQUFHLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0lBRXRELElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUMzQixJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsR0FBRyxtQkFBbUIsQ0FBQztJQUNqRSxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFDaEQsQ0FBQztBQUVELFNBQVMsT0FBTyxDQUFDLElBQWM7SUFDOUIsSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFDO0lBQ1osS0FBSyxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxLQUFLLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFO1FBQ3RELEdBQUcsSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsRUFBRSxJQUFJLEtBQUssQ0FBQztLQUMzQztJQUNELE9BQU8sR0FBRyxDQUFDO0FBQ1osQ0FBQyJ9