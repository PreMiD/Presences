var presence = new Presence({
    clientId: "612746548631044116"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
  });

/**
 * Get Timestamps
 * @param {Number} videoTime Current video time seconds
 * @param {Number} videoDuration Video duration seconds
 */
function getTimestamps(
  videoTime: number,
  videoDuration: number
): Array<number> {
  var startTime = Date.now();
  var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
  return [Math.floor(startTime / 1000), endTime];
}

function getSeconds(minutes: number, seconds: number): number {
  var minutesToSeconds = Number(Math.floor(minutes * 60));

  var result = minutesToSeconds + Number(seconds);

  return result;
}

var truncateBefore = function (str, pattern): string {
  return str.slice(str.indexOf(pattern) + pattern.length);
};

var truncateAfter = function (str, pattern): string {
  return str.slice(0, str.indexOf(pattern));
};

var musicTitle: any;

var pattern = ":";

var minutesDuration: any,
  minutesDurationString: any,
  secondsDuration: any,
  secondsDurationString: any;

var currentMinutes: any,
  currentMinutesString: any,
  currentSeconds: any,
  currentSecondsString: any;

var duration: any, currentTime: any;

var play: any;

var currentUser: any, albumName: any, currentArtist: any;

var playback = false;

presence.on("UpdateData", async () => {
  const presenceData: presenceData = {
    details: "Unknown page",
    largeImageKey: "lg"
  };

  currentUser = document.querySelector(
    "#jp_container_1 > div.wrapper > aside.main-sidebar > section > div > div.pull-left.info > p"
  );

  currentArtist = document.querySelector(
    "#jp_container_1 > div.wrapper > footer > div.jp-controls > div.btn-music-container > div:nth-child(1) > div:nth-child(2) > a.song-artist.menu-item"
  );

  musicTitle = document.querySelector(
    "#jp_container_1 > div.wrapper > footer > div.jp-controls > div.btn-music-container > div:nth-child(1) > div.song-title.overflow"
  );

  albumName = document.querySelector(
    "footer > div.jp-controls > div.btn-music-container > div:nth-child(1) > div:nth-child(2) > a.song-album.menu-item"
  );

  if (musicTitle.innerText.length > 1) {
    play = document.querySelector(
      "footer > div.jp-controls > div.btn-music-container > div:nth-child(2) > a.jp-play.btn.btn-music.btn-sm"
    );

    currentMinutesString = document.querySelector(
      "#jp_container_1 > div.wrapper > footer > div.jp-controls > div.btn-music-container > div.hidden-xs > span.jp-current-time"
    );

    currentMinutes = truncateAfter(currentMinutesString.innerText, pattern);

    currentSecondsString = document.querySelector(
      "#jp_container_1 > div.wrapper > footer > div.jp-controls > div.btn-music-container > div.hidden-xs > span.jp-current-time"
    );

    currentSeconds = truncateBefore(currentSecondsString.innerText, pattern);

    minutesDurationString = document.querySelector(
      "#jp_container_1 > div.wrapper > footer > div.jp-controls > div.btn-music-container > div.hidden-xs > span.jp-duration"
    );

    minutesDuration = truncateAfter(minutesDurationString.innerText, pattern);

    secondsDurationString = document.querySelector(
      "#jp_container_1 > div.wrapper > footer > div.jp-controls > div.btn-music-container > div.hidden-xs > span.jp-duration"
    );

    secondsDuration = truncateBefore(secondsDurationString.innerText, pattern);

    currentTime = getSeconds(currentMinutes, currentSeconds);

    duration = getSeconds(minutesDuration, secondsDuration);

    if (!play.style.display || currentTime == 0) {
      playback = false;
    } else {
      playback = true;
    }

    var timestamps = getTimestamps(currentTime, duration);

    presenceData.details = "Song: " + musicTitle.innerText;

    if (albumName.innerText.length > 0 && currentArtist.innerText.length > 0) {
      presenceData.state =
        currentArtist.innerText + " / " + albumName.innerText;
    } else if (
      albumName.innerText.length == 0 &&
      currentArtist.innerText.length > 0
    ) {
      presenceData.state = currentArtist.innerText + " / No album";
    } else if (
      albumName.innerText.length > 0 &&
      currentArtist.innerText.length == 0
    ) {
      presenceData.state = "No artist / " + albumName.innerText;
    } else if (
      albumName.innerText.length == 0 &&
      currentArtist.innerText.length == 0
    ) {
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
  } else {
    presenceData.details = "No music playing.";

    presenceData.state = "Logged in user: " + currentUser.innerText;
  }

  presence.setActivity(presenceData);
});
