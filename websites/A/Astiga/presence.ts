const presence = new Presence({
    clientId: "612746548631044116"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
  }),
  truncateBefore = function (str: string, pattern: string): string {
    return str.slice(str.indexOf(pattern) + pattern.length);
  },
  truncateAfter = function (str: string, pattern: string): string {
    return str.slice(0, str.indexOf(pattern));
  },
  getSeconds = function (minutes: number, seconds: number): number {
    const minutesToSeconds = Number(Math.floor(minutes * 60)),
      result = minutesToSeconds + Number(seconds);

    return result;
  },
  pattern = ":";

let musicTitle: HTMLElement,
  minutesDuration: string,
  minutesDurationString: HTMLElement,
  secondsDuration: string,
  secondsDurationString: HTMLElement,
  currentMinutes: string,
  currentMinutesString: HTMLElement,
  currentSeconds: string,
  currentSecondsString: HTMLElement,
  duration: number,
  currentTime: number,
  play: HTMLElement,
  currentUser: HTMLElement,
  albumName: HTMLElement,
  currentArtist: HTMLElement,
  playback = false;

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
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

    currentTime = getSeconds(
      parseInt(currentMinutes),
      parseInt(currentSeconds)
    );

    duration = getSeconds(parseInt(minutesDuration), parseInt(secondsDuration));

    if (!play.style.display || currentTime === 0) playback = false;
    else playback = true;

    const [startTimestamp, endTimestamp] = presence.getTimestamps(
      currentTime,
      duration
    );

    presenceData.details = `Song: ${musicTitle.innerText}`;

    if (albumName.innerText.length > 0 && currentArtist.innerText.length > 0)
      presenceData.state = `${currentArtist.innerText} / ${albumName.innerText}`;
    else if (
      albumName.innerText.length === 0 &&
      currentArtist.innerText.length > 0
    )
      presenceData.state = `${currentArtist.innerText} / No album`;
    else if (
      albumName.innerText.length > 0 &&
      currentArtist.innerText.length === 0
    )
      presenceData.state = `No artist / ${albumName.innerText}`;
    else if (
      albumName.innerText.length === 0 &&
      currentArtist.innerText.length === 0
    )
      presenceData.state = "No artist / No album";

    presenceData.smallImageKey = playback ? "play" : "pause";

    presenceData.smallImageText = playback
      ? (await strings).play
      : (await strings).pause;

    presenceData.startTimestamp = startTimestamp;

    presenceData.endTimestamp = endTimestamp;

    if (playback === false) {
      delete presenceData.startTimestamp;

      delete presenceData.endTimestamp;
    }
  } else {
    presenceData.details = "No music playing.";

    presenceData.state = `Logged in user: ${currentUser.innerText}`;
  }

  presence.setActivity(presenceData);
});
