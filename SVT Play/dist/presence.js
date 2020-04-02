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
            if (video.duration == undefined || video.duration == null) {
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
            if (video !== null) {
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