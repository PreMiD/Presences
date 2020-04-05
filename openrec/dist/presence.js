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
        presenceData.details =
            title !== null ? title.innerText : "Title not found...";
        presenceData.state =
            game !== null ? game.innerText : "Game not found...";
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
        if (title !== null && game !== null) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUN4QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsRUFDRixPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUM1QixJQUFJLEVBQUUsMkJBQTJCO0lBQ2pDLEtBQUssRUFBRSwwQkFBMEI7SUFDakMsSUFBSSxFQUFFLHdCQUF3QjtDQUMvQixDQUFDLEVBQ0YsWUFBWSxHQUFpQjtJQUMzQixhQUFhLEVBQUUsTUFBTTtDQUN0QixDQUFDO0FBRUosUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsS0FBSyxJQUFJLEVBQUU7SUFDbkMsSUFBSSxJQUFJLEdBQ04sUUFBUSxDQUFDLGFBQWEsQ0FBQywrQkFBK0IsQ0FBQyxJQUFJLElBQUksQ0FBQztJQUNsRSxJQUFJLEtBQUssR0FBcUIsUUFBUSxDQUFDLGFBQWEsQ0FDbEQsSUFBSSxDQUFDLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsZUFBZSxDQUMxQyxDQUFDO0lBQ0YsSUFBSSxLQUFLLEtBQUssSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsRUFBRTtRQUM1QyxJQUFJLEtBQVUsRUFBRSxJQUFTLEVBQUUsVUFBZSxDQUFDO1FBRTNDLEtBQUssR0FBRyxRQUFRLENBQUMsYUFBYSxDQUM1QixJQUFJO1lBQ0YsQ0FBQyxDQUFDLCtCQUErQjtZQUNqQyxDQUFDLENBQUMsc0NBQXNDLENBQzNDLENBQUM7UUFDRixJQUFJLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FDM0IsSUFBSSxDQUFDLENBQUMsQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUNyRCxDQUFDO1FBRUYsVUFBVSxHQUFHLGFBQWEsQ0FDeEIsSUFBSSxDQUFDLEtBQUssQ0FB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