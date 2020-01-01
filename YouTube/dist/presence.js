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
    mediaKeys: false
}), strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused",
    live: "presence.activity.live"
});
var pattern = "•";
function truncateAfter(str, pattern) {
    return str.slice(0, str.indexOf(pattern));
}
presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    var video = document.querySelector(".video-stream");
    if (video !== null && !isNaN(video.duration)) {
        var oldYouTube = null, YouTubeTV = null, YouTubeEmbed = null, title;
        document.querySelector(".watch-title") !== null
            ? (oldYouTube = true)
            : (oldYouTube = false);
        document.querySelector(".player-video-title") !== null
            ? (YouTubeTV = true)
            : (YouTubeTV = false);
        document.location.pathname.includes("/embed")
            ? (YouTubeEmbed = true)
            : (YouTubeEmbed = false);
        YouTubeEmbed
            ? title = document.querySelector("div.ytp-title-text > a")
            : (oldYouTube && document.location.pathname.includes("/watch"))
                ? title = document.querySelector(".watch-title")
                : YouTubeTV
                    ? title = document.querySelector(".player-video-title")
                    : (!document.location.pathname.includes("/watch"))
                        ? title = document.querySelector(".ytd-miniplayer .title")
                        : title = document.querySelector("h1 yt-formatted-string.ytd-video-primary-info-renderer");
        var uploaderTV, uploaderMiniPlayer, uploader2, edited, uploaderEmbed;
        edited = false,
            uploaderTV = document.querySelector(".player-video-details") || document.querySelector("ytd-video-owner-renderer  .ytd-channel-name"),
            uploaderEmbed = document.querySelector("div.ytp-title-expanded-heading > h2 > a"),
            uploaderMiniPlayer = document.querySelector("yt-formatted-string#owner-name"),
            uploader2 = document.querySelector("#owner-name a");
        if (uploaderMiniPlayer != null && uploaderMiniPlayer.textContent == "YouTube") {
            edited = true;
            uploaderMiniPlayer.setAttribute("premid-value", "Listening to a playlist");
        }
        var uploader = uploaderMiniPlayer !== null && uploaderMiniPlayer.textContent.length > 0
            ? uploaderMiniPlayer
            : uploader2 !== null && uploader2.textContent.length > 0
                ? uploader2
                : document.querySelector("#upload-info yt-formatted-string.ytd-channel-name a") !== null
                    ? document.querySelector("#upload-info yt-formatted-string.ytd-channel-name a")
                    : uploaderEmbed !== null && YouTubeEmbed && uploaderEmbed.textContent.length > 0
                        ? uploaderEmbed
                        : uploaderTV = truncateAfter(uploaderTV.textContent.replace(/\s+/g, ''), pattern);
        var timestamps = getTimestamps(Math.floor(video.currentTime), Math.floor(video.duration));
        var live = Boolean(document.querySelector(".ytp-live")), ads = Boolean(document.querySelector(".ytp-ad-player-overlay"));
        var presenceData = {
            details: title.textContent.replace(/\s+/g, '') == "" ? document.querySelector("div.ytp-title-text > a").textContent : title.textContent,
            state: edited == true
                ? uploaderMiniPlayer.getAttribute("premid-value")
                : uploaderTV !== null
                    ? uploaderTV.textContent
                    : uploader.textContent,
            largeImageKey: "yt_lg",
            smallImageKey: video.paused ? "pause" : "play",
            smallImageText: video.paused
                ? (yield strings).pause
                : (yield strings).play,
            startTimestamp: timestamps[0],
            endTimestamp: timestamps[1]
        };
        presence.setTrayTitle(video.paused
            ? ""
            : title == null
                ? document.querySelector(".title.style-scope.ytd-video-primary-info-renderer").textContent
                : title.textContent);
        if (video.paused || live) {
            delete presenceData.startTimestamp;
            delete presenceData.endTimestamp;
            if (live) {
                presenceData.smallImageKey = "live";
                presenceData.smallImageText = (yield strings).live;
            }
        }
        if (title == null && document.querySelector(".title.style-scope.ytd-video-primary-info-renderer") !== null) {
            presenceData.details = document.querySelector(".title.style-scope.ytd-video-primary-info-renderer").textContent;
        }
        if (uploader == null && document.querySelector(".style-scope.ytd-channel-name > a") !== null) {
            presenceData.state = document.querySelector(".style-scope.ytd-channel-name > a").textContent;
        }
        if (ads) {
            presenceData.details = "Currently watching an ad";
            delete presenceData.state;
        }
        if (presenceData.details == null) {
            presence.setTrayTitle();
            presence.setActivity();
        }
        else {
            presence.setActivity(presenceData);
        }
    }
    else if (document.location.hostname == "www.youtube.com" || document.location.hostname == "youtube.com") {
        let presenceData = {
            largeImageKey: "yt_lg"
        };
        var search;
        var user;
        var browsingStamp = Math.floor(Date.now() / 1000);
        if (document.location.pathname.includes("/results")) {
            search = document.querySelector("#search-input > div > div:nth-child(2) > input");
            if (search == null) {
                search = document.querySelector("#search-input > input");
            }
            presenceData.details = "Searching for:";
            presenceData.state = search.value;
            presenceData.smallImageKey = "search";
            presenceData.startTimestamp = browsingStamp;
        }
        else if (document.location.pathname.includes("/channel") || document.location.pathname.includes("/user")) {
            user = document.title.substr(0, document.title.lastIndexOf(' - YouTube'));
            if (user.replace(/\s+/g, '') == "" || user.replace(/\s+/g, '') == "‌")
                user = "null";
            if (document.location.pathname.includes("/videos")) {
                presenceData.details = "Browsing through videos";
                presenceData.state = "of channel: " + user;
                presenceData.startTimestamp = browsingStamp;
            }
            else if (document.location.pathname.includes("/playlists")) {
                presenceData.details = "Browsing through playlists";
                presenceData.state = "of channel: " + user;
                presenceData.startTimestamp = browsingStamp;
            }
            else if (document.location.pathname.includes("/community")) {
                presenceData.details = "Viewing community posts";
                presenceData.state = "of channel: " + user;
                presenceData.startTimestamp = browsingStamp;
            }
            else if (document.location.pathname.includes("/about")) {
                presenceData.details = "Reading about channel:";
                presenceData.state = user;
                presenceData.smallImageKey = "reading";
                presenceData.startTimestamp = browsingStamp;
            }
            else if (document.location.pathname.includes("/search")) {
                search = document.URL.split("search?query=")[1];
                presenceData.details = "Searching through channel: " + user;
                presenceData.state = "for: " + search;
                presenceData.smallImageKey = "search";
                presenceData.startTimestamp = browsingStamp;
            }
            else {
                presenceData.details = "Viewing channel:";
                presenceData.state = user;
                presenceData.startTimestamp = browsingStamp;
            }
        }
        else if (document.location.pathname.includes("/feed/trending")) {
            presenceData.details = "Viewing what's trending";
            presenceData.startTimestamp = browsingStamp;
        }
        else if (document.location.pathname.includes("/feed/subscriptions")) {
            presenceData.details = "Browsing through";
            presenceData.state = "their subscriptions";
            presenceData.startTimestamp = browsingStamp;
        }
        else if (document.location.pathname.includes("/feed/library")) {
            presenceData.details = "Browsing through";
            presenceData.state = "their library";
            presenceData.startTimestamp = browsingStamp;
        }
        else if (document.location.pathname.includes("/feed/history")) {
            presenceData.details = "Browsing through";
            presenceData.state = "their history";
            presenceData.startTimestamp = browsingStamp;
        }
        else if (document.location.pathname.includes("/feed/purchases")) {
            presenceData.details = "Browsing through";
            presenceData.state = "their purchases";
            presenceData.startTimestamp = browsingStamp;
        }
        else if (document.location.pathname.includes("/playlist")) {
            presenceData.details = "Viewing playlist:";
            title = document.querySelector("#text-displayed");
            if (title == null) {
                title = document.querySelector("#title > yt-formatted-string > a");
            }
            presenceData.state = title.textContent;
            presenceData.startTimestamp = browsingStamp;
        }
        else if (document.location.pathname.includes("/premium")) {
            presenceData.details = "Reading about";
            presenceData.state = "Youtube Premium";
            presenceData.smallImageKey = "reading";
            presenceData.startTimestamp = browsingStamp;
        }
        else if (document.location.pathname.includes("/gaming")) {
            presenceData.details = "Browsing through";
            presenceData.state = "Youtube Gaming";
            presenceData.smallImageKey = "reading";
            presenceData.startTimestamp = browsingStamp;
        }
        else if (document.location.pathname.includes("/account")) {
            presenceData.details = "Viewing their account";
            presenceData.startTimestamp = browsingStamp;
        }
        else if (document.location.pathname.includes("/reporthistory")) {
            presenceData.details = "Viewing their report history";
            presenceData.startTimestamp = browsingStamp;
        }
        else if (document.location.pathname.includes("/intl")) {
            presenceData.details = "Reading about:";
            presenceData.state = document.title.substr(0, document.title.lastIndexOf(' - YouTube'));
            presenceData.smallImageKey = "reading";
            presenceData.startTimestamp = browsingStamp;
        }
        else if (document.URL == "https://www.youtube.com/") {
            presenceData.details = "Browsing the main page...";
            presenceData.startTimestamp = browsingStamp;
        }
        else if (document.location.pathname.includes("/upload")) {
            presenceData.details = "Uploading something...";
            presenceData.startTimestamp = browsingStamp;
            presenceData.smallImageKey = "writing";
        }
        else if (document.location.pathname.includes("/view_all_playlists")) {
            presenceData.details = "Viewing all their playlists";
            presenceData.startTimestamp = browsingStamp;
        }
        else if (document.location.pathname.includes("/my_live_events")) {
            presenceData.details = "Viewing their live events";
            presenceData.startTimestamp = browsingStamp;
        }
        else if (document.location.pathname.includes("/live_dashboard")) {
            presenceData.details = "Viewing their live dashboard";
            presenceData.startTimestamp = browsingStamp;
        }
        else if (document.location.pathname.includes("/audiolibrary")) {
            presenceData.details = "Viewing the audio library";
            presenceData.startTimestamp = browsingStamp;
        }
        if (presenceData.details == null) {
            presence.setTrayTitle();
            presence.setActivity();
        }
        else {
            presence.setActivity(presenceData);
        }
    }
    else if (document.location.hostname == "studio.youtube.com") {
        let presenceData = {
            largeImageKey: "yt_lg",
            smallImageKey: "studio",
            smallImageText: "Youtube Studio"
        };
        var search;
        var user;
        var browsingStamp = Math.floor(Date.now() / 1000);
        if (document.location.pathname.includes("/videos")) {
            presenceData.details = "Viewing their videos";
            presenceData.startTimestamp = browsingStamp;
        }
        else if (document.location.pathname.includes("/video")) {
            title = document.querySelector("#entity-name");
            presenceData.startTimestamp = browsingStamp;
            if (document.location.pathname.includes("/edit")) {
                presenceData.details = "Editing video:";
                presenceData.state = title.textContent;
            }
            else if (document.location.pathname.includes("/analytics")) {
                presenceData.details = "Viewing analytics of video:";
                presenceData.state = title.textContent;
            }
            else if (document.location.pathname.includes("/comments")) {
                presenceData.details = "Viewing comments of video:";
                presenceData.state = title.textContent;
            }
            else if (document.location.pathname.includes("/translations")) {
                presenceData.details = "Viewing translations of video:";
                presenceData.state = title.textContent;
            }
        }
        else if (document.location.pathname.includes("/analytics")) {
            presenceData.details = "Viewing their";
            presenceData.state = "channel analytics";
            presenceData.startTimestamp = browsingStamp;
        }
        else if (document.location.pathname.includes("/comments")) {
            presenceData.details = "Viewing their";
            presenceData.state = "channel comments";
            presenceData.startTimestamp = browsingStamp;
        }
        else if (document.location.pathname.includes("/translations")) {
            presenceData.details = "Viewing their";
            presenceData.state = "channel translations";
            presenceData.startTimestamp = browsingStamp;
        }
        else if (document.location.pathname.includes("/channel")) {
            presenceData.details = "Viewing their dashboard";
            presenceData.startTimestamp = browsingStamp;
        }
        else if (document.location.pathname.includes("/artist")) {
            presenceData.details = "Viewing their";
            presenceData.state = "artist page";
            presenceData.startTimestamp = browsingStamp;
        }
        if (presenceData.details == null) {
            presence.setTrayTitle();
            presence.setActivity();
        }
        else {
            presence.setActivity(presenceData);
        }
    }
}));
function getTimestamps(videoTime, videoDuration) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0lBQzlCLFNBQVMsRUFBRSxLQUFLO0NBQ2pCLENBQUMsRUFDRixPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUM1QixJQUFJLEVBQUUsMkJBQTJCO0lBQ2pDLEtBQUssRUFBRSwwQkFBMEI7SUFDakMsSUFBSSxFQUFFLHdCQUF3QjtDQUMvQixDQUFDLENBQUM7QUFJSCxJQUFJLE9BQU8sR0FBRyxHQUFHLENBQUM7QUFDbEIsU0FBUyxhQUFhLENBQUMsR0FBRyxFQUFFLE9BQU87SUFDakMsT0FBTyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7QUFDNUMsQ0FBQztBQUVELFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEdBQVMsRUFBRTtJQUVuQyxJQUFJLEtBQUssR0FBcUIsUUFBUSxDQUFDLGFBQWEsQ0FBQyxlQUFlLENBQUMsQ0FBQztJQUN0RSxJQUFJLEtBQUssS0FBSyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxFQUFFO1FBQzVDLElBQUksVUFBVSxHQUFZLElBQUksRUFBRSxTQUFTLEdBQVksSUFBSSxFQUFFLFlBQVksR0FBWSxJQUFJLEVBQUUsS0FBVSxDQUFDO1FBR3BHLFFBQVEsQ0FBQyxhQUFhLENBQUMsY0FBYyxDQUFDLEtBQUssSUFBSTtZQUM3QyxDQUFDLENBQUMsQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO1lBQ3JCLENBQUMsQ0FBQyxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUMsQ0FBQztRQUV6QixRQUFRLENBQUMsYUFBYSxDQUFDLHFCQUFxQixD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