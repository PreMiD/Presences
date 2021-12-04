const presence = new Presence({ clientId: "916438450952097834" }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused",
    browsing: "general.browsing"
  });

function getEpochInMs(): number {
  return Math.floor(+new Date() / 1000);
}

function parseTimeToMilliseconds(length: string): number {
  const [seconds, minutes, hours] = length
    .split(":")
    .reverse()
    .map((val) => parseInt(val, 10));

  return seconds + (minutes || 0) * 60 + (hours || 0) * 3600;
}

const presenceData: PresenceData = {
  largeImageKey: "logo_512"
};

async function setWatchingVideoActivity() {
  const titleText = document.querySelector(".media-body h5")?.textContent;
  presenceData.details = titleText
    ? `Watching ${titleText}`
    : "Watching a race";

  // Video is playing
  const playButton = document.querySelector(".bmpui-ui-playbacktogglebutton");
  if (playButton?.ariaPressed === "true") {
    delete presenceData.state;

    presenceData.startTimestamp = getEpochInMs();
    presenceData.smallImageKey = "play";
    presenceData.smallImageText = (await strings).play;

    const [currentTime, videoLength] = document
      .querySelector(".bmpui-container-wrapper")
      .getElementsByClassName("bmpui-ui-playbacktimelabel");

    if (videoLength && currentTime) {
      const lengthInMs = parseTimeToMilliseconds(videoLength.textContent),
        currentTimeInMs = parseTimeToMilliseconds(currentTime.textContent);

      presenceData.endTimestamp = getEpochInMs() + lengthInMs - currentTimeInMs;
    }
  } else {
    delete presenceData.startTimestamp;
    delete presenceData.endTimestamp;

    presenceData.state = "Video paused";
    presenceData.smallImageKey = "pause";
    presenceData.smallImageText = (await strings).pause;
  }
}

async function setBrowsingActivity() {
  delete presenceData.state;
  delete presenceData.endTimestamp;

  presenceData.details = "Browsing...";
  presenceData.startTimestamp = getEpochInMs();
  presenceData.smallImageKey = "search";
  presenceData.smallImageText = (await strings).browsing;
}

presence.on("UpdateData", async () => {
  // Watching video
  if (document.location.href.includes("detail"))
    await setWatchingVideoActivity();
  // Browsing
  else await setBrowsingActivity();

  if (presenceData.details) presence.setActivity(presenceData);
  else presence.setActivity();
});
