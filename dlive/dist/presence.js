var presence = new Presence({
    clientId: "609531561389588480"
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
        document.querySelector("video.dplayer-video.dplayer-video-current") !== null
            ? true
            : false;
    if (!playback) {
        const presenceData = {
            largeImageKey: "lg"
        };
        presenceData.details = "Browsing...";
        presenceData.startTimestamp = browsingStamp;
        presence.setActivity(presenceData, true);
    }
    var video = document.querySelector("video.dplayer-video.dplayer-video-current");
    if (video !== null) {
        var videoTitle, streamer;
        videoTitle = document.querySelector(".info-line-left.flex-box .flex-column.flex-justify-center div");
        streamer = document.querySelector("div.channel-header span.dlive-name span.overflow-ellipsis");
        const presenceData = {
            largeImageKey: "lg",
            smallImageKey: "live"
        };
        presence.setTrayTitle(videoTitle.innerText);
        presenceData.details = videoTitle.innerText;
        presenceData.state = streamer.innerText;
        presenceData.startTimestamp = browsingStamp;
        presence.setActivity(presenceData, true);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILElBQUksaUJBQWlCLEdBQUcsSUFBSSxDQUFDO0FBQzdCLElBQUksUUFBUSxDQUFDO0FBQ2IsSUFBSSxhQUFhLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7QUFFbEQsSUFBSSxpQkFBaUIsSUFBSSxRQUFRLEVBQUU7SUFDakMsaUJBQWlCLEdBQUcsUUFBUSxDQUFDO0lBQzdCLGFBQWEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQztDQUMvQztBQUVELFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBQ25DLFFBQVE7UUFDTixRQUFRLENBQUMsYUFBYSxDQUFDLDJDQUEyQyxDQUFDLEtBQUssSUFBSTtZQUMxRSxDQUFDLENBQUMsSUFBSTtZQUNOLENBQUMsQ0FBQyxLQUFLLENBQUM7SUFFWixJQUFJLENBQUMsUUFBUSxFQUFFO1FBQ2IsTUFBTSxZQUFZLEdBQWlCO1lBQ2pDLGFBQWEsRUFBRSxJQUFJO1NBQ3BCLENBQUM7UUFFRixZQUFZLENBQUMsT0FBTyxHQUFHLGFBQWEsQ0FBQztRQUNyQyxZQUFZLENBQUMsY0FBYyxHQUFHLGFBQWEsQ0FBQztRQUU1QyxRQUFRLENBQUMsV0FBVyxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsQ0FBQztLQUMxQztJQUVELElBQUksS0FBSyxHQUFxQixRQUFRLENBQUMsYUFBYSxDQUNsRCwyQ0FBMkMsQ0FDNUMsQ0FBQztJQUVGLElBQUksS0FBSyxLQUFLLElBQUksRUFBRTtRQUNsQixJQUFJLFVBQWUsRUFBRSxRQUFhLENBQUM7UUFFbkMsVUFBVSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQ2pDLCtEQUErRCxDQUNoRSxDQUFDO1FBQ0YsUUFBUSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQy9CLDJEQUEyRCxDQUM1RCxDQUFDO1FBRUYsTUFBTSxZQUFZLEdBQWlCO1lBQ2pDLGFBQWEsRUFBRSxJQUFJO1lBQ25CLGFBQWEsRUFBRSxNQUFNO1NBQ3RCLENBQUM7UUFFRixRQUFRLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUU1QyxZQUFZLENBQUMsT0FBTyxHQUFHLFVBQVUsQ0FBQyxTQUFTLENBQUM7UUFDNUMsWUFBWSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUMsU0FBUyxDQUFDO1FBQ3hDLFlBQVksQ0FBQyxjQUFjLEdBQUcsYUFBYSxDQUFDO1FBRTVDLFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxDQUFDO0tBQzFDO0FBQ0gsQ0FBQyxDQUFDLENBQUMifQ==