var presence = new Presence({
    clientId: "618822781404053505"
}), strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
});
presence.on("UpdateData", async () => {
    var player = document.querySelector(".footerPlayer--2d1-L");
    if (player) {
        var title = document.querySelector(".footerPlayer--2d1-L .mediaInformation--1dAUh span").textContent;
        var artist = document.querySelector(".footerPlayer--2d1-L .mediaArtists--3UIyd").textContent;
        var currentTime = document.querySelector(".footerPlayer--2d1-L .currentTime--2fCqA").textContent;
        var durationTime = document.querySelector(".footerPlayer--2d1-L .duration--3f3-B").textContent;
        var timestamps = getTimestamps(currentTime, durationTime);
        var paused = document
            .querySelector(".playbackToggle--1eQO2[title]")
            .getAttribute("title");
        var smallImageKey;
        if (paused !== "Pause") {
            smallImageKey = "pause";
        }
        else {
            smallImageKey = "play";
        }
        var data = {
            details: title,
            state: artist,
            largeImageKey: "tidal-logo",
            smallImageKey: smallImageKey,
            smallImageText: paused ? (await strings).pause : (await strings).play,
            startTimestamp: timestamps[0],
            endTimestamp: timestamps[1]
        };
        if (paused !== "Pause") {
            delete data.startTimestamp;
            delete data.endTimestamp;
            smallImageKey = "pause";
        }
        else {
            smallImageKey = "play";
        }
        if (title !== null && artist !== null) {
            presence.setActivity(data, paused);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQzlCLENBQUMsRUFDRixPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUM3QixJQUFJLEVBQUUsMkJBQTJCO0lBQ2pDLEtBQUssRUFBRSwwQkFBMEI7Q0FDakMsQ0FBQyxDQUFDO0FBRUosUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsS0FBSyxJQUFJLEVBQUU7SUFDcEMsSUFBSSxNQUFNLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO0lBQzVELElBQUksTUFBTSxFQUFFO1FBQ1gsSUFBSSxLQUFLLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FDakMsb0RBQW9ELENBQ3BELENBQUMsV0FBVyxDQUFDO1FBQ2QsSUFBSSxNQUFNLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FDbEMsMkNBQTJDLENBQzNDLENBQUMsV0FBVyxDQUFDO1FBQ2QsSUFBSSxXQUFXLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FDdkMsMENBQTBDLENBQzFDLENBQUMsV0FBVyxDQUFDO1FBQ2QsSUFBSSxZQUFZLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FDeEMsdUNBQXVDLENBQ3ZDLENBQUMsV0FBVyxDQUFDO1FBQ2QsSUFBSSxVQUFVLEdBQUcsYUFBYSxDQUFDLFdBQVcsRUFBRSxZQUFZLENBQUMsQ0FBQztRQUMxRCxJQUFJLE1BQU0sR0FBRyxRQUFRO2FBQ25CLGFBQWEsQ0FBQywrQkFBK0IsQ0FBQzthQUM5QyxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDeEIsSUFBSSxhQUFhLENBQUM7UUFDbEIsSUFBSSxNQUFNLEtBQUssT0FBTyxFQUFFO1lBQ3ZCLGFBQWEsR0FBRyxPQUFPLENBQUM7U0FDeEI7YUFBTTtZQUNOLGFBQWEsR0FBRyxNQUFNLENBQUM7U0FDdkI7UUFFRCxJQUFJLElBQUksR0FBaUI7WUFDeEIsT0FBTyxFQUFFLEtBQUs7WUFDZCxLQUFLLEVBQUUsTUFBTTtZQUNiLGFBQWEsRUFBRSxZQUFZO1lBQzNCLGFBQWEsRUFBRSxhQUFhO1lBQzVCLGNBQWMsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxPQUFPLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxPQUFPLENBQUMsQ0FBQyxJQUFJO1lBQ3JFLGNBQWMsRUFBRSxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQzdCLFlBQVksRUFBRSxVQUFVLENBQUMsQ0FBQyxDQUFDO1NBQzNCLENBQUM7UUFFRixJQUFJLE1BQU0sS0FBSyxPQUFPLEVBQUU7WUFDdkIsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDO1lBQzNCLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQztZQUN6QixhQUFhLEdBQUcsT0FBTyxDQUFDO1NBQ3hCO2FBQU07WUFDTixhQUFhLEdBQUcsTUFBTSxDQUFDO1NBQ3ZCO1FBRUQsSUFBSSxLQUFLLEtBQUssSUFBSSxJQUFJLE1BQU0sS0FBSyxJQUFJLEVBQUU7WUFDdEMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7U0FDbkM7S0FDRDtTQUFNO1FBQ04sUUFBUSxDQUFDLGFBQWEsRUFBRSxDQUFDO0tBQ3pCO0FBQ0YsQ0FBQyxDQUFDLENBQUM7QUFFSCxTQUFTLGFBQWEsQ0FBQyxTQUFpQixFQUFFLGFBQXFCO0lBQzlELElBQUksY0FBYyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDcEQsSUFBSSxrQkFBa0IsR0FBRyxhQUFhLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBRTVELElBQUksZUFBZSxHQUFHLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUM5QyxJQUFJLG1CQUFtQixHQUFHLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0lBRXRELElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUMzQixJQUFJLE9BQU8sR0FDVixJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsR0FBRyxlQUFlLEdBQUcsbUJBQW1CLENBQUM7SUFDdEUsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQ2hELENBQUM7QUFFRCxTQUFTLE9BQU8sQ0FBQyxJQUFjO0lBQzlCLElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQztJQUNaLEtBQUssSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsS0FBSyxJQUFJLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRTtRQUN0RCxHQUFHLElBQUksUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLEVBQUUsSUFBSSxLQUFLLENBQUM7S0FDM0M7SUFDRCxPQUFPLEdBQUcsQ0FBQztBQUNaLENBQUMifQ==