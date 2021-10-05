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
  lastPlaybackState: boolean,
  playback: boolean;

interface IFrameData {
  iframeVideo: {
    dur: number;
    iFrameVideo: boolean;
    paused: boolean;
    currTime: number;
  };
}

presence.on("iFrameData", (data: IFrameData) => {
  playback = data.iframeVideo.dur !== null ? true : false;

  if (playback) {
    ({ iFrameVideo, paused } = data.iframeVideo);
    currentTime = data.iframeVideo.currTime;
    duration = data.iframeVideo.dur;
  }
});

presence.on("UpdateData", async () => {
  if (lastPlaybackState !== playback) {
    lastPlaybackState = playback;
    browsingStamp = Math.floor(Date.now() / 1000);
  }
  const timestamps = presence.getTimestamps(
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
    if (iFrameVideo === true && !isNaN(duration)) {
      presenceData.smallImageKey = paused ? "pause" : "play";
      presenceData.smallImageText = paused
        ? (await strings).pause
        : (await strings).play;
      [presenceData.startTimestamp, presenceData.endTimestamp] = timestamps;

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
    } else if (iFrameVideo === null && isNaN(duration)) {
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

  if (!presenceData.details) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});
