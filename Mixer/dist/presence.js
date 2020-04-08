const presence = new Presence({
    clientId: "607362931180699648"
});
const strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused",
    live: "presence.activity.live"
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
                            return capitalize(path).replace(/[[{()}\]]/g, "");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUM1QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUNILE1BQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxVQUFVLENBQUM7SUFDbEMsSUFBSSxFQUFFLDJCQUEyQjtJQUNqQyxLQUFLLEVBQUUsMEJBQTBCO0lBQ2pDLElBQUksRUFBRSx3QkFBd0I7Q0FDL0IsQ0FBQyxDQUFDO0FBRUgsU0FBUyxVQUFVLENBQUMsSUFBWTtJQUM5QixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUN0RCxDQUFDO0FBRUQsU0FBUyxTQUFTLENBQUMsT0FBb0IsRUFBRSxFQUFFLEdBQUcsTUFBTSxFQUFFLEdBQVk7SUFDaEUsSUFBSSxPQUFPLElBQUksT0FBTyxDQUFDLFVBQVUsRUFBRTtRQUNqQyxPQUFPLE9BQU8sQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDO0tBQ3ZDO1NBQU07UUFDTCxJQUFJLEdBQUc7WUFDTCxPQUFPLENBQUMsR0FBRyxDQUNULDJLQUEySztnQkFDekssRUFBRSxFQUNKLHNHQUFzRyxFQUN0RyxzR0FBc0csRUFDdEcsZUFBZSxDQUNoQixDQUFDO1FBQ0osT0FBTyxJQUFJLENBQUM7S0FDYjtBQUNILENBQUM7QUFPRCxTQUFTLGFBQWEsQ0FDcEIsU0FBaUIsRUFDakIsYUFBcUI7SUFFckIsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQzNCLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxHQUFHLFNBQVMsR0FBRyxhQUFhLENBQUM7SUFDdkUs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