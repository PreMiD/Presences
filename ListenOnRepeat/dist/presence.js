let presence = new Presence({
    clientId: "639534386538348565"
}), strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
});
let repeats, timestamps;
let iFrameVideo, currentTime, duration, paused;
let video, videoDuration, videoCurrentTime, playback;
let lastPlaybackState = null;
let browsingStamp = Math.floor(Date.now() / 1000);
presence.on("iFrameData", data => {
    playback = data.iframe_video.duration !== null ? true : false;
    if (playback) {
        iFrameVideo = data.iframe_video.iFrameVideo;
        currentTime = data.iframe_video.currTime;
        duration = data.iframe_video.dur;
        paused = data.iframe_video.paused;
    }
});
presence.on("UpdateData", async () => {
    let presenceData = {
        largeImageKey: "lr"
    };
    let sGlobalRepeat = await presence.getSetting("sGlobalRepeat");
    let sFormatRepeat = await presence.getSetting("sFormatRepeat");
    let sFormatGlobalRepeat = await presence.getSetting("sFormatGlobalRepeat");
    let repeatsTrans = "Repeats";
    let gRepeatTrans = "Global Repeats";
    let repeats = document
        .querySelector("#content > div.main-area-offset > div:nth-child(2) > div.player-card > div > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > button:nth-child(2) > div > div > span")
        .textContent.split(":")[1]
        .split("(")[0]
        .trim();
    let globalRepeats = document
        .querySelector("#content > div.main-area-offset > div:nth-child(2) > div.player-card > div > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > button:nth-child(1) > div > div > span")
        .textContent.split(":")[1]
        .split("(")[0]
        .trim();
    if (lastPlaybackState != playback) {
        lastPlaybackState = playback;
        browsingStamp = Math.floor(Date.now() / 1000);
    }
    if (iFrameVideo == true && !isNaN(duration)) {
        timestamps = getTimestamps(Math.floor(currentTime), Math.floor(duration));
        presenceData.smallImageKey = paused ? "pause" : "repeat";
        presenceData.smallImageText = paused
            ? (await strings).pause
            : (await strings).play;
        presenceData.startTimestamp = timestamps[0];
        presenceData.endTimestamp = timestamps[1];
        presenceData.details = document.title.split(" - Listen On Repeat")[0];
        if (globalRepeats !== null) {
            if (sGlobalRepeat) {
                presenceData.state = sFormatGlobalRepeat
                    .replace("%repeatm", repeatsTrans)
                    .replace("%repeats", repeats)
                    .replace("%grepeatm", gRepeatTrans)
                    .replace("%grepeats", globalRepeats);
            }
            else {
                presenceData.state = sFormatRepeat
                    .replace("%repeatm", repeatsTrans)
                    .replace("%repeats", repeats);
            }
        }
        else {
            presenceData.state = sFormatRepeat
                .replace("%repeatm", repeatsTrans)
                .replace("%repeats", repeats);
        }
        if (paused) {
            delete presenceData.startTimestamp;
            delete presenceData.endTimestamp;
        }
    }
    else if (iFrameVideo == null && isNaN(duration)) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Loading video...";
        presenceData.state = document.title.split(" - Listen On Repeat")[0];
        presenceData.smallImageKey = "reading";
    }
    if (presenceData.details == null) {
        presence.setTrayTitle();
        presence.setActivity();
    }
    else {
        presence.setActivity(presenceData);
    }
});
function getTimestamps(videoTime, videoDuration) {
    let startTime = Date.now();
    let endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQzlCLENBQUMsRUFDRixPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUM3QixJQUFJLEVBQUUsMkJBQTJCO0lBQ2pDLEtBQUssRUFBRSwwQkFBMEI7Q0FDakMsQ0FBQyxDQUFDO0FBRUosSUFBSSxPQUFZLEVBQUUsVUFBZSxDQUFDO0FBQ2xDLElBQUksV0FBb0IsRUFBRSxXQUFnQixFQUFFLFFBQWEsRUFBRSxNQUFXLENBQUM7QUFDdkUsSUFBSSxLQUF1QixFQUMxQixhQUFrQixFQUNsQixnQkFBcUIsRUFDckIsUUFBYSxDQUFDO0FBRWYsSUFBSSxpQkFBaUIsR0FBRyxJQUFJLENBQUM7QUFDN0IsSUFBSSxhQUFhLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7QUFFbEQsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLEVBQUU7SUFDaEMsUUFBUSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7SUFFOUQsSUFBSSxRQUFRLEVBQUU7UUFDYixXQUFXLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUM7UUFDNUMsV0FBVyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDO1FBQ3pDLFFBQVEsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQztRQUNqQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUM7S0FDbEM7QUFDRixDQUFDLENBQUMsQ0FBQztB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