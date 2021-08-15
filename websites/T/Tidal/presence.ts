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
      await presence.getSetting("language").catch(() => "en")
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
        .map((a) => a.textContent)
        .join(", ")}`;
    } else {
      authorString = document.querySelector<HTMLAnchorElement>(
        "#footerPlayer > div.css-pk7civ > div.css-1g3qvkb > div.css-14o5h2y > span > span > a"
      ).textContent;
    }

    return authorString;
  };

let strings: Promise<langStrings> = getLanguages(),
  oldLang: string = null;

presence.on("UpdateData", async () => {
  const newLang = await presence.getSetting("language").catch(() => "en"),
    privacy = await presence.getSetting("privacy"),
    showSongQuality = await presence.getSetting("showQuality"),
    title: string | null = document.querySelector<HTMLElement>(
      "#footerPlayer > div.css-pk7civ > div.css-1g3qvkb > div.css-vvwwhy > a > span"
    )
      ? document.querySelector<HTMLElement>(
          "#footerPlayer > div.css-pk7civ > div.css-1g3qvkb > div.css-vvwwhy > a > span"
        ).textContent
      : document.querySelector<HTMLElement>(
          "#footerPlayer > div.css-pk7civ > div.css-1g3qvkb > div.css-vvwwhy > span"
        )
      ? document.querySelector<HTMLElement>(
          "#footerPlayer > div.css-pk7civ > div.css-1g3qvkb > div.css-vvwwhy > span"
        ).textContent
      : null,
    currentTime: string | null = document.querySelector<HTMLElement>(
      "#footerPlayer > div.css-1mzzcqg > div.css-1er6xdl > span > div > div.css-vyfuyi > time.current-time.css-uetom8"
    )
      ? document.querySelector<HTMLElement>(
          "#footerPlayer > div.css-1mzzcqg > div.css-1er6xdl > span > div > div.css-vyfuyi > time.current-time.css-uetom8"
        ).textContent
      : null,
    endTime: string | null = document.querySelector<HTMLElement>(
      "#footerPlayer > div.css-1mzzcqg > div.css-1er6xdl > span > div > div.css-119caa0 > time.duration-time.css-cco80g"
    )
      ? document.querySelector<HTMLElement>(
          "#footerPlayer > div.css-1mzzcqg > div.css-1er6xdl > span > div > div.css-119caa0 > time.duration-time.css-cco80g"
        ).textContent
      : null,
    videoButton: boolean | null = document.querySelector<HTMLButtonElement>(
      "#footerPlayer > div.css-ydx5c7 > button:nth-child(1)"
    )
      ? document
          .querySelector<HTMLButtonElement>(
            "#footerPlayer > div.css-ydx5c7 > button:nth-child(1)"
          )
          ?.getAttribute("aria-label") === "Video download quality (kb/s)"
        ? true
        : null
      : null,
    playingButton: string | null = document.querySelector<HTMLElement>(
      "#footerPlayer > div.css-1mzzcqg > div.css-ict1qq > div > button"
    )
      ? document
          .querySelector<HTMLElement>(
            "#footerPlayer > div.css-1mzzcqg > div.css-ict1qq > div > button"
          )
          ?.getAttribute("data-type")
      : null,
    repeatOn: string | null = document.querySelector<HTMLElement>(
      "#footerPlayer > div.css-1mzzcqg > div.css-ict1qq > button:nth-child(5)"
    )
      ? document
          .querySelector<HTMLElement>(
            "#footerPlayer > div.css-1mzzcqg > div.css-ict1qq > button:nth-child(5)"
          )
          ?.getAttribute("data-type")
      : null,
    presenceData: PresenceData = {
      largeImageKey: "logo"
    };

  if (!oldLang) oldLang = newLang;
  else if (oldLang !== newLang) {
    oldLang = newLang;
    strings = getLanguages();
  }

  if (!title && !currentTime) {
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

  if (title && currentTime && !videoButton) {
    const [songCurrentTimestamp, songSecondCurrentTimestamp]: Array<number> =
        currentTime.split(":").map(Number),
      [songEndTimestamp, songSecondEndTimestamp]: Array<number> = endTime
        .split(":")
        .map(Number),
      calculateCurrentTimestamp = songCurrentTimestamp * 60,
      calculateEndTimestamp = songEndTimestamp * 60,
      [, endTimestamp]: Array<number> = presence.getTimestamps(
        Math.floor(calculateCurrentTimestamp + songSecondCurrentTimestamp),
        Math.floor(calculateEndTimestamp + songSecondEndTimestamp)
      ),
      songQuality: string = document
        .querySelector<HTMLElement>(
          "#footerPlayer > div.css-ydx5c7 > button.css-1pnqyx0"
        )
        ?.getAttribute("data-test-streaming-quality");
    let dataState;
    if (songQuality) {
      dataState = showSongQuality
        ? `${title} (${SongQuality(songQuality)})`
        : title;
    }

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
        presenceData.endTimestamp = endTimestamp;
        presence.setTrayTitle(title);
        break;
      case "button__pause":
        presenceData.smallImageKey = "pause";
        presenceData.smallImageText = (await strings).pause;
        delete presenceData.endTimestamp;
        presence.setTrayTitle();
        break;
    }
  } else {
    const [videoCurrentTimestamp, videoSecondCurrentTimestamp]: Array<number> =
        currentTime.split(":").map(Number),
      [videoEndTimestamp, videoSecondEndTimestamp]: Array<number> = endTime
        .split(":")
        .map(Number),
      calculateCurrentTimestamp = videoCurrentTimestamp * 60,
      calculateEndTimestamp = videoEndTimestamp * 60,
      [, endTimestamp]: Array<number> = presence.getTimestamps(
        Math.floor(calculateCurrentTimestamp + videoSecondCurrentTimestamp),
        Math.floor(calculateEndTimestamp + videoSecondEndTimestamp)
      );

    presenceData.details = title;
    if (title) presenceData.state = getAuthorString();

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
        presenceData.endTimestamp = endTimestamp;
        presence.setTrayTitle(title);
        break;
      case "button__pause":
        presenceData.smallImageKey = "pause";
        presenceData.smallImageText = (await strings).pause;
        delete presenceData.endTimestamp;
        presence.setTrayTitle();
        break;
    }
  }

  presence.setActivity(presenceData);
});
