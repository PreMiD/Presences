const presence = new Presence({
    clientId: "608109837657702566"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
  });

function stripText(element: HTMLElement, id = "None", log = true) {
  if (element && element.firstChild) {
    return element.firstChild.textContent;
  } else {
    if (log)
      presence.info(
        "%cPandora%cERROR%c An error occurred while stripping data off the page. Please contact Alanexei on the PreMiD Discord server, and send him a screenshot of this error. ID: " +
          id
      );
    return null;
  }
}

let state;

presence.on("UpdateData", async () => {
  let title: HTMLElement,
    artist: HTMLElement,
    smallImageKey,
    smallImageText,
    audioTime,
    audioDuration,
    details,
    timestamps,
    status,
    audioElement: HTMLAudioElement = document.querySelector("audio:last-child");
  audioElement === null
    ? (audioElement = document.querySelector("audio"))
    : null;

  const audioBar: HTMLElement = document.querySelector(
    ".Tuner__Audio__NowPlayingHitArea"
  );

  audioElement && audioBar ? (state = "music") : (state = null);

  switch (state) {
    case "music":
      title = document.querySelector(".Tuner__Audio__TrackDetail__title");
      artist = document.querySelector(".Tuner__Audio__TrackDetail__artist");

      if (title === null && artist === null) {
        return;
      } else {
        details = stripText(title, "Title");
        status = stripText(artist, "Title");
      }

      smallImageKey = "play";
      smallImageText = (await strings).play;
      timestamps = presence.getTimestamps(
        Math.floor(audioElement.currentTime),
        Math.floor(audioElement.duration)
      );
      audioTime = timestamps[0];
      audioDuration = timestamps[1];
      break;

    default:
      details = "Browsing...";
      break;
  }

  const data: PresenceData = {
    details: details,
    state: status,
    largeImageKey: "pandora",
    smallImageKey: smallImageKey,
    smallImageText: smallImageText,
    startTimestamp: audioTime,
    endTimestamp: audioDuration
  };

  if (state && audioElement && audioElement.paused) {
    delete data.startTimestamp;
    delete data.endTimestamp;
    data.smallImageKey = "pause";
    data.smallImageText = (await strings).pause;
  }

  presence.setActivity(data, audioElement ? !audioElement.paused : true);
});
