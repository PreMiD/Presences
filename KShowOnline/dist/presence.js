var presence = new Presence({
    clientId: "614389710625964045"
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
if (lastPlaybackState != playback) {
    lastPlaybackState = playback;
    browsingStamp = Math.floor(Date.now() / 1000);
}
if (document.location.pathname.includes("/kshow/")) {
    presence.on("iFrameData", (data) => {
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
    var timestamps = getTimestamps(Math.floor(currentTime), Math.floor(duration)), presenceData = {
        largeImageKey: "kshowonline",
        smallImageKey: paused ? "pause" : "play",
        smallImageText: paused ? (await strings).pause : (await strings).play,
        startTimestamp: timestamps[0],
        endTimestamp: timestamps[1]
    };
    video = document.querySelector("#mediaplayer > div.jw-wrapper.jw-reset > div.jw-media.jw-reset > video");
    if (document.location.pathname.includes(".html") &&
        document.location.pathname.includes("/pages/")) {
        presence.setActivity();
        presence.setTrayTitle();
    }
    else if (document.location.pathname.includes("/kshow/")) {
        if (iFrameVideo == true && !isNaN(duration)) {
            title = document.querySelector("#wrap > div.container.content > div > div.col.s12.m12.l8.content-left > div:nth-child(3) > h4");
            views = document.querySelector("#view");
            presenceData.details = title.innerText.replace(views.innerText, "");
            air = document.querySelector("#wrap > div.container.content > div > div.col.s12.m12.l8.content-left > div:nth-child(3) > div.row.panel-info > div.col.s12.m9 > table > tbody > tr:nth-child(6) > td");
            views = document.querySelector("#wrap > div.container.content > div > div.col.s12.m12.l8.content-left > div:nth-child(3) > div.row.panel-info > div.col.s12.m9 > table > tbody > tr:nth-child(5) > td");
            if (air !== null) {
                presenceData.state =
                    "Subbed by: " + views.innerText + ", Aired on: " + air.innerText;
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
            delete presenceData.endTimestamp;
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Looking at: ";
            title = document.querySelector("#wrap > div.container.content > div > div.col.s12.m12.l8.content-left > div:nth-child(3) > h4");
            views = document.querySelector("#view");
            presenceData.state = title.innerText.replace(views.innerText, "");
            delete presenceData.smallImageText;
            presenceData.smallImageKey = "reading";
            presence.setActivity(presenceData);
        }
    }
    else if (document.location.pathname == "/") {
        presenceData.details = "Browsing through";
        presenceData.state = "the main page";
        delete presenceData.endTimestamp;
        presenceData.startTimestamp = browsingStamp;
        delete presenceData.smallImageText;
        presenceData.smallImageKey = "reading";
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname == "/list/view") {
        presenceData.details = "Browsing through";
        presenceData.state = "the most viewed shows";
        delete presenceData.endTimestamp;
        presenceData.startTimestamp = browsingStamp;
        delete presenceData.smallImageText;
        presenceData.smallImageKey = "reading";
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname == "/list/rate") {
        presenceData.details = "Browsing through";
        presenceData.state = "the highest rated shows";
        delete presenceData.endTimestamp;
        presenceData.startTimestamp = browsingStamp;
        delete presenceData.smallImageText;
        presenceData.smallImageKey = "reading";
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname == "/list") {
        presenceData.details = "Browsing through";
        presenceData.state = "the latest shows";
        delete presenceData.endTimestamp;
        presenceData.startTimestamp = browsingStamp;
        delete presenceData.smallImageText;
        presenceData.smallImageKey = "reading";
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname == "/show-list") {
        presenceData.details = "Browsing through";
        presenceData.state = "a list of all shows";
        delete presenceData.endTimestamp;
        presenceData.startTimestamp = browsingStamp;
        delete presenceData.smallImageText;
        presenceData.smallImageKey = "reading";
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname.includes("/category/")) {
        views = document.querySelector("#wrap > div.container.content > div > div.col.s12.m12.l8.content-left > div.content-list.z-depth-1 > h5");
        presenceData.details = "Browsing through all episodes of:";
        presenceData.state = views.innerText
            .replace("CATEGORY: ", "")
            .replace("▼", "");
        delete presenceData.endTimestamp;
        presenceData.startTimestamp = browsingStamp;
        delete presenceData.smallImageText;
        presenceData.smallImageKey = "reading";
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname.includes("/search/")) {
        views = document.querySelector("#wrap > div.container.content > div > div.col.s12.m12.l8.content-left > div.content-list.z-depth-1 > h5");
        presenceData.details = "Searching for:";
        presenceData.state = views.innerText
            .replace("Search by Keywords: ", "")
            .replace("▼", "");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUN4QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsRUFDRixPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUM1QixJQUFJLEVBQUUsMkJBQTJCO0lBQ2pDLEtBQUssRUFBRSwwQkFBMEI7Q0FDbEMsQ0FBQyxDQUFDO0FBRUwsSUFBSSxhQUFhLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7QUFFbEQsSUFBSSxLQUFVLEVBQUUsS0FBVSxFQUFFLEdBQVEsRUFBRSxJQUFTLENBQUM7QUFDaEQsSUFBSSxXQUFvQixFQUFFLFdBQWdCLEVBQUUsUUFBYSxFQUFFLE1BQVcsQ0FBQztBQUd2RSxJQUFJLEtBQXVCLEVBQUUsYUFBa0IsRUFBRSxnQkFBcUIsQ0FBQztBQUV2RSxJQUFJLGlCQUFpQixHQUFHLElBQUksQ0FBQztBQUM3QixJQUFJLFFBQVEsQ0FBQztBQUViLElBQUksaUJBQWlCLElBQUksUUFBUSxFQUFFO0lBQ2pDLGlCQUFpQixHQUFHLFFBQVEsQ0FBQztJQUM3QixhQUFhLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7Q0FDL0M7QUFFRCxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsRUFBRTtJQUNsRCxRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFO1FBQ2pDLFFBQVEsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMs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