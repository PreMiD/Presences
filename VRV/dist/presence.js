let presence = new Presence({
    clientId: "640150336547454976"
}), strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
});
let browsingStamp = Math.floor(Date.now() / 1000);
let title, views, air, air2;
let iFrameVideo, currentTime, duration, paused;
let video, videoDuration, videoCurrentTime;
let lastPlaybackState = null;
let playback;
let user;
let search;
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
    let timestamps = getTimestamps(Math.floor(currentTime), Math.floor(duration)), presenceData = {
        largeImageKey: "vrv"
    };
    presenceData.startTimestamp = browsingStamp;
    if (document.location.pathname.includes("/watch/")) {
        if (iFrameVideo == true && !isNaN(duration)) {
            presenceData.smallImageKey = paused ? "pause" : "play";
            presenceData.smallImageText = paused
                ? (await strings).pause
                : (await strings).play;
            presenceData.startTimestamp = timestamps[0];
            presenceData.endTimestamp = timestamps[1];
            if (document.querySelector(".content > div > div > .episode-info > .season") !== null) {
                presenceData.details =
                    document.querySelector(".content > div > div > .episode-info > .series").textContent +
                        " - S" +
                        document
                            .querySelector(".content > div > div > .episode-info > .season")
                            .textContent.toLowerCase()
                            .replace("season", "")
                            .trim() +
                        document
                            .querySelector(".content > div > div > .title")
                            .textContent.split(" - ")[0];
                presenceData.state = document
                    .querySelector(".content > div > div > .title")
                    .textContent.split(" - ")[1];
            }
            else {
                presenceData.details = document.querySelector(".content > div > div > .episode-info > .series").textContent;
                presenceData.state = document.querySelector(".content > div > div > .title").textContent;
            }
            if (paused) {
                delete presenceData.startTimestamp;
                delete presenceData.endTimestamp;
            }
        }
        else if (iFrameVideo == null && isNaN(duration)) {
            presenceData.details = "Looking at: ";
            if (document.querySelector(".content > div > div > .episode-info > .season") !== null) {
                presenceData.state =
                    document.querySelector(".content > div > div > .episode-info > .series").textContent +
                        " - S" +
                        document
                            .querySelector(".content > div > div > .episode-info > .season")
                            .textContent.toLowerCase()
                            .replace("season", "")
                            .trim() +
                        document
                            .querySelector(".content > div > div > .title")
                            .textContent.split(" - ")[0] +
                        " " +
                        document
                            .querySelector(".content > div > div > .title")
                            .textContent.split(" - ")[1];
            }
            else {
                presenceData.state =
                    document.querySelector(".content > div > div > .episode-info > .series").textContent +
                        " - " +
                        document.querySelector(".content > div > div > .title").textContent;
            }
            presenceData.smallImageKey = "reading";
        }
    }
    else if (document.location.pathname.includes("/serie")) {
        presenceData.details = "Viewing serie:";
        presenceData.state = document.querySelector("#content > div > div.app-body-wrapper > div > div.content > div.series-metadata > div.text-wrapper > div.erc-series-info > div.series-title").textContent;
    }
    else if (document.querySelector(".item-type") !== null &&
        document.querySelector(".item-type").textContent == "Channel") {
        presenceData.details = "Viewing channel:";
        presenceData.state = document.querySelector(".item-title").textContent;
    }
    else if (document.location.pathname.includes("/watchlist")) {
        presenceData.details = "Viewing their watchlist";
        presenceData.smallImageKey = "reading";
    }
    else if (document.location.pathname == "/") {
        presenceData.details = "Viewing the homepage";
        presenceData.smallImageKey = "reading";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQzlCLENBQUMsRUFDRixPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUM3QixJQUFJLEVBQUUsMkJBQTJCO0lBQ2pDLEtBQUssRUFBRSwwQkFBMEI7Q0FDakMsQ0FBQyxDQUFDO0FBRUosSUFBSSxhQUFhLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7QUFFbEQsSUFBSSxLQUFVLEVBQUUsS0FBVSxFQUFFLEdBQVEsRUFBRSxJQUFTLENBQUM7QUFDaEQsSUFBSSxXQUFvQixFQUFFLFdBQWdCLEVBQUUsUUFBYSxFQUFFLE1BQVcsQ0FBQztBQUV2RSxJQUFJLEtBQXVCLEVBQUUsYUFBa0IsRUFBRSxnQkFBcUIsQ0FBQztBQUV2RSxJQUFJLGlCQUFpQixHQUFHLElBQUksQ0FBQztBQUM3QixJQUFJLFFBQVEsQ0FBQztBQUViLElBQUksSUFBUyxDQUFDO0FBQ2QsSUFBSSxNQUFXLENBQUM7QUFFaEIsSUFBSSxpQkFBaUIsSUFBSSxRQUFRLEVBQUU7SUFDbEMsaUJBQWlCLEdBQUcsUUFBUSxDQUFDO0lBQzdCLGFBQWEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQztDQUM5QztBQUVELFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxFQUFFO0lBQ2hDLFFBQVEsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO0lBRTlELElBQUksUUFBUSxFQUFF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