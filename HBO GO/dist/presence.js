var presence = new Presence({
    clientId: "605437254776651786"
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
    playback =
        document.querySelector("#hbo-sdk--controller-container #hbo-sdk--controller-osd #hbo-sdk--vid #hbo-sdk--vid_Clpp_html5_mse_smooth_api") !== null &&
            document.querySelector("#hbo-sdk--controller-osd #hbo-sdk--player-header span#player-title") !== null
            ? true
            : false;
    var video = document.querySelector("#hbo-sdk--controller-container #hbo-sdk--controller-osd #hbo-sdk--vid #hbo-sdk--vid_Clpp_html5_mse_smooth_api");
    var presenceData = {
        largeImageKey: "lg"
    };
    if (!playback || (video.paused && video[0] == null)) {
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
        var timestamps = getTimestamps(Math.floor(video.currentTime), Math.floor(video.duration));
        presenceData.details = videoTitle;
        presenceData.state =
            state !== null ? state.innerText : "State not found...";
        presenceData.smallImageKey = video.paused ? "pause" : "play";
        presenceData.smallImageText = video.paused
            ? (await strings).pause
            : (await strings).play;
        presenceData.startTimestamp = timestamps[0];
        presenceData.endTimestamp = timestamps[1];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUN4QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsRUFDRixPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUM1QixJQUFJLEVBQUUsMkJBQTJCO0lBQ2pDLEtBQUssRUFBRSwwQkFBMEI7Q0FDbEMsQ0FBQyxDQUFDO0FBT0wsU0FBUyxhQUFhLENBQ3BCLFNBQWlCLEVBQ2pCLGFBQXFCO0lBRXJCLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUMzQixJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsR0FBRyxTQUFTLEdBQUcsYUFBYSxDQUFDO0lBQ3ZFLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQztBQUNqRCxDQUFDO0FBRUQsSUFBSSxpQkFBaUIsR0FBRyxJQUFJLENBQUM7QUFDN0IsSUFBSSxRQUFRLENBQUM7QUFDYixJQUFJLGFBQWEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQztBQUVsRCxJQUFJLGlCQUFpQixJQUFJLFFBQVEsRUFBRTtJQUNqQyxpQkFBaUIsR0FBRyxRQUFRLENBQUM7SUFDN0IsYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0NBQy9DO0FBRUQsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsS0FBSyxJQUFJLEVBQUU7SUFDbkMsUUFBUTtRQUNOLFFBQVEsQ0FBQyxhQUFhLENBQ3BCLCtHQUErRyxDQUNo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