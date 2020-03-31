var presence = new Presence({
    clientId: "463151177836658699"
}), strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
});
presence.on("UpdateData", async () => {
    var title = document.querySelector(".ytmusic-player-bar.title").innerText, video = document.querySelector(".video-stream");
    if (title !== "" && !isNaN(video.duration)) {
        var timestamps = getTimestamps(Math.floor(video.currentTime), Math.floor(video.duration)), presenceData = {
            details: title,
            state: getAuthorString(),
            largeImageKey: "ytm_lg",
            smallImageKey: video.paused ? "pause" : "play",
            smallImageText: video.paused
                ? (await strings).pause
                : (await strings).play,
            startTimestamp: timestamps[0],
            endTimestamp: timestamps[1]
        };
        if (video.paused) {
            delete presenceData.startTimestamp;
            delete presenceData.endTimestamp;
            presence.setTrayTitle();
        }
        else
            presence.setTrayTitle(title);
        presence.setActivity(presenceData);
    }
    else
        presence.setActivity();
});
function getAuthorString() {
    var authors = document.querySelectorAll("span yt-formatted-string.ytmusic-player-bar a"), authorsArray, authorString;
    if (authors.length > 1) {
        var year = document.querySelector("span yt-formatted-string.ytmusic-player-bar ").textContent;
        year = year.slice(year.length - 4, year.length);
        authorsArray = Array.from(authors);
        authorString = `${authorsArray
            .slice(0, authorsArray.length - 1)
            .map(a => a.innerText)
            .join(", ")} - ${authorsArray[authorsArray.length - 1].innerText} (${year})`;
    }
    else
        authorString = document.querySelector("span yt-formatted-string.ytmusic-player-bar").innerText;
    return authorString;
}
function getTimestamps(videoTime, videoDuration) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUN4QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsRUFDRixPQUFPLEdBQVEsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUNqQyxJQUFJLEVBQUUsMkJBQTJCO0lBQ2pDLEtBQUssRUFBRSwwQkFBMEI7Q0FDbEMsQ0FBQyxDQUFDO0FBRUwsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsS0FBSyxJQUFJLEVBQUU7SUFDbkMsSUFBSSxLQUFLLEdBQUksUUFBUSxDQUFDLGFBQWEsQ0FDL0IsMkJBQTJCLENBQ1osQ0FBQyxTQUFTLEVBQzNCLEtBQUssR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLGVBQWUsQ0FBcUIsQ0FBQztJQUV0RSxJQUFJLEtBQUssS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxFQUFFO1FBQzFDLElBQUksVUFBVSxHQUFHLGFBQWEsQ0FDMUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLEVBQzdCLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUMzQixFQUNELFlBQVksR0FBaUI7WUFDM0IsT0FBTyxFQUFFLEtBQUs7WUFDZCxLQUFLLEVBQUUsZUFBZSxFQUFFO1lBQ3hCLGFBQWEsRUFBRSxRQUFRO1lBQ3ZCLGFBQWEsRUFBRSxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLE1BQU07WUFDOUMsY0FBYyxFQUFFLEtBQUssQ0FBQyxNQUFNO2dCQUMxQixDQUFDLENBQUMsQ0FBQyxNQUFNLE9BQU8sQ0FBQyxDQUFDLEtBQUs7Z0JBQ3ZCLENBQUMsQ0FBQyxDQUFDLE1BQU0sT0FBTyxDQUFDLENBQUMsSUFBSTtZQUN4QixjQUFjLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQztZQUM3QixZQUFZLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQztTQUM1QixDQUFDO1FBRUosSUFBSSxLQUFLLENBQUMsTUFBTSxFQUFFO1lBQ2hCLE9BQU8sWUFBWSxDQUFDLGNBQWMsQ0FBQztZQUNuQyxPQUFPLFlBQVksQ0FBQyxZQUFZLENBQUM7WUFDakMsUUFBUSxDQUFDLFlBQVksRUFBRSxDQUFDO1NBQ3pCOztZQUFNLFFBQVEsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFcEMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztLQUNwQzs7UUFBTSxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUM7QUFDaEMsQ0FBQyxDQUFDLENBQUM7QUFFSCxTQUFTLGVBQWU7SUFFdEIsSUFBSSxPQUFPLEdBQUcsUUFBUSxDQUFDLGdCQUFnQixDQUNuQywrQ0FBK0MsQ0FDZixFQUNsQyxZQUFzQyxFQUN0QyxZQUFvQixDQUFDO0lBR3ZCLElBQUksT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7UUFFdEIsSUFBSSxJQUFJLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FDL0IsOENBQThDLENBQy9DLENBQUMsV0FBVyxDQUFDO1FBQ2QsSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBR2hELFlBQVksR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBR25DLFlBQVksR0FBRyxHQUFHLFlBQVk7YUFDM0IsS0FBSyxDQUFDLENBQUMsRUFBRSxZQUFZLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQzthQUNqQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO2FBQ3JCLElBQUksQ0FBQyxJQUFJLENBQUMsTUFDWCxZQUFZLENBQUMsWUFBWSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxTQUN4QyxLQUFLLElBQUksR0FBRyxDQUFDO0tBQ2Q7O1FBR0MsWUFBWSxHQUFJLFFBQVEsQ0FBQyxhQUFhLENBQ3BDLDZDQUE2QyxDQUN4QixDQUFDLFNBQVMsQ0FBQztJQUVwQyxPQUFPLFlBQVksQ0FBQztBQUN0QixDQUFDO0FBT0QsU0FBUyxhQUFhLENBQUMsU0FBaUIsRUFBRSxhQUFxQjtJQUM3RCxJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDM0IsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEdBQUcsU0FBUyxHQUFHLGFBQWEsQ0FBQztJQUN2RSxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFDakQsQ0FBQyJ9