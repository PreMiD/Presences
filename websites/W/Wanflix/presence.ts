const presence = new Presence({
    clientId: "641428323422961705"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);
let title: string,
  iFrameVideo: boolean,
  currentTime: number,
  duration: number,
  paused: boolean,
  playback: boolean;

interface iFrameData {
  iframeVideo: {
    duration?: number;
    currTime?: number;
    dur?: number;
    iFrameVideo?: boolean;
    paused?: boolean;
  };
}

presence.on("iFrameData", (data: iFrameData) => {
  playback = data.iframeVideo.duration !== null ? true : false;

  if (playback) {
    ({ iFrameVideo, paused } = data.iframeVideo);
    currentTime = data.iframeVideo.currTime;
    duration = data.iframeVideo.dur;
  }
});

presence.on("UpdateData", async () => {
  const [startTimestamp, endTimestamp] = presence.getTimestamps(
      Math.floor(currentTime),
      Math.floor(duration)
    ),
    presenceData: PresenceData = {
      largeImageKey: "wanflix"
    };

  if (
    document.querySelector(
      "body > div.container > div:nth-child(3) > div > div.movie-info > div > div.block-wrapper.page-single > div > div.block-movie-info.movie-info-box > div > div.col-6.movie-detail > h1 > span.title-1"
    ) !== null
  ) {
    presenceData.details = "Looking at:";
    presenceData.state = document.querySelector(
      "body > div.container > div:nth-child(3) > div > div.movie-info > div > div.block-wrapper.page-single > div > div.block-movie-info.movie-info-box > div > div.col-6.movie-detail > h1 > span.title-1"
    ).textContent;
    presenceData.startTimestamp = browsingStamp;
    presenceData.smallImageKey = "reading";
  } else if (document.location.pathname.includes("/video/")) {
    if (iFrameVideo === true && !isNaN(duration)) {
      presenceData.smallImageKey = paused ? "pause" : "play";
      presenceData.smallImageText = paused
        ? (await strings).pause
        : (await strings).play;
      presenceData.startTimestamp = startTimestamp;
      presenceData.endTimestamp = endTimestamp;

      presenceData.details = document.querySelector(
        "#app > div > div.body > div > div.video-details > div.video-main-details > div.video-title"
      ).textContent;
      presenceData.state = document.querySelector(
        "#app > div > div.body > div > div.video-details > div.video-main-details > div.video-category"
      ).textContent;

      if (paused) {
        delete presenceData.startTimestamp;
        delete presenceData.endTimestamp;
      }
    } else if (iFrameVideo === null && isNaN(duration)) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Looking at: ";
      title = document.querySelector(
        "#app > div > div.body > div > div.video-details > div.video-main-details > div.video-title"
      ).textContent;

      presenceData.state = title;
      presenceData.smallImageKey = "reading";
    }
  } else if (document.location.pathname === "/") {
    presenceData.details = "Viewing home page";
    presenceData.startTimestamp = browsingStamp;
  } else if (document.URL.includes("/videos")) {
    presenceData.details = "Browsing for videos...";
    presenceData.startTimestamp = browsingStamp;
  } else if (document.URL.includes("/vods")) {
    presenceData.details = "Browsing for vods...";
    presenceData.startTimestamp = browsingStamp;
  }

  if (!presenceData.details) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});
