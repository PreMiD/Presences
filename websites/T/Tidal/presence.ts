const presence = new Presence({
    clientId: "707985888814039040"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
  });

function getAuthorString(): string {
  const authors = document.querySelectorAll(
    "#wimp > div > div > div > div.footerPlayer--2d1-L > div.bottomRow--25xS1 > div.leftColumn--5B2JF > div.dragItem--3WWiC > div.mediaInformation--1dAUh > div.mediaArtists--3UIyd > a"
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
      "#wimp > div > div > div > div.footerPlayer--2d1-L > div.bottomRow--25xS1 > div.leftColumn--5B2JF > div.dragItem--3WWiC > div.mediaInformation--1dAUh > div.mediaArtists--3UIyd > a"
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
      "#wimp > div > div > div > div.footerPlayer--2d1-L > div.bottomRow--25xS1 > div.leftColumn--5B2JF > div.dragItem--3WWiC > div.mediaInformation--1dAUh > span > a"
    ) as HTMLElement).innerText,
    current = (document.querySelector(
      "#wimp > div > div > div > div.footerPlayer--2d1-L > div.bottomRow--25xS1 > div.rightColumn--ZsskN > div:nth-child(2) > time.currentTime--2fCqA"
    ) as HTMLElement).innerText,
    fulltime = (document.querySelector(
      "#wimp > div > div > div > div.footerPlayer--2d1-L > div.bottomRow--25xS1 > div.rightColumn--ZsskN > div:nth-child(2) > time.duration--3f3-B"
    ) as HTMLElement).innerText,
    albumTitle = (document.querySelector(
      "#nowPlaying > div.scrollWrapper--3Is01 > div > div.leftColumn--27Pj1 > div:nth-child(6) > div > table > tbody > tr:nth-child(3) > td:nth-child(2) > a"
    ) as HTMLElement).innerText,
    playingbutton = (document.querySelector(
      "#wimp > div > div > div > div.footerPlayer--2d1-L > div.bottomRow--25xS1 > div.centerColumn--1MAnN > div > button.playback-controls__button--white-icon.playbackToggle--1eQO2"
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
