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
  var startTime = Date.now();
  var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
  return [Math.floor(startTime / 1000), endTime];
}

presence.on("UpdateData", async () => {
  const presenceData: presenceData = { largeImageKey: "pvid" };
  presenceData.startTimestamp = browsingStamp;
  if (document.location.pathname.includes("/home/")) {
    presenceData.details = "Browsing...";
  } else if (document.location.pathname.includes("/detail/")) {
    let video: HTMLVideoElement = document.querySelector("video");
    if (isNaN(video.duration)) {
      video = document.querySelector("video:nth-child(2)");
    }
    const title: HTMLElement = document.querySelector(
      "div.center > div > div.title"
    );
    const subtitle: HTMLElement = document.querySelector(
      "div.center > div > div.subtitle"
    );

    if (
      video !== null &&
      title &&
      (document.querySelector(
        ".loadingSpinner.whiteSpinner"
      ) as HTMLButtonElement).style.cssText !== "display: inline;"
    ) {
      presenceData.details = title.textContent;
      if (
        subtitle &&
        subtitle.textContent &&
        subtitle.textContent.trim() !== title.textContent.trim()
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
    } else {
      presenceData.details = "Viewing:";
      presenceData.state = document.querySelector(
        ".dv-node-dp-title"
      ).textContent;
    }
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
      .textContent.split('"')[1]
      .split('"')[0];
    presenceData.smallImageKey = "search";
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
