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
        let video = document.querySelector("video");
        if (isNaN(video.duration)) {
            video = document.querySelector("video:nth-child(2)");
        }
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