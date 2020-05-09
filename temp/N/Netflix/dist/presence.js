var presence = new Presence({
    clientId: "630480553694593025"
}), strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused",
    browsing: "presence.activity.browsing"
});
function getTimestamps(videoTime, videoDuration) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
presence.on("UpdateData", async () => {
    const data = {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUN4QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsRUFDRixPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUM1QixJQUFJLEVBQUUsMkJBQTJCO0lBQ2pDLEtBQUssRUFBRSwwQkFBMEI7SUFDakMsUUFBUSxFQUFFLDRCQUE0QjtDQUN2QyxDQUFDLENBQUM7QUFPTCxTQUFTLGFBQWEsQ0FDcEIsU0FBaUIsRUFDakIsYUFBcUI7SUFFckIsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQzNCLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxHQUFHLFNBQVMsR0FBRyxhQUFhLENBQUM7SUFDdkUsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQ2pELENBQUM7QUFFRCxRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxLQUFLLElBQUksRUFBRTtJQUNuQyxNQUFNLElBQUksR0FBaUI7UUFDekIsYUFBYSxFQUFFLGNBQWM7S0FDOUIsQ0FBQztJQUVGLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1FBQ2pELElBQUksS0FBSyxHQUFxQixRQUFRLENBQUMsYUFBYSxDQUNsRCx1QkFBdUIsQ0FDeEIsQ0FBQztRQUNGLElBQUksS0FBSyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUNuQyxJQUFJLFNBQVMsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUNwQyx1Q0FBdUMsQ0FDeEM7Z0JBQ0Ms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