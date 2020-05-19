const presence = new Presence({
  clientId: "607362931180699648"
});
const strings = presence.getStrings({
  play: "presence.playback.playing",
  pause: "presence.playback.paused",
  live: "presence.activity.live",
  browse: "presence.activity.browsing"
});

/**
 * Get Timestamps
 * @param {Number} videoTime Current video time seconds
 * @param {Number} videoDuration Video duration seconds
 */
const getTimestamps = (
  videoTime: number,
  videoDuration: number
): Array<number> => {
  var startTime = Date.now();
  var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
  return [Math.floor(startTime / 1000), endTime];
};

/**
 * Capitalizes a String
 * @param text The input text
 */
const capitalize = (text: string): string => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};

const getElement = (query: string): string => {
  const element = document.querySelector(query);
  return element ? element.textContent : undefined;
};

const getNodedElement = (query: string): string => {
  const element: HTMLElement = document.querySelector(query);
  return element ? element.innerText.split("\n")[0] : undefined;
};

var oldUrl, elapsed;

const statics = {
  "/": {
    details: "Browsing...",
    state: "Home"
  },
  "/contact/": {
    details: "Viewing...",
    state: "Contact Page"
  }
};

presence.on("UpdateData", async () => {
  const path = location.pathname.replace(/\/?$/, "/");
  const query = location.search;

  const showBrowseInfo = await presence.getSetting("browse");
  const showVideoInfo = await presence.getSetting("video");

  var data: presenceData = {
    details: undefined,
    state: undefined,
    largeImageKey: "mixer",
    smallImageKey: undefined,
    smallImageText: undefined,
    startTimestamp: undefined,
    endTimestamp: undefined
  };

  if (oldUrl !== path) {
    oldUrl = path;
    elapsed = Math.floor(Date.now() / 1000);

    if (elapsed) {
      data.startTimestamp = elapsed;
    }
  }

  /**
   * Get Video Status
   * @param video The target video
   */
  const videoStatus = (video: HTMLVideoElement): string => {
    if (document.querySelector(".spectre-player .current-time"))
      return video.paused ? "pause" : "play";
    return "live";
  };

  /**
   * Parse Video Info into smallImageKey/timestamps
   * @param video The target video
   */
  const parseVideo = async (video: HTMLVideoElement = null): Promise<void> => {
    const status = videoStatus(video);
    data.smallImageKey = status;
    data.smallImageText = (await strings)[status];
    if (status === "play") {
      const timestamps = getTimestamps(video.currentTime, video.duration);
      data.startTimestamp = timestamps[0];
      data.endTimestamp = timestamps[1];
    }
  };

  if (showBrowseInfo) {
    for (const [key, value] of Object.entries(statics)) {
      if (path.includes(key)) {
        data = { ...data, ...value };
      }
    }

    const header = getNodedElement(".browseHeader_lSNpl .heading_1gdG7");
    if (path.includes("/browse")) {
      const browseAt = capitalize(path.split("/")[2]);
      data.details = "Browsing...";
      data.state = browseAt;

      if (header) {
        data.details = `Browsing ${browseAt}...`;
        data.state = header;
      }
    }

    if (path.includes("/lab")) {
      data.details = "Browsing Developers Lab...";

      if (path.includes("/lab/oauth")) {
        data.state = "OAuth";
      }

      if (path.includes("/lab/interactive/")) {
        data.state = "Interactive";
      }

      if (path.includes("/lab/teststreams")) {
        data.state = "Test Streams";
      }
    }

    if (path.includes("/dashboard")) {
      data.details = "Viewing Dashboard...";
      if (path.includes("/onboarding/")) {
        data.state = "Onboarding";
      }

      try {
        const category = capitalize(path.split("/")[2]);
        const type = capitalize(path.split("/")[3]);
        data.state = `${category} ${type}`;
      } catch {
        // deepscan
      }
    }
  }

  if (showVideoInfo) {
    const channel = document.querySelector(".channel-page");
    if (channel) {
      if (!query.includes("?clip")) {
        // Live or Video
        const nonClippedVideo: HTMLVideoElement = document.querySelector(
          ".spectre-video-element"
        );
        const title = getElement(".stream-title > .wrapper > .repeated");
        const streamer = getNodedElement(".profile-card > .layout-row");
        await parseVideo(nonClippedVideo);
        data.details = title;
        data.state = streamer;
      } else {
        // Clip
        const clipVideo: HTMLVideoElement = document.querySelector(
          ".dialog .spectre-video-element"
        );
        const title = getElement(".dialog .channel > .ng-star-inserted");
        const streamer = getNodedElement(".profile-card > .layout-row");
        await parseVideo(clipVideo);
        data.details = title;
        data.state = streamer;
      }
    }
  }

  if (data.details !== undefined) {
    if (data.details.match("(Browsing|Viewing)")) {
      data.smallImageKey = "reading";
      data.smallImageText = (await strings).browse;
    }

    presence.setActivity(data);
  } else {
    presence.setTrayTitle();
    presence.setActivity();
  }
});
