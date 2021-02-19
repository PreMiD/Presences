const presence = new Presence({
    clientId: "702668334990098523"
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

let oldUrl: string,
  elapsed: number,
  searchText = "",
  searchElapsed = 0;

function setObject(path: string) {
  switch (path) {
    case "/": {
      return {
        details: "Browsing"
      };
    }
    case "/login/": {
      return {
        details: "Logging in"
      };
    }
    case "/password/forgot": {
      return {
        details: "Forgot Password"
      };
    }
    case "/pages/kodi_plugin": {
      return {
        details: "Viewing",
        state: "Kodi Plugin"
      };
    }
    case "/pages/contact": {
      return {
        details: "Viewing",
        state: "Contact"
      };
    }
    case "/pages/faq": {
      return {
        details: "Viewing",
        state: "FAQ"
      };
    }
    case "/pages/terms": {
      return {
        details: "Viewing",
        state: "Terms of Service"
      };
    }
    case "/pages/privacy": {
      return {
        details: "Viewing",
        state: "Privacy Info"
      };
    }
    case "/pages/cookies": {
      return {
        details: "Viewing",
        state: "Cookie Info"
      };
    }
    case "/pages/social_terms": {
      return {
        details: "Viewing",
        state: "Social Terms"
      };
    }
    case "/account/gifts": {
      return {
        details: "Redeeming",
        state: "Gift-Code"
      };
    }
    case "/account/favorites/": {
      return {
        details: "Viewing",
        state: "Favorites"
      };
    }
    case "/account/playlist/wl/": {
      return {
        details: "Viewing",
        state: "Watch Later"
      };
    }
    case "/account/pin": {
      return {
        details: "Logging In",
        state: "Via PIN"
      };
    }
    case "/premium/primary": {
      return {
        details: "Buying",
        state: "Premium"
      };
    }
    case "/movies/": {
      return {
        details: "Browsing",
        state: "Movies"
      };
    }
    case "/shows/": {
      return {
        details: "Browsing",
        state: "TV Shows"
      };
    }
    case "/schedule/": {
      return {
        details: "Viewing",
        state: "Schedule"
      };
    }
    case "/sets/children": {
      return {
        details: "Viewing Set",
        state: "Children"
      };
    }
    case "/sets/comedies": {
      return {
        details: "Viewing Set",
        state: "Comedies"
      };
    }
    case "/sets/action": {
      return {
        details: "Viewing Set",
        state: "Action"
      };
    }
    case "/sets/dramas": {
      return {
        details: "Viewing Set",
        state: "Dramas"
      };
    }
    case "/sets/romance": {
      return {
        details: "Viewing Set",
        state: "Romance"
      };
    }
    case "/sets/sci-fi": {
      return {
        details: "Viewing Set",
        state: "Science Fiction"
      };
    }
    case "/sets/horror": {
      return {
        details: "Viewing Set",
        state: "Horror"
      };
    }
  }
}

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

    const detailsObj = setObject(path);
    data.details = detailsObj.details;
    data.state = detailsObj.state;
  }

  /* Video Info */
  if (showVideoInfo) {
    const wl = path.includes("/list"),
      wl_movie = wl && getElement(".media-body .genre"),
      wl_show = wl && !wl_movie;

    if (wl_movie || path.includes("/movies")) {
      const menu: HTMLElement = document.querySelector(".mv-movie-info"),
        title: string = getElement(".mv-movie-title > span");

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
      const menu: HTMLElement = document.querySelector(".mv-movie-info"),
        regex: RegExpMatchArray = getElement(
          ".mv-movie-title > span > span > strong"
        ).match(/S(?<season>\d{1,4})E(?<episode>\d{1,4})/),
        setting = await presence.getSetting("show-format"),
        title: string = getElement(".mv-movie-title > span > a");
      if (title !== "Loading...") {
        const season = regex.groups.season,
          episode = regex.groups.episode,
          state = setting
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
      const menu: HTMLElement = document.querySelector(".mv-movie-info"),
        regex: RegExpMatchArray = getElement(
          ".full-title > .content > .seq > em"
        ).match(/S(?<season>\d{1,4})E(?<episode>\d{1,4})/),
        setting = await presence.getSetting("show-format"),
        title: string = getElement(".full-title > .content > .title");
      if (title !== "Loading...") {
        const season = regex.groups.season,
          episode = regex.groups.episode,
          state = setting
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
