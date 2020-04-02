var presence = new Presence({
    clientId: "612746548631044116"
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
presence.on("UpdateData", async () => {
    let presenceData = {
        details: "Unknown page",
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
            presenceData.state =
                currentArtist.innerText + " / " + albumName.innerText;
        }
        else if (albumName.innerText.length == 0 &&
            currentArtist.innerText.length > 0) {
            presenceData.state = currentArtist.innerText + " / No album";
        }
        else if (albumName.innerText.length > 0 &&
            currentArtist.innerText.length == 0) {
            presenceData.state = "No artist / " + albumName.innerText;
        }
        else if (albumName.innerText.length == 0 &&
            currentArtist.innerText.length == 0) {
            presenceData.state = "No artist / No album";
        }
        presenceData.smallImageKey = playback ? "play" : "pause";
        presenceData.smallImageText = playback
            ? (await strings).play
            : (await strings).pause;
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
});
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUN4QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsRUFDRixPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUM1QixJQUFJLEVBQUUsMkJBQTJCO0lBQ2pDLEtBQUssRUFBRSwwQkFBMEI7Q0FDbEMsQ0FBQyxDQUFDO0FBRUwsSUFBSSxhQUFhLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7QUFFbEQsSUFBSSxVQUFlLENBQUM7QUFFcEIsSUFBSSxPQUFPLEdBQUcsR0FBRyxDQUFDO0FBRWxCLElBQUksZUFBb0IsRUFDdEIscUJBQTBCLEVBQzFCLGVBQW9CLEVBQ3BCLHFCQUEwQixDQUFDO0FBRTdCLElBQUksY0FBbUIsRUFDckIsb0JBQXlCLEVBQ3pCLGNBQW1CLEVBQ25CLG9CQUF5QixDQUFDO0FBRTVCLElBQUksUUFBYSxFQUFFLFdBQWdCLENBQUM7QUFFcEMsSUFBSSxJQUFTLEVBQUUsS0FBVSxDQUFDO0FBRTFCLElBQUksV0FBZ0IsRUFBRSxTQUFjLEVBQUUsYUFBa0IsQ0FBQztBQUV6RCxJQUFJLGNBQWMsR0FBRyxVQUFTLEdBQUcsRUFBRSxPQUFPO0lBQ3hDLE9BQU8sR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUMxRCxDQUFDLENBQUM7QUFFRixJQUFJLGFBQWEsR0FBRyxVQUFTLEdBQUcsRUFBRSxPQUFPO0lBQ3ZDLE9BQU8sR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO0FBQzVD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