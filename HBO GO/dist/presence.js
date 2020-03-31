var presence = new Presence({
    clientId: "605437254776651786"
}), strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
});
var lastPlaybackState = null;
var playback;
var browsingStamp = Math.floor(Date.now() / 1000);
if (lastPlaybackState != playback) {
    lastPlaybackState = playback;
    browsingStamp = Math.floor(Date.now() / 1000);
}
presence.on("UpdateData", async () => {
    playback =
        document.querySelector("#hbo-sdk--controller-container #hbo-sdk--controller-osd #hbo-sdk--vid #hbo-sdk--vid_Clpp_html5_mse_smooth_api") !== null &&
            document.querySelector("#hbo-sdk--controller-osd #hbo-sdk--player-header span#player-title") !== null
            ? true
            : false;
    var video = document.querySelector("#hbo-sdk--controller-container #hbo-sdk--controller-osd #hbo-sdk--vid #hbo-sdk--vid_Clpp_html5_mse_smooth_api");
    if (!playback || (video.paused && video[0] == null)) {
        presenceData: presenceData = {
            largeImageKey: "lg"
        };
        presenceData.details = "Browsing...";
        presenceData.startTimestamp = browsingStamp;
        delete presenceData.state;
        delete presenceData.smallImageKey;
        presence.setActivity(presenceData, true);
    }
    if (video[0] !== null && !isNaN(video.duration)) {
        var videoTitle, state, playerTitle;
        var a = document.querySelector("#hbo-sdk--controller-osd #hbo-sdk--player-header #player-title span");
        playerTitle = document.querySelector("#hbo-sdk--controller-osd #hbo-sdk--player-header span#player-title");
        if (a.innerText.length > 0) {
            videoTitle = playerTitle.firstChild.nodeValue;
            state = document.querySelector("#hbo-sdk--controller-osd #hbo-sdk--player-header #player-title span");
        }
        else {
            videoTitle = "Watching";
            state = document.querySelector("#hbo-sdk--controller-osd #hbo-sdk--player-header #player-title");
        }
        var timestamps = getTimestamps(Math.floor(video.currentTime), Math.floor(video.duration)), presenceData = {
            details: videoTitle,
            state: state.innerText,
            largeImageKey: "lg",
            smallImageKey: video.paused ? "pause" : "play",
            smallImageText: video.paused
                ? (await strings).pause
                : (await strings).play,
            startTimestamp: timestamps[0],
            endTimestamp: timestamps[1]
        };
        presence.setTrayTitle(video.paused ? "" : videoTitle.innerText);
        if (video.paused) {
            delete presenceData.startTimestamp;
            delete presenceData.endTimestamp;
        }
        if (videoTitle !== null && state !== null) {
            presence.setActivity(presenceData, !video.paused);
        }
    }
    else {
        presence.setActivity();
        presence.setTrayTitle();
    }
});
function getTimestamps(videoTime, videoDuration) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUN4QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsRUFDRixPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUM1QixJQUFJLEVBQUUsMkJBQTJCO0lBQ2pDLEtBQUssRUFBRSwwQkFBMEI7Q0FDbEMsQ0FBQyxDQUFDO0FBRUwsSUFBSSxpQkFBaUIsR0FBRyxJQUFJLENBQUM7QUFDN0IsSUFBSSxRQUFRLENBQUM7QUFDYixJQUFJLGFBQWEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQztBQUVsRCxJQUFJLGlCQUFpQixJQUFJLFFBQVEsRUFBRTtJQUNqQyxpQkFBaUIsR0FBRyxRQUFRLENBQUM7SUFDN0IsYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0NBQy9DO0FBRUQsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsS0FBSyxJQUFJLEVBQUU7SUFDbkMsUUFBUTtRQUNOLFFBQVEsQ0FBQyxhQUFhLENBQ3BCLCtHQUErRyxDQUNoSCxLQUFLLElBQUk7WUFDVixRQUFRLENBQUMsYUFBYSxDQUNwQixvRUFBb0UsQ0FDckUsS0FBSyxJQUFJO1lBQ1IsQ0FBQyxDQUFDLElBQUk7WUFDTixDQUFDLENBQUMsS0FBSyxDQUFDO0lBRVosSUFBSSxLQUFLLEdBQXFCLFFBQVEsQ0FBQyxhQUFhLENBQ2xELCtHQUErRyxDQUNoSCxDQUFDO0lBRUYsSUFBSSxDQUFDLFFBQVEsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxFQUFFO1FB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