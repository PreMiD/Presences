const presence = new Presence({
  clientId: "901591802342150174"
});

async function getStrings() {
  return presence.getStrings(
    {
      play: "general.playing",
      pause: "general.paused",
      viewSong: "general.buttonViewSong"
    },
    await presence.getSetting<string>("lang").catch(() => "en")
  );
}

let strings: Awaited<ReturnType<typeof getStrings>>,
  oldLang: string = null;

presence.on("UpdateData", async () => {
  if (!document.querySelector("#footerPlayer"))
    return presence.setActivity({ largeImageKey: "logo" });

  const newLang = await presence.getSetting<string>("lang").catch(() => "en");

  if (oldLang !== newLang || !strings) {
    oldLang = newLang;
    strings = await getStrings();
  }

  const presenceData: PresenceData = {
      largeImageKey: "logo"
    },
    songTitle = document.querySelector<HTMLAnchorElement>(
      'div[data-test="footer-track-title"] > a'
    ),
    currentTime = document
      .querySelector<HTMLElement>("time.current-time")
      .textContent.split(":"),
    endTime = document
      .querySelector<HTMLElement>("time.duration-time")
      .textContent.split(":"),
    currentTimeSec =
      (parseFloat(currentTime[0]) * 60 + parseFloat(currentTime[1])) * 1000,
    paused =
      document
        .querySelector('div[data-test="play-controls"] div > button')
        .getAttribute("data-test") === "play",
    repeatType = document
      .querySelector(
        'div[data-test="play-controls"] > button[data-test="repeat"]'
      )
      .getAttribute("aria-label");

  presenceData.details = songTitle.textContent;
  presenceData.state = document.querySelector(
    'div[data-test="left-column-footer-player"] > div:nth-child(2) > div:nth-child(2) > span > span > span'
  ).textContent;

  if (currentTimeSec > 0 || !paused) {
    presenceData.endTimestamp =
      Date.now() +
      ((parseFloat(endTime[0]) * 60 + parseFloat(endTime[1]) + 1) * 1000 -
        currentTimeSec);
    presenceData.smallImageKey = paused ? "pause" : "play";
    presenceData.smallImageText = paused
      ? (await strings).pause
      : (await strings).play;
  }

  if (
    document
      .querySelector(
        'div[data-test="play-controls"] > button[data-test="repeat"]'
      )
      .getAttribute("aria-checked") === "true"
  ) {
    presenceData.smallImageKey =
      repeatType === "Repeat" ? "repeat" : "repeat-one";
    presenceData.smallImageText =
      repeatType === "Repeat" ? "Playlist on loop" : "On loop";

    delete presenceData.endTimestamp;
  }

  presenceData.buttons = [
    {
      label: (await strings).viewSong,
      url: songTitle.href
    }
  ];

  presence.setActivity(presenceData);
});
