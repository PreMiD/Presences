const presence = new Presence({
    clientId: "705139844883677224"
  }),
  strings = presence.getStrings({
    paused: "presence.playback.paused",
    playing: "presence.playback.playing"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);

/**
 * Get Timestamps
 * @param {Number} videoTime Current video time seconds
 * @param {Number} videoDuration Video duration seconds
 */
function getTimestamps(
  videoTime: number,
  videoDuration: number
): Array<number> {
  const startTime = Date.now(),
    endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
  return [Math.floor(startTime / 1000), endTime];
}

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = { largeImageKey: "pvid" };
  presenceData.startTimestamp = browsingStamp;
  const titleElement: HTMLElement =
      document.querySelector(
        ".webPlayerSDKUiContainer > div > div > div > div:nth-child(2) > div > div:nth-child(4) > div > div:nth-child(2) > div:nth-child(2) > div > div > div > h1"
      ) || document.querySelector(".atvwebplayersdk-title-text"),
    title2Element: HTMLElement = document.querySelector(
      ".av-detail-section > div > h1"
    ),
    title: string = titleElement?.textContent,
    title2: string =
      title2Element?.textContent ||
      document.querySelector<HTMLImageElement>(
        ".av-detail-section > div > h1 > div > img"
      )?.alt;
  if (title !== undefined || title2 !== undefined) {
    let video: HTMLVideoElement = document.querySelector(
      ".scalingVideoContainer > div.scalingVideoContainerBottom > div > video"
    );
    if (video == null || isNaN(video.duration)) {
      video = document.querySelector("video");
    }
    if (video == null || isNaN(video.duration)) {
      video = document.querySelector("video:nth-child(2)");
    }
    const subtitle: HTMLElement =
      document.querySelector(
        ".webPlayerSDKUiContainer > div > div > div > div:nth-child(2) > div > div:nth-child(4) > div > div:nth-child(2) > div:nth-child(2) > div > div > div > h2"
      ) || document.querySelector(".atvwebplayersdk-subtitle-text");

    if (video !== null && title && !video.className.includes("tst")) {
      presenceData.details = title;
      if (
        subtitle &&
        subtitle.textContent &&
        subtitle.textContent.trim() !== title.trim()
      ) {
        presenceData.state = subtitle.textContent;
      }

      if (video.paused) {
        presenceData.smallImageKey = "paused";
        presenceData.smallImageText = (await strings).paused;
        delete presenceData.startTimestamp;
      } else {
        const timestamps = getTimestamps(
          Math.floor(video.currentTime),
          Math.floor(video.duration)
        );
        presenceData.startTimestamp = timestamps[0];
        presenceData.endTimestamp = timestamps[1];
        presenceData.smallImageKey = "playing";
        presenceData.smallImageText = (await strings).playing;
      }
    } else if (video !== null && !video.className.includes("tst")) {
      if (title2 !== "") presenceData.details = title2;
      if (video.paused) {
        presenceData.smallImageKey = "paused";
        presenceData.smallImageText = (await strings).paused;
        delete presenceData.startTimestamp;
      } else {
        const timestamps = getTimestamps(
          Math.floor(video.currentTime),
          Math.floor(video.duration)
        );
        presenceData.startTimestamp = timestamps[0];
        presenceData.endTimestamp = timestamps[1];
        presenceData.smallImageKey = "playing";
        presenceData.smallImageText = (await strings).playing;
      }
    } else if (title2 !== undefined) {
      presenceData.details = "Viewing:";
      presenceData.state = title2;
    } else if (document.location.pathname.includes("shop")) {
      presenceData.details = "Browsing the store...";
    } else {
      presenceData.details = "Browsing...";
    }
  } else if (document.location.pathname.includes("/home/")) {
    presenceData.details = "Browsing...";
  } else if (document.location.pathname.includes("shop")) {
    presenceData.details = "Browsing the store...";
  } else if (document.location.pathname.includes("/tv/")) {
    presenceData.details = "Browsing TV-Series";
  } else if (document.location.pathname.includes("/movie/")) {
    presenceData.details = "Browsing Movies";
  } else if (document.location.pathname.includes("/kids/")) {
    presenceData.details = "Browsing Movies for kids";
  } else if (
    document.location.pathname.includes("/search/") &&
    document.querySelector(".av-refine-bar-summaries") !== null
  ) {
    presenceData.details = "Searching for:";
    presenceData.state = document
      .querySelector(".av-refine-bar-summaries")
      .textContent.split(/["„]/)[1]
      .split(/[”"]/)[0];
    presenceData.smallImageKey = "search";
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
