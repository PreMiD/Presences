var presence = new Presence({
    clientId: "616754182858342426"
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
    let presenceData = {
        details: "Unknown page",
        largeImageKey: "lg"
    };
    let video = document.querySelector("#player > div.jw-wrapper.jw-reset > div.jw-media.jw-reset > video");
    playback = video !== null ? true : false;
    if (!playback) {
        presenceData.details = "Browsing...";
        presenceData.startTimestamp = browsingStamp;
        delete presenceData.state;
        delete presenceData.smallImageKey;
        presence.setActivity(presenceData);
    }
    if (video !== null && !isNaN(video.duration)) {
        let videoTitle = document.querySelector("div.watch-header.h4.mb-0.font-weight-normal.link.hidden-sm-down"), season = document.querySelector("#playercontainer span.outPes"), episode = document.querySelector("#playercontainer span.outPep");
        let timestamps = getTimestamps(Math.floor(video.currentTime), Math.floor(video.duration));
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
function getTimestamps(videoTime, videoDuration) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUN4QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsRUFDRixPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUM1QixJQUFJLEVBQUUsMkJBQTJCO0lBQ2pDLEtBQUssRUFBRSwwQkFBMEI7Q0FDbEMsQ0FBQyxDQUFDO0FBRUwsSUFBSSxpQkFBaUIsR0FBRyxJQUFJLENBQUM7QUFDN0IsSUFBSSxRQUFpQixDQUFDO0FBQ3RCLElBQUksYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0FBRWxELElBQUksaUJBQWlCLElBQUksUUFBUSxFQUFFO0lBQ2pDLGlCQUFpQixHQUFHLFFBQVEsQ0FBQztJQUM3QixhQUFhLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7Q0FDL0M7QUFFRCxRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxLQUFLLElBQUksRUFBRTtJQUNuQyxJQUFJLFlBQVksR0FBaUI7UUFDL0IsT0FBTyxFQUFFLGNBQWM7UUFDdkIsYUFBYSxFQUFFLElBQUk7S0FDcEIsQ0FBQztJQUVGLElBQUksS0FBSyxHQUFxQixRQUFRLENBQUMsYUFBYSxDQUNsRCxtRUFBbUUsQ0FDcEUsQ0FBQztJQUVGLFFBQVEsR0FBRyxLQUFLLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztJQUV6QyxJQUFJLENBQUMsUUFBUSxFQUFFO1FBQ2IsWUFBWSxDQUFDLE9BQU8sR0FBRyxhQUFhLENBQUM7UUFDckMsWUFBWSxDQUFDLGNBQWMsR0FBRyxhQUFhLENBQUM7UUFFNUMsT0FBTyxZQUFZLENBQUMsS0FBSyxDQUFDO1FBQzFCLE9BQU8sWUFBWSxDQUFDLGFBQWEsQ0FBQztRQUVsQyxRQUFRLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO0tBQ3BDO0lBRUQsSUFBSSxLQUFLLEtBQUssSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsRUFBRTtRQUM1QyxJQUFJLFVBQVUsR0FBZ0IsUUFBUSxDQUFDLGFBQWEsQ0FDaEQsaUVBQWlFLENBQ2xFLEVBQ0QsTUFBTSxHQUFnQixRQUFRLENBQUMsYUFBYSxDQUMxQyw4QkFBOEIsQ0FDL0IsRUFDRCxPQUFPLEdBQWdCLFFBQVEsQ0FBQyxhQUFhLENBQzNDLDhCQUE4QixDQUMvQixDQUFDO1FBRUosSUFBSSxVQUFVLEdBQUcsYUFBYSxDQUM1QixJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsRUFDN0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQzNCLENBQUM7UUFFRixZQUFZLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO1FBQzdELFlBQVksQ0FBQyxjQUFjLEdBQUcsS0FBSyxDQUFDLE1BQU07WUFDeEMsQ0FBQyxDQUFDLENBQUMsTUFBTSxPQUFPLENBQUMsQ0FBQyxLQUFLO1lBQ3ZCLENBQUMsQ0FBQyxDQUFDLE1BQU0sT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDO1FBQ3pCLFlBQVksQ0FBQyxjQUFjLEdBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzVDLFlBQVksQ0FBQyxZQUFZLEdBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRTFDLFFBQVEsQ0FBQyxZQUFZLENBQ25CLEtBQUssQ0FBQyxNQUFNO1lBQ1YsQ0FBQyxDQUFDLEVBQUU7WUFDSixDQUFDLENBQUMsVUFBVSxLQUFLLElBQUk7Z0JBQ3JCLENBQUMsQ0FBQyxVQUFVLENBQUMsU0FBUztnQkFDdEIsQ0FBQyxDQUFDLG9CQUFvQixDQUN6QixDQUFDO1FBRUYsSUFBSSxNQUFNLElBQUksT0FBTyxFQUFFO1lBQ3JCLFlBQVksQ0FBQyxPQUFPO2dCQUNsQixVQUFVLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxvQkFBb0IsQ0FBQztZQUNwRSxZQUFZLENBQUMsS0FBSztnQkFDaEIsU0FBUyxHQUFHLE1BQU0sQ0FBQyxTQUFTLEdBQUcsWUFBWSxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUM7U0FDbkU7YUFBTSxJQUFJLENBQUMsTUFBTSxJQUFJLE9BQU8sRUFBRTtZQUM3QixZQUFZLENBQUMsT0FBTztnQkFDbEIsVUFBVSxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsb0JBQW9CLENBQUM7WUFDcEUsWUFBWSxDQUFDLEtBQUssR0FBRyxVQUFVLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQztTQUNyRDthQUFNO1lBQ0wsWUFBWSxDQUFDLE9BQU8sR0FBRyxVQUFVLENBQUM7WUFDbEMsWUFBWSxDQUFDLEtBQUs7Z0JBQ2hCLFVBQVUsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLG9CQUFvQixDQUFDO1NBQ3JFO1FBRUQsSUFBSSxLQUFLLENBQUMsTUFBTSxFQUFFO1lBQ2hCLE9BQU8sWUFBWSxDQUFDLGNBQWMsQ0FBQztZQUNuQyxPQUFPLFlBQVksQ0FBQyxZQUFZLENBQUM7U0FDbEM7UUFFRCxJQUFJLFVBQVUsS0FBSyxJQUFJLEVBQUU7WUFDdkIsUUFBUSxDQUFDLFdBQVcsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDbkQ7S0FDRjtBQUNILENBQUMsQ0FBQyxDQUFDO0FBT0gsU0FBUyxhQUFhLENBQUMsU0FBaUIsRUFBRSxhQUFxQjtJQUM3RCxJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDM0IsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEdBQUcsU0FBUyxHQUFHLGFBQWEsQ0FBQztJQUN2RSxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFDakQsQ0FBQyJ9