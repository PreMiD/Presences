var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
    clientId: "619561001234464789",
    mediaKeys: false
}), strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
});
let title, uploader, search;
let video, videoDuration, videoCurrentTime, progress, progressduration, progress2, progressduration2, pause;
let browsingStamp = Math.floor(Date.now() / 1000);
let playback;
presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
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
            ? (yield strings).pause
            : (yield strings).play;
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
}));
function getTimestamps(videoTime, videoDuration) {
    let startTime = Date.now();
    let endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLElBQUksWUFBWSxHQUFHLG1EQUFtRCxDQUFDO0FBRXZFLFNBQVMsUUFBUSxDQUFDLE9BQU87SUFDeEIsT0FBTyxDQUFDLEdBQUcsQ0FDVixtQkFBbUIsR0FBRyxPQUFPLEVBQzdCLFlBQVksR0FBRyxvREFBb0QsRUFDbkUsWUFBWSxHQUFHLG9EQUFvRCxFQUNuRSxlQUFlLENBQ2YsQ0FBQztBQUNILENBQUM7QUFFRCxTQUFTLFNBQVMsQ0FBQyxPQUFPO0lBQ3pCLE9BQU8sQ0FBQyxHQUFHLENBQ1Ysb0JBQW9CLEdBQUcsT0FBTyxFQUM5QixZQUFZLEdBQUcsb0RBQW9ELEVBQ25FLFlBQVksR0FBRyxvREFBb0QsRUFDbkUsZUFBZSxDQUNmLENBQUM7QUFDSCxDQUFDO0FBRUQsU0FBUyxXQUFXLENBQUMsT0FBTztJQUMzQixPQUFPLENBQUMsR0FBRyxDQUNWLHNCQUFzQixHQUFHLE9BQU8sRUFDaEMsWUFBWSxHQUFHLG9EQUFvRCxFQUNuRSxZQUFZO1FBQ1gsa0VBQWtFLEVBQ25FLGVBQWUsQ0FDZixDQUFDO0FBQ0gsQ0FBQztBQUVELElBQUksUUFBUSxHQUFHLElBQUksUUFBUSxDQUFDO0lBQzFCLFFBQVEsRUFBRSxvQkFBb0I7SUFDOUIsU0FBUyxFQUFFLEtBQUs7Q0FDaEIsQ0FBQyxFQUNGLE9BQU8sR0FBRyxRQUFRLENBQUMsVUFBVSxDQUFDO0lBQzdCLElBQUksRUFBRSwyQkFBMkI7SUFDakMsS0FBSyxFQUFFLDBCQUEwQjtDQUNqQyxDQUFDLENBQUM7QUFFSixJQUFJLEtBQVUsRUFBRSxRQUFhLEVBQUUsTUFBVyxDQUFDO0FBQzNDLElBQUksS0FBVSxFQUNiLGFBQWtCLEVBQ2xCLGdCQUFxQixFQUNyQixRQUFhLEVBQ2IsZ0JBQXFCLEVBQ3JCLFNBQWMsRUFDZCxpQkFBc0IsRUFDdEIsS0FB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