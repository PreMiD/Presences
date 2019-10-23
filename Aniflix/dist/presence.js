var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var presence = new Presence({
    clientId: "630093952342687794",
    mediaKeys: true
}), strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
});
var browsingStamp = Math.floor(Date.now() / 1000);
var title, views, air, search;
var iFrameVideo, currentTime, duration, paused;
var video, videoDuration, videoCurrentTime;
var lastPlaybackState = null;
var playback;
var browsingStamp = Math.floor(Date.now() / 1000);
if (lastPlaybackState != playback) {
    lastPlaybackState = playback;
    browsingStamp = Math.floor(Date.now() / 1000);
}
if (document.querySelector("#view-wrapper > div:nth-child(2) > div > div.episode") != null) {
    presence.on("iFrameData", data => {
        playback =
            data.iframe_video.duration !== null
                ? true : false;
        if (playback) {
            iFrameVideo = data.iframe_video.iFrameVideo;
            currentTime = data.iframe_video.currTime;
            duration = data.iframe_video.dur;
            paused = data.iframe_video.paused;
        }
    });
}
presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    var a = '', timestamps = getTimestamps(Math.floor(currentTime), Math.floor(duration)), presenceData = {
        largeImageKey: "aniflix",
        smallImageKey: paused ? "pause" : "play",
        smallImageText: paused
            ? (yield strings).pause
            : (yield strings).play,
        startTimestamp: timestamps[0],
        endTimestamp: timestamps[1]
    };
    search = document.querySelector("#searchbar > div > input[type=text]");
    search = search.value;
    if (document.querySelector("#view-wrapper > div:nth-child(2) > div > div.episode > div.infos > div:nth-child(1) > h1") != null) {
        if (iFrameVideo == true && !isNaN(duration)) {
            title = document.querySelector("#view-wrapper > div:nth-child(2) > div > div.episode > div.infos > div:nth-child(1) > div > a");
            views = document.querySelector("#view-wrapper > div:nth-child(2) > div > div.episode > div.infos > div:nth-child(1) > div > div.episode-number");
            presenceData.state = title.innerText + " (" + views.innerText + ")";
            air = document.querySelector("#view-wrapper > div:nth-child(2) > div > div.episode > div.infos > div:nth-child(1) > h1");
            presenceData.details = air.innerText;
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
            title = document.querySelector("#view-wrapper > div:nth-child(2) > div > div.episode > div.infos > div:nth-child(1) > div > a");
            views = document.querySelector("#view-wrapper > div:nth-child(2) > div > div.episode > div.infos > div:nth-child(1) > div > div.episode-number");
            presenceData.state = title.innerText + " (" + views.innerText + ")";
            delete presenceData.smallImageText;
            presenceData.smallImageKey = "reading";
            presence.setActivity(presenceData);
        }
    }
    else if (search != "" && search.length >= 2) {
        presenceData.details = "Searching for:";
        presenceData.state = search;
        delete presenceData.endTimestamp;
        presenceData.startTimestamp = browsingStamp;
        delete presenceData.smallImageText;
        presenceData.smallImageKey = "search";
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname.includes("/show/") && document.location.pathname.includes("/reviews")) {
        title = document.querySelector("#view-wrapper > div > div > div.reviews-header > div");
        presenceData.details = "Viewing reviews of show:";
        presenceData.state = title.innerText.replace("Reviews zu ", "");
        delete presenceData.endTimestamp;
        presenceData.startTimestamp = browsingStamp;
        delete presenceData.smallImageText;
        delete presenceData.smallImageKey;
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname.includes("/show/")) {
        title = document.querySelector("#view-wrapper > div.show > div > div.header-wrapper > div.show-header > div > div:nth-child(1) > div.name-wrapper > h1");
        presenceData.details = "Viewing show:";
        presenceData.state = title.innerText;
        delete presenceData.endTimestamp;
        presenceData.startTimestamp = browsingStamp;
        delete presenceData.smallImageText;
        delete presenceData.smallImageKey;
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname == "/airing") {
        presenceData.details = "Viewing the calander";
        delete presenceData.state;
        delete presenceData.endTimestamp;
        presenceData.startTimestamp = browsingStamp;
        delete presenceData.smallImageText;
        delete presenceData.smallImageKey;
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname == "/all") {
        presenceData.details = "Viewing the list";
        presenceData.state = "of all shows";
        delete presenceData.endTimestamp;
        presenceData.startTimestamp = browsingStamp;
        delete presenceData.smallImageText;
        delete presenceData.smallImageKey;
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname == "/about") {
        presenceData.details = "Viewing the about page";
        delete presenceData.state;
        delete presenceData.endTimestamp;
        presenceData.startTimestamp = browsingStamp;
        delete presenceData.smallImageText;
        presenceData.smallImageKey = "reading";
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname == "/") {
        presenceData.details = "Viewing the main page";
        delete presenceData.state;
        delete presenceData.endTimestamp;
        presenceData.startTimestamp = browsingStamp;
        delete presenceData.smallImageText;
        presenceData.smallImageKey = "reading";
        presence.setActivity(presenceData);
    }
    else {
        presence.setActivity();
        presence.setTrayTitle();
    }
}));
presence.on("MediaKeys", (key) => {
    switch (key) {
        case "pause":
            var video = document.querySelector(".jw-video video");
            video.paused ? video.play() : video.pause();
            break;
    }
});
function getTimestamps(videoTime, videoDuration) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLElBQUksUUFBUSxHQUFHLElBQUksUUFBUSxDQUFDO0lBQ3hCLFFBQVEsRUFBRSxvQkFBb0I7SUFDOUIsU0FBUyxFQUFFLElBQUk7Q0FDakIsQ0FBQyxFQUVELE9BQU8sR0FBRyxRQUFRLENBQUMsVUFBVSxDQUFDO0lBQzVCLElBQUksRUFBRSwyQkFBMkI7SUFDakMsS0FBSyxFQUFFLDBCQUEwQjtDQUNsQyxDQUFDLENBQUM7QUFFSCxJQUFJLGFBQWEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBQyxJQUFJLENBQUMsQ0FBQztBQUVoRCxJQUFJLEtBQVcsRUFBRSxLQUFXLEVBQUUsR0FBUyxFQUFFLE1BQVksQ0FBQztBQUN0RCxJQUFJLFdBQXFCLEVBQUUsV0FBaUIsRUFBRSxRQUFjLEVBQUUsTUFBWSxDQUFDO0FBRzNFLElBQUksS0FBd0IsRUFBRSxhQUFtQixFQUFFLGdCQUFzQixDQUFDO0FBRTFFLElBQUksaUJBQWlCLEdBQUcsSUFBSSxDQUFDO0FBQzdCLElBQUksUUFBUSxDQUFDO0FBQ2IsSUFBSSxhQUFhLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUMsSUFBSSxDQUFDLENBQUM7QUFFaEQsSUFBRyxpQkFBaUIsSUFBSSxRQUFRLEVBQUU7SUFFOUIsaUJBQWlCLEdBQUcsUUFBUSxDQUFBO0lBQzVCLGFBQWEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBQyxJQUFJLENBQUMsQ0FBQTtDQUU5QztBQUVILElBQUksUUFBUSxDQUFDLGFBQWEsQ0FBQyxzREFBc0QsQ0FBQyxJQUFJLElBQUksRUFBRTtJQUUxRixRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxJQUFJ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