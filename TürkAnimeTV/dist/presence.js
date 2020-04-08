const presence = new Presence({
    clientId: "666074265233260555"
});
const strings = presence.getStrings({
    playing: "presence.playback.playing",
    paused: "presence.playback.paused",
    browsing: "presence.activity.browsing"
});
function getTimestamps(videoTime, videoDuration) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
const startTimestamp = Math.floor(Date.now() / 1000);
let video;
presence.on("iFrameData", async (msg) => {
    if (!msg)
        return;
    video = msg;
});
presence.on("UpdateData", async () => {
    const presenceData = {
        largeImageKey: "turkanime"
    };
    const title = document.querySelector("#arkaplan > div:nth-child(3) > div.col-xs-8 > div > div:nth-child(3) > div > div.panel-ust > ol > li:nth-child(1) > a");
    const ep = document.querySelector("#arkaplan > div:nth-child(3) > div.col-xs-8 > div > div:nth-child(3) > div > div.panel-ust > ol > li:nth-child(2) > a");
    if (!title || !ep) {
        video = null;
    }
    if (title && ep) {
        presenceData.details = title.textContent;
        presenceData.state = ep.textContent.replace(title.textContent.split(" ").slice(1).join(" "), "");
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
            const timestamps = getTimestamps(Math.floor(video.currentTime), Math.floor(video.duration));
            presenceData.startTimestamp = timestamps[0];
            presenceData.endTimestamp = timestamps[1];
        }
    }
    presence.setActivity(presenceData);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUM1QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILE1BQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxVQUFVLENBQUM7SUFDbEMsT0FBTyxFQUFFLDJCQUEyQjtJQUNwQyxNQUFNLEVBQUUsMEJBQTBCO0lBQ2xDLFFBQVEsRUFBRSw0QkFBNEI7Q0FDdkMsQ0FBQyxDQUFDO0FBT0gsU0FBUyxhQUFhLENBQ3BCLFNBQWlCLEVBQ2pCLGFBQXFCO0lBRXJCLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUMzQixJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsR0FBRyxTQUFTLEdBQUcsYUFBYSxDQUFDO0lBQ3ZFLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQztBQUNqRCxDQUFDO0FBRUQsTUFBTSxjQUFjLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7QUFFckQsSUFBSSxLQUF1QixDQUFDO0FBRTVCLFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsRUFBRTtJQUN0QyxJQUFJLENBQUMsR0FBRztRQUFFLE9BQU87SUFDakIsS0FBSyxHQUFHLEdBQUcsQ0FBQztBQUNkLENBQUMsQ0FBQyxDQUFDO0FBRUgsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsS0FBSyxJQUFJLEVBQUU7SUFDbkMsTUFBTSxZQUFZLEdBQWlCO1FBQ2pDLGFBQWEsRUFBRSxXQUFXO0tBQzNCLENBQUM7SUFFRixNQUFNLEtBQUssR0FBRyxRQUFRLENBQUMsYUFBYSxDQUNsQyx1SEFBdUgsQ0FDeEgsQ0FBQztJQUNGLE1BQU0sRUFBRSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQy9CLHVIQUF1SCxDQUN4SCxDQUFDO0lBRUYsSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDLEVBQUUsRUFBRTtRQUNqQixLQUFLLEdBQUcsSUFBSSxDQUFDO0tBQ2Q7SUFJRCxJQUFJLEtBQUssSUFBSSxFQUFFLEVBQUU7UUFDZixZQUFZLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQyxXQUFXLENBQUM7UUFDekMsWUFBWSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FDekMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFDL0MsRUFBRSxDQUNILENBQUM7S0FDSDtTQUdJO1FBQ0gsWUFBWSxDQUFDLE9BQU8sR0FBRyxDQUFDLE1BQU0sT0FBTyxDQUFDLENBQUMsUUFBUSxDQUFDO1FBQ2hELFlBQVksQ0FBQyxjQUFjLEdBQUcsY0FBYyxDQUFDO0tBQzlDO0lBRUQsSUFBSSxLQUFLLEVBQUU7UUFDVCxZQUFZLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO1FBQzdELFlBQVksQ0FBQyxjQUFjLEdBQUcsS0FBSyxDQUFDLE1BQU07WUFDeEMsQ0FBQyxDQUFDLENBQUMsTUFBTSxPQUFPLENBQUMsQ0FBQyxNQUFNO1lBQ3hCLENBQUMsQ0FBQyxDQUFDLE1BQU0sT0FBTyxDQUFDLENBQUMsT0FBTyxDQUFDO1FBRTVCLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxJQUFJLEtBQUssQ0FBQyxRQUFRLEVBQUU7WUFDbkMsTUFBTSxVQUFVLEdBQUcsYUFBYSxDQUM5QixJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsRUFDN0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQzNCLENBQUM7WUFDRixZQUFZLENBQUMsY0FBYyxHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM1QyxZQUFZLENBQUMsWUFBWSxHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUMzQztLQUNGO0lBRUQsUUFBUSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUNyQyxDQUFDLENBQUMsQ0FBQyJ9