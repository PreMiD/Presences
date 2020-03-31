let genericStyle = "font-weight: 800; padding: 2px 5px; color: white;";
function PMD_info(message) {
    console.log("%cPreMiD%cINFO%c " + message, genericStyle + "border-radius: 25px 0 0 25px; background: #596cae;", genericStyle + "border-radius: 0 25px 25px 0; background: #5050ff;", "color: unset;");
}
function PMD_error(message) {
    console.log("%cPreMiD%cERROR%c " + message, genericStyle + "border-radius: 25px 0 0 25px; background: #596cae;", genericStyle + "border-radius: 0 25px 25px 0; background: #ff5050;", "color: unset;");
}
function PMD_success(message) {
    console.log("%cPreMiD%cSUCCESS%c " + message, genericStyle + "border-radius: 25px 0 0 25px; background: #596cae;", genericStyle +
        "border-radius: 0 25px 25px 0; background: #50ff50; color: black;", "color: unset;");
}
let presence = new Presence({
    clientId: "619561001234464789"
}), strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
});
let title, uploader, search;
let video, videoDuration, videoCurrentTime, progress, progressduration, progress2, progressduration2, pause;
let browsingStamp = Math.floor(Date.now() / 1000);
let playback;
presence.on("UpdateData", async () => {
    let presenceData = {
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
        let timestamps = getTimestamps(Math.floor(videoCurrentTime), Math.floor(videoDuration));
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
function getTimestamps(videoTime, videoDuration) {
    let startTime = Date.now();
    let endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFlBQVksR0FBRyxtREFBbUQsQ0FBQztBQUV2RSxTQUFTLFFBQVEsQ0FBQyxPQUFPO0lBQ3ZCLE9BQU8sQ0FBQyxHQUFHLENBQ1QsbUJBQW1CLEdBQUcsT0FBTyxFQUM3QixZQUFZLEdBQUcsb0RBQW9ELEVBQ25FLFlBQVksR0FBRyxvREFBb0QsRUFDbkUsZUFBZSxDQUNoQixDQUFDO0FBQ0osQ0FBQztBQUVELFNBQVMsU0FBUyxDQUFDLE9BQU87SUFDeEIsT0FBTyxDQUFDLEdBQUcsQ0FDVCxvQkFBb0IsR0FBRyxPQUFPLEVBQzlCLFlBQVksR0FBRyxvREFBb0QsRUFDbkUsWUFBWSxHQUFHLG9EQUFvRCxFQUNuRSxlQUFlLENBQ2hCLENBQUM7QUFDSixDQUFDO0FBRUQsU0FBUyxXQUFXLENBQUMsT0FBTztJQUMxQixPQUFPLENBQUMsR0FBRyxDQUNULHNCQUFzQixHQUFHLE9BQU8sRUFDaEMsWUFBWSxHQUFHLG9EQUFvRCxFQUNuRSxZQUFZO1FBQ1Ysa0VBQWtFLEVBQ3BFLGVBQWUsQ0FDaEIsQ0FBQztBQUNKLENBQUM7QUFFRCxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUN4QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsRUFDRixPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUM1QixJQUFJLEVBQUUsMkJBQTJCO0lBQ2pDLEtBQUssRUFBRSwwQkFBMEI7Q0FDbEMsQ0FBQyxDQUFDO0FBRUwsSUFBSSxLQUFVLEVBQUUsUUFBYSxFQUFFLE1BQVcsQ0FBQztBQUMzQyxJQUFJLEtBQVUsRUFDWixhQUFrQixFQUNsQixnQkFBcUIsRUFDckIsUUFBYSxFQUNiLGdCQUFxQixFQUNyQixTQUFjLEVBQ2QsaUJBQXNCLEVBQ3RCLEtBQVUsQ0FBQztBQUViLElBQUksYUFBYSxHQUFH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