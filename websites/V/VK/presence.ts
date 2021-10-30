const presence = new Presence({
    clientId: "514771696134389760"
  }),
  localeStrings: { [stringPath: string]: Record<string, string> } = {
    en: {
      Chatting: "Browsing PM's...",
      Watching: "Watching",
      Browsing: "Browsing",
      BrowsingFeed: "Browsing feed..."
    },
    ru: {
      Chatting: "Смотрит сообщения...",
      Watching: "Смотрит",
      Browsing: "Просматривает",
      BrowsingFeed: "Смотрит ленту..."
    }
  };
let isPlaying: boolean, timestamps;

function getLocale(): string {
  return window.navigator.language.replace("-", "_").toLowerCase();
}

function getLocalizedString(stringPath: string): string {
  if (localeStrings[getLocale()] && localeStrings[getLocale()][stringPath])
    return localeStrings[getLocale()][stringPath];
  else {
    presence.info(`Language for [${stringPath}] was not found!`);
    return localeStrings.en[stringPath];
  }
}

function getVKTrackTimeLeft(): string[] {
  const playerDuration = document.querySelector(
    ".audio_page_player_duration"
  ) as HTMLElement;

  let timeLeft;

  if (playerDuration.innerText.startsWith("-"))
    timeLeft = playerDuration.innerText;
  else {
    playerDuration.click();
    timeLeft = playerDuration.innerText;
    playerDuration.click();
  }

  //* Removing the `-` symbol.
  timeLeft = timeLeft.slice(1);

  return timeLeft.split(":");
}

function getVKTrackTimePassed(): string[] {
  const playerDuration = document.querySelector(
    ".audio_page_player_duration"
  ) as HTMLElement;

  let timePassed;

  if (!playerDuration.innerText.startsWith("-"))
    timePassed = playerDuration.innerText;
  else {
    playerDuration.click();
    timePassed = playerDuration.innerText;
    playerDuration.click();
  }

  return timePassed.split(":");
}

//* Returns VK track length.
function getVKTrackLength(): number[] {
  let overallTime;

  const timeLeft = getVKTrackTimeLeft(),
    timePassed = getVKTrackTimePassed();

  //* Summing minutes and seconds from time passed and left.
  overallTime = [
    Number(timePassed[0]) + Number(timeLeft[0]),
    Number(timePassed[1]) + Number(timeLeft[1])
  ];

  //* Checking if overall time have more than 60 seconds and adding 1 minute if it does.
  if (Number(overallTime[1]) > 60) {
    const t1 = overallTime[0] + 1,
      t2 = overallTime[1] - 60;

    overallTime = [t1, t2];
  }

  return overallTime;
}

let browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
      largeImageKey: "vk_logo"
    },
    gstrings = await presence.getStrings({
      play: "presence.playback.playing",
      pause: "presence.playback.paused"
    });

  if (
    document.location.pathname.startsWith("/audios") ||
    document.querySelector(".audio_layer_container")
  ) {
    const title: string = (
        document.querySelector(".audio_page_player_title_song") as HTMLElement
      ).textContent,
      author: string = (
        document.querySelector(
          ".audio_page_player_title_performer a"
        ) as HTMLElement
      ).textContent;

    if (document.querySelector(".audio_playing") === null) isPlaying = true;
    else isPlaying = false;

    timestamps = presence.getTimestamps(
      Math.floor(
        Number(getVKTrackTimePassed()[0]) * 60 +
          Number(getVKTrackTimePassed()[1])
      ),
      Math.floor(
        Number(getVKTrackLength()[0]) * 60 + Number(getVKTrackLength()[1])
      )
    );

    presenceData.details = title;
    presenceData.state = author;
    presenceData.smallImageKey = isPlaying ? "pause" : "play";
    presenceData.smallImageText = isPlaying ? gstrings.pause : gstrings.play;
    presenceData.startTimestamp = isPlaying ? null : timestamps[0];
    presenceData.endTimestamp = isPlaying ? null : timestamps[1];

    presence.setActivity(presenceData, true);
  } else if (window.location.href.match(/https:\/\/vk.com\/.*?z=video.*/)) {
    document.querySelector(".videoplayer_ui").getAttribute("data-state") ===
    "paused"
      ? (isPlaying = true)
      : (isPlaying = false);

    const videoTitle = (document.querySelector(".mv_title") as HTMLElement)
        .innerText,
      videoCurrentTime = (
        document.querySelector("._time_current") as HTMLElement
      ).innerText.split(":"),
      videoDuration = (
        document.querySelector("._time_duration") as HTMLElement
      ).innerText.split(":"),
      videoAuthor = (document.querySelector(".mv_author_name a") as HTMLElement)
        .innerText;

    timestamps = presence.getTimestamps(
      Math.floor(
        Number(videoCurrentTime[0]) * 60 + Number(videoCurrentTime[1])
      ),
      Math.floor(Number(videoDuration[0]) * 60 + Number(videoDuration[1]))
    );

    presenceData.details = `${getLocalizedString("Watching")} ${videoTitle}`;
    presenceData.state = videoAuthor;
    presenceData.smallImageKey = isPlaying ? "pause" : "play";
    presenceData.smallImageText = isPlaying ? gstrings.pause : gstrings.play;
    presenceData.startTimestamp = isPlaying ? null : timestamps[0];
    presenceData.endTimestamp = isPlaying ? null : timestamps[1];

    presence.setActivity(presenceData, true);
  } else if (document.querySelector(".page_name") !== null) {
    const pageTitle = (document.querySelector(".page_name") as HTMLElement)
      .innerText;

    presenceData.details = pageTitle;
    presenceData.startTimestamp = browsingTimestamp;

    presence.setActivity(presenceData, true);
  } else if (document.location.pathname.startsWith("/feed")) {
    presenceData.details = getLocalizedString("BrowsingFeed");
    presenceData.startTimestamp = browsingTimestamp;

    presence.setActivity(presenceData, true);
  } else if (document.location.pathname.startsWith("/im")) {
    presenceData.details = getLocalizedString("Chatting");
    presenceData.startTimestamp = browsingTimestamp;

    presence.setActivity(presenceData, true);
  } else {
    browsingTimestamp = Math.floor(Date.now() / 1000);
    presence.clearActivity();
  }
});
