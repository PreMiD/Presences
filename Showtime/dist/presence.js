var presence = new Presence({
    clientId: "617741834701242406"
}), strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused",
    live: "presence.activity.live"
});
presence.on("UpdateData", async () => {
    var video = document.querySelector("#main-container > div > video");
    if (video && !isNaN(video.duration)) {
        var title = document.querySelector("#player-video-overlay .player-title .player-title-name").textContent;
        if (document.location.pathname.includes("/live")) {
            var description = document.querySelector("#player-video-overlay .player-title div span").textContent;
        }
        else {
            var description = document.querySelector("#player-video-overlay .player-title div").textContent;
        }
        if (description.trim() == title) {
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
        if (title !== null && description !== null) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUN4QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsRUFDRixPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUM1QixJQUFJLEVBQUUsMkJBQTJCO0lBQ2pDLEtBQUssRUFBRSwwQkFBMEI7SUFDakMsSUFBSSxFQUFFLHdCQUF3QjtDQUMvQixDQUFDLENBQUM7QUFFTCxRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxLQUFLLElBQUksRUFBRTtJQUNuQyxJQUFJLEtBQUssR0FBcUIsUUFBUSxDQUFDLGFBQWEsQ0FDbEQsK0JBQStCLENBQ2hDLENBQUM7SUFFRixJQUFJLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEVBQUU7UUFDbkMsSUFBSSxLQUFLLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FDaEMsd0RBQXdELENBQ3pELENBQUMsV0FBVyxDQUFDO1FBQ2QsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEVBQUU7WUFDaEQsSUFBSSxXQUFXLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FDdEMsOENBQThDLENBQy9DLENBQUMsV0FBVyxDQUFDO1NBQ2Y7YUFBTTtZQUNMLElBQUksV0FBVyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQ3RDLHlDQUF5QyxDQUMxQyxDQUFDLFdBQVcsQ0FBQztTQUNmO1FBRUQsSUFBSSxXQUFXLENBQUMsSUFBSSxFQUFFLElBQUksS0FBSyxFQUFFO1lBQy9CLFdBQVcsR0FBRyxPQUFPLENBQUM7U0FDdkI7UUFFRCxJQUFJLFVBQVUsR0FBRyxhQUFhLENBQzVCLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxFQUM3QixJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FDM0IsQ0FBQztRQUVGLElBQUksWUFBWSxFQUFFLGFBQWEsRUFBRSxjQUFjLENBQUM7UUFDaEQsSUFBSSxXQUFXLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQ2xDLFlBQVksR0FBRyxTQUFTLENBQUM7WUFDekIsVUFBVSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNsQixVQUFVLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2xCLGFBQWEsR0FBRyxNQUFNLENBQUM7WUFDdkIsY0FBYyxHQUFHLENBQUMsTUFBTSxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUM7U0FDdkM7YUFBTTtZQUNMLFlBQVksR0FBRyxXQUFXLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDeEUsYUFBYSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO1lBQ2hELGNBQWMsR0FBRyxLQUFLLENBQUMsTUFBTTtnQkFDM0IsQ0FBQyxDQUFDLENBQUMsTUFBTSxPQUFPLENBQUMsQ0FBQyxLQUFLO2dCQUN2QixDQUFDLENBQUMsQ0FBQyxNQUFNLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQztTQUMxQjtRQUVELElBQUksSUFBSSxHQUFpQjtZQUN2QixPQUFPLEVBQUUsS0FBSztZQUNkLEtBQUssRUFBRSxZQUFZO1lBQ25CLGFBQWEsRUFBRSxlQUFlO1lBQzlCLGFBQWEsRUFBRSxhQUFhO1lBQzVCLGNBQWMsRUFBRSxjQUFjO1lBQzlCLGNBQWMsRUFBRSxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQzdCLFlBQVksRUFBRSxVQUFVLENBQUMsQ0FBQyxDQUFDO1NBQzVCLENBQUM7UUFFRixJQUFJLEtBQUssQ0FBQyxNQUFNLEVBQUU7WUFDaEIsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDO1lBQzNCLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQztTQUMxQjtRQUVELElBQUksS0FBSyxLQUFLLElBQUksSUFBSSxXQUFXLEtBQUssSUFBSSxFQUFFO1lBQzFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQzNDO0tBQ0Y7U0FBTTtRQUNMLElBQUksZ0JBQWdCLEdBQWlCO1lBQ25DLE9BQU8sRUFBRSxhQUFhO1lBQ3RCLGFBQWEsRUFBRSxlQUFlO1NBQy9CLENBQUM7UUFDRixRQUFRLENBQUMsV0FBVyxDQUFDLGdCQUFnQixDQUFDLENBQUM7S0FDeEM7QUFDSCxDQUFDLENBQUMsQ0FBQztBQUVILFNBQVMsYUFBYSxDQUFDLFNBQWlCLEVBQUUsYUFBcUI7SUFDN0QsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQzNCLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxHQUFHLFNBQVMsR0FBRyxhQUFhLENBQUM7SUFDdkUsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQ2pELENBQUMifQ==