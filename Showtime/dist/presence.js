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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQzlCLENBQUMsRUFDRixPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUM3QixJQUFJLEVBQUUsMkJBQTJCO0lBQ2pDLEtBQUssRUFBRSwwQkFBMEI7SUFDakMsSUFBSSxFQUFFLHdCQUF3QjtDQUM5QixDQUFDLENBQUM7QUFFSixRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxLQUFLLElBQUksRUFBRTtJQUNwQyxJQUFJLEtBQUssR0FBcUIsUUFBUSxDQUFDLGFBQWEsQ0FDbkQsK0JBQStCLENBQy9CLENBQUM7SUFFRixJQUFJLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEVBQUU7UUFDcEMsSUFBSSxLQUFLLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FDakMsd0RBQXdELENBQ3hELENBQUMsV0FBVyxDQUFDO1FBQ2QsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEVBQUU7WUFDakQsSUFBSSxXQUFXLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FDdkMsOENBQThDLENBQzlDLENBQUMsV0FBVyxDQUFDO1NBQ2Q7YUFBTTtZQUNOLElBQUksV0FBVyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQ3ZDLHlDQUF5QyxDQUN6QyxDQUFDLFdBQVcsQ0FBQztTQUNkO1FBRUQsSUFBSSxXQUFXLENBQUMsSUFBSSxFQUFFLElBQUksS0FBSyxFQUFFO1lBQ2hDLFdBQVcsR0FBRyxPQUFPLENBQUM7U0FDdEI7UUFFRCxJQUFJLFVBQVUsR0FBRyxhQUFhLENBQzdCLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxFQUM3QixJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FDMUIsQ0FBQztRQUVGLElBQUksWUFBWSxFQUFFLGFBQWEsRUFBRSxjQUFjLENBQUM7UUFDaEQsSUFBSSxXQUFXLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQ25DLFlBQVksR0FBRyxTQUFTLENBQUM7WUFDekIsVUFBVSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNsQixVQUFVLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2xCLGFBQWEsR0FBRyxNQUFNLENBQUM7WUFDdkIsY0FBYyxHQUFHLENBQUMsTUFBTSxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUM7U0FDdEM7YUFBTTtZQUNOLFlBQVksR0FBRyxXQUFXLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDeEUsYUFBYSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO1lBQ2hELGNBQWMsR0FBRyxLQUFLLENBQUMsTUFBTTtnQkFDNUIsQ0FBQyxDQUFDLENBQUMsTUFBTSxPQUFPLENBQUMsQ0FBQyxLQUFLO2dCQUN2QixDQUFDLENBQUMsQ0FBQyxNQUFNLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQztTQUN4QjtRQUVELElBQUksSUFBSSxHQUFpQjtZQUN4QixPQUFPLEVBQUUsS0FBSztZQUNkLEtBQUssRUFBRSxZQUFZO1lBQ25CLGFBQWEsRUFBRSxlQUFlO1lBQzlCLGFBQWEsRUFBRSxhQUFhO1lBQzVCLGNBQWMsRUFBRSxjQUFjO1lBQzlCLGNBQWMsRUFBRSxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQzdCLFlBQVksRUFBRSxVQUFVLENBQUMsQ0FBQyxDQUFDO1NBQzNCLENBQUM7UUFFRixJQUFJLEtBQUssQ0FBQyxNQUFNLEVBQUU7WUFDakIsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDO1lBQzNCLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQztTQUN6QjtRQUVELElBQUksS0FBSyxLQUFLLElBQUksSUFBSSxXQUFXLEtBQUssSUFBSSxFQUFFO1lBQzNDLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQzFDO0tBQ0Q7U0FBTTtRQUNOLElBQUksZ0JBQWdCLEdBQWlCO1lBQ3BDLE9BQU8sRUFBRSxhQUFhO1lBQ3RCLGFBQWEsRUFBRSxlQUFlO1NBQzlCLENBQUM7UUFDRixRQUFRLENBQUMsV0FBVyxDQUFDLGdCQUFnQixDQUFDLENBQUM7S0FDdkM7QUFDRixDQUFDLENBQUMsQ0FBQztBQUVILFNBQVMsYUFBYSxDQUFDLFNBQWlCLEVBQUUsYUFBcUI7SUFDOUQsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQzNCLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxHQUFHLFNBQVMsR0FBRyxhQUFhLENBQUM7SUFDdkUsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQ2hELENBQUMifQ==