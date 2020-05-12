const presence = new Presence({
    clientId: "640150336547454976"
}), strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
});
let browsingStamp = Math.floor(Date.now() / 1000);
let iFrameVideo, currentTime, duration, paused;
let lastPlaybackState = null;
let playback;
function getTimestamps(videoTime, videoDuration) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
presence.on("iFrameData", (data) => {
    playback = data.iframe_video.duration !== null ? true : false;
    if (playback) {
        iFrameVideo = data.iframe_video.iFrameVideo;
        currentTime = data.iframe_video.currTime;
        duration = data.iframe_video.dur;
        paused = data.iframe_video.paused;
    }
    if (lastPlaybackState != playback) {
        lastPlaybackState = playback;
        browsingStamp = Math.floor(Date.now() / 1000);
    }
});
presence.on("UpdateData", async () => {
    const timestamps = getTimestamps(Math.floor(currentTime), Math.floor(duration)), presenceData = {
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
        presenceData.details = "Viewing series:";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsRUFDRixPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUM1QixJQUFJLEVBQUUsMkJBQTJCO0lBQ2pDLEtBQUssRUFBRSwwQkFBMEI7Q0FDbEMsQ0FBQyxDQUFDO0FBRUwsSUFBSSxhQUFhLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7QUFDbEQsSUFBSSxXQUFvQixFQUFFLFdBQWdCLEVBQUUsUUFBYSxFQUFFLE1BQVcsQ0FBQztBQUV2RSxJQUFJLGlCQUFpQixHQUFHLElBQUksQ0FBQztBQUM3QixJQUFJLFFBQVEsQ0FBQztBQU9iLFNBQVMsYUFBYSxDQUNwQixTQUFpQixFQUNqQixhQUFxQjtJQUVyQixJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDM0IsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEdBQUcsU0FBUyxHQUFHLGFBQWEsQ0FBQztJQUN2RSxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFDakQsQ0FBQztBQUVELFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUU7SUFDakMsUUFBUSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7SUFFOUQsSUFBSSxRQUFRLEVBQUU7UUFDWixXQUFXLEdBQUcs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