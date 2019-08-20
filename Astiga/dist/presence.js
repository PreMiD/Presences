var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var presence = new Presence({
    clientId: "612746548631044116",
    mediaKeys: false
}), strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
});
var browsingStamp = Math.floor(Date.now() / 1000);
var musicTitle;
var pattern = ":";
var minutesDuration, minutesDurationString, secondsDuration, secondsDurationString;
var currentMinutes, currentMinutesString, currentSeconds, currentSecondsString;
var duration, currentTime;
var play, pause;
var currentUser, albumName, currentArtist;
var truncateBefore = function (str, pattern) {
    return str.slice(str.indexOf(pattern) + pattern.length);
};
var truncateAfter = function (str, pattern) {
    return str.slice(0, str.indexOf(pattern));
};
var playback = false;
presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    let presenceData = {
        details: "In construction",
        state: "-",
        largeImageKey: "lg"
    };
    currentUser = document.querySelector("#jp_container_1 > div.wrapper > aside.main-sidebar > section > div > div.pull-left.info > p");
    currentArtist = document.querySelector("#jp_container_1 > div.wrapper > footer > div.jp-controls > div.btn-music-container > div:nth-child(1) > div:nth-child(2) > a.song-artist.menu-item");
    musicTitle = document.querySelector("#jp_container_1 > div.wrapper > footer > div.jp-controls > div.btn-music-container > div:nth-child(1) > div.song-title.overflow");
    albumName = document.querySelector("footer > div.jp-controls > div.btn-music-container > div:nth-child(1) > div:nth-child(2) > a.song-album.menu-item");
    if (musicTitle.innerText.length > 1) {
        play = document.querySelector("footer > div.jp-controls > div.btn-music-container > div:nth-child(2) > a.jp-play.btn.btn-music.btn-sm");
        pause = document.querySelector("footer > div.jp-controls > div.btn-music-container > div:nth-child(2) > a.jp-pause.btn.btn-music.btn-sm");
        currentMinutesString = document.querySelector("#jp_container_1 > div.wrapper > footer > div.jp-controls > div.btn-music-container > div.hidden-xs > span.jp-current-time");
        currentMinutes = truncateAfter(currentMinutesString.innerText, pattern);
        currentSecondsString = document.querySelector("#jp_container_1 > div.wrapper > footer > div.jp-controls > div.btn-music-container > div.hidden-xs > span.jp-current-time");
        currentSeconds = truncateBefore(currentSecondsString.innerText, pattern);
        minutesDurationString = document.querySelector("#jp_container_1 > div.wrapper > footer > div.jp-controls > div.btn-music-container > div.hidden-xs > span.jp-duration");
        minutesDuration = truncateAfter(minutesDurationString.innerText, pattern);
        secondsDurationString = document.querySelector("#jp_container_1 > div.wrapper > footer > div.jp-controls > div.btn-music-container > div.hidden-xs > span.jp-duration");
        secondsDuration = truncateBefore(secondsDurationString.innerText, pattern);
        currentTime = getSeconds(currentMinutes, currentSeconds);
        duration = getSeconds(minutesDuration, secondsDuration);
        if (!play.style.display || currentTime == 0) {
            playback = false;
        }
        else {
            playback = true;
        }
        var timestamps = getTimestamps(currentTime, duration);
        presenceData.details = "Song: " + musicTitle.innerText;
        if (albumName.innerText.length > 0 && currentArtist.innerText.length > 0) {
            presenceData.state = currentUser.innerText + " / " + albumName.innerText;
        }
        else if (albumName.innerText.length == 0 && currentArtist.innerText.length > 0) {
            presenceData.state = currentArtist.innerText + " / No album";
        }
        else if (albumName.innerText.length > 0 && currentArtist.innerText.length == 0) {
            presenceData.state = "No artist / " + albumName.innerText;
        }
        else if (albumName.innerText.length == 0 && currentArtist.innerText.length == 0) {
            presenceData.state = "No artist / No album";
        }
        presenceData.smallImageKey = playback ? "play" : "pause";
        presenceData.smallImageText = playback ? (yield strings).pause : (yield strings).play;
        presenceData.startTimestamp = timestamps[0];
        presenceData.endTimestamp = timestamps[1];
        if (playback == false) {
            delete presenceData.startTimestamp;
            delete presenceData.endTimestamp;
        }
    }
    else {
        presenceData.details = "No music playing.";
        presenceData.state = "Logged in user: " + currentUser.innerText;
    }
    presence.setActivity(presenceData);
}));
function getTimestamps(videoTime, videoDuration) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
function getSeconds(minutes, seconds) {
    var minutesToSeconds = Number(Math.floor(minutes * 60));
    var result = minutesToSeconds + Number(seconds);
    return result;
}
