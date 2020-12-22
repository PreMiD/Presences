const presence = new Presence({
    clientId: "707985888814039040"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
  });

function getAuthorString(): string {
  const authors = document.querySelectorAll(
    "#footerPlayer > div.leftColumn--yVbBY > div.dragItem--3i9Xz > div.css-124sz32.mediaInformation--1QcQT > div.mediaArtists--2pRii > a"
  ) as NodeListOf<HTMLAnchorElement>;
  let authorsArray: Array<HTMLAnchorElement>, authorString: string;

  //* Author tags more than one =>
  if (authors.length > 1) {
    //* Convert to js array for .map function
    authorsArray = Array.from(authors);

    //* Build output string
    authorString = `${authorsArray
      .slice(0, authorsArray.length)
      .map((a) => a.innerText)
      .join(", ")}`;
  } else
    authorString = (document.querySelector(
      "#footerPlayer > div.leftColumn--yVbBY > div.dragItem--3i9Xz > div.css-124sz32.mediaInformation--1QcQT > div.mediaArtists--2pRii > a"
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
      "#footerPlayer > div.leftColumn--yVbBY > div.dragItem--3i9Xz > div.css-124sz32.mediaInformation--1QcQT > span > a"
    ) as HTMLElement).innerText,
    current = (document.querySelector(
      "#footerPlayer > div.rightColumn--2vWPK > div:nth-child(2) > time.currentTime--3UDrQ"
    ) as HTMLElement).innerText,
    fulltime = (document.querySelector(
      "#footerPlayer > div.rightColumn--2vWPK > div:nth-child(2) > time.duration--21kXU"
    ) as HTMLElement).innerText,
    albumTitle = (document.querySelector(
      "#nowPlaying > div.scrollWrapper--2Hy7_ > div > div.leftColumn--3OQ30 > div:nth-child(6) > div > table > tbody > tr:nth-child(3) > td:nth-child(2) > a"
    ) as HTMLElement).innerText,
    playingbutton = (document.querySelector(
      "#footerPlayer > div.centerColumn--3fkzm > div > button.playback-controls__button--white-icon.playbackToggle--3B2S9"
    ) as HTMLElement).getAttribute("data-type");

  if (title !== "" && current) {
    const a = current.replace(":", " ").split(" ").slice(0),
      b = fulltime.replace(":", " ").split(" ").slice(0),
      a1 = Number(a[0]),
      a2 = Number(a[1]),
      b1 = Number(b[0]),
      b2 = Number(b[1]),
      videoCurrent = a1 * 60 + a2,
      videoFull = b1 * 60 + b2,
      timestamps = getTimestamps(
        Math.floor(videoCurrent),
        Math.floor(videoFull)
      ),
      presenceData: PresenceData = {
        details: albumTitle ? `${title} (Album: ${albumTitle})` : title,
        state: getAuthorString(),
        largeImageKey: "tidal-logo",
        smallImageKey: "play",
        smallImageText: (await strings).play,
        startTimestamp: timestamps[0],
        endTimestamp: timestamps[1]
      };

    if (playingbutton === "button__pause") {
      delete presenceData.startTimestamp;
      delete presenceData.endTimestamp;
      presenceData.smallImageKey = "pause";
      presenceData.smallImageText = (await strings).pause;
      presence.setTrayTitle();
    } else presence.setTrayTitle(title);

    presence.setActivity(presenceData);
  } else presence.setActivity();
});
