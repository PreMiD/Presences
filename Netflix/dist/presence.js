var presence = new Presence({
    clientId: "630480553694593025"
}), strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused",
    browsing: "presence.activity.browsing"
});
presence.on("UpdateData", async () => {
    let data = {
        largeImageKey: "netflix-logo"
    };
    if (document.location.pathname.includes("/watch")) {
        var video = document.querySelector(".VideoContainer video");
        if (video && !isNaN(video.duration)) {
            var showCheck = document.querySelector("[class$='title'] .ellipsize-text span")
                ? true
                : false;
            var timestamps = getTimestamps(Math.floor(video.currentTime), Math.floor(video.duration));
            if (showCheck) {
                data.details =
                    " " +
                        document.querySelector("[class$='title'] .ellipsize-text h4")
                            .textContent;
                if (document.querySelector("[class$='title'] .ellipsize-text span:nth-child(3)")) {
                    data.state =
                        document.querySelector("[class$='title'] .ellipsize-text span")
                            .textContent +
                            " " +
                            document.querySelector("[class$='title'] .ellipsize-text span:nth-child(3)").textContent;
                }
                else {
                    data.state = document.querySelector("[class$='title'] .ellipsize-text span").textContent;
                }
            }
            else {
                var regExp, title = document.querySelector("[class$='title'] h4.ellipsize-text")
                    .textContent;
                if (/\(([^)]+)\)/.test(title.toLowerCase())) {
                    regExp = /\(([^)]+)\)/.exec(title);
                    data.details = " " + title.replace(regExp[0], "");
                    data.state = regExp[1];
                }
                else {
                    data.details = " " + title;
                    data.state = "Movie";
                }
            }
            (data.smallImageKey = video.paused ? "pause" : "play"),
                (data.smallImageText = video.paused
                    ? (await strings).pause
                    : (await strings).play),
                (data.startTimestamp = timestamps[0]),
                (data.endTimestamp = timestamps[1]);
            if (video.paused) {
                delete data.startTimestamp;
                delete data.endTimestamp;
            }
            presence.setActivity(data, !video.paused);
        }
    }
    else {
        data.details = (await strings).browsing;
        presence.setActivity(data);
    }
});
function getTimestamps(videoTime, videoDuration) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQzlCLENBQUMsRUFDRixPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUM3QixJQUFJLEVBQUUsMkJBQTJCO0lBQ2pDLEtBQUssRUFBRSwwQkFBMEI7SUFDakMsUUFBUSxFQUFFLDRCQUE0QjtDQUN0QyxDQUFDLENBQUM7QUFFSixRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxLQUFLLElBQUksRUFBRTtJQUNwQyxJQUFJLElBQUksR0FBaUI7UUFDeEIsYUFBYSxFQUFFLGNBQWM7S0FDN0IsQ0FBQztJQUVGLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1FBQ2xELElBQUksS0FBSyxHQUFxQixRQUFRLENBQUMsYUFBYSxDQUNuRCx1QkFBdUIsQ0FDdkIsQ0FBQztRQUNGLElBQUksS0FBSyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUNwQyxJQUFJLFNBQVMsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUNyQyx1Q0FBdUMsQ0FDdkM7Z0JBQ0EsQ0FBQyxDQUFDLElBQUk7Z0JBQ04sQ0FBQyxDQUFDLEtBQUssQ0FBQztZQUNULElBQUksVUFBVSxHQUFHLGFBQWEsQ0FDN0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLEVBQzdCLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUMxQixDQUFDO1lBRUYsSUFBSSxTQUFTLEVBQUU7Z0JBQ2QsSUFBSSxDQUFDLE9BQU87b0JBQ1gsR0FBRzt3QkFDSCxRQUFRLENBQUMsYUFBYSxDQUFDLHFDQUFxQyxDQUFD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