const presence = new Presence({
    clientId: "640990409224486971"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
  });

let browsingStamp = Math.floor(Date.now() / 1000),
  title: string,
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
  const [startTimestamp, endTimestamp] = presence.getTimestamps(
      Math.floor(currentTime),
      Math.floor(duration)
    ),
    presenceData: PresenceData = {
      largeImageKey: "anime47"
    };

  if (
    document.querySelector(
      "body > div.container > div:nth-child(3) > div > div.movie-info > div > div.block-wrapper.page-single > div > div.block-movie-info.movie-info-box > div > div.col-6.movie-detail > h1 > span.title-1"
    ) !== null
  ) {
    presenceData.details = "Đang xem:";
    presenceData.state = document.querySelector(
      "body > div.container > div:nth-child(3) > div > div.movie-info > div > div.block-wrapper.page-single > div > div.block-movie-info.movie-info-box > div > div.col-6.movie-detail > h1 > span.title-1"
    ).textContent;
    presenceData.startTimestamp = browsingStamp;
    presenceData.smallImageKey = "reading";
  } else if (
    document.querySelector(
      "body > div.container > ol > li:nth-child(5) > a > span"
    ) !== null
  ) {
    if (iFrameVideo === true && !isNaN(duration)) {
      presenceData.smallImageKey = paused ? "pause" : "play";
      presenceData.smallImageText = paused
        ? (await strings).pause
        : (await strings).play;
      presenceData.startTimestamp = startTimestamp;
      presenceData.endTimestamp = endTimestamp;

      [presenceData.details, presenceData.state] = document
        .querySelector("head > title")
        .textContent.split("- ");

      if (paused) {
        delete presenceData.startTimestamp;
        delete presenceData.endTimestamp;
      }
    } else if (iFrameVideo === null && isNaN(duration)) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Đang xem: ";
      title = document.querySelector("head > title").textContent;

      presenceData.state = title;
      presenceData.smallImageKey = "reading";
    }
  } else if (document.location.pathname === "/") {
    presenceData.details = "Đang xem trang chủ";
    presenceData.startTimestamp = browsingStamp;
  } else if (document.URL.includes("/the-loai/")) {
    presenceData.details = "Đang xem danh mục:";
    presenceData.state = document
      .querySelector(
        "body > div.container > div:nth-child(5) > div > div.movie-list-index.home-v2 > h1 > span"
      )
      .textContent.split(":")[1]
      .replace(" - Anime Vietsub Online", "");
    presenceData.startTimestamp = browsingStamp;
  } else {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Đang xem:";
    presenceData.state = document.querySelector("head > title").textContent;
  }

  if (!presenceData.details) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});
