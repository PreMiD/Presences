let presence = new Presence({
    clientId: "632479205707350037"
}), strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
}), startTimestamp = Math.floor(Date.now() / 1000);
presence.on("UpdateData", async () => {
    let presenceData = {
        largeImageKey: "large_img",
        startTimestamp
    };
    const url = window.location.href;
    if (url.includes("/watch/")) {
        let video = document.getElementsByTagName("video")[0], timestamps = getTimestamps(Math.floor(video.currentTime), Math.floor(video.duration)), title = document.getElementsByClassName("meta-data-title")[0].textContent;
        presenceData = {
            details: title,
            largeImageKey: "large_img",
            smallImageKey: video.paused ? "pause" : "play",
            smallImageText: video.paused
                ? (await strings).pause
                : (await strings).play,
            startTimestamp: timestamps[0],
            endTimestamp: timestamps[1]
        };
        if (url.includes("/tv/")) {
            const episode = document.querySelectorAll("div.now-playing")[0].offsetParent.querySelectorAll("span.jioTitle")[1].textContent;
            presenceData.state = episode.replace("| ", "");
        }
        else if (url.includes("/movies/")) {
            presenceData.state = "Movie";
        }
        else if (url.includes("/playlist/")) {
            presenceData.state = "Music Video";
        }
        else {
            presenceData.state = "Video";
        }
        if (video.paused) {
            delete presenceData.startTimestamp;
            delete presenceData.endTimestamp;
        }
    }
    else if (url.includes("/search/")) {
        presenceData.details = "Searching...";
        presenceData.smallImageKey = "search";
    }
    else {
        presenceData.details = "Browsing";
    }
    presence.setActivity(presenceData, true);
});
function getTimestamps(videoTime, videoDuration) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBYSxJQUFJLFFBQVEsQ0FBQztJQUNsQyxRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsRUFDRixPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUM1QixJQUFJLEVBQUUsMkJBQTJCO0lBQ2pDLEtBQUssRUFBRSwwQkFBMEI7Q0FDbEMsQ0FBQyxFQUNGLGNBQWMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQztBQUNqRCxRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxLQUFLLElBQUksRUFBRTtJQUNuQyxJQUFJLFlBQVksR0FBaUI7UUFDL0IsYUFBYSxFQUFFLFdBQVc7UUFDMUIsY0FBYztLQUNmLENBQUM7SUFDRixNQUFNLEdBQUcsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQztJQUNqQyxJQUFJLEdBQUcsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLEVBQUU7UUFDM0IsSUFBSSxLQUFLLEdBQXFCLFFBQVEsQ0FBQyxvQkFBb0IsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFDckUsVUFBVSxHQUFHLGFBQWEsQ0FDeEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLEVBQzdCLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUMzQixFQUNELEtBQUssR0FBRyxRQUFRLENBQUMsc0JBQXNCLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUM7UUFDNUUsWUFBWSxHQUFHO1lBQ2IsT0FBTyxFQUFFLEtBQUs7WUFDZCxhQUFhLEVBQUUsV0FBVztZQUMxQixhQUFhLEVBQUUsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxNQUFNO1lBQzlDLGNBQWMsRUFBRSxLQUFLLENBQUMsTUFBTTtnQkFDMUIsQ0FBQyxDQUFDLENBQUMsTUFBTSxPQUFPLENBQUMsQ0FBQyxLQUFLO2dCQUN2QixDQUFDLENBQUMsQ0FBQyxNQUFNLE9BQU8sQ0FBQyxDQUFDLElBQUk7WUFDeEIsY0FBYyxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUM7WUFDN0IsWUFBWSxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUM7U0FDNUIsQ0FBQztRQUNGLElBQUksR0FBRyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUN4QixNQUFNLE9BQU8sR0FBSSxRQUFRLENBQUMsZ0JBQWdCLENBQ3hDLGlCQUFpQixDQUNVLENBQUMsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLGdCQUFnQixDQUM1RCxlQUFlLENBQ2hCLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDO1lBQ2pCLFlBQVksQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7U0FDaEQ7YUFBTSxJQUFJLEdBQUcsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLEVBQUU7WUFDbkMsWUFBWSxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUM7U0FDOUI7YUFBTSxJQUFJLEdBQUcsQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLEVBQUU7WUFDckMsWUFBWSxDQUFDLEtBQUssR0FBRyxhQUFhLENBQUM7U0FDcEM7YUFBTTtZQUNMLFlBQVksQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDO1NBQzlCO1FBQ0QsSUFBSSxLQUFLLENBQUMsTUFBTSxFQUFFO1lBQ2hCLE9BQU8sWUFBWSxDQUFDLGNBQWMsQ0FBQztZQUNuQyxPQUFPLFlBQVksQ0FBQyxZQUFZLENBQUM7U0FDbEM7S0FDRjtTQUFNLElBQUksR0FBRyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsRUFBRTtRQUNuQyxZQUFZLENBQUMsT0FBTyxHQUFHLGNBQWMsQ0FBQztRQUN0QyxZQUFZLENBQUMsYUFBYSxHQUFHLFFBQVEsQ0FBQztLQUN2QztTQUFNO1FBQ0wsWUFBWSxDQUFDLE9BQU8sR0FBRyxVQUFVLENBQUM7S0FDbkM7SUFFRCxRQUFRLENBQUMsV0FBVyxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsQ0FBQztBQUMzQyxDQUFDLENBQUMsQ0FBQztBQUVILFNBQVMsYUFBYSxDQUFDLFNBQWlCLEVBQUUsYUFBcUI7SUFDN0QsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQzNCLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxHQUFHLFNBQVMsR0FBRyxhQUFhLENBQUM7SUFDdkUsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQ2pELENBQUMifQ==