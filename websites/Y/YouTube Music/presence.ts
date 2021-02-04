const presence = new Presence({
    clientId: "463151177836658699"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
  });

function getAuthorString(): string {
  //* Get authors
  const authors = document.querySelectorAll(
    "span yt-formatted-string.ytmusic-player-bar a"
  ) as NodeListOf<HTMLAnchorElement>;
  let authorsArray: Array<HTMLAnchorElement>, authorString: string;

  //* Author tags more than one => YouTube Music Song listing with release year etc.
  if (authors.length > 1) {
    //* Convert to js array for .map function
    authorsArray = Array.from(authors);

    //* If song is from a channel and not a video
    if (
      document.querySelector(
        'span yt-formatted-string.ytmusic-player-bar a[href*="channel/"]'
      ) &&
      !document.querySelector("ytmusic-player-page[video-mode_]")
    ) {
      //* Get release year of song
      let year = document.querySelector(
        "span yt-formatted-string.ytmusic-player-bar"
      ).textContent;
      year = year.slice(year.length - 4, year.length);

      //* Build output string
      authorString = `${authorsArray
        .slice(0, authorsArray.length - 1)
        .map((a) => a.innerText)
        .join(", ")} - ${
        authorsArray[authorsArray.length - 1].innerText
      } (${year})`;
    }
    //* Else, the song is a user upload
    else {
      //* Build output string
      authorString = `${authorsArray
        .slice(0, authorsArray.length - 1)
        .map((a) => a.innerText)
        .join(", ")} - ${authorsArray[authorsArray.length - 1].innerText}`;
    }
  }
  //* If from default YouTube music return Uploader
  else
    authorString = (document.querySelector(
      "span yt-formatted-string.ytmusic-player-bar a"
    ) as HTMLAnchorElement)
      ? (document.querySelector(
          "span yt-formatted-string.ytmusic-player-bar a"
        ) as HTMLAnchorElement).innerText
      : (document.querySelector(
          "span yt-formatted-string.ytmusic-player-bar span:nth-child(1)"
        ) as HTMLAnchorElement).innerText;

  return authorString;
}

/**
 * Get Timestamps
 * @param {Number} videoTime Current video time seconds
 * @param {Number} videoDuration Video duration seconds
 */
function getTimestamps(
  videoTime: number,
  videoDuration: number
): Array<number> {
  const startTime = Date.now(),
    endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
  return [Math.floor(startTime / 1000), endTime];
}

presence.on("UpdateData", async () => {
  const title = (document.querySelector(
      ".ytmusic-player-bar.title"
    ) as HTMLElement).innerText,
    video = document.querySelector(".video-stream") as HTMLVideoElement,
    repeatMode = document
      .querySelector('ytmusic-player-bar[slot="player-bar"]')
      .getAttribute("repeat-Mode_");

  if (title !== "" && !isNaN(video.duration)) {
    const timestamps = getTimestamps(
        Math.floor(video.currentTime),
        Math.floor(video.duration)
      ),
      presenceData: PresenceData = {
        details: title,
        state: getAuthorString(),
        largeImageKey: "ytm_lg",
        smallImageKey: video.paused
          ? "pause"
          : repeatMode == "ONE"
          ? "repeat-one"
          : repeatMode == "ALL"
          ? "repeat"
          : "play",
        smallImageText: video.paused
          ? (await strings).pause
          : repeatMode == "ONE"
          ? "On loop"
          : repeatMode == "ALL"
          ? "Playlist on loop"
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
