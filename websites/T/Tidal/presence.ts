const presence = new Presence({
  clientId: "793071505327652864"
});

interface langStrings {
  play: string;
  pause: string;
  browsing: string;
  listening: string;
  repeat: string;
  repeatAll: string;
}

const getLanguages = async () => {
    return presence.getStrings(
      {
        play: "general.playing",
        pause: "general.paused",
        browsing: "general.browsing",
        listening: "general.listeningMusic",
        repeat: "general.repeat",
        repeatAll: "general.repeatAll"
      },
      await presence.getSetting("language")
    );
  },
  getAuthorString = (): string => {
    let authorsArray: Array<HTMLAnchorElement>, authorString: string;
    const authors: NodeListOf<HTMLAnchorElement> = document.querySelectorAll(
      "#footerPlayer > div.leftColumn--yVbBY > div.dragItem--3i9Xz > div.css-124sz32.mediaInformation--1QcQT > div.mediaArtists--2pRii > a"
    );

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
  };

let strings: Promise<langStrings> = getLanguages(),
  oldLang: string = null;

presence.on("UpdateData", async () => {
  const newLang = await presence.getSetting("language"),
    privacy = await presence.getSetting("privacy"),
    songTitle: string | null = (document.querySelector(
      "#footerPlayer > div.leftColumn--yVbBY > div.dragItem--3i9Xz > div.css-124sz32.mediaInformation--1QcQT > span > a"
    ) as HTMLElement)
      ? (document.querySelector(
          "#footerPlayer > div.leftColumn--yVbBY > div.dragItem--3i9Xz > div.css-124sz32.mediaInformation--1QcQT > span > a"
        ) as HTMLElement).textContent
      : null,
    songCurrentTime: string | null = (document.querySelector(
      "#footerPlayer > div.rightColumn--2vWPK > div:nth-child(2) > time.css-ozow3x"
    ) as HTMLElement)
      ? (document.querySelector(
          "#footerPlayer > div.rightColumn--2vWPK > div:nth-child(2) > time.css-ozow3x"
        ) as HTMLElement).textContent
      : null,
    videoTitle: string | null = (document.querySelector(
      "#footerPlayer > div.leftColumn--yVbBY > div.dragItem--3i9Xz > div.css-124sz32.mediaInformation--1QcQT > span"
    ) as HTMLElement)
      ? (document.querySelector(
          "#footerPlayer > div.leftColumn--yVbBY > div.dragItem--3i9Xz > div.css-124sz32.mediaInformation--1QcQT > span"
        ) as HTMLElement).textContent
      : null,
    videoCurrentTime: string | null = (document.querySelector(
      "#footerPlayer > div.rightColumn--2vWPK > div:nth-child(1) > time.css-ozow3x"
    ) as HTMLElement)
      ? (document.querySelector(
          "#footerPlayer > div.rightColumn--2vWPK > div:nth-child(1) > time.css-ozow3x"
        ) as HTMLElement).textContent
      : null,
    presenceData: PresenceData = {
      largeImageKey: "logo"
    };

  if (!oldLang) {
    oldLang = newLang;
  } else if (oldLang !== newLang) {
    oldLang = newLang;
    strings = getLanguages();
  }

  if ((songTitle || videoTitle) && (songCurrentTime || videoCurrentTime)) {
    if (!privacy) {
      if (songTitle && songCurrentTime) {
        const songEndTime: string | null = (document.querySelector(
            "#footerPlayer > div.rightColumn--2vWPK > div:nth-child(2) > time.css-165d6xj"
          ) as HTMLElement).textContent,
          songCurrentTimestamp: Array<number> = songCurrentTime
            .split(":")
            .map(Number),
          songEndTimestamp: Array<number> = songEndTime.split(":").map(Number),
          playingButton: string = (document.querySelector(
            "#footerPlayer > div.centerColumn--3fkzm > div > button.playback-controls__button--white-icon.playbackToggle--3B2S9"
          ) as HTMLElement).getAttribute("data-type"),
          albumTitle: string | null = (document.querySelector(
            "#footerPlayer > div.leftColumn--yVbBY > div.dragItem--3i9Xz > div.css-124sz32.mediaInformation--1QcQT > div.container--20aEj.playingFrom--3H6Cu > a > span"
          ) as HTMLElement)
            ? (document.querySelector(
                "#footerPlayer > div.leftColumn--yVbBY > div.dragItem--3i9Xz > div.css-124sz32.mediaInformation--1QcQT > div.container--20aEj.playingFrom--3H6Cu > a > span"
              ) as HTMLElement).textContent
            : null,
          repeatOn: string = (document.querySelector(
            "#footerPlayer > div.centerColumn--3fkzm > div > button.repeatButton--ONfa5"
          ) as HTMLElement).getAttribute("data-type"),
          timestamps: Array<number> = presence.getTimestamps(
            ~~songCurrentTimestamp[0] * 60 + songCurrentTimestamp[1],
            ~~songEndTimestamp[0] * 60 + songEndTimestamp[1]
          );
        presenceData.details = songTitle + ` (${albumTitle ? albumTitle : ""})`;
        presenceData.state = getAuthorString();

        switch (playingButton) {
          case "button__play":
            presenceData.smallImageKey =
              repeatOn === "button__repeatAll"
                ? "repeat-all"
                : repeatOn === "button__repeatSingle"
                ? "repeat"
                : "play";
            presenceData.smallImageText =
              repeatOn === "button__repeatAll"
                ? (await strings).repeatAll
                : repeatOn === "button__repeatSingle"
                ? (await strings).repeat
                : (await strings).play;
            delete presenceData.endTimestamp;
            presenceData.endTimestamp = timestamps[1];
            presence.setTrayTitle(songTitle);
            break;
          case "button__pause":
            presenceData.smallImageKey = "pause";
            presenceData.smallImageText = (await strings).pause;
            delete presenceData.endTimestamp;
            presence.setTrayTitle();
            break;
        }
      } else if (videoTitle && videoCurrentTime) {
        const videoEndTime: string = (document.querySelector(
            "#footerPlayer > div.rightColumn--2vWPK > div:nth-child(1) > time.css-165d6xj"
          ) as HTMLElement).textContent,
          videoCurrentTimestamp: Array<number> = videoCurrentTime
            .split(":")
            .map(Number),
          videoEndTimestamp: Array<number> = videoEndTime
            .split(":")
            .map(Number),
          playingButton: string = (document.querySelector(
            "#footerPlayer > div.centerColumn--3fkzm > div > button.playback-controls__button--white-icon.playbackToggle--3B2S9"
          ) as HTMLElement).getAttribute("data-type"),
          repeatOn: string = (document.querySelector(
            "#nowPlaying > div.scrollWrapper--2Hy7_ > div > div.leftColumn--3OQ30 > div.row--3oQhD.rowMediaControls--2ERj6 > div:nth-child(2) > div > button.repeatButton--ONfa5"
          ) as HTMLElement).getAttribute("data-type"),
          timestamps: Array<number> = presence.getTimestamps(
            ~~videoCurrentTimestamp[0] * 60 + videoCurrentTimestamp[1],
            ~~videoEndTimestamp[0] * 60 + videoEndTimestamp[1]
          );
        presenceData.details = videoTitle;
        presenceData.state = getAuthorString();

        switch (playingButton) {
          case "button__play":
            presenceData.smallImageKey =
              repeatOn === "button__repeatAll"
                ? "repeat-all"
                : repeatOn === "button__repeatSingle"
                ? "repeat"
                : "play";
            presenceData.smallImageText =
              repeatOn === "button__repeatAll"
                ? (await strings).repeatAll
                : repeatOn === "button__repeatSingle"
                ? (await strings).repeat
                : (await strings).play;
            delete presenceData.endTimestamp;
            presenceData.endTimestamp = timestamps[1];
            presence.setTrayTitle(songTitle);
            break;
          case "button__pause":
            presenceData.smallImageKey = "pause";
            presenceData.smallImageText = (await strings).pause;
            delete presenceData.endTimestamp;
            presence.setTrayTitle();
            break;
        }
      }
    } else {
      presenceData.details = (await strings).listening;
      presenceData.startTimestamp = Date.now();
      presence.setTrayTitle();
    }
  } else {
    presenceData.details = (await strings).browsing;
    presenceData.startTimestamp = Date.now();
    presenceData.smallImageKey = "browsing";
    presence.setTrayTitle();
  }

  if (!presenceData.details) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
