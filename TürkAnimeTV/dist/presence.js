let presence = new Presence({
    clientId: "666074265233260555"
});
let strings = presence.getStrings({
    playing: "presence.playback.playing",
    paused: "presence.playback.paused",
    browsing: "presence.activity.browsing"
});
let startTimestamp = Math.floor(Date.now() / 1000);
let video;
presence.on("iFrameData", async (msg) => {
    if (!msg)
        return;
    video = msg;
});
presence.on("UpdateData", async () => {
    let presenceData = {
        largeImageKey: "turkanime"
    };
    let title = document.querySelector("#arkaplan > div:nth-child(3) > div.col-xs-8 > div > div:nth-child(3) > div > div.panel-ust > ol > li:nth-child(1) > a");
    let ep = document.querySelector("#arkaplan > div:nth-child(3) > div.col-xs-8 > div > div:nth-child(3) > div > div.panel-ust > ol > li:nth-child(2) > a");
    if (!title || !ep) {
        video = null;
    }
    if (title && ep) {
        presenceData.details = title.textContent;
        presenceData.state = ep.textContent.replace(title.textContent
            .split(" ")
            .slice(1)
            .join(" "), "");
    }
    else {
        presenceData.details = (await strings).browsing;
        presenceData.startTimestamp = startTimestamp;
    }
    if (video) {
        presenceData.smallImageKey = video.paused ? "pause" : "play";
        presenceData.smallImageText = video.paused
            ? (await strings).paused
            : (await strings).playing;
        if (!video.paused && video.duration) {
            let timestamps = getTimestamps(Math.floor(video.currentTime), Math.floor(video.duration));
            presenceData.startTimestamp = timestamps[0];
            presenceData.endTimestamp = timestamps[1];
        }
    }
    presence.setActivity(presenceData);
});
function getTimestamps(videoTime, videoDuration) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMzQixRQUFRLEVBQUUsb0JBQW9CO0NBQzlCLENBQUMsQ0FBQztBQUVILElBQUksT0FBTyxHQUFHLFFBQVEsQ0FBQyxVQUFVLENBQUM7SUFDakMsT0FBTyxFQUFFLDJCQUEyQjtJQUNwQyxNQUFNLEVBQUUsMEJBQTBCO0lBQ2xDLFFBQVEsRUFBRSw0QkFBNEI7Q0FDdEMsQ0FBQyxDQUFDO0FBRUgsSUFBSSxjQUFjLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7QUFFbkQsSUFBSSxLQUF1QixDQUFDO0FBRTVCLFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssRUFBQyxHQUFHLEVBQUMsRUFBRTtJQUNyQyxJQUFJLENBQUMsR0FBRztRQUFFLE9BQU87SUFDakIsS0FBSyxHQUFHLEdBQUcsQ0FBQztBQUNiLENBQUMsQ0FBQyxDQUFDO0FBRUgsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsS0FBSyxJQUFJLEVBQUU7SUFDcEMsSUFBSSxZQUFZLEdBQWlCO1FBQ2hDLGFBQWEsRUFBRSxXQUFXO0tBQzFCLENBQUM7SUFFRixJQUFJLEtBQUssR0FBRyxRQUFRLENBQUMsYUFBYSxDQUNqQyx1SEFBdUgsQ0FDdkgsQ0FBQztJQUNGLElBQUksRUFBRSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQzlCLHVIQUF1SCxDQUN2SCxDQUFDO0lBRUYsSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDLEVBQUUsRUFBRTtRQUNsQixLQUFLLEdBQUcsSUFBSSxDQUFDO0tBQ2I7SUFJRCxJQUFJLEtBQUssSUFBSSxFQUFFLEVBQUU7UUFDaEIsWUFBWSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUMsV0FBVyxDQUFDO1FBQ3pDLFlBQVksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQzFDLEtBQUssQ0FBQyxXQUFXO2FBQ2YsS0FBSyxDQUFDLEdBQUcsQ0FBQzthQUNWLEtBQUssQ0FBQyxDQUFDLENBQUM7YUFDUixJQUFJLENBQUMsR0FBRyxDQUFDLEVBQ1gsRUFBRSxDQUNGLENBQUM7S0FDRjtTQUdJO1FBQ0osWUFBWSxDQUFDLE9BQU8sR0FBRyxDQUFDLE1BQU0sT0FBTyxDQUFDLENBQUMsUUFBUSxDQUFDO1FBQ2hELFlBQVksQ0FBQyxjQUFjLEdBQUcsY0FBYyxDQUFDO0tBQzdDO0lBRUQsSUFBSSxLQUFLLEVBQUU7UUFDVixZQUFZLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO1FBQzdELFlBQVksQ0FBQyxjQUFjLEdBQUcsS0FBSyxDQUFDLE1BQU07WUFDekMsQ0FBQyxDQUFDLENBQUMsTUFBTSxPQUFPLENBQUMsQ0FBQyxNQUFNO1lBQ3hCLENBQUMsQ0FBQyxDQUFDLE1BQU0sT0FBTyxDQUFDLENBQUMsT0FBTyxDQUFDO1FBRTNCLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxJQUFJLEtBQUssQ0FBQyxRQUFRLEVBQUU7WUFDcEMsSUFBSSxVQUFVLEdBQUcsYUFBYSxDQUM3QixJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsRUFDN0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQzFCLENBQUM7WUFDRixZQUFZLENBQUMsY0FBYyxHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM1QyxZQUFZLENBQUMsWUFBWSxHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUMxQztLQUNEO0lBRUQsUUFBUSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUNwQyxDQUFDLENBQUMsQ0FBQztBQUVILFNBQVMsYUFBYSxDQUFDLFNBQWlCLEVBQUUsYUFBcUI7SUFDOUQsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQzNCLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxHQUFHLFNBQVMsR0FBRyxhQUFhLENBQUM7SUFDdkUsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQ2hELENBQUMifQ==