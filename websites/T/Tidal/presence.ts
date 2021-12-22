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
    await presence.getSetting("lang").catch(() => "en")
  );
}

let strings = getStrings(),
  oldLang: string = null;

presence.on("UpdateData", async () => {
  if (!document.querySelector("#footerPlayer"))
    return presence.setActivity({ largeImageKey: "logo" });

  const newLang = await presence.getSetting("lang").catch(() => "en");
  oldLang ??= newLang;
  if (oldLang !== newLang) {
    oldLang = newLang;
    strings = getStrings();
  }

  const presenceData: PresenceData = {
      largeImageKey: "logo"
    },
    songTitle = document.querySelector(
      'div[data-test="footer-track-title"] > a'
    ) as HTMLAnchorElement,
    songArtist = document.querySelector(
      'div[data-test="left-column-footer-player"] > div:nth-child(2) > div:nth-child(2) > span > span > span'
    ),
    currentTime = (
      document.querySelector("time.current-time") as HTMLElement
    ).innerText.split(":"),
    endTime = (
      document.querySelector("time.duration-time") as HTMLElement
    ).innerText.split(":"),
    currentTimeSec =
      (parseFloat(currentTime[0]) * 60 + parseFloat(currentTime[1])) * 1000,
    endTimeSec =
      (parseFloat(endTime[0]) * 60 + parseFloat(endTime[1]) + 1) * 1000,
    endTimestamp = Date.now() + (endTimeSec - currentTimeSec),
    paused =
      document
        .querySelector('div[data-test="play-controls"] div > button')
        .getAttribute("data-test") === "play",
    onRepeat = document
      .querySelector(
        'div[data-test="play-controls"] > button[data-test="repeat"]'
      )
      .getAttribute("aria-checked"),
    repeatType = document
      .querySelector(
        'div[data-test="play-controls"] > button[data-test="repeat"]'
      )
      .getAttribute("aria-label");

  presenceData.details = songTitle.innerText;
  presenceData.state = songArtist.textContent;

  if (currentTimeSec > 0 || !paused) {
    presenceData.endTimestamp = endTimestamp;
    presenceData.smallImageKey = paused ? "pause" : "play";
    presenceData.smallImageText = paused
      ? (await strings).pause
      : (await strings).play;
  }

  if (onRepeat === "true") {
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
