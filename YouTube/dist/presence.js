var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var presence = new Presence({
    clientId: "463097721130188830",
    mediaKeys: true
}), strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused",
    live: "presence.activity.live"
});
var pattern = "•";
var truncateAfter = function (str, pattern) {
    return str.slice(0, str.indexOf(pattern));
};
presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    var video = document.querySelector(".video-stream");
    if (video !== null && !isNaN(video.duration)) {
        var oldYouTube = null;
        var YouTubeTV = null;
        var YouTubeEmbed = null;
        var title;
        document.querySelector(".watch-title") !== null
            ? (oldYouTube = true)
            : (oldYouTube = false);
        document.querySelector(".player-video-title") !== null
            ? (YouTubeTV = true)
            : (YouTubeTV = false);
        document.location.pathname.includes("/embed")
            ? (YouTubeEmbed = true)
            : (YouTubeEmbed = false);
        if (!oldYouTube && !YouTubeTV) {
            if (YouTubeEmbed) {
                title = document.querySelector("div.ytp-title-text > a");
            }
            else {
                title =
                    document.location.pathname !== "/watch"
                        ? document.querySelector(".ytd-miniplayer .title")
                        : document.querySelector("h1 yt-formatted-string.ytd-video-primary-info-renderer");
            }
        }
        else {
            if (oldYouTube) {
                if (document.location.pathname == "/watch")
                    title = document.querySelector(".watch-title");
            }
            else if (YouTubeTV) {
                title = document.querySelector(".player-video-title");
            }
        }
        var uploaderTV, uploaderMiniPlayer, uploader2, edited, uploaderEmbed;
        edited = false;
        uploaderTV = document.querySelector(".player-video-details");
        uploaderEmbed = document.querySelector("div.ytp-title-expanded-heading > h2 > a");
        uploaderMiniPlayer = document.querySelector("yt-formatted-string#owner-name");
        if (uploaderMiniPlayer !== null) {
            if (uploaderMiniPlayer.innerText == "YouTube") {
                edited = true;
                uploaderMiniPlayer.setAttribute("premid-value", "Listening to a playlist");
            }
        }
        uploader2 = document.querySelector("#owner-name a");
        var uploader = uploaderMiniPlayer !== null && uploaderMiniPlayer.innerText.length > 0
            ? uploaderMiniPlayer
            : uploader2 !== null && uploader2.innerText.length > 0
                ? uploader2
                : document.querySelector("#upload-info yt-formatted-string.ytd-channel-name a") !== null
                    ? document.querySelector("#upload-info yt-formatted-string.ytd-channel-name a")
                    : uploaderEmbed !== null && YouTubeEmbed && uploaderEmbed.innerText.length > 0
                        ? uploaderEmbed
                        : uploaderTV = truncateAfter(uploaderTV.innerText, pattern), timestamps = getTimestamps(Math.floor(video.currentTime), Math.floor(video.duration)), live = Boolean(document.querySelector(".ytp-live")), ads = Boolean(document.querySelector(".ytp-ad-player-overlay")), presenceData = {
            details: title.innerText,
            state: edited == true
                ? uploaderMiniPlayer.getAttribute("premid-value")
                : uploaderTV !== null
                    ? uploaderTV
                    : uploader.innerText,
            largeImageKey: "yt_lg",
            smallImageKey: video.paused ? "pause" : "play",
            smallImageText: video.paused
                ? (yield strings).pause
                : (yield strings).play,
            startTimestamp: timestamps[0],
            endTimestamp: timestamps[1]
        };
        presence.setTrayTitle(video.paused ? "" : title.innerText);
        if (video.paused || live) {
            delete presenceData.startTimestamp;
            delete presenceData.endTimestamp;
            if (live) {
                presenceData.smallImageKey = "live";
                presenceData.smallImageText = (yield strings).live;
            }
        }
        if (ads) {
            presenceData.details = "Currently watching an ad";
            delete presenceData.state;
        }
        if (video && title !== null && uploader !== null) {
            presence.setActivity(presenceData, !video.paused);
        }
    }
    else {
        presence.setActivity();
        presence.setTrayTitle();
    }
}));
presence.on("MediaKeys", (key) => {
    switch (key) {
        case "pause":
            var video = document.querySelector(".video-stream");
            video.paused ? video.play() : video.pause();
            break;
        case "nextTrack":
            document.querySelector(".ytp-next-button").click();
            break;
        case "previousTrack":
            document.querySelector(".ytp-prev-button").click();
            break;
    }
});
function getTimestamps(videoTime, videoDuration) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUN4QixRQUFRLEVBQUUsb0JBQW9CO0lBQzlCLFNBQVMsRUFBRSxJQUFJO0NBQ2hCLENBQUMsRUFDRixPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUM1QixJQUFJLEVBQUUsMkJBQTJCO0lBQ2pDLEtBQUssRUFBRSwwQkFBMEI7SUFDakMsSUFBSSxFQUFFLHdCQUF3QjtDQUMvQixDQUFDLENBQUM7QUFFTCxJQUFJLE9BQU8sR0FBRyxHQUFHLENBQUM7QUFDbEIsSUFBSSxhQUFhLEdBQUcsVUFBVSxHQUFHLEVBQUUsT0FBTztJQUN4QyxPQUFPLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztBQUM1QyxDQUFDLENBQUE7QUFFRCxRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxHQUFTLEVBQUU7SUFFbkMsSUFBSSxLQUFLLEdBQXFCLFFBQVEsQ0FBQyxhQUFhLENBQUMsZUFBZSxDQUFDLENBQUM7SUFDdEUsSUFBSSxLQUFLLEtBQUssSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsRUFBRTtRQUU1QyxJQUFJLFVBQVUsR0FBWSxJQUFJLENBQUM7UUFDL0IsSUFBSSxTQUFTLEdBQVksSUFBSSxDQUFDO1FBQzlCLElBQUksWUFBWSxHQUFZLElBQUksQ0FBQztRQUNqQyxJQUFJLEtBQUssQ0FBQztRQUdWLFFBQVEsQ0FBQyxhQUFhLENBQUMsY0FBYyxDQUFDLEtBQUssSUFBSTtZQUM3QyxDQUFDLENBQUMsQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO1lBQ3JCLENBQUMsQ0FBQyxDQUFDLFVBQVUsR0FBRyxLQUFLLENB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