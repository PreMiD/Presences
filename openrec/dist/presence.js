var presence = new Presence({
    clientId: "612652426180296849"
}), strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused",
    live: "presence.activity.live"
}), presenceData = {
    largeImageKey: "logo"
};
presence.on("UpdateData", async () => {
    var live = document.querySelector(".MovieTitle__Title-s181dg2v-4") != null;
    var video = document.querySelector(live ? ".openrec-video" : "#capture-play");
    if (video !== null && !isNaN(video.duration)) {
        var title, game, timestamps;
        title = document.querySelector(live
            ? ".MovieTitle__Title-s181dg2v-4"
            : ".Component__CaptureTitle-s1nip9ch-16");
        game = document.querySelector(live ? ".TagButton__Button-otjf40-0" : ".text-hover");
        timestamps = getTimestamps(Math.floor(video.currentTime), Math.floor(video.duration));
        presenceData.details = title.innerText;
        presenceData.state = game.innerText;
        presenceData.largeImageKey = "logo";
        presenceData.smallImageKey = video.paused ? "pause" : "play";
        presenceData.smallImageText = video.paused
            ? (await strings).pause
            : (await strings).play;
        presenceData.startTimestamp = timestamps[0];
        presenceData.endTimestamp = timestamps[1];
        presence.setTrayTitle(video.paused ? "" : title.innerText);
        if (video.paused || live) {
            delete presenceData.startTimestamp;
            delete presenceData.endTimestamp;
            if (live) {
                presenceData.smallImageKey = "live";
                presenceData.smallImageText = (await strings).live;
            }
        }
        if (video && title !== null && game !== null) {
            presence.setActivity(presenceData, !video.paused);
        }
    }
    else {
        var pageData = {
            details: "Browsing..",
            largeImageKey: "logo"
        };
        presence.setActivity(pageData);
    }
});
function getTimestamps(videoTime, videoDuration) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQzlCLENBQUMsRUFDRixPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUM3QixJQUFJLEVBQUUsMkJBQTJCO0lBQ2pDLEtBQUssRUFBRSwwQkFBMEI7SUFDakMsSUFBSSxFQUFFLHdCQUF3QjtDQUM5QixDQUFDLEVBQ0YsWUFBWSxHQUFpQjtJQUM1QixhQUFhLEVBQUUsTUFBTTtDQUNyQixDQUFDO0FBRUgsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsS0FBSyxJQUFJLEVBQUU7SUFDcEMsSUFBSSxJQUFJLEdBQ1AsUUFBUSxDQUFDLGFBQWEsQ0FBQywrQkFBK0IsQ0FBQyxJQUFJLElBQUksQ0FBQztJQUNqRSxJQUFJLEtBQUssR0FBcUIsUUFBUSxDQUFDLGFBQWEsQ0FDbkQsSUFBSSxDQUFDLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsZUFBZSxDQUN6QyxDQUFDO0lBQ0YsSUFBSSxLQUFLLEtBQUssSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsRUFBRTtRQUM3QyxJQUFJLEtBQVUsRUFBRSxJQUFTLEVBQUUsVUFBZSxDQUFDO1FBRTNDLEtBQUssR0FBRyxRQUFRLENBQUMsYUFBYSxDQUM3QixJQUFJO1lBQ0gsQ0FBQyxDQUFDLCtCQUErQjtZQUNqQyxDQUFDLENBQUMsc0NBQXNDLENBQ3pDLENBQUM7UUFDRixJQUFJLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FDNUIsSUFBSSxDQUFDLENBQUMsQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUNwRCxDQUFDO1FBRUYsVUFBVSxHQUFHLGFBQWEsQ0FDekIsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLEVBQzdCLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUMxQixDQUFDO1FBRUYsWUFBWSxDQUFDLE9BQU8sR0FBSSxLQUFxQixDQUFDLFNBQVMsQ0FBQztRQUN4RCxZQUFZLENBQUMsS0FBSyxHQUFJLElBQW9CLENBQUMsU0FBUyxDQUFDO1FBQ3JELFlBQVksQ0FBQyxhQUFhLEdBQUcsTUFBTSxDQUFDO1FBQ3BDLFlBQVksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7UUFDN0QsWUFBWSxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUMsTUFBTTtZQUN6QyxDQUFDLENBQUMsQ0FBQyxNQUFNLE9BQU8sQ0FBQyxDQUFDLEtBQUs7WUFDdkIsQ0FBQyxDQUFDLENBQUMsTUFBTSxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFDeEIsWUFBWSxDQUFDLGNBQWMsR0FBRyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDNUMsWUFBWSxDQUFDLFlBQVksR0FBRyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFMUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUUzRCxJQUFJLEtBQUssQ0FBQyxNQUFNLElBQUksSUFBSSxFQUFFO1lBQ3pCLE9BQU8sWUFBWSxDQUFDLGNBQWMsQ0FBQztZQUNuQyxPQUFPLFlBQVksQ0FBQyxZQUFZLENBQUM7WUFFakMsSUFBSSxJQUFJLEVBQUU7Z0JBQ1QsWUFBWSxDQUFDLGFBQWEsR0FBRyxNQUFNLENBQUM7Z0JBQ3BDLFlBQVksQ0FBQyxjQUFjLEdBQUcsQ0FBQyxNQUFNLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQzthQUNuRDtTQUNEO1FBRUQsSUFBSSxLQUFLLElBQUksS0FBSyxLQUFLLElBQUksSUFBSSxJQUFJLEtBQUssSUFBSSxFQUFFO1lBQzdDLFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxFQUFFLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ2xEO0tBQ0Q7U0FBTTtRQUNOLElBQUksUUFBUSxHQUFpQjtZQUM1QixPQUFPLEVBQUUsWUFBWTtZQUNyQixhQUFhLEVBQUUsTUFBTTtTQUNyQixDQUFDO1FBQ0YsUUFBUSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQztLQUMvQjtBQUNGLENBQUMsQ0FBQyxDQUFDO0FBT0gsU0FBUyxhQUFhLENBQUMsU0FBaUIsRUFBRSxhQUFxQjtJQUM5RCxJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDM0IsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEdBQUcsU0FBUyxHQUFHLGFBQWEsQ0FBQztJQUN2RSxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFDaEQsQ0FBQyJ9