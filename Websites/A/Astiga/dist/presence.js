var presence = new Presence({
    clientId: "612746548631044116"
}), strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
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
var truncateBefore = function (str, pattern) {
    return str.slice(str.indexOf(pattern) + pattern.length);
};
var truncateAfter = function (str, pattern) {
    return str.slice(0, str.indexOf(pattern));
};
var musicTitle;
var pattern = ":";
var minutesDuration, minutesDurationString, secondsDuration, secondsDurationString;
var currentMinutes, currentMinutesString, currentSeconds, currentSecondsString;
var duration, currentTime;
var play;
var currentUser, albumName, currentArtist;
var playback = false;
presence.on("UpdateData", async () => {
    const presenceData = {
        details: "Unknown page",
        largeImageKey: "lg"
    };
    currentUser = document.querySelector("#jp_container_1 > div.wrapper > aside.main-sidebar > section > div > div.pull-left.info > p");
    currentArtist = document.querySelector("#jp_container_1 > div.wrapper > footer > div.jp-controls > div.btn-music-container > div:nth-child(1) > div:nth-child(2) > a.song-artist.menu-item");
    musicTitle = document.querySelector("#jp_container_1 > div.wrapper > footer > div.jp-controls > div.btn-music-container > div:nth-child(1) > div.song-title.overflow");
    albumName = document.querySelector("footer > div.jp-controls > div.btn-music-container > div:nth-child(1) > div:nth-child(2) > a.song-album.menu-item");
    if (musicTitle.innerText.length > 1) {
        play = document.querySelector("footer > div.jp-controls > div.btn-music-container > div:nth-child(2) > a.jp-play.btn.btn-music.btn-sm");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUN4QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsRUFDRixPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUM1QixJQUFJLEVBQUUsMkJBQTJCO0lBQ2pDLEtBQUssRUFBRSwwQkFBMEI7Q0FDbEMsQ0FBQyxDQUFDO0FBT0wsU0FBUyxhQUFhLENBQ3BCLFNBQWlCLEVBQ2pCLGFBQXFCO0lBRXJCLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUMzQixJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsR0FBRyxTQUFTLEdBQUcsYUFBYSxDQUFDO0lBQ3ZFLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQztBQUNqRCxDQUFDO0FBRUQsU0FBUyxVQUFVLENBQUMsT0FBZSxFQUFFLE9BQWU7SUFDbEQsSUFBSSxnQkFBZ0IsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUV4RCxJQUFJLE1BQU0sR0FBRyxnQkFBZ0IsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7SUFFaEQsT0FBTyxNQUFNLENBQUM7QUFDaEIsQ0FBQztBQUVELElBQUksY0FBYyxHQUFHLFVBQVUsR0FBRyxFQUFFLE9BQU87SUFDekMsT0FBTyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQzFELENBQUMsQ0FBQztBQUVGLElBQUksYUFBYSxHQUFH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