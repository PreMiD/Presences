var presence = new Presence({
    clientId: "614388233886760972"
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
if (lastPlaybackState != playback) {
    lastPlaybackState = playback;
    browsingStamp = Math.floor(Date.now() / 1000);
}
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
    video = document.querySelector("#mediaplayer > div.jw-wrapper.jw-reset > div.jw-media.jw-reset > video");
    if (document.location.pathname.includes(".html") &&
        document.location.pathname.includes("/pages/")) {
        presence.setActivity();
        presence.setTrayTitle();
    }
    else if (document.location.pathname.includes(".html")) {
        if (iFrameVideo == true && !isNaN(duration)) {
            var a = "", timestamps = getTimestamps(Math.floor(currentTime), Math.floor(duration)), presenceData = {
                largeImageKey: "ksow123stack",
                smallImageKey: paused ? "pause" : "play",
                smallImageText: paused ? (await strings).pause : (await strings).play,
                startTimestamp: timestamps[0],
                endTimestamp: timestamps[1]
            };
            title = document.querySelector("#player > div.alert.alert-info.hidden-xs > div.media > div > a > h1");
            views = document.querySelector("#player > div.alert.alert-info.hidden-xs > div.media > div > p:nth-child(7)");
            presenceData.details = title.innerText;
            air = document.querySelector("#player > div.alert.alert-info.hidden-xs > div.media > div > p:nth-child(9)");
            air2 = document.querySelector("#player > div.alert.alert-info.hidden-xs > div.media > div > p:nth-child(8)");
            if (air !== null && air.innerText.includes("Air on:")) {
                presenceData.state =
                    views.innerText.replace("Status: ", "") + ", " + air.innerText;
            }
            else if (air2 !== null && air2.innerText.includes("Air on:")) {
                presenceData.state =
                    views.innerText.replace("Status: ", "") + ", " + air2.innerText;
            }
            else {
                presenceData.state = views.innerText;
            }
            if (paused) {
                delete presenceData.startTimestamp;
                delete presenceData.endTimestamp;
            }
            presence.setActivity(presenceData);
        }
        else if (iFrameVideo == null && isNaN(duration)) {
            title = document.querySelector("#player > div.alert.alert-info.hidden-xs > div.media > div > a > h1");
            var a = "", timestamps = getTimestamps(Math.floor(currentTime), Math.floor(duration)), presenceData = {
                largeImageKey: "ksow123stack",
                smallImageKey: paused ? "pause" : "play",
                smallImageText: paused ? (await strings).pause : (await strings).play,
                startTimestamp: timestamps[0],
                endTimestamp: timestamps[1]
            };
            delete presenceData.endTimestamp;
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Looking at: ";
            presenceData.state = title.innerText;
            delete presenceData.smallImageText;
            presenceData.smallImageKey = "reading";
            presence.setActivity(presenceData);
        }
    }
    else if (document.location.pathname == "/") {
        var a = "", presenceData = {
            largeImageKey: "ksow123stack"
        };
        presenceData.details = "Browsing through";
        presenceData.state = "the main page";
        delete presenceData.endTimestamp;
        presenceData.startTimestamp = browsingStamp;
        delete presenceData.smallImageText;
        presenceData.smallImageKey = "reading";
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname == "/show/latest/") {
        var a = "", presenceData = {
            largeImageKey: "ksow123stack"
        };
        presenceData.details = "Browsing through";
        presenceData.state = "the latest shows";
        delete presenceData.endTimestamp;
        presenceData.startTimestamp = browsingStamp;
        delete presenceData.smallImageText;
        presenceData.smallImageKey = "reading";
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname == "/show/popular/") {
        var a = "", presenceData = {
            largeImageKey: "ksow123stack"
        };
        presenceData.details = "Browsing through";
        presenceData.state = "the most popular shows";
        delete presenceData.endTimestamp;
        presenceData.startTimestamp = browsingStamp;
        delete presenceData.smallImageText;
        presenceData.smallImageKey = "reading";
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname == "/show/rated/") {
        var a = "", presenceData = {
            largeImageKey: "ksow123stack"
        };
        presenceData.details = "Browsing through";
        presenceData.state = "the highest rated shows";
        delete presenceData.endTimestamp;
        presenceData.startTimestamp = browsingStamp;
        delete presenceData.smallImageText;
        presenceData.smallImageKey = "reading";
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname == "/show/") {
        var a = "", presenceData = {
            largeImageKey: "ksow123stack"
        };
        presenceData.details = "Browsing through";
        presenceData.state = "a list of all shows";
        delete presenceData.endTimestamp;
        presenceData.startTimestamp = browsingStamp;
        delete presenceData.smallImageText;
        presenceData.smallImageKey = "reading";
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname.includes("/show/")) {
        var a = "", presenceData = {
            largeImageKey: "ksow123stack"
        };
        views = document.querySelector("#info > div.media > div > h1 > a");
        presenceData.details = "Browsing through all episodes of:";
        presenceData.state = views.innerText;
        delete presenceData.endTimestamp;
        presenceData.startTimestamp = browsingStamp;
        delete presenceData.smallImageText;
        presenceData.smallImageKey = "reading";
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname.includes("/search/")) {
        var a = "", presenceData = {
            largeImageKey: "ksow123stack"
        };
        views = document.querySelector("#featured > div.page-header > h3");
        presenceData.details = "Searching for:";
        presenceData.state = views.innerText;
        delete presenceData.endTimestamp;
        presenceData.startTimestamp = browsingStamp;
        delete presenceData.smallImageText;
        presenceData.smallImageKey = "search";
        presence.setActivity(presenceData);
    }
    else {
        presence.setActivity();
        presence.setTrayTitle();
    }
});
function getTimestamps(videoTime, videoDuration) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQzlCLENBQUMsRUFDRixPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUM3QixJQUFJLEVBQUUsMkJBQTJCO0lBQ2pDLEtBQUssRUFBRSwwQkFBMEI7Q0FDakMsQ0FBQyxDQUFDO0FBRUosSUFBSSxhQUFhLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7QUFFbEQsSUFBSSxLQUFVLEVBQUUsS0FBVSxFQUFFLEdBQVEsRUFBRSxJQUFTLENBQUM7QUFDaEQsSUFBSSxXQUFvQixFQUFFLFdBQWdCLEVBQUUsUUFBYSxFQUFFLE1BQVcsQ0FBQztBQUd2RSxJQUFJLEtBQXVCLEVBQUUsYUFBa0IsRUFBRSxnQkFBcUIsQ0FBQztBQUV2RSxJQUFJLGlCQUFpQixHQUFHLElBQUksQ0FBQztBQUM3QixJQUFJLFFBQVEsQ0FBQztBQUNiLElBQUksYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0FBRWxELElBQUksaUJBQWlCLElBQUksUUFBUSxFQUFFO0lBQ2xDLGlCQUFpQixHQUFHLFFBQVEsQ0FBQztJQUM3QixhQUFhLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7Q0FDOUM7QUFFRCxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsRUFBRTtJQUNqRCxRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsRUFBRTtRQUNoQyxRQUFR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