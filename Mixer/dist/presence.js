const presence = new Presence({
    clientId: "607362931180699648"
});
const strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused",
    live: "presence.activity.live"
});
var oldUrl, elapsed, state;
presence.on("UpdateData", async () => {
    var title, streamer, smallImageKey, smallImageText, videoTime, videoDuration, synced;
    const videoElements = document.querySelectorAll(".spectre-player");
    var videoElement = document.querySelector("video");
    if (videoElements.length > 1) {
        state = "clip";
    }
    else if (videoElements.length === 1) {
        const buttonElements = document.querySelector(".bui-tabs-bordered");
        if (buttonElements) {
            state = "video";
        }
        else {
            state = "live";
        }
    }
    else {
        state = null;
    }
    if (oldUrl !== window.location.href) {
        oldUrl = window.location.href;
        elapsed = Math.floor(Date.now() / 1000);
    }
    title = document.querySelector(".title .wrapper");
    streamer = document.querySelector("h2.layout-row.layout-align-start-center");
    if (title === null && streamer === null) {
        state = null;
    }
    else {
        title = stripText(title, "Title", state ? true : false);
        streamer = stripText(streamer, "Streamer", state ? true : false);
    }
    switch (state) {
        case "live":
            smallImageKey = "live";
            smallImageText = (await strings).live;
            videoTime = elapsed;
            break;
        case "video":
            smallImageKey = "play";
            smallImageText = (await strings).play;
            var timestamps = getTimestamps(Math.floor(videoElement.currentTime), Math.floor(videoElement.duration));
            videoTime = timestamps[0];
            videoDuration = timestamps[1];
            break;
        case "clip":
            title = "Watching a clip...";
            smallImageKey = "play";
            smallImageText = (await strings).play;
            var timestamps = getTimestamps(Math.floor(videoElement.currentTime), Math.floor(videoElement.duration));
            videoTime = timestamps[0];
            videoDuration = timestamps[1];
            break;
        default:
            title = "Browsing...";
            streamer =
                window.location.pathname !== "/"
                    ? window.location.pathname
                        .split("/")
                        .map((path, index) => {
                        if (index !== 1)
                            return capitalize(path).replace(/[\[{()}\]]/g, "");
                    })
                        .join(" ")
                    : "Home";
            break;
    }
    var data = {
        details: title,
        state: streamer,
        largeImageKey: "mixer",
        smallImageKey: smallImageKey,
        smallImageText: smallImageText,
        startTimestamp: videoTime,
        endTimestamp: videoDuration
    };
    if (state && videoElement && videoElement.paused) {
        delete data.startTimestamp;
        delete data.endTimestamp;
        data.smallImageKey = "pause";
        data.smallImageText = (await strings).pause;
    }
    presence.setActivity(data, synced && !videoElement.paused);
});
function capitalize(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
}
function stripText(element, id = "None", log) {
    if (element && element.firstChild) {
        return element.firstChild.textContent;
    }
    else {
        if (log)
            console.log("%cMixer%cERROR%c An error occurred while stripping data off the page. Please contact Alanexei on the PreMiD Discord server, and send him a screenshot of this error. ID: " +
                id, "font-weight: 800; padding: 2px 5px; color: white; border-radius: 25px 0 0 25px; background: #596cae;", "font-weight: 800; padding: 2px 5px; color: white; border-radius: 0 25px 25px 0; background: #ff5050;", "color: unset;");
        return null;
    }
}
function getTimestamps(videoTime, videoDuration) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUM3QixRQUFRLEVBQUUsb0JBQW9CO0NBQzlCLENBQUMsQ0FBQztBQUNILE1BQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxVQUFVLENBQUM7SUFDbkMsSUFBSSxFQUFFLDJCQUEyQjtJQUNqQyxLQUFLLEVBQUUsMEJBQTBCO0lBQ2pDLElBQUksRUFBRSx3QkFBd0I7Q0FDOUIsQ0FBQyxDQUFDO0FBSUgsSUFBSSxNQUFNLEVBQUUsT0FBTyxFQUFFLEtBQUssQ0FBQztBQUUzQixRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxLQUFLLElBQUksRUFBRTtJQUNwQyxJQUFJLEtBQUssRUFDUixRQUFRLEVBQ1IsYUFBYSxFQUNiLGNBQWMsRUFDZCxTQUFTLEVBQ1QsYUFBYSxFQUNiLE1BQU0sQ0FBQztJQUVSLE1BQU0sYUFBYSxHQUFpQyxRQUFRLENBQUMsZ0JBQWdCLENBQzVFLGlCQUFpQixDQUNqQixDQUFDO0lBQ0YsSUFBSSxZQUFZLEdBQXFCLFFBQVEsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7SUFFckUsSUFBSSxhQUFhLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtRQUM3QixLQUFLLEdBQUcsTUFBTSxDQUFDO0tBQ2Y7U0FBTSxJQUFJLGFBQWEsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1FBQ3RDLE1BQU0sY0FBYyxHQUFnQixRQUFRLENBQUMsYUFBYSxDQUN6RCxvQkFBb0IsQ0FDcEIsQ0FBQztRQUNGLElBQUksY0FBYyxFQUFFO1lBQ25CLEtBQUssR0FBRyxPQUFPLENBQUM7U0FDaEI7YUFBTTtZQUNOLEtBQUssR0FBRyxNQUFNLENBQUM7U0FDZjtLQUNEO1NBQU07UUFDTixLQUFLLEdBQUcsSUFBSSxDQUFDO0tBQ2I7SUFFRCxJQUFJ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