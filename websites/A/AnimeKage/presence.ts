const presence = new Presence({
    clientId: "640244531346014214"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
  });

let browsingStamp = Math.floor(Date.now() / 1000),
  title: HTMLElement,
  air: HTMLElement,
  iFrameVideo: boolean,
  currentTime: number,
  duration: number,
  paused: boolean,
  lastPlaybackState = null,
  playback;

presence.on(
  "iFrameData",
  (data: {
    iframeVideo: {
      duration: number;
      paused: boolean;
      currentTime: number;
      iFrameVideo: boolean;
    };
  }) => {
    const iframeVid = data.iframeVideo;
    playback = iframeVid.duration !== null ? true : false;

    if (playback) ({ iFrameVideo, currentTime, duration, paused } = iframeVid);
  }
);

if (lastPlaybackState !== playback) {
  lastPlaybackState = playback;
  browsingStamp = Math.floor(Date.now() / 1000);
}

presence.on("UpdateData", async () => {
  const [, endTimestamp] = presence.getTimestamps(
      Math.floor(currentTime),
      Math.floor(duration)
    ),
    presenceData: PresenceData = {
      largeImageKey: "ak"
    };

  if (
    document.querySelector(
      "body > div:nth-child(2) > div > div > div > div > div > div > div > div > div > h1"
    ) !== null
  ) {
    if (iFrameVideo && !isNaN(duration)) {
      presenceData.smallImageKey = paused ? "pause" : "play";
      presenceData.smallImageText = paused
        ? (await strings).pause
        : (await strings).play;
      presenceData.endTimestamp = endTimestamp;

      title = document.querySelector(
        "body > div:nth-child(2) > div > div > div > div > div > div > div > div > div > h1"
      );
      presenceData.details = title.innerText;

      air = document.querySelector(
        "body > div:nth-child(2) > div > div > div > div > div > div > div > div:nth-child(3) > div > div.row > div:nth-child(3) > div"
      );

      presenceData.state = `Aired on: ${air.innerText}`;

      if (paused) {
        delete presenceData.startTimestamp;
        delete presenceData.endTimestamp;
      }
    } else if (!iFrameVideo && isNaN(duration)) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Looking at: ";
      title = document.querySelector(
        "body > div:nth-child(2) > div > div > div > div > div > div > div > div > div > h1"
      );

      presenceData.state = title.innerText;
      presenceData.smallImageKey = "reading";
    }
  } else if (document.location.pathname === "/") {
    presenceData.details = "Viewing main page";
    presenceData.startTimestamp = browsingStamp;
  }

  if (presenceData.details === null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});
