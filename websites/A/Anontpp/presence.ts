const presence = new Presence({
    clientId: "708314580304003124"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused",
    browse: "presence.activity.browsing",
    search: "presence.activity.searching"
  }),
  getElement = (query: string): string => {
    const element = document.querySelector(query);
    if (element) {
      return element.textContent.replace(/^\s+|\s+$/g, "");
    } else return "Loading...";
  },
  videoStatus = (video: HTMLVideoElement): string => {
    return video.paused ? "pause" : "play";
  };

let oldUrl: string, elapsed: number;

presence.on("UpdateData", async () => {
  const path = location.pathname.replace(/\/?$/, "/"),
    video: HTMLVideoElement = document.querySelector("video"),
    search: HTMLInputElement = document.querySelector("input"),
    showSearchInfo = await presence.getSetting("search"),
    showBrowseInfo = await presence.getSetting("browse"),
    showVideoInfo = await presence.getSetting("video"),
    data: PresenceData = {
      details: undefined,
      state: undefined,
      largeImageKey: "anontpp",
      smallImageKey: undefined,
      smallImageText: undefined,
      startTimestamp: undefined,
      endTimestamp: undefined
    };

  if (oldUrl !== path) {
    oldUrl = path;
    elapsed = Math.floor(Date.now() / 1000);
  }

  if (elapsed) {
    data.startTimestamp = elapsed;
  }

  const parseVideo = async (): Promise<void> => {
    const status = videoStatus(video);
    data.smallImageKey = status;
    data.smallImageText = (await strings)[status];
    if (status === "play") {
      const timestamps = presence.getTimestamps(
        video.currentTime,
        video.duration
      );
      data.startTimestamp = timestamps[0];
      data.endTimestamp = timestamps[1];
    }
  };

  /* Browsing Info */
  if (showBrowseInfo) {
    if (path === "/") {
      data.details = "Browsing";
    }
  }

  /* Video Info */
  if (showVideoInfo) {
    if (video) {
      const show = getElement("#episodetitle") !== "Feature Film",
        state = (
          document.querySelector("#infotitle") as HTMLElement
        ).innerText.split("\n");
      if (show) {
        // Show Logic
        data.details = "Watching Show";
        try {
          data.state = `${state[0]} (${state[1]})`;
          await parseVideo();
        } catch {
          // deepscan
        }
      } else {
        // Movie Logic
        data.details = "Watching Movie";
        try {
          data.state = state[0];
          await parseVideo();
        } catch {
          // deepscan
        }
      }
    }
  }

  /* Search Info */
  if (showSearchInfo) {
    if (getElement("#indextitle").split("\n")[0] === "Search Results") {
      data.details = "Searching for";
      data.state = search.value;
    }
  }

  if (data.details !== undefined) {
    if (data.details.match("(Browsing|Viewing)")) {
      data.smallImageKey = "reading";
      data.smallImageText = (await strings).browse;
    }
    if (data.details.includes("Searching")) {
      data.smallImageKey = "search";
      data.smallImageText = (await strings).search;
    }

    presence.setActivity(data);
  } else {
    presence.setTrayTitle();
    presence.setActivity();
  }
});
