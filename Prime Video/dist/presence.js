const presence = new Presence({
    clientId: "705139844883677224"
}), strings = presence.getStrings({
    paused: "presence.playback.paused",
    playing: "presence.playback.playing"
}), browsingStamp = Math.floor(Date.now() / 1000);
function getTimestamps(videoTime, videoDuration) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
presence.on("UpdateData", async () => {
    const presenceData = { largeImageKey: "pvid" };
    presenceData.startTimestamp = browsingStamp;
    if (document.location.pathname.includes("/home/")) {
        presenceData.details = "Browsing...";
    }
    else if (document.location.pathname.includes("/detail/")) {
        const video = document.querySelector("video");
        const title = document.querySelector("div.center > div > div.title");
        const subtitle = document.querySelector("div.center > div > div.subtitle");
        if (video !== null &&
            title &&
            document.querySelector(".loadingSpinner.whiteSpinner").style.cssText !== "display: inline;") {
            presenceData.details = title.textContent;
            if (subtitle &&
                subtitle.textContent &&
                subtitle.textContent.trim() !== title.textContent.trim()) {
                presenceData.state = subtitle.textContent;
            }
            if (video.paused) {
                presenceData.smallImageKey = "paused";
                presenceData.smallImageText = (await strings).paused;
                delete presenceData.startTimestamp;
            }
            else {
                const timestamps = getTimestamps(Math.floor(video.currentTime), Math.floor(video.duration));
                presenceData.startTimestamp = timestamps[0];
                presenceData.endTimestamp = timestamps[1];
                presenceData.smallImageKey = "playing";
                presenceData.smallImageText = (await strings).playing;
            }
        }
        else {
            presenceData.details = "Viewing:";
            presenceData.state = document.querySelector(".dv-node-dp-title").textContent;
        }
    }
    else if (document.location.pathname.includes("/tv/")) {
        presenceData.details = "Browsing TV-Series";
    }
    else if (document.location.pathname.includes("/movie/")) {
        presenceData.details = "Browsing Movies";
    }
    else if (document.location.pathname.includes("/kids/")) {
        presenceData.details = "Browsing Movies for kids";
    }
    else if (document.location.pathname.includes("/search/") &&
        document.querySelector(".av-refine-bar-summaries") !== null) {
        presenceData.details = "Searching for:";
        presenceData.state = document
            .querySelector(".av-refine-bar-summaries")
            .textContent.split('"')[1]
            .split('"')[0];
        presenceData.smallImageKey = "search";
    }
    if (presenceData.details == null) {
        presence.setTrayTitle();
        presence.setActivity();
    }
    else {
        presence.setActivity(presenceData);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsRUFDRixPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUM1QixNQUFNLEVBQUUsMEJBQTBCO0lBQ2xDLE9BQU8sRUFBRSwyQkFBMkI7Q0FDckMsQ0FBQyxFQUNGLGFBQWEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQztBQU9oRCxTQUFTLGFBQWEsQ0FDcEIsU0FBaUIsRUFDakIsYUFBcUI7SUFFckIsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQzNCLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxHQUFHLFNBQVMsR0FBRyxhQUFhLENBQUM7SUFDdkUsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQ2pELENBQUM7QUFFRCxRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxLQUFLLElBQUksRUFBRTtJQUNuQyxNQUFNLFlBQVksR0FBaUIsRUFBRSxhQUFhLEVBQUUsTUFBTSxFQUFFLENBQUM7SUFDN0QsWUFBWSxDQUFDLGNBQWMsR0FBRyxhQUFhLENBQUM7SUFDNUMsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEVBQUU7UUFDakQsWUFBWSxDQUFDLE9BQU8sR0FBRyxhQUFhLENBQUM7S0FDdEM7U0FBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENB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