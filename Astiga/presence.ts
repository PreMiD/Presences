const presence = new Presence({
  clientId: "612746548631044116",
  mediaKeys: false
});
const startTimestamp = Math.floor(Date.now() / 1000);
const stringsPromise = presence.getStrings({
  play: "presence.playback.playing",
  pause: "presence.playback.paused"
});

presence.on("UpdateData", async () => {
  const presenceData: presenceData = {
    largeImageKey: "lg"
  };

  const musicTitleElement: HTMLDivElement = document.querySelector(
    "#jp_container_1 > div.wrapper > footer > div.jp-controls > div.btn-music-container > div:nth-child(1) > div.song-title.overflow"
  );
  const musicTitle = musicTitleElement.innerText;

  const currentArtistElement: HTMLAnchorElement = document.querySelector(
    "#jp_container_1 > div.wrapper > footer > div.jp-controls > div.btn-music-container > div:nth-child(1) > div:nth-child(2) > a.song-artist.menu-item"
  );
  let currentArtist = currentArtistElement.innerText;
  if (currentArtist.length === 0) {
    currentArtist = "No artist";
  }

  const albumNameElement: HTMLAnchorElement = document.querySelector(
    "footer > div.jp-controls > div.btn-music-container > div:nth-child(1) > div:nth-child(2) > a.song-album.menu-item"
  );
  let albumName = albumNameElement.innerText;
  if (albumName.length === 0) {
    albumName = "No album";
  }

  if (musicTitle.length > 1) {
    const play: HTMLAnchorElement = document.querySelector(
      "footer > div.jp-controls > div.btn-music-container > div:nth-child(2) > a.jp-play.btn.btn-music.btn-sm"
    );

    const currentTimeElement: HTMLSpanElement = document.querySelector(
      "#jp_container_1 > div.wrapper > footer > div.jp-controls > div.btn-music-container > div.hidden-xs > span.jp-current-time"
    );
    const currentTime = getSeconds(currentTimeElement.innerText);

    const durationElement: HTMLSpanElement = document.querySelector(
      "#jp_container_1 > div.wrapper > footer > div.jp-controls > div.btn-music-container > div.hidden-xs > span.jp-duration"
    );
    const duration = getSeconds(durationElement.innerText);

    const playback = !(!play.style.display || currentTime == 0);
    const timestamps = getTimestamps(currentTime, duration);
    const strings = await stringsPromise;

    if (!playback) {
      presenceData.startTimestamp = timestamps[0];
      presenceData.endTimestamp = timestamps[1];
    }
    presenceData.details = "Song: " + musicTitle;
    presenceData.smallImageKey = playback ? "play" : "pause";
    presenceData.smallImageText = strings[playback ? "play" : "pause"];
    presenceData.state = `${currentArtist} / ${albumName}`;
  } else {
    const currentUserElement: HTMLParagraphElement = document.querySelector(
      "#jp_container_1 > div.wrapper > aside.main-sidebar > section > div > div.pull-left.info > p"
    );

    presenceData.details = "No music playing.";
    presenceData.state = `Logged in user: ${
      currentUserElement === null ? "unknown" : currentUserElement.innerText
    }`;
  }

  presence.setActivity(presenceData, true);
});

/**
 * Get Timestamps
 * @param {Number} videoTime Current video time seconds
 * @param {Number} videoDuration Video duration seconds
 */
function getTimestamps(videoTime: number, videoDuration: number) {
  const startTime = Date.now();
  const endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
  return [Math.floor(startTime / 1000), endTime];
}

function getSeconds(string: string) {
  const [minutesStr, secondsStr] = string.split(":");
  return Math.floor(Number(minutesStr) * 60) + Number(secondsStr);
}
