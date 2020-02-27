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
            presenceData.state = currentArtist.innerText + " / " + albumName.innerText;
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
        presenceData.smallImageText = playback ? (yield strings).play : (yield strings).pause;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLElBQUksUUFBUSxHQUFHLElBQUksUUFBUSxDQUFDO0lBQzFCLFFBQVEsRUFBRSxvQkFBb0I7SUFDOUIsU0FBUyxFQUFFLEtBQUs7Q0FDakIsQ0FBQyxFQUNGLE9BQU8sR0FBRyxRQUFRLENBQUMsVUFBVSxDQUFDO0lBQzVCLElBQUksRUFBRSwyQkFBMkI7SUFDakMsS0FBSyxFQUFFLDBCQUEwQjtDQUNsQyxDQUFDLENBQUM7QUFFSCxJQUFJLGFBQWEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBQyxJQUFJLENBQUMsQ0FBQztBQUVoRCxJQUFJLFVBQWdCLENBQUM7QUFFckIsSUFBSSxPQUFPLEdBQUcsR0FBRyxDQUFDO0FBRWxCLElBQUksZUFBcUIsRUFBRSxxQkFBMkIsRUFBRSxlQUFxQixFQUFFLHFCQUEyQixDQUFDO0FBRTNHLElBQUksY0FBb0IsRUFBRSxvQkFBMEIsRUFBRSxjQUFvQixFQUFFLG9CQUEwQixDQUFDO0FBRXZHLElBQUksUUFBYyxFQUFFLFdBQWlCLENBQUM7QUFFdEMsSUFBSSxJQUFVLEVBQUUsS0FBVyxDQUFDO0FBRTVCLElBQUksV0FBaUIsRUFBRSxTQUFlLEVBQUUsYUFBbUIsQ0FBQztBQUU1RCxJQUFJLGNBQWMsR0FBRyxVQUFVLEdBQUcsRUFBRSxPQUFPO0lBQ3pDLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQzFELENBQUMsQ0FBQztBQUVGLElBQUksYUFBYSxHQUFHLFVBQVUsR0FBRyxFQUFFLE9BQU87SUFDeEMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxP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