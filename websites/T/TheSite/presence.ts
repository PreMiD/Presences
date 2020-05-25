var presence = new Presence({
  clientId: "702668334990098523"
});
var strings = presence.getStrings({
  play: "presence.playback.playing",
  pause: "presence.playback.paused",
  browse: "presence.activity.browsing",
  search: "presence.activity.searching"
});

const getElement = (query: string): string => {
  const element = document.querySelector(query);
  if (element) {
    return element.textContent.replace(/^\s+|\s+$/g, "");
  } else return "Loading...";
};

const videoStatus = (video: HTMLVideoElement): string => {
  return video.paused ? "pause" : "play";
};

function getTimestamps(
  videoTime: number,
  videoDuration: number
): Array<number> {
  var startTime = Date.now();
  var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
  return [Math.floor(startTime / 1000), endTime];
}

var oldUrl,
  elapsed,
  searchText = "",
  searchElapsed = 0;

const statics = {
  "/": {
    details: "Browsing"
  },
  "/login/": {
    details: "Logging In"
  },
  "/password/forgot/": {
    details: "Forgot Password"
  },
  "/pages/kodi_plugin/": {
    details: "Viewing",
    state: "Kodi Plugin"
  },
  "/pages/contact/": {
    details: "Viewing",
    state: "Contact"
  },
  "/pages/faq/": {
    details: "Viewing",
    state: "FAQ"
  },
  "/pages/terms/": {
    details: "Viewing",
    state: "Terms of Service"
  },
  "/pages/privacy/": {
    details: "Viewing",
    state: "Privacy Info"
  },
  "/pages/cookies/": {
    details: "Viewing",
    state: "Cookie Info"
  },
  "/pages/social_terms/": {
    details: "Viewing",
    state: "Social Terms"
  },
  "/account/gifts/": {
    details: "Redeeming",
    state: "Gift-Code"
  },
  "/account/favorites/": {
    details: "Viewing",
    state: "Favorites"
  },
  "/account/playlist/wl/": {
    details: "Viewing",
    state: "Watch Later"
  },
  "/account/pin/": {
    details: "Logging In",
    state: "Pin"
  },
  "/premium/primary/": {
    details: "Buying",
    state: "Premium"
  },
  "/movies/": {
    details: "Browsing",
    state: "Movies"
  },
  "/shows/": {
    details: "Browsing",
    state: "TV Shows"
  },
  "/latest/episodes/": {
    details: "Browsing",
    state: "Latest Episodes"
  },
  "/schedule/": {
    details: "Viewing",
    state: "Schedule"
  },
  "/sets/children/": {
    details: "Viewing Set",
    state: "Children"
  },
  "/sets/comedies/": {
    details: "Viewing Set",
    state: "Comedies"
  },
  "/sets/action/": {
    details: "Viewing Set",
    state: "Action"
  },
  "/sets/dramas/": {
    details: "Viewing Set",
    state: "Dramas"
  },
  "/sets/romance/": {
    details: "Viewing Set",
    state: "Romance"
  },
  "/sets/sci-fi/": {
    details: "Viewing Set",
    state: "Science Fiction"
  },
  "/sets/horror/": {
    details: "Viewing Set",
    state: "Horror"
  }
};

presence.on("UpdateData", async () => {
  const path = location.pathname.replace(/\/?$/, "/");

  const video: HTMLVideoElement = document.querySelector("video");
  const search: HTMLInputElement = document.querySelector("input");

  const showSearchInfo = await presence.getSetting("search");
  const showBrowseInfo = await presence.getSetting("browse");
  const showVideoInfo = await presence.getSetting("video");

  var data: PresenceData = {
    details: undefined,
    state: undefined,
    largeImageKey: "thesite",
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
      const timestamps = getTimestamps(video.currentTime, video.duration);
      data.startTimestamp = timestamps[0];
      data.endTimestamp = timestamps[1];
    }
  };

  /* Browsing Info */
  if (showBrowseInfo) {
    if (path.includes("/person")) {
      data.details = "Viewing Person";
      data.state = getElement(".person-page-block h2");
    }
    if (path.includes("/account")) {
      data.details = "Viewing";
      data.state = `Account (${getElement(".account-nav > .active")})`;
    }
    if (path.includes("/request")) {
      data.details = "Viewing";
      data.state = `Requests (${getElement(".nav-tabs > .active")})`;
    }
    if (path.includes("/collections")) {
      let title = getElement(".page-videolist > h1");
      title = title === "Loading..." ? undefined : title;
      data.details = "Browsing";
      data.state = "Collections";
      if (title) {
        data.details = "Browsing Collection";
        data.state = title;
      }
    }

    if (path in statics) {
      data = { ...data, ...statics[path] };
    }
  }

  /* Video Info */
  if (showVideoInfo) {
    const wl = path.includes("/list");
    const wl_movie = wl && getElement(".media-body .genre");
    const wl_show = wl && !wl_movie;

    if (wl_movie || path.includes("/movies")) {
      const menu: HTMLElement = document.querySelector(".mv-movie-info");
      const title: string = getElement(".mv-movie-title > span");

      if (menu) {
        if (menu.style.display === "none") {
          await parseVideo();
          data.details = "Watching Movie";
          data.state = title;
        } else {
          data.details = "Viewing Movie Details";
          data.state = title;
        }
      }
    }
    /* Non Watch Later */
    if (path.includes("/shows")) {
      const menu: HTMLElement = document.querySelector(".mv-movie-info");

      const regex: RegExpMatchArray = getElement(
        ".mv-movie-title > span > span > strong"
      ).match(/S(?<season>\d{1,4})E(?<episode>\d{1,4})/);
      const setting = await presence.getSetting("show-format");
      const title: string = getElement(".mv-movie-title > span > a");
      if (title !== "Loading...") {
        const season = regex.groups.season;
        const episode = regex.groups.episode;
        const state = setting
          .replace("%show%", title)
          .replace("%season%", season)
          .replace("%episode%", episode);

        if (menu) {
          if (menu.style.display === "none") {
            await parseVideo();
            data.details = "Watching TV Show";
            data.state = state;
          } else {
            data.details = "Viewing TV Show Details";
            data.state = state;
          }
        }
      } else {
        data.details = "Viewing TV Show Details";
        data.state = getElement(".mv-movie-title > span");
      }
    }
    /* Watch Later */
    if (wl_show) {
      const menu: HTMLElement = document.querySelector(".mv-movie-info");

      const regex: RegExpMatchArray = getElement(
        ".full-title > .content > .seq > em"
      ).match(/S(?<season>\d{1,4})E(?<episode>\d{1,4})/);
      const setting = await presence.getSetting("show-format");
      const title: string = getElement(".full-title > .content > .title");
      if (title !== "Loading...") {
        const season = regex.groups.season;
        const episode = regex.groups.episode;
        const state = setting
          .replace("%show%", title)
          .replace("%season%", season)
          .replace("%episode%", episode);

        if (menu) {
          if (menu.style.display === "none") {
            await parseVideo();
            data.details = "Watching TV Show";
            data.state = state;
          } else {
            data.details = "Viewing TV Show Details";
            data.state = state;
          }
        }
      } else {
        data.details = "Viewing TV Show Details";
        data.state = getElement(".mv-movie-title > span");
      }
    }
  }

  /* Search Info */
  if (showSearchInfo) {
    if (search.value != searchText) {
      searchText = search.value;
      searchElapsed = Date.now();
    }
    if (
      (Date.now() - searchElapsed <= 5000 || path.includes("/search")) &&
      searchText.length > 0
    ) {
      data.details = "Searching";
      data.state = searchText;
      data.startTimestamp = elapsed ? elapsed : undefined;
      data.endTimestamp = undefined;
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
