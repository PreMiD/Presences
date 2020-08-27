const presence = new Presence({
    clientId: "731164832426098748"
}), strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused",
    browsing: "presence.activity.browsing"
});
let video = {
    duration: 0,
    currentTime: 0,
    paused: true
};
function getTimestamps(videoTime, videoDuration) {
    const startTime = Math.floor(Date.now());
    const endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), (Math.floor(endTime))];
}
presence.on("iFrameData", (data) => {
    video = data;
});
presence.on("UpdateData", async () => {
    const data = {
        largeImageKey: "jkanime"
    };
    console.log(video);
    if (video != null &&
        !isNaN(video.duration)) {
        const timestamps = getTimestamps(video.currentTime, video.duration);
        console.log("The current time is " + timestamps[0] + "and the durration is " + timestamps[1]);
        console.log("The video is " + video.paused);
        const title = document.querySelector("#reproductor-box > div.video-header > h1").textContent;
        if (title && timestamps[0] && timestamps[1]) {
            data.details = title;
            (data.smallImageKey = video.paused ? "pause" : "play");
            (data.smallImageText = video.paused
                ? (await strings).pause
                : (await strings).play);
            data.startTimestamp = timestamps[0];
            data.endTimestamp = timestamps[1];
            if (video.paused) {
                delete data.startTimestamp;
                delete data.endTimestamp;
            }
        }
    }
    else {
        data.details = "Unable to Read Page";
        data.state = "Define a statement for the site url";
        data.smallImageKey = "search";
        data.smallImageText = "Define a statement for the site url";
    }
    if (data.details == null) {
        presence.setTrayTitle();
        presence.setActivity();
    }
    else {
        presence.setActivity(data);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsRUFDRixPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUM1QixJQUFJLEVBQUUsMkJBQTJCO0lBQ2pDLEtBQUssRUFBRSwwQkFBMEI7SUFDakMsUUFBUSxFQUFFLDRCQUE0QjtDQUN2QyxDQUFDLENBQUM7QUFDTCxJQUFJLEtBQUssR0FBRztJQUNWLFFBQVEsRUFBRSxDQUFDO0lBQ1gsV0FBVyxFQUFFLENBQUM7SUFDZCxNQUFNLEVBQUUsSUFBSTtDQUNiLENBQUM7QUFFRixTQUFTLGFBQWEsQ0FDcEIsU0FBaUIsRUFDakIsYUFBcUI7SUFFckIsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQztJQUN6QyxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsR0FBRyxTQUFTLEdBQUcsYUFBYSxDQUFDO0lBQ3pFLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQy9ELENBQUM7QUFFRCxRQUFRLENBQUMsRUFBRSxDQUNULFlBQVksRUFDWixDQUFDLElBQWdFLEVBQUUsRUFBRTtJQUNuRSxLQUFLLEdBQUcsSUFBSSxDQUFDO0FBQ2YsQ0FBQyxDQUNGLENBQUM7QUFFRixRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxLQUFLLElBQUksRUFBRTtJQUNuQyxNQUFNLElBQUksR0FBaUI7UUFDekIsYUFBYSxFQUFFLFlBQVk7S0FDNUIsQ0FBQztJQUNGLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDbkIsSUFDRSxLQUFLLElBQUksSUFBSTtRQUNiLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsRUFDdEI7UUFDQSxNQUFNLFVBQVUsR0FBRyxhQUFhLENBQzlCLEtBQUssQ0FBQyxXQUFXLEVBQ2pCLEtBQUssQ0FBQyxRQUFRLENBQ2YsQ0FBQztRQUNGLE9BQU8sQ0FBQyxHQUFHLENBQUMsc0JBQXNCLEdBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQyxHQUFHLHVCQUF1QixHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzlGLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQTtRQUMzQyxNQUFNLEtBQUssR0FBRyxRQUFRLENBQUMsYUFBYSxDQUNoQywwQ0FBMEMsQ0FDM0MsQ0FBQyxXQUFXLENBQUM7UUFDaEIsSUFBRyxLQUFLLElBQUksVUFBVSxDQUFDLENBQUMsQ0FBQyxJQUFJLFVBQVUsQ0FBQyxDQUFDLENBQUMsRUFBQztZQUN2QyxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztZQUNyQixDQUFDLElBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUN2RCxDQUFDLElBQUksQ0FBQyxjQUFjLEdBQUcsS0FBSyxDQUFDLE1BQU07Z0JBQy9CLENBQUMsQ0FBQyxDQUFDLE1BQU0sT0FBTyxDQUFDLENBQUMsS0FBSztnQkFDdkIsQ0FBQyxDQUFDLENBQUMsTUFBTSxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUM1QixJQUFJLENBQUMsY0FBYyxHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNwQyxJQUFJLENBQUMsWUFBWSxHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUVsQyxJQUFJLEtBQUssQ0FBQyxNQUFNLEVBQUU7Z0JBQ2xCLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQztnQkFDM0IsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDO2FBQ3hCO1NBQ0o7S0FDRjtTQUFNO1FBQ0wsSUFBSSxDQUFDLE9BQU8sR0FBRyxxQkFBcUIsQ0FBQztRQUNyQyxJQUFJLENBQUMsS0FBSyxHQUFHLHFDQUFxQyxDQUFDO1FBQ25ELElBQUksQ0FBQyxhQUFhLEdBQUcsUUFBUSxDQUFDO1FBQzlCLElBQUksQ0FBQyxjQUFjLEdBQUcscUNBQXFDLENBQUM7S0FDN0Q7SUFDRCxJQUFJLElBQUksQ0FBQyxPQUFPLElBQUksSUFBSSxFQUFFO1FBQ3hCLFFBQVEsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUN4QixRQUFRLENBQUMsV0FBVyxFQUFFLENBQUM7S0FDMUI7U0FBTTtRQUNILFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDOUI7QUFDRCxDQUFDLENBQUMsQ0FBQyJ9