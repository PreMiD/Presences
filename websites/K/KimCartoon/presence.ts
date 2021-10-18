const presence = new Presence({
    clientId: "640253556078673951"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
  });

let browsingStamp = Math.floor(Date.now() / 1000),
  title: HTMLElement,
  air: HTMLInputElement,
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
  if (lastPlaybackState !== playback) {
    lastPlaybackState = playback;
    browsingStamp = Math.floor(Date.now() / 1000);
  }
  playback = data.iframeVideo.dur !== null ? true : false;

  if (playback) {
    ({ iFrameVideo, paused } = data.iframeVideo);
    currentTime = data.iframeVideo.currTime;
    duration = data.iframeVideo.dur;
  }
});

presence.on("UpdateData", async () => {
  const timestamps = presence.getTimestamps(
      Math.floor(currentTime),
      Math.floor(duration)
    ),
    presenceData: PresenceData = {
      largeImageKey: "kim"
    };

  if (
    document.querySelector("#adsIfrme > div > div > div > h1 > strong") !== null
  ) {
    if (iFrameVideo === true && !isNaN(duration)) {
      presenceData.smallImageKey = paused ? "pause" : "play";
      presenceData.smallImageText = paused
        ? (await strings).pause
        : (await strings).play;
      [presenceData.startTimestamp, presenceData.endTimestamp] = timestamps;

      title = document.querySelector(
        "#adsIfrme > div > div > div > h1 > strong"
      );
      presenceData.details = title.innerText;

      air = document.querySelector("#selectServer");

      presenceData.state = `Server: ${air.value}`;

      if (paused) {
        delete presenceData.startTimestamp;
        delete presenceData.endTimestamp;
      }
    } else if (iFrameVideo === null && isNaN(duration)) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Looking at: ";
      title = document.querySelector(
        "#adsIfrme > div > div > div > h1 > strong"
      );

      presenceData.state = title.innerText;
      presenceData.smallImageKey = "reading";
    }
  } else if (document.location.pathname === "/") {
    presenceData.details = "Viewing main page";
    presenceData.startTimestamp = browsingStamp;
  } else if (document.location.pathname.includes("/CartoonList")) {
    presenceData.details = "Viewing cartoonlist";
    presenceData.startTimestamp = browsingStamp;
  } else if (document.location.pathname.includes("/Genre")) {
    presenceData.details = "Viewing genres";
    presenceData.startTimestamp = browsingStamp;
  } else if (document.location.pathname.includes("/Cartoon")) {
    presenceData.details = "Viewing cartoon:";
    presenceData.state = document.querySelector(
      "#leftside > div:nth-child(1) > div.barContent.full > div > div.right_movie > h1 > a"
    ).textContent;
    presenceData.startTimestamp = browsingStamp;
  }

  if (!presenceData.details) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});
