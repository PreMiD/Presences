const presence = new Presence({
    clientId: "842112189618978897"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
  });

function getTime(list: string[]): number {
  let ret = 0;
  for (let index = list.length - 1; index >= 0; index--)
    ret += parseInt(list[index]) * 60 ** index;

  return ret;
}

function getTimestamps(audioDuration: string): number[] {
  return [
    Math.floor(Date.now() / 1000),
    Math.floor(Date.now() / 1000) + getTime(audioDuration.split(":").reverse())
  ];
}

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "applemusic-logo"
  };

  if (
    !document.querySelector(
      "div.web-chrome-playback-lcd__playback-description.playback-description-not-loaded"
    )
  ) {
    const audioTime = document.querySelector(
        ".web-chrome-playback-lcd__time-end"
      )?.textContent,
      paused = document.querySelector(
        ".web-chrome-playback-controls__playback-btn[aria-label='Play']"
      ),
      artwork = document
        .querySelector(
          ".media-artwork-v2:not(.media-artwork-v2--profile-badge) > picture > source"
        )
        ?.getAttribute("srcset")
        .split(" ")[0]
        .replace("44x44bb", "1024x1024bb");

    presenceData.details = document
      .querySelector(
        ".web-chrome-playback-lcd__song-name-scroll-inner-text-wrapper"
      )
      ?.textContent.trim();
    presenceData.state =
      document
        .querySelector(
          ".web-chrome-playback-lcd__sub-copy-scroll-inner-text-wrapper"
        )
        ?.textContent.split("—")[0] ??
      document.querySelector(
        ".ember-view.web-chrome-playback-lcd__sub-copy-scroll-link"
      )?.textContent;
    presenceData.smallImageKey = paused ? "pause" : "play";
    presenceData.smallImageText = paused
      ? (await strings).pause
      : (await strings).play;
    presenceData.largeImageKey = artwork ?? "applemusic-logo";
    if (audioTime) {
      [presenceData.startTimestamp, presenceData.endTimestamp] =
        getTimestamps(audioTime);
    }

    if (paused) {
      delete presenceData.startTimestamp;
      delete presenceData.endTimestamp;
    }

    if (!presenceData.details) presence.clearActivity();
    else presence.setActivity(presenceData);
  } else presence.clearActivity();
});
