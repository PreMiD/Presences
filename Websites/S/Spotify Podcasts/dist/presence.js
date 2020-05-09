const genericStyle = "font-weight: 800; padding: 2px 5px; color: white;";
function PMD_error(message) {
    console.log("%cPreMiD%cERROR%c " + message, genericStyle + "border-radius: 25px 0 0 25px; background: #596cae;", genericStyle + "border-radius: 0 25px 25px 0; background: #ff5050;", "color: unset;");
}
const presence = new Presence({
    clientId: "619561001234464789"
}), strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
});
function getTimestamps(videoTime, videoDuration) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
let title, uploader, search;
let video, videoDuration, videoCurrentTime, progress, progressduration, progress2, progressduration2, pause;
const browsingStamp = Math.floor(Date.now() / 1000);
let playback;
presence.on("UpdateData", async () => {
    const presenceData = {
        largeImageKey: "spotify"
    };
    video = document.querySelector("span.react-contextmenu-wrapper > span > a");
    if (video !== null) {
        if (video.href.includes("/show/")) {
            playback = true;
        }
        else {
            playback = false;
        }
    }
    else {
        playback = false;
    }
    console.log(playback);
    if (!playback) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.smallImageKey = "reading";
        if (document.location.hostname == "open.spotify.com" &&
            document.querySelector(".control-button.spoticon-pause-16.control-button--circled") == null) {
            if (document.location.pathname.includes("browse/featured")) {
                presenceData.details = "Browsing through the";
                presenceData.state = "featured songs";
            }
            else if (document.location.pathname.includes("browse/podcasts")) {
                presenceData.details = "Browsing through the";
                presenceData.state = "best podcasts";
            }
            else if (document.location.pathname.includes("browse/charts")) {
                presenceData.details = "Browsing through";
                presenceData.state = "the charts";
            }
            else if (document.location.pathname.includes("browse/genres")) {
                presenceData.details = "Browsing through";
                presenceData.state = "the genres";
            }
            else if (document.location.pathname.includes("browse/newreleases")) {
                presenceData.details = "Browsing through the";
                presenceData.state = "latest releases";
            }
            else if (document.location.pathname.includes("browse/discover")) {
                presenceData.details = "Discovering new songs";
            }
            else if (document.location.pathname.includes("/search/")) {
                search = document.querySelector("input");
                presenceData.details = "Searching for:";
                presenceData.state = search.value;
                if (search.value.length <= 3) {
                    presenceData.state = "something...";
                }
                presenceData.smallImageKey = "search";
            }
            else if (document.location.pathname.includes("/search")) {
                presenceData.details = "Searching for";
                presenceData.state = "new songs";
                presenceData.smallImageKey = "search";
            }
            else if (document.location.pathname.includes("collection/playlists")) {
                presenceData.details = "Browsing through";
                presenceData.state = "their playlists";
            }
            else if (document.location.pathname.includes("collection/made-for-you")) {
                presenceData.details = "Browsing through";
                presenceData.state = '"Made for you"';
            }
            else if (document.location.pathname.includes("collection/tracks")) {
                presenceData.details = "Browsing through";
                presenceData.state = "songs that they like";
            }
            else if (document.location.pathname.includes("collection/albums")) {
                presenceData.details = "Browsing through";
                presenceData.state = "albums that they like";
            }
            else if (document.location.pathname.includes("collection/artists")) {
                presenceData.details = "Browsing through";
                presenceData.state = "artists that they like";
            }
            else if (document.location.pathname.includes("collection/podcasts")) {
                presenceData.details = "Browsing through";
                presenceData.state = "podcasts that they like";
            }
            else if (document.location.pathname.includes("/playlist/")) {
                title = document.querySelector(".mo-info-name > span");
                presenceData.details = "Viewing playlist:";
                presenceData.state = title.textContent;
                delete presenceData.smallImageKey;
            }
            else if (document.location.pathname.includes("/settings")) {
                presenceData.details = "Viewing their settings";
                delete presenceData.smallImageKey;
            }
        }
        else if (document.location.hostname == "support.spotify.com") {
            presenceData.details = "Browsing through the";
            presenceData.state = "Support Center";
        }
        else if (document.location.hostname == "investors.spotify.com") {
            presenceData.details = "Browsing through the";
            presenceData.state = "Support Center";
        }
        else if (document.location.hostname == "developer.spotify.com") {
            presenceData.details = "Browsing through the";
            presenceData.state = "Spotify for Developers";
        }
        else if (document.location.hostname == "artists.spotify.com") {
            presenceData.details = "Browsing through the";
            presenceData.state = "Spotify for Artists";
        }
        else if (document.location.hostname == "newsroom.spotify.com") {
            presenceData.details = "Browsing through the";
            presenceData.state = "Spotify for Newsroom";
        }
        else if (document.location.hostname == "www.spotify.com") {
            if (document.location.pathname.includes("/premium")) {
                presenceData.details = "Looking at";
                presenceData.state = "Spotify Premium";
                delete presenceData.smallImageKey;
            }
            else if (document.location.pathname.includes("/download")) {
                presenceData.details = "Downloading Spotify";
                presenceData.smallImageKey = "downloading";
            }
            else if (document.location.pathname.includes("/account")) {
                presenceData.details = "Looking at";
                presenceData.state = "their account";
                delete presenceData.smallImageKey;
            }
        }
        if (document.querySelector(".control-button.spoticon-pause-16.control-button--circled") == null) {
            if (presenceData.details == null) {
                presence.setTrayTitle();
                presence.setActivity();
            }
            else {
                presence.setActivity(presenceData);
            }
        }
        else {
            presence.clearActivity();
        }
    }
    else {
        progress = document.querySelector(".playback-bar__progress-time:nth-child(1)");
        progress2 = progress.textContent.split(":");
        progressduration = document.querySelector(".playback-bar__progress-time:nth-child(3)");
        progressduration2 = progressduration.textContent.split(":");
        videoCurrentTime = progress2[0] * 60 + +progress2[1];
        videoDuration = progressduration2[0] * 60 + +progressduration2[1];
        if (document.querySelector(".control-button.spoticon-play-16.control-button--circled") !== null) {
            pause = true;
        }
        else {
            pause = false;
        }
        const timestamps = getTimestamps(Math.floor(videoCurrentTime), Math.floor(videoDuration));
        presenceData.smallImageKey = pause ? "pause" : "play";
        presenceData.smallImageText = pause
            ? (await strings).pause
            : (await strings).play;
        presenceData.startTimestamp = timestamps[0];
        presenceData.endTimestamp = timestamps[1];
        if (pause) {
            delete presenceData.startTimestamp;
            delete presenceData.endTimestamp;
        }
        title = document.querySelector("div.react-contextmenu-wrapper > span > a");
        uploader = document.querySelector("span.react-contextmenu-wrapper > span > a");
        presenceData.details = title.textContent;
        presenceData.state = uploader.textContent;
        if (title !== null && uploader !== null) {
            presence.setActivity(presenceData);
        }
        else {
            PMD_error("Error while getting podcast name and title");
        }
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFlBQVksR0FBRyxtREFBbUQsQ0FBQztBQUV6RSxTQUFTLFNBQVMsQ0FBQyxPQUFPO0lBQ3hCLE9BQU8sQ0FBQyxHQUFHLENBQ1Qsb0JBQW9CLEdBQUcsT0FBTyxFQUM5QixZQUFZLEdBQUcsb0RBQW9ELEVBQ25FLFlBQVksR0FBRyxvREFBb0QsRUFDbkUsZUFBZSxDQUNoQixDQUFDO0FBQ0osQ0FBQztBQUVELE1BQU0sUUFBUSxHQUFHLElBQUksUUFBUSxDQUFDO0lBQzFCLFFBQVEsRUFBRSxvQkFBb0I7Q0FDL0IsQ0FBQyxFQUNGLE9BQU8sR0FBRyxRQUFRLENBQUMsVUFBVSxDQUFDO0lBQzVCLElBQUksRUFBRSwyQkFBMkI7SUFDakMsS0FBSyxFQUFFLDBCQUEwQjtDQUNsQyxDQUFDLENBQUM7QUFPTCxTQUFTLGFBQWEsQ0FDcEIsU0FBaUIsRUFDakIsYUFBcUI7SUFFckIsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQzNCLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxHQUFHLFNBQVMsR0FBRyxhQUFhLENBQUM7SUFDdkUsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQ2pELENBQUM7QUFFRCxJQUFJLEtBQVUsRUFBRSxRQUFhLEVBQUUsTUFBVyxDQUFDO0FBQzNDLElBQUksS0FBVSxFQUNaLGFBQWtCLEVBQ2xCLGdCQUFxQixFQUNyQixRQUFhLEVBQ2IsZ0JBQXFCLEVBQ3JCLFNBQWMsRUFDZCxpQkFBc0IsRUFDdEIsS0FBVSxDQUFDO0FBRWIsTUFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FB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