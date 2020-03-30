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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQzlCLENBQUMsRUFDRixPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUM3QixJQUFJLEVBQUUsMkJBQTJCO0lBQ2pDLEtBQUssRUFBRSwwQkFBMEI7Q0FDakMsQ0FBQyxDQUFDO0FBRUosSUFBSSxhQUFhLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7QUFFbEQsSUFBSSxVQUFlLENBQUM7QUFFcEIsSUFBSSxPQUFPLEdBQUcsR0FBRyxDQUFDO0FBRWxCLElBQUksZUFBb0IsRUFDdkIscUJBQTBCLEVBQzFCLGVBQW9CLEVBQ3BCLHFCQUEwQixDQUFDO0FBRTVCLElBQUksY0FBbUIsRUFDdEIsb0JBQXlCLEVBQ3pCLGNBQW1CLEVBQ25CLG9CQUF5QixDQUFDO0FBRTNCLElBQUksUUFBYSxFQUFFLFdBQWdCLENBQUM7QUFFcEMsSUFBSSxJQUFTLEVBQUUsS0FBVSxDQUFDO0FBRTFCLElBQUksV0FBZ0IsRUFBRSxTQUFjLEVBQUUsYUFBa0IsQ0FBQztBQUV6RCxJQUFJLGNBQWMsR0FBRyxVQUFTLEdBQUcsRUFBRSxPQUFPO0lBQ3pDLE9BQU8sR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUN6RCxDQUFDLENBQUM7QUFFRixJQUFJLGFBQWEsR0FBRyxVQUFTLEdBQUcsRUFBRSxPQUFPO0lBQ3hDLE9BQU8sR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO0FBQzND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