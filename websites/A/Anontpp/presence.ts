const presence = new Presence({
    clientId: "708314580304003124"
  }),
  strings: Promise<{ [key: string]: string }> = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused",
    browse: "presence.activity.browsing",
    search: "presence.activity.searching"
  }),
  getElement = (query: string): string => {
    const element = document.querySelector(query);
    if (element) return element.textContent.replace(/^\s+|\s+$/g, "");
    else return "Loading...";
  },
  videoStatus = (video: HTMLVideoElement): string => {
    return video.paused ? "pause" : "play";
  };

let oldUrl: string, elapsed: number;

presence.on("UpdateData", async () => {
  const path = location.pathname.replace(/\/?$/, "/"),
    video: HTMLVideoElement = document.querySelector("video"),
    [showSearchInfo, showBrowseInfo, showVideoInfo] = await Promise.all([
      presence.getSetting<boolean>("search"),
      presence.getSetting<boolean>("browse"),
      presence.getSetting<boolean>("video")
    ]),
    presenceData: PresenceData = {
      largeImageKey: "anontpp"
    };

  if (oldUrl !== path) {
    oldUrl = path;
    elapsed = Math.floor(Date.now() / 1000);
  }

  if (elapsed) presenceData.startTimestamp = elapsed;

  const parseVideo = async (): Promise<void> => {
    const status = videoStatus(video);
    presenceData.smallImageKey = status;
    presenceData.smallImageText = (await strings)[status];
    if (status === "play") {
      [presenceData.startTimestamp, presenceData.endTimestamp] =
        presence.getTimestamps(video.currentTime, video.duration);
    }
  };

  /* Browsing Info */
  if (showBrowseInfo) if (path === "/") presenceData.details = "Browsing";

  /* Video Info */
  if (showVideoInfo) {
    if (video) {
      const state = (
        document.querySelector("#infotitle") as HTMLElement
      ).textContent.split("\n");
      if (getElement("#episodetitle") !== "Feature Film") {
        // Show Logic
        presenceData.details = "Watching Show";
        try {
          presenceData.state = `${state[0]} (${state[1]})`;
          await parseVideo();
        } catch {
          // deepscan
        }
      } else {
        // Movie Logic
        presenceData.details = "Watching Movie";
        try {
          [presenceData.state] = state;
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
      presenceData.details = "Searching for";
      presenceData.state = (
        document.querySelector("input") as HTMLInputElement
      ).value;
    }
  }

  if (presenceData.details) {
    if (presenceData.details.match("(Browsing|Viewing)")) {
      presenceData.smallImageKey = "reading";
      presenceData.smallImageText = (await strings).browse;
    }
    if (presenceData.details.includes("Searching")) {
      presenceData.smallImageKey = "search";
      presenceData.smallImageText = (await strings).search;
    }

    presence.setActivity(presenceData);
  } else presence.setActivity();
});
