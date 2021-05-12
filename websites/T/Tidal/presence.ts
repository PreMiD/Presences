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
  SongQuality = (quality: string): string => {
    switch (quality) {
      case "LOSSLESS":
        return "Hi-Fi";
      case "HIGH":
        return "High";
      case "LOW":
        return "Normal";
      default:
        return "Unknown";
    }
  },
  getAuthorString = (): string => {
    let authorsArray: Array<HTMLAnchorElement>, authorString: string;
    const authors: NodeListOf<HTMLAnchorElement> = document.querySelectorAll(
      "#footerPlayer > div.css-pk7civ > div.css-1g3qvkb > div.css-14o5h2y > span > span > a"
    );

    if (authors.length > 1) {
      authorsArray = Array.from(authors);

      authorString = `${authorsArray
        .slice(0, authorsArray.length)
        .map((a) => a.innerText)
        .join(", ")}`;
    } else
      authorString = document.querySelector<HTMLAnchorElement>(
        "#footerPlayer > div.css-pk7civ > div.css-1g3qvkb > div.css-14o5h2y > span > span > a"
      ).innerText;

    return authorString;
  };

let strings: Promise<langStrings> = getLanguages(),
  oldLang: string = null;

presence.on("UpdateData", async () => {
  const newLang = await presence.getSetting("language"),
    privacy = await presence.getSetting("privacy"),
    showSongQuality = await presence.getSetting("showQuality"),
    songTitle: string | null = document.querySelector<HTMLElement>(
      "#footerPlayer > div.css-pk7civ > div.css-1g3qvkb > div.css-vvwwhy > a > span"
    )
      ? document.querySelector<HTMLElement>(
          "#footerPlayer > div.css-pk7civ > div.css-1g3qvkb > div.css-vvwwhy > a > span"
        ).textContent
      : null,
    songCurrentTime: string | null = document.querySelector<HTMLElement>(
      "#footerPlayer > div.css-1mzzcqg > div.css-1er6xdl > span > div > div.css-vyfuyi > time.current-time.css-19xy0fs"
    )
      ? document.querySelector<HTMLElement>(
          "#footerPlayer > div.css-1mzzcqg > div.css-1er6xdl > span > div > div.css-vyfuyi > time.current-time.css-19xy0fs"
        ).textContent
      : null,
    videoTitle: string | null = document.querySelector<HTMLElement>(
      "#footerPlayer > div.css-pk7civ > div.css-1g3qvkb > div.css-vvwwhy > span"
    )
      ? document.querySelector<HTMLElement>(
          "#footerPlayer > div.css-pk7civ > div.css-1g3qvkb > div.css-vvwwhy > span"
        ).textContent
      : null,
    videoCurrentTime: string | null = document.querySelector<HTMLElement>(
      "#footerPlayer > div.css-1mzzcqg > div.css-1er6xdl > span > div > div.css-vyfuyi > time.current-time.css-19xy0fs"
    )
      ? document.querySelector<HTMLElement>(
          "#footerPlayer > div.css-1mzzcqg > div.css-1er6xdl > span > div > div.css-vyfuyi > time.current-time.css-19xy0fs"
        ).textContent
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

  if (!(songTitle || videoTitle) && !(songCurrentTime || videoCurrentTime)) {
    presenceData.details = (await strings).browsing;
    presenceData.smallImageKey = "browsing";
    presenceData.startTimestamp = Math.floor(Date.now() / 1000);
    presence.setTrayTitle();
    presence.setActivity(presenceData);
    return;
  }

  if (privacy) {
    presenceData.details = (await strings).listening;
    presenceData.startTimestamp = Math.floor(Date.now() / 1000);
    presence.setTrayTitle();
    presence.setActivity(presenceData);
    return;
  }

  if (songTitle && songCurrentTime) {
    const songEndTime: string | null = document.querySelector<HTMLElement>(
        "#footerPlayer > div.css-1mzzcqg > div.css-1er6xdl > span > div > div.css-119caa0 > time.duration-time.css-p7n8gi"
      ).textContent,
      songCurrentTimestamp: Array<number> = songCurrentTime
        .split(":")
        .map(Number),
      songEndTimestamp: Array<number> = songEndTime.split(":").map(Number),
      playingButton: string = document
        .querySelector<HTMLElement>(
          "#footerPlayer > div.css-1mzzcqg > div.css-ict1qq > div > button"
        )
        .getAttribute("data-type"),
      repeatOn: string = document
        .querySelector<HTMLElement>(
          "#footerPlayer > div.css-1mzzcqg > div.css-ict1qq > button:nth-child(5)"
        )
        .getAttribute("data-type"),
      songTimestamps: Array<number> = presence.getTimestamps(
        Math.floor(songCurrentTimestamp[0] * 60 + songCurrentTimestamp[1]),
        Math.floor(songEndTimestamp[0] * 60 + songEndTimestamp[1])
      ),
      songQuality: string = document
        .querySelector<HTMLElement>(
          "#footerPlayer > div.css-ydx5c7 > button.css-1pnqyx0"
        )
        .getAttribute("data-test-streaming-quality"),
      dataState = showSongQuality
        ? `${songTitle} (${SongQuality(songQuality)})`
        : songTitle;

    presenceData.details = dataState;
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
        presenceData.endTimestamp = songTimestamps[1];
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
    const videoEndTime: string = document.querySelector<HTMLElement>(
        "#footerPlayer > div.css-1mzzcqg > div.css-1er6xdl > span > div > div.css-119caa0 > time.duration-time.css-p7n8gi"
      ).textContent,
      videoCurrentTimestamp: Array<number> = videoCurrentTime
        .split(":")
        .map(Number),
      videoEndTimestamp: Array<number> = videoEndTime.split(":").map(Number),
      playingButton: string = document
        .querySelector<HTMLElement>(
          "#footerPlayer > div.css-1mzzcqg > div.css-ict1qq > div > button"
        )
        .getAttribute("data-type"),
      repeatOn: string = document
        .querySelector<HTMLElement>(
          "#footerPlayer > div.css-1mzzcqg > div.css-ict1qq > button:nth-child(6)"
        )
        .getAttribute("data-type"),
      videoTimestamps: Array<number> = presence.getTimestamps(
        Math.floor(videoCurrentTimestamp[0] * 60 + videoCurrentTimestamp[1]),
        Math.floor(videoEndTimestamp[0] * 60 + videoEndTimestamp[1])
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
        presenceData.endTimestamp = videoTimestamps[1];
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

  if (!presenceData.details) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
