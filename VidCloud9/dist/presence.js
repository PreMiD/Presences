var presence = new Presence({
    clientId: "697552926876368917"
}), strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
});
var iFrameVideo, currentTime, duration, paused;
var video, videoDuration, videoCurrentTime;
var lastPlaybackState = null;
var playback;
var title;
presence.on("iFrameData", (data) => {
    video = data;
    playback = data.iframe_video.duration !== null ? true : false;
    if (playback) {
        iFrameVideo = data.iframe_video.iFrameVideo;
        currentTime = data.iframe_video.currTime;
        duration = data.iframe_video.dur;
        paused = data.iframe_video.paused;
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
    if (elapsed) {
        var browsingStamp = Math.floor(Date.now() / 1000);
        console.log("Elapsed is on");
    }
    var timestamps = getTimestamps(Math.floor(currentTime), Math.floor(duration));
    var presenceData = {
        largeImageKey: "logo"
    };
    if (videoTime) {
        console.log("IS ON");
        if (lastPlaybackState != playback) {
            lastPlaybackState = playback;
            browsingStamp = Math.floor(Date.now() / 1000);
        }
    }
    else {
        lastPlaybackState = console.log("Video time is off");
    }
    if (info) {
        if (document.location.pathname == "/") {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing home page";
        }
        else if (document.location.pathname == "/movies") {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing the recently added movies";
        }
        else if (document.location.pathname == "/series") {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing the recently added series";
        }
        else if (document.location.pathname == "/cinema-movies") {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing the recently added cinema movies.";
        }
        else if (document.location.pathname == "/recommended-series") {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing recommened series";
        }
        else if (document.location.pathname.includes("/videos/")) {
            title = document.querySelector("#main_bg > div:nth-child(5) > div > div.video-info-left > h1");
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
                    presenceData.details = "Error 03: Watching unknown show/movie.";
                    presenceData.state = "Can't tell if playing or not.";
                    presenceData.startTimestamp = browsingStamp;
                    presenceData.smallImageKey = "search";
                    presenceData.smallImageText = "Error 3";
                }
            }
            else {
                presenceData.startTimestamp = browsingStamp;
                presenceData.details = "Error 02: Watching unknown show/movie.";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUN4QixRQUFRLEVBQUUsb0JBQW9CO0NBQ2pDLENBQUMsRUFFRixPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUMxQixJQUFJLEVBQUUsMkJBQTJCO0lBQ2pDLEtBQUssRUFBRSwwQkFBMEI7Q0FDcEMsQ0FBQyxDQUFDO0FBR0gsSUFBSSxXQUFXLEVBQUUsV0FBVyxFQUFFLFFBQVEsRUFBRSxNQUFNLENBQUM7QUFDL0MsSUFBSSxLQUFLLEVBQUUsYUFBYSxFQUFFLGdCQUFnQixDQUFDO0FBQzNDLElBQUksaUJBQWlCLEdBQUcsSUFBSSxDQUFDO0FBQzdCLElBQUksUUFBUSxDQUFDO0FBQ2IsSUFBSSxLQUFLLENBQUM7QUFFVixRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFO0lBQy9CLEtBQUssR0FBRyxJQUFJLENBQUM7SUFDYixRQUFRLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztJQUM5RCxJQUFJLFFBQVEsRUFBRTtRQUNWLFdBQVcsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQztRQUM1QyxXQUFXLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUM7UUFDekMsUUFBUSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDO1FBQ2pDLE1BQU0sR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQztLQUNyQztBQUNMLENBQUMsQ0FBQyxDQUFDO0FBRUgsU0FBUyxhQUFhLENBQUMsU0FBUyxFQUFFLGFBQWE7SUFDM0MsSUFBSSxTQUFTLEdBQUcsSUFB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