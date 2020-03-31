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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUM1QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUNILE1BQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxVQUFVLENBQUM7SUFDbEMsSUFBSSxFQUFFLDJCQUEyQjtJQUNqQyxLQUFLLEVBQUUsMEJBQTBCO0lBQ2pDLElBQUksRUFBRSx3QkFBd0I7Q0FDL0IsQ0FBQyxDQUFDO0FBSUgsSUFBSSxNQUFNLEVBQUUsT0FBTyxFQUFFLEtBQUssQ0FBQztBQUUzQixRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxLQUFLLElBQUksRUFBRTtJQUNuQyxJQUFJLEtBQUssRUFDUCxRQUFRLEVBQ1IsYUFBYSxFQUNiLGNBQWMsRUFDZCxTQUFTLEVBQ1QsYUFBYSxFQUNiLE1BQU0sQ0FBQztJQUVULE1BQU0sYUFBYSxHQUFpQyxRQUFRLENBQUMsZ0JBQWdCLENBQzNFLGlCQUFpQixDQUNsQixDQUFDO0lBQ0YsSUFBSSxZQUFZLEdBQXFCLFFBQVEsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7SUFFckUsSUFBSSxhQUFhLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtRQUM1QixLQUFLLEdBQUcsTUFBTSxDQUFDO0tBQ2hCO1NBQU0sSUFBSSxhQUFhLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtRQUNyQyxNQUFNLGNBQWMsR0FBZ0IsUUFBUSxDQUFDLGFBQWEsQ0FDeEQsb0JBQW9CLENBQ3JCLENBQUM7UUFDRixJQUFJLGNBQWMsRUFBRTtZQUNsQixLQUFLLEdBQUcsT0FBTyxDQUFDO1NBQ2pCO2FBQU07WUFDTCxLQUFLLEdBQUcsTUFBTSxDQUFDO1NBQ2hCO0tBQ0Y7U0FBTTtRQUNMLEtBQUssR0FBRyxJQUFJLENBQUM7S0FDZDtJQUVELElB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