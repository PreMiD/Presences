var presence = new Presence({
    clientId: "610929230192181274"
}), strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
});
var lastPlaybackState = null;
var playback;
var browsingStamp = Math.floor(Date.now() / 1000);
if (lastPlaybackState != playback) {
    lastPlaybackState = playback;
    browsingStamp = Math.floor(Date.now() / 1000);
}
var iFrameVideo, currentTime, duration, paused;
presence.on("iFrameData", data => {
    console.log(data.iframe_video);
    playback = data.iframe_video ? true : false;
    if (playback) {
        iFrameVideo = data.iframe_video.iFrameVideo;
        currentTime = data.iframe_video.currTime;
        duration = data.iframe_video.dur;
        paused = data.iframe_video.paused;
    }
});
var videoTitle, author;
presence.on("UpdateData", async () => {
    if (!playback && !videoTitle && !author) {
        presenceData: presenceData = {
            largeImageKey: "lg"
        };
        presenceData.details = "Browsing...";
        presenceData.startTimestamp = browsingStamp;
        delete presenceData.state;
        delete presenceData.smallImageKey;
        presence.setActivity(presenceData, true);
    }
    if (document.location.pathname.includes("/portal/view/")) {
        videoTitle = document.querySelector("#embed_header > h2");
        author = document.querySelector("div > div.item-details > div.item-details-main > h4 > a");
        if (iFrameVideo !== null && !isNaN(duration)) {
            var a = "", timestamps = getTimestamps(Math.floor(currentTime), Math.floor(duration)), presenceData = {
                largeImageKey: "lg",
                smallImageKey: paused ? "pause" : "play",
                smallImageText: paused ? (await strings).pause : (await strings).play,
                startTimestamp: timestamps[0],
                endTimestamp: timestamps[1]
            };
            presence.setTrayTitle(paused ? "" : videoTitle.innerText);
            presenceData.details = videoTitle.innerText;
            presenceData.state = author.innerText;
            if (paused) {
                delete presenceData.startTimestamp;
                delete presenceData.endTimestamp;
            }
            if (videoTitle !== null) {
                presence.setActivity(presenceData, !paused);
            }
        }
        else if (!iFrameVideo &&
            isNaN(duration) &&
            videoTitle.innerText &&
            author.innerText) {
            presenceData: presenceData = {
                largeImageKey: "lg"
            };
            presenceData.details = "Playing " + videoTitle.innerText;
            presenceData.state = "By " + author.innerText;
            presenceData.startTimestamp = browsingStamp;
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData, true);
        }
    }
    else if (document.location.pathname.includes("/audio/")) {
        videoTitle = document.querySelector("div.pod-head > h2");
        author = document.querySelector("div > div.item-details > div.item-details-main > h4 > a");
        presenceData: presenceData = {
            largeImageKey: "lg"
        };
        presenceData.details = "Listening to " + videoTitle.innerText;
        presenceData.state = "By " + author.innerText;
        presenceData.startTimestamp = browsingStamp;
        delete presenceData.smallImageKey;
        presence.setActivity(presenceData, true);
    }
    else if (document.location.pathname.includes("/art/")) {
        videoTitle = document.querySelector("div.pod-head > h2");
        author = document.querySelector("div > div.item-details > div.item-details-main > h4 > a");
        presenceData: presenceData = {
            largeImageKey: "lg"
        };
        presenceData.details = "Art: " + videoTitle.innerText;
        presenceData.state = "By " + author.innerText;
        presenceData.startTimestamp = browsingStamp;
        delete presenceData.smallImageKey;
        presence.setActivity(presenceData, true);
    }
});
function getTimestamps(videoTime, videoDuration) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQzlCLENBQUMsRUFDRixPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUM3QixJQUFJLEVBQUUsMkJBQTJCO0lBQ2pDLEtBQUssRUFBRSwwQkFBMEI7Q0FDakMsQ0FBQyxDQUFDO0FBRUosSUFBSSxpQkFBaUIsR0FBRyxJQUFJLENBQUM7QUFDN0IsSUFBSSxRQUFRLENBQUM7QUFDYixJQUFJLGFBQWEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQztBQUVsRCxJQUFJLGlCQUFpQixJQUFJLFFBQVEsRUFBRTtJQUNsQyxpQkFBaUIsR0FBRyxRQUFRLENBQUM7SUFDN0IsYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0NBQzlDO0FBRUQsSUFBSSxXQUFnQixFQUFFLFdBQWdCLEVBQUUsUUFBYSxFQUFFLE1BQVcsQ0FBQztBQUVuRSxRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsRUFBRTtJQUNoQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUUvQixRQUFRLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7SUFFNUMsSUFBSSxRQUFRLEVBQUU7UUFDYixXQUFXLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUM7UUFDNUMsV0FBVyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDO1FBQ3pDLFFBQVEsR0FB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