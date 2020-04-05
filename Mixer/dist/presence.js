const presence = new Presence({
    clientId: "607362931180699648"
});
const strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused",
    live: "presence.activity.live"
});
var oldUrl, elapsed, state;
var timestamps;
presence.on("UpdateData", async () => {
    var title, streamer, smallImageKey, smallImageText, videoTime, videoDuration;
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
            timestamps = getTimestamps(Math.floor(videoElement.currentTime), Math.floor(videoElement.duration));
            videoTime = timestamps[0];
            videoDuration = timestamps[1];
            break;
        case "clip":
            title = "Watching a clip...";
            smallImageKey = "play";
            smallImageText = (await strings).play;
            timestamps = getTimestamps(Math.floor(videoElement.currentTime), Math.floor(videoElement.duration));
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
    presence.setActivity(data, videoElement !== null && !videoElement.paused);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUM1QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUNILE1BQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxVQUFVLENBQUM7SUFDbEMsSUFBSSxFQUFFLDJCQUEyQjtJQUNqQyxLQUFLLEVBQUUsMEJBQTBCO0lBQ2pDLElBQUksRUFBRSx3QkFBd0I7Q0FDL0IsQ0FBQyxDQUFDO0FBRUgsSUFBSSxNQUFNLEVBQUUsT0FBTyxFQUFFLEtBQUssQ0FBQztBQUMzQixJQUFJLFVBQVUsQ0FBQztBQUVmLFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBQ25DLElBQUksS0FBSyxFQUFFLFFBQVEsRUFBRSxhQUFhLEVBQUUsY0FBYyxFQUFFLFNBQVMsRUFBRSxhQUFhLENBQUM7SUFFN0UsTUFBTSxhQUFhLEdBQWlDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FDM0UsaUJBQWlCLENBQ2xCLENBQUM7SUFDRixJQUFJLFlBQVksR0FBcUIsUUFBUSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUVyRSxJQUFJLGFBQWEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1FBQzVCLEtBQUssR0FBRyxNQUFNLENBQUM7S0FDaEI7U0FBTSxJQUFJLGFBQWEsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1FBQ3JDLE1BQU0sY0FBYyxHQUFnQixRQUFRLENBQUMsYUFBYSxDQUN4RCxvQkFBb0IsQ0FDckIsQ0FBQztRQUNGLElBQUksY0FBYyxFQUFFO1lBQ2xCLEtBQUssR0FBRyxPQUFPLENBQUM7U0FDakI7YUFBTTtZQUNMLEtBQUssR0FBRyxNQUFNLENBQUM7U0FDaEI7S0FDRjtTQUFNO1FBQ0wsS0FBSyxHQUFHLElBQUksQ0FBQztL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