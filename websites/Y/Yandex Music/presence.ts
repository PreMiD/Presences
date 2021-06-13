const presence = new Presence({
    clientId: "745261937092198532"
  }),
  strings = presence.getStrings({
    playing: "presence.playback.playing",
    pause: "presence.playback.paused"
  });

let presenceData: PresenceData;

function getMillisecondsFromString(timeString: string): number {
  const parsedText = timeString.split(":");
  return (Number(parsedText[0]) * 60 + Number(parsedText[1])) * 1000;
}

function isPodcast(): boolean {
  return document.getElementsByClassName("track__podcast")[0] !== undefined;
}

const getData = async (): Promise<void> => {
  const title = (
      document.getElementsByClassName("track__title")[0] as HTMLElement
    ).innerText,
    progress = (
      document.getElementsByClassName("progress__left")[0] as HTMLElement
    ).innerText,
    trackLength = (
      document.getElementsByClassName("progress__right")[0] as HTMLElement
    ).innerText,
    startedAt = Date.now() - getMillisecondsFromString(progress),
    endAt = startedAt + getMillisecondsFromString(trackLength),
    playing =
      document.getElementsByClassName("player-controls__btn_pause").length == 2;

  let artists;
  if (isPodcast()) {
    artists = (
      document.getElementsByClassName("track__podcast")[0] as HTMLElement
    ).innerText;
  } else {
    artists = (
      document.getElementsByClassName("track__artists")[0] as HTMLElement
    ).innerText;
  }

  presenceData = {
    largeImageKey: "og-image",
    smallImageKey: playing ? "play" : "pause",
    smallImageText: playing ? (await strings).playing : (await strings).pause,
    details: title,
    state: artists,
    startTimestamp: startedAt,
    endTimestamp: endAt
  };

  if (!playing) {
    delete presenceData.startTimestamp;
    delete presenceData.endTimestamp;
  }
};

setInterval(getData, 1000);

presence.on("UpdateData", () => {
  const title = document.getElementsByClassName("track__title");

  if (title.length != 0) {
    presence.setActivity(presenceData);
  } else {
    presence.setTrayTitle();
    presence.setActivity();
  }
});
