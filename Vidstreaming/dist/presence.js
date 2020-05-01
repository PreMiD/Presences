var presence = new Presence({
    clientId: "696085711148941344"
}), strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
});
var iFrameVideo, currentTime, duration, paused;
var video;
var lastPlaybackState = null;
var playback;
var browsingStamp = Math.floor(Date.now() / 1000);
var title;
presence.on("iFrameData", (data) => {
    playback = data.iframe_video.duration !== null ? true : false;
    if (playback) {
        iFrameVideo = data.iframe_video.iFrameVideo;
        currentTime = data.iframe_video.currTime;
        duration = data.iframe_video.dur;
        paused = data.iframe_video.paused;
        video = data;
    }
});
function getTimestamps(videoTime, videoDuration) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
presence.on("UpdateData", async () => {
    const info = await presence.getSetting("sSI");
    const elapsed = await presence.getSetting("sTE");
    const videoTime = await presence.getSetting("sVT");
    if (videoTime) {
        if (lastPlaybackState != playback) {
            lastPlaybackState = playback;
            browsingStamp = Math.floor(Date.now() / 1000);
        }
    }
    if (elapsed) {
        browsingStamp = Math.floor(Date.now() / 1000);
        console.log("Elapsed is on");
    }
    var timestamps = getTimestamps(Math.floor(currentTime), Math.floor(duration));
    var presenceData = {
        largeImageKey: "logo"
    };
    if (info) {
        if (document.location.pathname == "/") {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing home page or recently subbed";
        }
        else if (document.location.pathname == "/recently-added-raw") {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing the recently added raw";
        }
        else if (document.location.pathname == "/recently-added-dub") {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing the recently added dub";
        }
        else if (document.location.pathname == "/movies") {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing the anime movies";
        }
        else if (document.location.pathname == "/new-season") {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing the new anime seasons.";
        }
        else if (document.location.pathname == "/popular") {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing the popular anime.";
        }
        else if (document.location.pathname == "/ongoing-series") {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing the ongoing series.";
        }
        else if (document.location.pathname.includes("/videos/")) {
            title = document.querySelector("body > #wrapper_bg > #wrapper > #main_bg > div > div > div.video-info-left > h1");
            if (title != null) {
                presenceData.state = title.innerText;
                if (iFrameVideo == true &&
                    !isNaN(duration) &&
                    title != null &&
                    video != null) {
                    if (!paused) {
                        presenceData.details = "Watching:";
                        presenceData.smallImageKey = paused ? "pause" : "play";
                        if (videoTime) {
                            presenceData.smallImageText = paused
                                ? (await strings).pause
                                : (await strings).play;
                            presenceData.startTimestamp = timestamps[0];
                            presenceData.endTimestamp = timestamps[1];
                        }
                    }
                    else if (paused) {
                        delete presenceData.startTimestamp;
                        delete presenceData.endTimestamp;
                        presenceData.details = "Paused:";
                        presenceData.smallImageKey = "pause";
                    }
                }
                else if (iFrameVideo == null && isNaN(duration) && title != null) {
                    presenceData.details = "Viewing:";
                    presenceData.state = title.innerText;
                    presenceData.startTimestamp = browsingStamp;
                }
                else {
                    presenceData.details = "Error 03: Watching unknown anime.";
                    presenceData.state = "Can't tell if playing or not.";
                    presenceData.startTimestamp = browsingStamp;
                    presenceData.smallImageKey = "search";
                    presenceData.smallImageText = "Error 3";
                }
            }
            else {
                presenceData.startTimestamp = browsingStamp;
                presenceData.details = "Error 02: Watching unknown anime.";
                presenceData.smallImageKey = "search";
            }
        }
        else {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Error 01: Can't Read Page";
            presenceData.smallImageKey = "search";
        }
    }
    else {
        presence.setActivity(presenceData);
        return;
    }
    if (presenceData.details == null) {
        presence.setTrayTitle();
        presence.setActivity();
    }
    else {
        presence.setActivity(presenceData);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUN4QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsRUFDRixPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUM1QixJQUFJLEVBQUUsMkJBQTJCO0lBQ2pDLEtBQUssRUFBRSwwQkFBMEI7Q0FDbEMsQ0FBQyxDQUFDO0FBQ0wsSUFBSSxXQUFXLEVBQUUsV0FBVyxFQUFFLFFBQVEsRUFBRSxNQUFNLENBQUM7QUFDL0MsSUFBSSxLQUFLLENBQUM7QUFDVixJQUFJLGlCQUFpQixHQUFHLElBQUksQ0FBQztBQUM3QixJQUFJLFFBQVEsQ0FBQztBQUNiLElBQUksYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0FBQ2xELElBQUksS0FBSyxDQUFDO0FBRVYsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTtJQUNqQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztJQUM5RCxJQUFJLFFBQVEsRUFBRTtRQUNaLFdBQVcsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQztRQUM1QyxXQUFXLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUM7UUFDekMsUUFBUSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDO1FBQ2pDLE1BQU0sR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQztRQUNsQyxLQUFLLEdBQUcsSUFBSSxDQUFDO0tBQ2Q7QUFDSCxDQUFDLENBQUMsQ0FBQztB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