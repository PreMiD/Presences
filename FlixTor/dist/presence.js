var presence = new Presence({
    clientId: "616754182858342426"
}), strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
});
function getTimestamps(videoTime, videoDuration) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
var lastPlaybackState = null;
var playback;
var browsingStamp = Math.floor(Date.now() / 1000);
if (lastPlaybackState != playback) {
    lastPlaybackState = playback;
    browsingStamp = Math.floor(Date.now() / 1000);
}
presence.on("UpdateData", async () => {
    const presenceData = {
        details: "Unknown page",
        largeImageKey: "lg"
    };
    const video = document.querySelector("#player > div.jw-wrapper.jw-reset > div.jw-media.jw-reset > video");
    playback = video !== null ? true : false;
    if (!playback) {
        presenceData.details = "Browsing...";
        presenceData.startTimestamp = browsingStamp;
        presence.setActivity(presenceData);
    }
    if (video !== null && !isNaN(video.duration)) {
        const videoTitle = document.querySelector("div.watch-header.h4.mb-0.font-weight-normal.link.hidden-sm-down"), season = document.querySelector("#playercontainer span.outPes"), episode = document.querySelector("#playercontainer span.outPep");
        const timestamps = getTimestamps(Math.floor(video.currentTime), Math.floor(video.duration));
        presenceData.smallImageKey = video.paused ? "pause" : "play";
        presenceData.smallImageText = video.paused
            ? (await strings).pause
            : (await strings).play;
        presenceData.startTimestamp = timestamps[0];
        presenceData.endTimestamp = timestamps[1];
        presence.setTrayTitle(video.paused
            ? ""
            : videoTitle !== null
                ? videoTitle.innerText
                : "Title not found...");
        if (season && episode) {
            presenceData.details =
                videoTitle !== null ? videoTitle.innerText : "Title not found...";
            presenceData.state =
                "Season " + season.innerText + ", Episode " + episode.innerText;
        }
        else if (!season && episode) {
            presenceData.details =
                videoTitle !== null ? videoTitle.innerText : "Title not found...";
            presenceData.state = "Episode " + episode.innerText;
        }
        else {
            presenceData.details = "Watching";
            presenceData.state =
                videoTitle !== null ? videoTitle.innerText : "Title not found...";
        }
        if (video.paused) {
            delete presenceData.startTimestamp;
            delete presenceData.endTimestamp;
        }
        if (videoTitle !== null) {
            presence.setActivity(presenceData, !video.paused);
        }
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUN4QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsRUFDRixPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUM1QixJQUFJLEVBQUUsMkJBQTJCO0lBQ2pDLEtBQUssRUFBRSwwQkFBMEI7Q0FDbEMsQ0FBQyxDQUFDO0FBT0wsU0FBUyxhQUFhLENBQ3BCLFNBQWlCLEVBQ2pCLGFBQXFCO0lBRXJCLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUMzQixJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsR0FBRyxTQUFTLEdBQUcsYUFBYSxDQUFDO0lBQ3ZFLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQztBQUNqRCxDQUFDO0FBRUQsSUFBSSxpQkFBaUIsR0FBRyxJQUFJLENBQUM7QUFDN0IsSUFBSSxRQUFpQixDQUFDO0FBQ3RCLElBQUksYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0FBRWxELElBQUksaUJBQWlCLElBQUksUUFBUSxFQUFFO0lBQ2pDLGlCQUFpQixHQUFHLFFBQVEsQ0FBQztJQUM3QixhQUFhLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7Q0FDL0M7QUFFRCxRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxLQUFLLElBQUksRUFBRTtJQUNuQyxNQUFNLFlBQVksR0FBaUI7UUFDakMsT0FBTyxFQUFFLGNBQWM7UUFD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