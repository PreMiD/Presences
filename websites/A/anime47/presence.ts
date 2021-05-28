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
  lastPlaybackState = null,
  playback;

presence.on(
  "iFrameData",
  (data: {
    iframeVideo: {
      iFrameVideo: boolean;
      currentTime: number;
      duration: number;
      paused: boolean;
    };
  }) => {
    playback = data.iframeVideo.duration !== null ? true : false;

    if (playback)
      ({ iFrameVideo, currentTime, duration, paused } = data.iframeVideo);
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
    if (iFrameVideo && !isNaN(duration)) {
      const [videoTitle, secondTitle] = document
        .querySelector("head > title")
        .textContent.split("- ");
      presenceData.smallImageKey = paused ? "pause" : "play";
      presenceData.smallImageText = paused
        ? (await strings).pause
        : (await strings).play;
      presenceData.endTimestamp = endTimestamp;

      presenceData.details = videoTitle;
      presenceData.state = secondTitle;

      if (paused) {
        delete presenceData.startTimestamp;
        delete presenceData.endTimestamp;
      }
    } else if (!iFrameVideo && isNaN(duration)) {
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

  if (presenceData.details === null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});
