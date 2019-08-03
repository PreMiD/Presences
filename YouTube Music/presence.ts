var presence = new Presence({
    clientId: "463151177836658699",
    mediaKeys: true
  }),
  strings: any = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
  });

presence.on("MediaKeys", (key: string) => {
  switch (key) {
    case "pause": {
      var video = document.querySelector(".video-stream") as HTMLVideoElement;

      video.paused ? video.play() : video.pause();
      break;
    }
    case "nextTrack":
      (document.querySelector(".next-button") as HTMLAnchorElement).click();
      break;
    case "previousTrack":
      (document.querySelector(".previous-button") as HTMLAnchorElement).click();
      break;
  }
});

presence.on("UpdateData", async () => {
  var title = (document.querySelector(
      ".ytmusic-player-bar.title"
    ) as HTMLElement).innerText,
    video = document.querySelector(".video-stream") as HTMLVideoElement;

  if (title !== "" && !isNaN(video.duration)) {
    var timestamps = getTimestamps(
        Math.floor(video.currentTime),
        Math.floor(video.duration)
      ),
      presenceData: presenceData = {
        details: title,
        state: getAuthorString(),
        largeImageKey: "ytm_lg",
        smallImageKey: video.paused ? "pause" : "play",
        smallImageText: video.paused
          ? (await strings).pause
          : (await strings).play,
        startTimestamp: timestamps[0],
        endTimestamp: timestamps[1]
      };

    if (video.paused) {
      delete presenceData.startTimestamp;
      delete presenceData.endTimestamp;
      presence.setTrayTitle();
    } else presence.setTrayTitle(title);

    presence.setActivity(presenceData);
  } else presence.setActivity();
});

function getAuthorString() {
  //* Get authors
  var authors = document.querySelectorAll(
      "span yt-formatted-string.ytmusic-player-bar a"
    ) as NodeListOf<HTMLAnchorElement>,
    authorsArray: Array<HTMLAnchorElement>,
    authorString: string;

  //* Author tags more than one => YouTube Music Song listing with release year etc.
  if (authors.length > 1) {
    //* Get release year of song
    var year = document.querySelector(
      "span yt-formatted-string.ytmusic-player-bar "
    ).textContent;
    year = year.slice(year.length - 4, year.length);

    //* Convert to js array for .map function
    authorsArray = Array.from(authors);

    //* Build output string
    authorString = `${authorsArray
      .slice(0, authorsArray.length - 1)
      .map(a => a.innerText)
      .join(", ")} - ${
      authorsArray[authorsArray.length - 1].innerText
    } (${year})`;
  }
  //* If from default YouTube music return Uploader
  else
    authorString = (document.querySelector(
      "span yt-formatted-string.ytmusic-player-bar"
    ) as HTMLAnchorElement).innerText;

  return authorString;
}

/**
 * Get Timestamps
 * @param {Number} videoTime Current video time seconds
 * @param {Number} videoDuration Video duration seconds
 */
function getTimestamps(videoTime: number, videoDuration: number) {
  var startTime = Date.now();
  var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
  return [Math.floor(startTime / 1000), endTime];
}
