var presence = new Presence({
    clientId: "659503939573776385"
}), strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused",
    browsing: "presence.activity.browsing"
}), video = {
    duration: 0,
    currentTime: 0,
    paused: true
};
function getTimestamps(videoTime, videoDuration) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
presence.on("iFrameData", (data) => {
    video = data;
});
presence.on("UpdateData", async () => {
    var data = {
        largeImageKey: "va"
    };
    if (video != null &&
        !isNaN(video.duration) &&
        video.duration > 0 &&
        document.querySelector("#headline span.current") &&
        document.querySelector("#headline span.current").textContent.length > 5) {
        var timestamps = getTimestamps(Math.floor(video.currentTime), Math.floor(video.duration));
        data.details = document
            .querySelector("#headline span.current")
            .textContent.substr(0, document
            .querySelector("#headline span.current")
            .textContent.lastIndexOf(" – "));
        data.state = document
            .querySelector("#headline span.current")
            .textContent.split(" – ")
            .pop();
        data.smallImageKey = video.paused ? "pause" : "play";
        data.smallImageText = video.paused
            ? (await strings).pause
            : (await strings).play;
        data.startTimestamp = timestamps[0];
        data.endTimestamp = timestamps[1];
        if (video.paused) {
            delete data.startTimestamp;
            delete data.endTimestamp;
        }
        presence.setActivity(data, !video.paused);
    }
    else {
        data.details = (await strings).browsing;
        data.smallImageKey = "search";
        data.smallImageText = (await strings).browsing;
        switch (document.location.pathname) {
            case "/anime-films-vf/":
                data.state = "Films VF";
                break;
            case "/anime-films-vostfr/":
                data.state = "Films VOSTFR";
                break;
            case "/top-animes/":
                data.state = "Top animes";
                break;
            case "/animes-liste/":
            default:
                data.state = "Page d'accueil";
        }
        presence.setActivity(data);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUN4QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsRUFDRixPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUM1QixJQUFJLEVBQUUsMkJBQTJCO0lBQ2pDLEtBQUssRUFBRSwwQkFBMEI7SUFDakMsUUFBUSxFQUFFLDRCQUE0QjtDQUN2QyxDQUFDLEVBQ0YsS0FBSyxHQUFHO0lBQ04sUUFBUSxFQUFFLENBQUM7SUFDWCxXQUFXLEVBQUUsQ0FBQztJQUNkLE1BQU0sRUFBRSxJQUFJO0NBQ2IsQ0FBQztBQU9KLFNBQVMsYUFBYSxDQUNwQixTQUFpQixFQUNqQixhQUFxQjtJQUVyQixJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDM0IsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEdBQUcsU0FBUyxHQUFHLGFBQWEsQ0FBQztJQUN2RSxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFDakQsQ0FBQztBQUVELFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUU7SUFDakMsS0FBSyxHQUFHLElBQUksQ0FBQztBQUNmLENBQUMsQ0FBQyxDQUFDO0FBRUgsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsS0FBSyxJQUFJLEVBQUU7SUFDbkMsSUFBSSxJQUFJLEdBQWlCO1FBQ3ZCLGFBQWEsRUFBRSxJQUFJO0tBQ3BCLENBQUM7SUFFRixJQUNFLEtBQUssSUFBSSxJQUFJO1FBQ2IsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQztR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