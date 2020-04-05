var presence = new Presence({
    clientId: "641353660986687508"
}), strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
});
var browsingStamp = Math.floor(Date.now() / 1000);
var user;
var title;
var replace;
var search;
var timestamp;
presence.on("UpdateData", async () => {
    let presenceData = {
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
            let video;
            video = document.querySelector("#play_main-content > article > div.play_channels-video--show > div > div > div.play_video-player.lp_video.play_channels__active-video > div > video");
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
            let video;
            video = document.querySelector("#js-play_video__fullscreen-container > div > div > video");
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
function getTimestamps(videoTime, videoDuration) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUN4QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsRUFDRixPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUM1QixJQUFJLEVBQUUsMkJBQTJCO0lBQ2pDLEtBQUssRUFBRSwwQkFBMEI7Q0FDbEMsQ0FBQyxDQUFDO0FBRUwsSUFBSSxhQUFhLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7QUFFbEQsSUFBSSxJQUFTLENBQUM7QUFDZCxJQUFJLEtBQVUsQ0FBQztBQUNmLElBQUksT0FBWSxDQUFDO0FBQ2pCLElBQUksTUFBVyxDQUFDO0FBQ2hCLElBQUksU0FBYyxDQUFDO0FBRW5CLFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBQ25DLElBQUksWUFBWSxHQUFpQjtRQUMvQixhQUFhLEVBQUUsS0FBSztLQUNyQixDQUFDO0lBRUYsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSxnQkFBZ0IsRUFBRTtRQUNsRCxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLEdBQUcsRUFBRTtZQUNyQyxZQUFZLENBQUMsY0FBYyxHQUFHLGFBQWEsQ0FBQztZQUM1QyxZQUFZLENBQUMsT0FBTyxHQUFHLG1CQUFtQixDQUFDO1lBQzNDLFlBQVksQ0FBQyxPQUFPLEdBQUcsMkJBQTJCLENBQUM7U0FDcEQ7YUFBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsRUFBRTtZQUMzRCxZQUFZLENBQUMsY0FBYyxHQUFHLGFBQWEsQ0FBQztZQUM1QyxZQUFZLENBQUMsT0FBTyxH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