let presence = new Presence({
    clientId: "614388233886760972"
}), strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
});
let browsingStamp = Math.floor(Date.now() / 1000);
let iFrameVideo, currentTime, duration, paused;
let lastPlaybackState = null, playback;
if (document.location.pathname.includes(".html")) {
    presence.on("iFrameData", data => {
        playback = data.iframe_video.duration !== null ? true : false;
        if (playback) {
            iFrameVideo = data.iframe_video.iFrameVideo;
            currentTime = data.iframe_video.currTime;
            duration = data.iframe_video.dur;
            paused = data.iframe_video.paused;
        }
    });
}
presence.on("UpdateData", async () => {
    let presenceData = {
        largeImageKey: "ksow123stack"
    };
    presenceData.startTimestamp = browsingStamp;
    if (lastPlaybackState != playback) {
        lastPlaybackState = playback;
        browsingStamp = Math.floor(Date.now() / 1000);
    }
    if (document.location.pathname.includes(".html") &&
        document.location.pathname.includes("/pages/")) {
        presenceData.details = "Reading the FAQs";
        presenceData.smallImageKey = "reading";
    }
    else if (document.location.pathname.includes(".html")) {
        if (iFrameVideo == true && !isNaN(duration)) {
            let timestamps = getTimestamps(Math.floor(currentTime), Math.floor(duration));
            presenceData.smallImageKey = paused ? "pause" : "play";
            presenceData.smallImageText = paused
                ? (await strings).pause
                : (await strings).play;
            presenceData.startTimestamp = timestamps[0];
            presenceData.endTimestamp = timestamps[1];
            let title = document.querySelector("#player > div.alert.alert-info.hidden-xs > div.media > div > a > h1");
            let views = document.querySelector("#player > div.alert.alert-info.hidden-xs > div.media > div > p:nth-child(7)");
            presenceData.details = title.textContent;
            let air = document.querySelector("#player > div.alert.alert-info.hidden-xs > div.media > div > p:nth-child(9)");
            let air2 = document.querySelector("#player > div.alert.alert-info.hidden-xs > div.media > div > p:nth-child(8)");
            if (air !== null && air.textContent.includes("Air on:")) {
                presenceData.state =
                    views.textContent.replace("Status: ", "") +
                        ", " +
                        air.textContent.replace("Air", "Aired");
            }
            else if (air2 !== null && air2.textContent.includes("Air on:")) {
                presenceData.state =
                    views.textContent.replace("Status: ", "") +
                        ", " +
                        air2.textContent.replace("Air", "Aired");
            }
            else {
                presenceData.state = views.textContent;
            }
            if (paused) {
                delete presenceData.startTimestamp;
                delete presenceData.endTimestamp;
            }
        }
        else if (iFrameVideo == null && isNaN(duration)) {
            let title = document.querySelector("#player > div.alert.alert-info.hidden-xs > div.media > div > a > h1");
            presenceData.details = "Looking at: ";
            presenceData.state = title.textContent;
            presenceData.smallImageKey = "reading";
        }
    }
    else if (document.location.pathname == "/") {
        presenceData.details = "Browsing through";
        presenceData.state = "the main page";
        presenceData.smallImageKey = "reading";
    }
    else if (document.location.pathname == "/show/latest/") {
        presenceData.details = "Browsing through";
        presenceData.state = "the latest shows";
        presenceData.smallImageKey = "reading";
    }
    else if (document.location.pathname == "/show/popular/") {
        presenceData.details = "Browsing through";
        presenceData.state = "the most popular shows";
        presenceData.smallImageKey = "reading";
    }
    else if (document.location.pathname == "/show/rated/") {
        presenceData.details = "Browsing through";
        presenceData.state = "the highest rated shows";
        presenceData.smallImageKey = "reading";
    }
    else if (document.location.pathname == "/show/") {
        presenceData.details = "Browsing through";
        presenceData.state = "a list of all shows";
        presenceData.smallImageKey = "reading";
    }
    else if (document.location.pathname.includes("/show/")) {
        let views = document.querySelector("#info > div.media > div > h1 > a");
        presenceData.details = "Browsing through all episodes of:";
        presenceData.state = views.textContent;
        presenceData.smallImageKey = "reading";
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname.includes("/search/")) {
        let views = document.querySelector("#featured > div.page-header > h3");
        presenceData.details = "Searching for:";
        presenceData.state = views.textContent;
        presenceData.smallImageKey = "search";
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
    let startTime = Date.now();
    let endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUN4QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsRUFDRixPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUM1QixJQUFJLEVBQUUsMkJBQTJCO0lBQ2pDLEtBQUssRUFBRSwwQkFBMEI7Q0FDbEMsQ0FBQyxDQUFDO0FBRUwsSUFBSSxhQUFhLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7QUFDbEQsSUFBSSxXQUFvQixFQUFFLFdBQWdCLEVBQUUsUUFBYSxFQUFFLE1BQVcsQ0FBQztBQUN2RSxJQUFJLGlCQUFpQixHQUFHLElBQUksRUFDMUIsUUFBYSxDQUFDO0FBRWhCLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxFQUFFO0lBQ2hELFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxFQUFFO1FBQy9CLFFBQVEsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO1FBQzlELElBQUksUUFBUSxFQUFFO1lBQ1osV0FBVyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDO1lBQzVDLFdBQVcsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQztZQUN6QyxRQUFRLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUM7WUFDakMsTUFBTSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDO1NBQ25DO0lBQ0gsQ0FBQyxDQUFDLENBQUM7Q0FDSjtBQUVELFFB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