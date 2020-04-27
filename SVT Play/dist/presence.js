var presence = new Presence({
    clientId: "641353660986687508"
}), strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
});
function getTimestamps(videoTime, videoDuration) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
var browsingStamp = Math.floor(Date.now() / 1000);
var user;
var title;
presence.on("UpdateData", async () => {
    const presenceData = {
        largeImageKey: "svt"
    };
    if (document.location.hostname == "www.svtplay.se") {
        if (document.location.pathname == "/") {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing home page";
            presenceData.details = "Navigerar landnings sidan";
        }
        else if (document.location.pathname.includes("/program/")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing program genres";
            presenceData.details = "Navigerar program kategorier";
        }
        else if (document.location.pathname.includes("/kanaler/")) {
            const video = document.querySelector("#play_main-content > article > div.play_channels-video--show > div > div > div.play_video-player.lp_video.play_channels__active-video > div > video");
            title = document.querySelector("#play_main-content > article > div.play_channels-video--show > div > div > div.play_channels__active-video-info > h2").textContent;
            user = document.querySelector("#play_main-content > article > div.play_channels-video--show > div > div > div.play_channels__active-video-info > p.play_channels__active-subheader").textContent;
            if (video !== null) {
                presenceData.smallImageKey = "live";
                presenceData.smallImageText =
                    "Watching live on channel: " +
                        document.querySelector("head > title").textContent.split("|")[0];
                presenceData.smallImageText =
                    "Kollar live på kanalen: " +
                        document.querySelector("head > title").textContent.split("|")[0];
                presenceData.startTimestamp = browsingStamp;
                presenceData.details = title;
                presenceData.state = user;
            }
            else {
                presenceData.startTimestamp = browsingStamp;
                presenceData.details = "Looing at channel:";
                presenceData.details = "Kollar på kanalen:";
                presenceData.state = document
                    .querySelector("head > title")
                    .textContent.split("|")[0];
            }
        }
        else if (document.location.pathname.includes("/kanaler")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Browsing for channels...";
            presenceData.details = "Söker efter kanaler...";
        }
        else if (document.location.pathname.includes("/video/")) {
            var currentTime, duration, paused, time, live, timestamps;
            const video = document.querySelector("#js-play_video__fullscreen-container > div > div > video");
            title = document.querySelector("#titel > h1 > span:nth-child(1)")
                .textContent;
            user = document.querySelector("#titel > h1 > span:nth-child(2)")
                .textContent;
            if (video !== null) {
                if (video.duration == undefined) {
                    time = false;
                    live = false;
                }
                else if (video.duration == 9007199254740991) {
                    live = true;
                }
                else {
                    time = true;
                    live = false;
                    currentTime = video.currentTime;
                    duration = video.duration;
                    paused = video.paused;
                    timestamps = getTimestamps(Math.floor(currentTime), Math.floor(duration));
                }
                if (time == true && !isNaN(duration) && live == false) {
                    presenceData.smallImageKey = paused ? "pause" : "play";
                    presenceData.smallImageText = paused
                        ? (await strings).pause
                        : (await strings).play;
                    presenceData.startTimestamp = timestamps[0];
                    presenceData.endTimestamp = timestamps[1];
                    presenceData.details = title;
                    presenceData.state = user;
                    if (paused) {
                        delete presenceData.startTimestamp;
                        delete presenceData.endTimestamp;
                    }
                }
                else if (document.querySelector("#js-play_video__fullscreen-container > div > div > div.svp_ui-error.svp_js-error > div > div.svp_ui-error__live-clock.svp_js-error--live-clock") !== null) {
                    presenceData.startTimestamp = browsingStamp;
                    presenceData.details = "Waiting for:";
                    presenceData.details = "Väntar på:";
                    presenceData.state = title;
                }
                else if (live == true) {
                    presenceData.details = title;
                    presenceData.state = user;
                    presenceData.smallImageKey = "live";
                }
                else {
                    presenceData.startTimestamp = browsingStamp;
                    presenceData.details = "Looing at:";
                    presenceData.details = "Kollar på:";
                    presenceData.state = title;
                }
            }
            else {
                presenceData.startTimestamp = browsingStamp;
                presenceData.details = "Looing at:";
                presenceData.details = "Kollar på:";
                presenceData.state = title;
            }
        }
        else if (document.location.pathname.includes("/sok")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Searching for:";
            presenceData.details = " Söker på:";
            presenceData.state = document.querySelector("#play_main-content > section > h2.play_search-page__header.play_search-page__header--match > span").textContent;
            presenceData.smallImageKey = "search";
        }
    }
    if (presenceData.details == null) {
        presence.setTrayTitle();
        presence.setActivity();
    }
    else {
        presence.setActivity(presenceData);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUN4QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsRUFDRixPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUM1QixJQUFJLEVBQUUsMkJBQTJCO0lBQ2pDLEtBQUssRUFBRSwwQkFBMEI7Q0FDbEMsQ0FBQyxDQUFDO0FBT0wsU0FBUyxhQUFhLENBQ3BCLFNBQWlCLEVBQ2pCLGFBQXFCO0lBRXJCLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUMzQixJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsR0FBRyxTQUFTLEdBQUcsYUFBYSxDQUFDO0lBQ3ZFLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQztBQUNqRCxDQUFDO0FBRUQsSUFBSSxhQUFhLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7QUFFbEQsSUFBSSxJQUFTLENBQUM7QUFDZCxJQUFJLEtBQVUsQ0FBQztBQUVmLFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBQ25DLE1BQU0sWUFBWSxHQUFpQjtRQUNqQyxhQUFhLEVBQUUsS0FBSztLQUNyQixDQUFDO0lBRUYsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSxnQkFBZ0IsRUFBRTtRQUNsRCxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLEdBQUcsRUFBRTtZQUNyQyxZQUFZLENBQUMsY0FBYyxHQUFHLGFBQWEsQ0FBQztZQUM1QyxZQUFZ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