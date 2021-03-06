interface LangStrings {
  play: string;
  pause: string;
  browse: string;
  viewingMovie: string;
  viewingSeries: string;
  account: string;
  watchingMovie: string;
  watchingSeries: string;
  searchFor: string;
  searchSomething: string;
  genre: string;
  viewSeries: string;
  viewMovies: string;
  viewEpisode: string;
  viewList: string;
  profile: string;
  latest: string;
  refer: string;
}

const presence = new Presence({
    clientId: "499981204045430784"
  }),
  getStrings = async (): Promise<LangStrings> => {
    return presence.getStrings(
      {
        play: "general.playing",
        pause: "general.paused",
        browse: "general.browsing",
        viewingMovie: "general.viewMovie",
        viewingSeries: "general.viewSeries",
        account: "general.viewAccount",
        watchingMovie: "general.watchingMovie",
        watchingSeries: "general.watchingSeries",
        searchFor: "general.searchFor",
        searchSomething: "general.searchSomething",
        genre: "general.viewGenre",
        viewSeries: "general.buttonViewSeries",
        viewMovies: "general.buttonViewMovie",
        viewEpisode: "general.buttonViewEpisode",
        viewList: "netflix.viewList",
        profile: "netflix.profile",
        latest: "netflix.latest",
        refer: "netflix.referral"
      },
      await presence.getSetting("lang")
    );
  };

let browsingStamp = Math.floor(Date.now() / 1000),
  prevUrl = document.location.href,
  strings: Promise<LangStrings> = getStrings(),
  oldLang: string = null;

presence.on("UpdateData", async () => {
  const showMovie: boolean = await presence.getSetting("movie"),
    movieDetail: string = await presence.getSetting("movieDetail"),
    movieState: string = await presence.getSetting("movieState"),
    showSeries: boolean = await presence.getSetting("series"),
    seriesDetail: string = await presence.getSetting("seriesDetail"),
    seriesState: string = await presence.getSetting("seriesState"),
    showBrowsing: boolean = await presence.getSetting("browse"),
    showTimestamp: boolean = await presence.getSetting("timestamp"),
    showButtons: boolean = await presence.getSetting("buttons"),
    privacy = await presence.getSetting("privacy"),
    newLang = await presence.getSetting("lang"),
    logo: number = await presence.getSetting("logo"),
    logoArr = ["nflix_lg", "noback"];

  let presenceData: PresenceData = {
    largeImageKey: logoArr[logo] || "nflix_lg"
  };

  if (document.location.href !== prevUrl) {
    prevUrl = document.location.href;
    browsingStamp = Math.floor(Date.now() / 1000);
  }

  if (!oldLang) {
    oldLang = newLang;
  } else if (oldLang !== newLang) {
    oldLang = newLang;
    strings = getStrings();
  }

  if (document.location.pathname.includes("/watch")) {
    const video: HTMLVideoElement = document.querySelector(
      ".VideoContainer video"
    );
    if (video && !isNaN(video.duration)) {
      const showCheck = document.querySelector(
          "[class$='title'] .ellipsize-text span"
        )
          ? true
          : false,
        timestamps = presence.getTimestampsfromMedia(video);

      presenceData.smallImageKey = video.paused ? "pause" : "play";
      presenceData.smallImageText = video.paused
        ? (await strings).pause
        : (await strings).play;
      presenceData.startTimestamp = timestamps[0];
      presenceData.endTimestamp = timestamps[1];

      if (video.paused) {
        delete presenceData.startTimestamp;
        delete presenceData.endTimestamp;
      }

      if (showCheck) {
        if (showSeries) {
          let state: string;
          if (
            document.querySelector(
              "[class$='title'] .ellipsize-text span:nth-child(3)"
            )
          ) {
            //* if the episode has a title, it's added to season and episode numbers
            state =
              document.querySelector("[class$='title'] .ellipsize-text span")
                .textContent +
              " " +
              document.querySelector(
                "[class$='title'] .ellipsize-text span:nth-child(3)"
              ).textContent;
          } else {
            //* if no episode title, it proceeds with the season and episode numbers only
            state = document.querySelector(
              "[class$='title'] .ellipsize-text span"
            ).textContent;
          }

          if (!privacy) {
            presenceData.details = seriesDetail
              .replace(
                "%title%",
                document.querySelector("[class$='title'] .ellipsize-text h4")
                  .textContent
              )
              .replace("%episode%", state);
            presenceData.state = seriesState
              .replace(
                "%title%",
                document.querySelector("[class$='title'] .ellipsize-text h4")
                  .textContent
              )
              .replace("%episode%", state);
            presenceData.buttons = [
              {
                label: (await strings).viewEpisode,
                url: document.URL.split("&")[0]
              },
              {
                label: (await strings).viewSeries,
                url: `https://www.netflix.com/browse?jbv=${
                  document.URL.split("?")[0].split("/")[4]
                }`
              }
            ];
            if (seriesState.includes("{0}")) delete presenceData.state;
          } else {
            presenceData.details = (await strings).watchingSeries;
          }
        } else if (showBrowsing) {
          presenceData.details = (await strings).browse;
          delete presenceData.endTimestamp;
          presenceData.startTimestamp = browsingStamp;
          presenceData.smallImageKey = "reading";
        }
      } else {
        //* if not a show
        const title = document.querySelector(
          "[class$='title'] h4.ellipsize-text"
        ).textContent;
        if (/\(([^)]+)\)/.test(title.toLowerCase())) {
          if (showSeries && !privacy) {
            //* if is an extra, trailer, teaser or something else
            const regExp = /\(([^)]+)\)/.exec(title);
            presenceData.details = seriesDetail
              .replace("%title%", title.replace(regExp[0], ""))
              .replace("%episode%", regExp[1]);
            presenceData.state = seriesState
              .replace("%title%", title.replace(regExp[0], ""))
              .replace("%episode%", regExp[1]);
            if (seriesState.includes("{0}")) delete presenceData.state;
          } else if (showSeries) {
            presenceData.details = (await strings).watchingSeries;
          } else if (showBrowsing) {
            presenceData.details = (await strings).browse;
          }
        } else if (showMovie && !privacy) {
          if (!(movieDetail === "{0}" && movieState === "{0}")) {
            //* if it's a movie
            if (movieDetail === "{0}") {
              presenceData.details = movieState.replace("%title%", title);
            } else {
              presenceData.details = movieDetail.replace("%title%", title);
              if (movieState !== "{0}")
                presenceData.state = movieState.replace("%title%", title);
            }
          }

          presenceData.buttons = [
            {
              label: (await strings).viewMovies,
              url: document.URL.split("?")[0]
            }
          ];
        } else if (showMovie) {
          presenceData.details = (await strings).watchingMovie;
        } else if (showBrowsing) {
          presenceData.details = (await strings).browse;
          delete presenceData.endTimestamp;
          presenceData.startTimestamp = browsingStamp;
          presenceData.smallImageKey = "reading";
        }
      }

      if (presenceData.details.length < 3)
        presenceData.details = " " + presenceData.details;

      if (!showTimestamp) {
        delete presenceData.startTimestamp;
        delete presenceData.endTimestamp;
      }

      if (!showButtons) {
        delete presenceData.buttons;
      }

      if (presenceData.details == null) {
        presence.setActivity();
        presence.setTrayTitle();
      } else {
        presence.setActivity(presenceData, !video.paused);
      }
    }
  } else {
    const path = location.href
        .replace(/\/?$/, "/")
        .replace("https://" + document.location.hostname, "")
        .replace("?", "/")
        .replace("=", "/"),
      statics: {
        [name: string]: PresenceData;
      } = {
        "/": {
          details: (await strings).browse
        },
        "/browse/genre/(\\d*)/": {
          details: (await strings).genre,
          state:
            document.querySelector(".genreTitle")?.textContent ||
            document.querySelector(".nm-collections-header-name")?.textContent
        },
        "/browse/my-list/": {
          details: (await strings).viewList
        },
        "/title/(\\d*)/": {
          details: document.querySelector(".btn.btn-get-started")
            ? document.querySelector(".duration > span")
              ? (await strings).viewingSeries
              : (await strings).viewingMovie
            : document.querySelector(".episodeSelector")
            ? (await strings).viewingSeries
            : (await strings).viewingMovie,
          state:
            (document.querySelector(
              ".previewModal--player-titleTreatment-logo"
            ) as HTMLImageElement)?.title ||
            document.querySelector("h1.title-title")?.textContent,
          buttons: [
            {
              label: document.querySelector(".btn.btn-get-started")
                ? document.querySelector(".duration > span")
                  ? (await strings).viewSeries
                  : (await strings).viewMovies
                : document.querySelector(".episodeSelector")
                ? (await strings).viewSeries
                : (await strings).viewMovies,
              url: document.URL.split("&")[0]
            }
          ]
        },
        "/latest/": {
          details: (await strings).latest.includes("{0}")
            ? (await strings).latest.split("{0}")[0]
            : (await strings).latest,
          state: (await strings).latest.includes("{0}")
            ? (await strings).latest.split("{0}")[1]
            : undefined
        },
        "/search/": {
          details: (await strings).searchFor,
          state: (document.querySelector(
            ".searchInput > input"
          ) as HTMLInputElement)?.value,
          smallImageKey: "search"
        },
        "jbv/(\\d*)/": {
          details: document.querySelector(".episodeSelector")
            ? (await strings).viewingSeries
            : (await strings).viewingMovie,
          state: (document.querySelector(
            ".previewModal--player-titleTreatment-logo"
          ) as HTMLImageElement)?.title,
          buttons: [
            {
              label: document.querySelector(".episodeSelector")
                ? (await strings).viewSeries
                : (await strings).viewMovies,
              url: document.URL.split("&")[0]
            }
          ]
        },
        "/referfriends/": {
          details: (await strings).refer.includes("{0}")
            ? (await strings).refer.split("{0}")[0]
            : (await strings).refer,
          state: (await strings).refer.includes("{0}")
            ? (await strings).refer.split("{0}")[1]
            : undefined
        },
        "/profiles/manage/": {
          details: (await strings).profile
        },
        "/YourAccount/": {
          details: (await strings).account
        }
      };

    if (showBrowsing) {
      for (const [k, v] of Object.entries(statics)) {
        if (path.match(k)) {
          presenceData.smallImageKey = "reading";
          presenceData.smallImageText = (await strings).browse;
          presenceData = { ...presenceData, ...v };
        }
      }
    }

    if (showTimestamp) {
      presenceData.startTimestamp = browsingStamp;
    }

    if (privacy && presenceData.smallImageKey === "search") {
      presenceData.details = (await strings).searchSomething;
      delete presenceData.state;
    } else if (privacy) {
      presenceData.details = (await strings).browse;
      delete presenceData.state;
    }

    if (!showButtons || privacy) {
      delete presenceData.buttons;
    }

    if (!showBrowsing) {
      presence.setActivity();
      presence.setTrayTitle();
    } else {
      presence.setActivity(presenceData);
    }
  }
});
