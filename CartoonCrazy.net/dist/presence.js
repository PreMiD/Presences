var presence = new Presence({
    clientId: "640266769218666502"
}), strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
});
var browsingStamp = Math.floor(Date.now() / 1000);
var title, views, air, air2;
var iFrameVideo, currentTime, duration, paused;
var video, videoDuration, videoCurrentTime;
var lastPlaybackState = null;
var playback;
var browsingStamp = Math.floor(Date.now() / 1000);
var user;
var search;
if (lastPlaybackState != playback) {
    lastPlaybackState = playback;
    browsingStamp = Math.floor(Date.now() / 1000);
}
presence.on("iFrameData", data => {
    playback = data.iframe_video.duration !== null ? true : false;
    if (playback) {
        iFrameVideo = data.iframe_video.iFrameVideo;
        currentTime = data.iframe_video.currTime;
        duration = data.iframe_video.dur;
        paused = data.iframe_video.paused;
    }
});
presence.on("UpdateData", async () => {
    var timestamps = getTimestamps(Math.floor(currentTime), Math.floor(duration)), presenceData = {
        largeImageKey: "cc"
    };
    if (document.location.pathname.includes("/watch/")) {
        if (iFrameVideo == true && !isNaN(duration)) {
            presenceData.smallImageKey = paused ? "pause" : "play";
            presenceData.smallImageText = paused
                ? (await strings).pause
                : (await strings).play;
            presenceData.startTimestamp = timestamps[0];
            presenceData.endTimestamp = timestamps[1];
            title = document.querySelector("#episode > div.h1 > h1");
            if (title.textContent.includes(" – ")) {
                presenceData.details = title.textContent.split(" – ")[0];
                presenceData.state = title.textContent
                    .split(" – ")[1]
                    .replace("Online at cartooncrazy.tv", "");
            }
            else {
                presenceData.details = title.textContent.replace("Online at cartooncrazy.tv", "");
            }
            if (paused) {
                delete presenceData.startTimestamp;
                delete presenceData.endTimestamp;
            }
        }
        else if (iFrameVideo == null && isNaN(duration)) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Looking at: ";
            title = document.querySelector("#episode > div.h1 > h1");
            presenceData.state = title.textContent;
            presenceData.smallImageKey = "reading";
        }
    }
    else if (document.location.pathname == "/") {
        presenceData.details = "Viewing main page";
        presenceData.startTimestamp = browsingStamp;
    }
    else if (document.location.pathname.includes("/cartoon-list")) {
        presenceData.details = "Viewing cartoonlist";
        presenceData.startTimestamp = browsingStamp;
    }
    else if (document.location.pathname.includes("/anime-dubbed")) {
        presenceData.details = "Viewing animelist";
        presenceData.startTimestamp = browsingStamp;
    }
    else if (document.URL.includes("?genre")) {
        presenceData.details = "Viewing genres";
        presenceData.startTimestamp = browsingStamp;
    }
    else if (document.URL.includes("/cartoon/")) {
        presenceData.details = "Viewing cartoon:";
        presenceData.state = document
            .querySelector("#anime > div.h1")
            .textContent.replace("Online at cartooncrazy.tv", "")
            .replace("at wcartooncrazy.tv", "");
        presenceData.startTimestamp = browsingStamp;
    }
    else if (document.URL.includes("/anime/")) {
        presenceData.details = "Viewing cartoon:";
        presenceData.state = document
            .querySelector("#anime > div.h1")
            .textContent.replace("Online at cartooncrazy.tv", "")
            .replace("at wcartooncrazy.tv", "");
        presenceData.startTimestamp = browsingStamp;
    }
    if (presenceData.details == null) {
        presence.setTrayTitle();
        presence.setActivity();
    }
    else {
        presence.setActivity(presenceData);
    }
});
function getTimestamps(videoTime, videoDuration) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUN4QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsRUFDRixPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUM1QixJQUFJLEVBQUUsMkJBQTJCO0lBQ2pDLEtBQUssRUFBRSwwQkFBMEI7Q0FDbEMsQ0FBQyxDQUFDO0FBRUwsSUFBSSxhQUFhLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7QUFFbEQsSUFBSSxLQUFVLEVBQUUsS0FBVSxFQUFFLEdBQVEsRUFBRSxJQUFTLENBQUM7QUFDaEQsSUFBSSxXQUFvQixFQUFFLFdBQWdCLEVBQUUsUUFBYSxFQUFFLE1BQVcsQ0FBQztBQUV2RSxJQUFJLEtBQXVCLEVBQUUsYUFBa0IsRUFBRSxnQkFBcUIsQ0FBQztBQUV2RSxJQUFJLGlCQUFpQixHQUFHLElBQUksQ0FBQztBQUM3QixJQUFJLFFBQVEsQ0FBQztBQUNiLElBQUksYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0FBRWxELElBQUksSUFBUyxDQUFDO0FBQ2QsSUFBSSxNQUFXLENBQUM7QUFFaEIsSUFBSSxpQkFBaUIsSUFBSSxRQUFRLEVBQUU7SUFDakMsaUJBQWlCLEdBQUcsUUFBUSxDQUFDO0lBQzdCLGFBQWEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQztDQUMvQztBQUVELFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxFQUFFO0lBQy9CLFFBQVEsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFD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