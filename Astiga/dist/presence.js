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
            presenceData.state = currentArtist.innerText + " / " + albumName.innerText;
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
            ? (yield strings).play
            : (yield strings).pause;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLElBQUksUUFBUSxHQUFHLElBQUksUUFBUSxDQUFDO0lBQzFCLFFBQVEsRUFBRSxvQkFBb0I7SUFDOUIsU0FBUyxFQUFFLEtBQUs7Q0FDaEIsQ0FBQyxFQUNGLE9BQU8sR0FBRyxRQUFRLENBQUMsVUFBVSxDQUFDO0lBQzdCLElBQUksRUFBRSwyQkFBMkI7SUFDakMsS0FBSyxFQUFFLDBCQUEwQjtDQUNqQyxDQUFDLENBQUM7QUFFSixJQUFJLGFBQWEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQztBQUVsRCxJQUFJLFVBQWUsQ0FBQztBQUVwQixJQUFJLE9BQU8sR0FBRyxHQUFHLENBQUM7QUFFbEIsSUFBSSxlQUFvQixFQUN2QixxQkFBMEIsRUFDMUIsZUFBb0IsRUFDcEIscUJBQTBCLENBQUM7QUFFNUIsSUFBSSxjQUFtQixFQUN0QixvQkFBeUIsRUFDekIsY0FBbUIsRUFDbkIsb0JBQXlCLENBQUM7QUFFM0IsSUFBSSxRQUFhLEVBQUUsV0FBZ0IsQ0FBQztBQUVwQyxJQUFJLElBQVMsRUFBRSxLQUFVLENBQUM7QUFFMUIsSUFBSSxXQUFnQixFQUFFLFNBQWMsRUFBRSxhQUFrQixDQUFDO0FBRXpELElBQUksY0FBYyxHQUFHLFVBQVMsR0FBRyxFQUFFLE9BQU87SUFDekMsT0FBTyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ3pELENBQUMsQ0FBQztBQUVGLElBQUksYUFBYSxHQUFHLFVBQVMsR0FBRyxFQUFFLE9BQU87SUFDeEMsT0FBTyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7QUFDM0MsQ0FBQyxDQUFDO0FBRUYsSUFBSSxRQUFRLEdBQVksS0FBSyxDQUFDO0FBRTlCLFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEdBQVMsRUFBRTtJQUNwQyxJQUFJLFlBQVksR0FBaUI7UUFDaEMsT0FBTyxFQUFFLGNBQWM7UUFDdkIsYUFBYSxFQUFFLElBQUk7S0FDbkIsQ0FBQztJQUVGLFdBQVcsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUNuQyw2RkFBNkYsQ0FDN0YsQ0FBQztJQUVGLGFBQWEsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUNyQyxvSkFBb0osQ0FDcEosQ0FBQztJQUVGLFVBQVUsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUNsQyxpSUFBaUksQ0FDakksQ0FBQztJQUVGLFNBQVMsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUNqQyxtSEFBbUgsQ0FDbkgsQ0FBQztJQUVGLElBQUksVUFBVSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1FBQ3BDLElBQUksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUM1Qix3R0FBd0csQ0FDeEcsQ0FBQztRQUVGLEtBQUssR0FBRyxRQUFRLENBQUMsYUFBYSxDQUM3Qix5R0FBeUcsQ0FDekcsQ0FBQztRQUVGLG9CQUFvQixHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQzVDLDJIQUEySCxDQUMzSCxDQUFDO1FBRUYsY0FBYyxHQUFHLGFBQWEsQ0FBQyxvQkFBb0IsQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFFeEUsb0JBQW9CLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FDNUMsMkhBQTJILENBQzNILENBQUM7UUFFRixjQUFjLEdBQUcsY0FBYyxDQUFDLG9CQUFvQixDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUV6RSxxQkFBcUIsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUM3Qyx1SEFBdUgsQ0FDdkgsQ0FBQztRQUVGLGVBQWUsR0FBRyxhQUFhLENBQUMscUJBQXFCLENBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBRTFFLHFCQUFxQixHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQzdDLHVIQUF1SCxDQUN2SCxDQUFDO1FBRUYsZUFBZSxHQUFHLGNBQWMsQ0FBQyxxQkFBcUIsQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFFM0UsV0FBVyxHQUFHLFVBQVUsQ0FBQyxjQUFjLEVBQUUsY0FBYyxDQUFDLENBQUM7UUFFekQsUUFBUSxHQUFHLFVBQVUsQ0FBQyxlQUFlLEVBQUUsZUFBZSxDQUFDLENBQUM7UUFFeEQsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxJQUFJLFdBQVcsSUFBSSxDQUFDLEVBQUU7WUFDNUMsUUFBUSxHQUFHLEtBQUssQ0FBQztTQUNqQjthQUFNO1lBQ04sUUFBUSxHQUFHLElBQUksQ0FBQztTQUNoQjtRQUVELElBQUksVUFBVSxHQUFHLGFBQWEsQ0FBQyxXQUFXLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFFdEQsWUFBWSxDQUFDLE9BQU8sR0FBRyxRQUFRLEdBQUcsVUFBVSxDQUFDLFNBQVMsQ0FBQztRQUV2RCxJQUFJLFNBQVMsQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxhQUFhLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDekUsWUFBWSxDQUFDLEtBQUssR0FBRyxhQUFhLENBQUMsU0FBUyxHQUFHLEtBQUssR0FBRyxTQUFTLENBQUMsU0FBUyxDQUFDO1NBQzNFO2FBQU0sSUFDTixTQUFTLENBQUMsU0FBUyxDQUFDLE1BQU0sSUFBSSxDQUFDO1lBQy9CLGFBQWEsQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsRUFDakM7WUFDRCxZQUFZLENBQUMsS0FBSyxHQUFHLGFBQWEsQ0FBQyxTQUFTLEdBQUcsYUFBYSxDQUFDO1NBQzdEO2FBQU0sSUFDTixTQUFTLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDO1lBQzlCLGFBQWEsQ0FBQyxTQUFTLENBQUMsTUFBTSxJQUFJLENBQUMsRUFDbEM7WUFDRCxZQUFZLENBQUMsS0FBSyxHQUFHLGNBQWMsR0FBRyxTQUFTLENBQUMsU0FBUyxDQUFDO1NBQzFEO2FBQU0sSUFDTixTQUFTLENBQUMsU0FBUyxDQUFDLE1BQU0sSUFBSSxDQUFDO1lBQy9CLGFBQWEsQ0FBQyxTQUFTLENBQUMsTUFBTSxJQUFJLENBQUMsRUFDbEM7WUFDRCxZQUFZLENBQUMsS0FBSyxHQUFHLHNCQUFzQixDQUFDO1NBQzVDO1FBRUQsWUFBWSxDQUFDLGFBQWEsR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDO1FBRXpELFlBQVksQ0FBQyxjQUFjLEdBQUcsUUFBUTtZQUNyQyxDQUFDLENBQUMsQ0FBQyxNQUFNLE9BQU8sQ0FBQyxDQUFDLElBQUk7WUFDdEIsQ0FBQyxDQUFDLENBQUMsTUFBTSxPQUFPLENBQUMsQ0FBQyxLQUFLLENBQUM7UUFFekIsWUFBWSxDQUFDLGNBQWMsR0FBRyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFNUMsWUFBWSxDQUFDLFlBQVksR0FBRyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFMUMsSUFBSSxRQUFRLElBQUksS0FBSyxFQUFFO1lBQ3RCLE9BQU8sWUFBWSxDQUFDLGNBQWMsQ0FBQztZQUVuQyxPQUFPLFlBQVksQ0FBQyxZQUFZLENBQUM7U0FDakM7S0FDRDtTQUFNO1FBQ04sWUFBWSxDQUFDLE9BQU8sR0FBRyxtQkFBbUIsQ0FBQztRQUUzQyxZQUFZLENBQUMsS0FBSyxHQUFHLGtCQUFrQixHQUFHLFdBQVcsQ0FBQyxTQUFTLENBQUM7S0FDaEU7SUFFRCxRQUFRLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO0FBQ3BDLENBQUMsQ0FBQSxDQUFDLENBQUM7QUFPSCxTQUFTLGFBQWEsQ0FBQyxTQUFpQixFQUFFLGFBQXFCO0lBQzlELElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUMzQixJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsR0FBRyxTQUFTLEdBQUcsYUFBYSxDQUFDO0lBQ3ZFLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQztBQUNoRCxDQUFDO0FBRUQsU0FBUyxVQUFVLENBQUMsT0FBZSxFQUFFLE9BQWU7SUFDbkQsSUFBSSxnQkFBZ0IsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUV4RCxJQUFJLE1BQU0sR0FBRyxnQkFBZ0IsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7SUFFaEQsT0FBTyxNQUFNLENBQUM7QUFDZixDQUFDIn0=