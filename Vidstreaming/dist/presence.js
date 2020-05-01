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
                if (iFrameVideo == true && !isNaN(duration) && title != null && video != null) {
                    if (!paused) {
                        presenceData.details = "Watching:";
                        presenceData.smallImageKey = paused ? "pause" : "play";
                        if (videoTime) {
                            (presenceData.smallImageText = paused
                                ? (await strings).pause
                                : (await strings).play);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUN4QixRQUFRLEVBQUUsb0JBQW9CO0NBQ2pDLENBQUMsRUFFRixPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUMxQixJQUFJLEVBQUUsMkJBQTJCO0lBQ2pDLEtBQUssRUFBRSwwQkFBMEI7Q0FDcEMsQ0FBQyxDQUFDO0FBQ0gsSUFBSSxXQUFXLEVBQUUsV0FBVyxFQUFFLFFBQVEsRUFBRSxNQUFNLENBQUM7QUFDL0MsSUFBSSxLQUFLLENBQUM7QUFDVixJQUFJLGlCQUFpQixHQUFHLElBQUksQ0FBQztBQUM3QixJQUFJLFFBQVEsQ0FBQztBQUNiLElBQUksYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0FBQ2xELElBQUksS0FBSyxDQUFDO0FBR1YsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTtJQUMvQixRQUFRLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztJQUM5RCxJQUFJLFFBQVEsRUFBRTtRQUNWLFdBQVcsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQztRQUM1QyxXQUFXLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUM7UUFDekMsUUFBUSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDO1FBQ2pDLE1BQU0sR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQztRQUNsQyxLQUFLLEdBQUcsSUFBSSxDQUFDO0tBQ2hCO0FBQ0wsQ0FBQyxDQUFDLENBQUM7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