var presence = new Presence({
    clientId: "617741834701242406"
}), strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused",
    live: "presence.activity.live"
});
presence.on("UpdateData", async () => {
    var video = document.querySelector("#main-container > div > video");
    var description;
    if (video && !isNaN(video.duration)) {
        var title = document.querySelector("#player-video-overlay .player-title .player-title-name").textContent;
        if (document.location.pathname.includes("/live")) {
            description = document.querySelector("#player-video-overlay .player-title div span").textContent;
        }
        else {
            description = document.querySelector("#player-video-overlay .player-title div").textContent;
        }
        if (description == null || description.trim() == title) {
            description = "Movie";
        }
        var timestamps = getTimestamps(Math.floor(video.currentTime), Math.floor(video.duration));
        var currentState, smallImageKey, smallImageText;
        if (description.includes("ON NOW")) {
            currentState = "Live TV";
            timestamps[0] = 0;
            timestamps[1] = 0;
            smallImageKey = "live";
            smallImageText = (await strings).live;
        }
        else {
            currentState = description.substring(description.lastIndexOf("  ") + 1);
            smallImageKey = video.paused ? "pause" : "play";
            smallImageText = video.paused
                ? (await strings).pause
                : (await strings).play;
        }
        var data = {
            details: title,
            state: currentState,
            largeImageKey: "showtime-logo",
            smallImageKey: smallImageKey,
            smallImageText: smallImageText,
            startTimestamp: timestamps[0],
            endTimestamp: timestamps[1]
        };
        if (video.paused) {
            delete data.startTimestamp;
            delete data.endTimestamp;
        }
        if (title !== null) {
            presence.setActivity(data, !video.paused);
        }
    }
    else {
        let browsingPresence = {
            details: "Browsing...",
            largeImageKey: "showtime-logo"
        };
        presence.setActivity(browsingPresence);
    }
});
function getTimestamps(videoTime, videoDuration) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUN4QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsRUFDRixPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUM1QixJQUFJLEVBQUUsMkJBQTJCO0lBQ2pDLEtBQUssRUFBRSwwQkFBMEI7SUFDakMsSUFBSSxFQUFFLHdCQUF3QjtDQUMvQixDQUFDLENBQUM7QUFFTCxRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxLQUFLLElBQUksRUFBRTtJQUNuQyxJQUFJLEtBQUssR0FBcUIsUUFBUSxDQUFDLGFBQWEsQ0FDbEQsK0JBQStCLENBQ2hDLENBQUM7SUFFRixJQUFJLFdBQVcsQ0FBQztJQUVoQixJQUFJLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEVBQUU7UUFDbkMsSUFBSSxLQUFLLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FDaEMsd0RBQXdELENBQ3pELENBQUMsV0FBVyxDQUFDO1FBQ2QsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEVBQUU7WUFDaEQsV0FBVyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQ2xDLDhDQUE4QyxDQUMvQyxDQUFDLFdBQVcsQ0FBQztTQUNmO2FBQU07WUFDTCxXQUFXLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FDbEMseUNBQXlDLENBQzFDLENBQUMsV0FBVyxDQUFDO1NBQ2Y7UUFFRCxJQUFJLFdBQVcsSUFBSSxJQUFJLElBQUksV0FBVyxDQUFDLElBQUksRUFBRSxJQUFJLEtBQUssRUFBRTtZQUN0RCxXQUFXLEdBQUcsT0FBTyxDQUFDO1NBQ3ZCO1FBRUQsSUFBSSxVQUFVLEdBQUcsYUFBYSxDQUM1QixJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsRUFDN0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQzNCLENBQUM7UUFFRixJQUFJLFlBQVksRUFBRSxhQUFhLEVBQUUsY0FBYyxDQUFDO1FBQ2hELElBQUksV0FBVyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUNsQyxZQUFZLEdBQUcsU0FBUyxDQUFDO1lBQ3pCLFVBQVUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDbEIsVUFBVSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNsQixhQUFhLEdBQUcsTUFBTSxDQUFDO1lBQ3ZCLGNBQWMsR0FBRyxDQUFDLE1BQU0sT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDO1NBQ3ZDO2FBQU07WUFDTCxZQUFZLEdBQUcsV0FBVyxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ3hFLGFBQWEsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztZQUNoRCxjQUFjLEdBQUcsS0FBSyxDQUFDLE1BQU07Z0JBQzNCLENBQUMsQ0FBQyxDQUFDLE1BQU0sT0FBTyxDQUFDLENBQUMsS0FBSztnQkFDdkIsQ0FBQyxDQUFDLENBQUMsTUFBTSxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUM7U0FDMUI7UUFFRCxJQUFJLElBQUksR0FBaUI7WUFDdkIsT0FBTyxFQUFFLEtBQUs7WUFDZCxLQUFLLEVBQUUsWUFBWTtZQUNuQixhQUFhLEVBQUUsZUFBZTtZQUM5QixhQUFhLEVBQUUsYUFBYTtZQUM1QixjQUFjLEVBQUUsY0FBYztZQUM5QixjQUFjLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQztZQUM3QixZQUFZLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQztTQUM1QixDQUFDO1FBRUYsSUFBSSxLQUFLLENBQUMsTUFBTSxFQUFFO1lBQ2hCLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQztZQUMzQixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUM7U0FDMUI7UUFFRCxJQUFJLEtBQUssS0FBSyxJQUFJLEVBQUU7WUFDbEIsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDM0M7S0FDRjtTQUFNO1FBQ0wsSUFBSSxnQkFBZ0IsR0FBaUI7WUFDbkMsT0FBTyxFQUFFLGFBQWE7WUFDdEIsYUFBYSxFQUFFLGVBQWU7U0FDL0IsQ0FBQztRQUNGLFFBQVEsQ0FBQyxXQUFXLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztLQUN4QztBQUNILENBQUMsQ0FBQyxDQUFDO0FBRUgsU0FBUyxhQUFhLENBQUMsU0FBaUIsRUFBRSxhQUFxQjtJQUM3RCxJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDM0IsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEdBQUcsU0FBUyxHQUFHLGFBQWEsQ0FBQztJQUN2RSxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFDakQsQ0FBQyJ9