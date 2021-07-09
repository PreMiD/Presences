const presence = new Presence({
    clientId: "658230518520741915"
  }),
  startsTime = Math.floor(Date.now() / 1000),
  getStrings = async () =>
    presence.getStrings(
      {
        play: "general.playing",
        pause: "general.paused",
        browse: "general.browsing",
        viewMovie: "general.buttonViewMovie",
        searchFor: "general.searchFor",
        viewEpisode: "general.buttonViewEpisode",
        watchVideo: "general.buttonWatchVideo",
        viewTeam: "twitch.viewTeam",
        readingAricle: "general.readingArticle",
        viewPage: "general.viewPage",
        viewSeries: "general.buttonViewSeries"
      },
      await presence.getSetting("lang")
    );

let oldLang: string = null,
  strings = getStrings(),
  VideoMedia: MediaData = {
    duration: 0,
    currentTime: 0,
    paused: true
  },
  SoundMedia: MediaData = {
    duration: 0,
    currentTime: 0,
    paused: true,
    title: "Loading..."
  },
  playback: boolean;

presence.on("iFrameData", (data: IFrameData) => {
  playback =
    (data.iframe_video?.duration || data.iframe_audio?.duration) !== undefined
      ? true
      : false;
  if (playback) {
    VideoMedia = data.iframe_video;
    SoundMedia = data.iframe_audio;
  }
});

presence.on("UpdateData", async () => {
  const path = document.location.pathname,
    newLang = await presence.getSetting("lang"),
    IPlayer: IPlayerData = await presence.getPageletiable(
      "__IPLAYER_REDUX_STATE__"
    ),
    soundData: SoundData = await presence.getPageletiable(
      "__PRELOADED_STATE__"
    ),
    buttonsE = await presence.getSetting("buttons"),
    showSearchQuery = await presence.getSetting("search");

  if (!oldLang) {
    oldLang = newLang;
  } else if (oldLang !== newLang) {
    oldLang = newLang;
    strings = getStrings();
  }

  let presenceData: PresenceData = {
    largeImageKey: "bbc_logo",
    details: (await strings).browse,
    startTimestamp: startsTime
  };

  if (path.includes("/iplayer")) {
    presenceData.largeImageKey = "bbciplayer_logo";
    presenceData.details = (await strings).browse;

    if (path.includes("/iplayer/episode")) {
      if (!VideoMedia.duration) {
        if (IPlayer.channel?.onAir) {
          presenceData.details = IPlayer.channel.title;
          presenceData.state = "Live";

          presenceData.smallImageKey = "live";
        } else if (!IPlayer.channel) {
          presenceData.details = (await strings).viewPage;
          presenceData.state = (IPlayer.episode || IPlayer.header).title;

          presenceData.startTimestamp = startsTime;
        }
      } else {
        const timestamps = presence.getTimestamps(
          VideoMedia.currentTime,
          VideoMedia.duration
        );

        presenceData.details = (IPlayer.episode || IPlayer.header).title;
        presenceData.state =
          (
            document.querySelector(
              '[class="typo typo--skylark play-cta__subtitle"]'
            ) ||
            document.querySelector(
              '[class="typo typo--bold play-cta__title typo--skylark"]'
            )
          )?.textContent ||
          IPlayer.episode.labels?.category ||
          "Animation";

        presenceData.startTimestamp = timestamps[0];
        presenceData.endTimestamp = timestamps[1];

        presenceData.smallImageKey = VideoMedia.paused ? "pause" : "play";
        presenceData.smallImageText = VideoMedia.paused
          ? (await strings).pause
          : (await strings).play;

        if (IPlayer.relatedEpisodes?.count) {
          presenceData.buttons = [
            {
              label: (await strings).viewEpisode,
              url: `https://www.bbc.co.uk/iplayer/episode/${
                document.location.pathname.split("/")[3]
              }`
            },
            {
              label: (await strings).viewSeries,
              url: `https://www.bbc.co.uk/iplayer/episode/${IPlayer.relatedEpisodes.episodes[0].episode.id}`
            }
          ];
        } else {
          presenceData.buttons = [
            {
              label: presenceData.state.toLocaleLowerCase().includes("film")
                ? (await strings).viewMovie
                : (await strings).viewEpisode,
              url: `https://www.bbc.co.uk/iplayer/episode/${
                document.location.pathname.split("/")[3]
              }`
            }
          ];
        }

        if (VideoMedia.paused || !VideoMedia.duration) {
          delete presenceData.startTimestamp;
          delete presenceData.endTimestamp;
        }
      }
    }
  } else if (path.includes("/sounds")) {
    presenceData.largeImageKey = "bbcsounds_logo";
    presenceData.details = (await strings).browse;

    if (path.includes("/play/")) {
      const timestamps = presence.getTimestamps(
          SoundMedia.currentTime,
          SoundMedia.duration
        ),
        isLive = path.includes("live:");

      if (isLive) {
        presenceData.details = SoundMedia.title;
        presenceData.state = "Live";
        presenceData.smallImageKey = "live";
      } else {
        presenceData.details = SoundMedia.title;
        presenceData.state =
          soundData.modules["data"][0].data[0].titles?.secondary;
        presenceData.smallImageKey =
          SoundMedia.paused || !SoundMedia.duration ? "pause" : "play";
      }

      presenceData.smallImageText =
        SoundMedia.paused || !SoundMedia.duration
          ? (await strings).pause
          : (await strings).play;

      presenceData.startTimestamp = timestamps[0];
      presenceData.endTimestamp = timestamps[1];

      presenceData.buttons = [
        {
          label: "Listen",
          url: `https://www.bbc.co.uk/sounds/play/${document.URL.split("/")[5]}`
        }
      ];

      if (SoundMedia.paused || isLive) {
        delete presenceData.startTimestamp;
        delete presenceData.endTimestamp;
      }
    }
  } else if (path.includes("/sport")) {
    presenceData.largeImageKey = "bbcsport_logo";
    presenceData.details = (await strings).browse;
    presenceData.smallImageKey = "reading";

    const title = document.querySelector("h1")?.textContent,
      selectedMenu = document.querySelector(
        "li.sp-c-sport-navigation__item.sp-c-sport-navigation__item--secondary-selected"
      )?.textContent;

    if (path.includes("/sport/formula1")) {
      presenceData.details = (await strings).viewPage;
      presenceData.state = "Formula 1";

      if (path.includes("/latest")) {
        presenceData.details = (await strings).viewPage;
        presenceData.state = title;
      } else if (path.includes("/standings")) {
        presenceData.details = (await strings).viewPage;
        presenceData.state = title;
      } else if (path.includes("/sport/formula1/")) {
        presenceData.details = (await strings).readingAricle;
        presenceData.state = title;
        presenceData.buttons = [
          {
            label: "Read Aricle",
            url: document.baseURI
          }
        ];
      } else if (path.includes("/formula1/")) {
        presenceData.details = (await strings).readingAricle;
        presenceData.state = title;
        presenceData.buttons = [
          {
            label: "Read Aricle",
            url: document.baseURI
          }
        ];
      }
    } else if (path.includes("/sport/football")) {
      presenceData.details = (await strings).viewPage;
      presenceData.state = "Football";

      if (path.includes("/averages")) {
        presenceData.details = (await strings).viewPage;
        presenceData.state = title;
      } else if (path.includes("/teams/")) {
        presenceData.details = (await strings).viewTeam;
        presenceData.state = title;
      } else if (path.includes("/gossip")) {
        presenceData.details = (await strings).readingAricle;
        presenceData.state = title;
        presenceData.buttons = [
          {
            label: "Read Aricle",
            url: document.baseURI
          }
        ];
      } else if (path.includes("/transfers")) {
        presenceData.details = (await strings).readingAricle;
        presenceData.state = title;
        presenceData.buttons = [
          {
            label: "Read Aricle",
            url: document.baseURI
          }
        ];
      } else if (path.includes("/top-scorers")) {
        presenceData.details = (await strings).viewPage;
        presenceData.state = title;
      } else if (path.includes("/womens")) {
        presenceData.details = (await strings).viewPage;
        presenceData.state = "Women's Cricket";
      } else if (path.includes("/leagues-cups")) {
        presenceData.details = (await strings).viewPage;
        presenceData.state = title;
      } else if (path.includes("/european")) {
        presenceData.details = (await strings).viewPage;
        presenceData.state = "European's Cricket";
      } else if (path.includes("/football/")) {
        presenceData.details = (await strings).readingAricle;
        presenceData.state = title;
        presenceData.buttons = [
          {
            label: "Read Aricle",
            url: document.baseURI
          }
        ];
      }
    } else if (path.includes("/sport/cricket")) {
      presenceData.details = (await strings).viewPage;
      presenceData.state = "Cricket";

      presenceData.smallImageText = "Cricket";
      if (path.includes("/averages")) {
        presenceData.details = (await strings).viewPage;
        presenceData.state = title;
      } else if (path.includes("/teams/")) {
        presenceData.details = (await strings).viewTeam;
        presenceData.state = title;
        presenceData.smallImageText = "Cricket Team";
      } else if (selectedMenu === "Squad") {
        presenceData.details = (await strings).viewPage;
        presenceData.state = title;
      } else if (path.includes("/counties")) {
        presenceData.details = (await strings).viewPage;
        presenceData.state = title;
      } else if (path.includes("/womens")) {
        presenceData.details = (await strings).viewPage;
        presenceData.state = "Women's Cricket";
      } else if (path.includes("/scorecard/")) {
        presenceData.details = "Viewing scoredcard of:";

        const Team1 = document.querySelector(
            "span.sp-c-fixture__team.sp-c-fixture__team--time.sp-c-fixture__team--time-home.gel-long-primer > span > span"
          )?.textContent,
          Team2 = document.querySelector(
            "div.sp-c-fixture__wrapper > span.sp-c-fixture__team.sp-c-fixture__team--time.sp-c-fixture__team--time-away.gel-long-primer > span > span"
          )?.textContent;

        presenceData.state = `${Team1} & ${Team2}`;
      } else if (path.includes("/sport/cricket/")) {
        presenceData.details = (await strings).readingAricle;
        presenceData.state = title;
        presenceData.buttons = [
          {
            label: "Read Aricle",
            url: document.baseURI
          }
        ];
      }
    } else if (path.includes("/rugby-union")) {
      presenceData.details = (await strings).viewPage;
      presenceData.state = "Rugby Union";

      presenceData.smallImageText = "Rugby Union";

      if (path.includes("/teams/")) {
        presenceData.details = (await strings).viewTeam;
        presenceData.state = title;
        presenceData.smallImageText = "Rugby Union Team";
      } else if (path.includes("/rugby-union/")) {
        presenceData.details = (await strings).readingAricle;
        presenceData.state = title;
        presenceData.buttons = [
          {
            label: "Read Aricle",
            url: document.baseURI
          }
        ];
      }
    } else if (path.includes("/tennis")) {
      presenceData.details = (await strings).viewPage;
      presenceData.state = "Tennis";

      presenceData.smallImageText = "Tennis";

      if (path.includes("/live-scores")) {
        presenceData.details = (await strings).viewPage;
        presenceData.state = title;
      } else if (path.includes("/order-of-play")) {
        presenceData.details = (await strings).viewPage;
        presenceData.state = title;
      } else if (path.includes("/tennis/")) {
        presenceData.details = (await strings).readingAricle;
        presenceData.state = title;
        presenceData.buttons = [
          {
            label: "Read Aricle",
            url: document.baseURI
          }
        ];
      }
    } else if (path.includes("/golf")) {
      presenceData.details = (await strings).viewPage;
      presenceData.state = "Golf";

      presenceData.smallImageText = "Golf";

      if (path.includes("/athletics/")) {
        presenceData.details = (await strings).readingAricle;
        presenceData.state = title;
        presenceData.buttons = [
          {
            label: "Read Aricle",
            url: document.baseURI
          }
        ];
      }
    } else if (path.includes("/cycling")) {
      presenceData.details = (await strings).viewPage;
      presenceData.state = "Cycling";

      presenceData.smallImageText = "Cycling";

      if (path.includes("/cycling/")) {
        presenceData.details = (await strings).readingAricle;
        presenceData.state = title;
        presenceData.buttons = [
          {
            label: "Read Aricle",
            url: document.baseURI
          }
        ];
      }
    } else if (path.includes("/sport/")) {
      presenceData.details = (await strings).readingAricle;
      presenceData.state = title;
      presenceData.buttons = [
        {
          label: "Read Aricle",
          url: document.baseURI
        }
      ];

      if (VideoMedia.duration) {
        const timestamps = presence.getTimestamps(
          VideoMedia.currentTime,
          VideoMedia.duration
        );

        presenceData.details = title;
        presenceData.state = document.querySelector("time")?.textContent;

        presenceData.startTimestamp = timestamps[0];
        presenceData.endTimestamp = timestamps[1];

        presenceData.smallImageKey = VideoMedia.paused ? "pause" : "play";
        presenceData.smallImageText = VideoMedia.paused
          ? (await strings).pause
          : (await strings).play;

        if (VideoMedia.paused) {
          delete presenceData.startTimestamp;
          delete presenceData.endTimestamp;
        }

        presenceData.buttons = [
          {
            label: (await strings).watchVideo,
            url: document.baseURI
          }
        ];
      }
    }

    if (path.includes("/scores-fixtures")) {
      presenceData.details = (await strings).viewPage;
      presenceData.state = title;
    } else if (path.includes("/table")) {
      presenceData.details = (await strings).viewPage;
      presenceData.state = title;
    } else if (path.includes("/results")) {
      presenceData.details = (await strings).viewPage;
      presenceData.state = title;
    } else if (path.includes("/calendar")) {
      presenceData.details = (await strings).viewPage;
      presenceData.state = title;
    } else if (path.includes("/leaderboard")) {
      presenceData.details = (await strings).viewPage;
      presenceData.state = title;
    } else if (path.includes("/av/")) {
      if (VideoMedia.duration) {
        const timestamps = presence.getTimestamps(
          VideoMedia.currentTime,
          VideoMedia.duration
        );

        presenceData.details = title;
        presenceData.state = document.querySelector(
          "span.qa-status-date-output"
        )?.textContent;

        presenceData.startTimestamp = timestamps[0];
        presenceData.endTimestamp = timestamps[1];

        presenceData.smallImageKey = VideoMedia.paused ? "pause" : "play";
        presenceData.smallImageText = VideoMedia.paused
          ? (await strings).pause
          : (await strings).play;

        if (VideoMedia.paused) {
          delete presenceData.startTimestamp;
          delete presenceData.endTimestamp;
        }

        presenceData.buttons = [
          {
            label: (await strings).watchVideo,
            url: document.baseURI
          }
        ];
      }
    }
  } else if (path.includes("/weather")) {
    presenceData.largeImageKey = "bbcweather_logo";
    presenceData.details = (await strings).browse;

    const searchValue = document.querySelector<HTMLInputElement>(
        "input.location-search-input__input"
      )?.value,
      location = (document
        .querySelector("h1#wr-location-name-id")
        ?.textContent.split(" - ") || [null])[0],
      title = (
        document.querySelector("h2#wr-c-regional-forecast-slice__title") ||
        document.querySelector("h1")
      )?.textContent,
      time = (
        document.querySelector("time>span") || document.querySelector("b")
      )?.textContent,
      weather = document.querySelector(
        "div.wr-day-summary > div > span"
      )?.textContent,
      weatherPages: {
        [key: string]: PresenceData;
      } = {
        "/weather/search": {
          details: (await strings).searchFor,
          state: searchValue,
          smallImageKey: "search"
        },
        "/weather/map": {
          details: (await strings).viewPage,
          state: "Map",
          smallImageKey: "map"
        },
        "/weather/([0-9])": {
          details: "Viewing weather of:",
          state: location,
          smallImageText: weather,
          smallImageKey: "reading",
          buttons: [
            {
              label: "View Weather",
              url: document.baseURI
            }
          ]
        },
        "/weather/features/([0-9])": {
          details: (await strings).readingAricle,
          state: title,
          smallImageKey: "reading",
          buttons: [
            {
              label: "Read Aricle",
              url: document.baseURI
            }
          ]
        }
      };

    for (const [key, value] of Object.entries(weatherPages)) {
      if (path.match(key) && !VideoMedia.duration) {
        presenceData = { ...presenceData, ...value };
        break;
      } else if (VideoMedia.duration) {
        const timestamps = presence.getTimestamps(
          VideoMedia.currentTime,
          VideoMedia.duration
        );

        presenceData.details = title;
        presenceData.state = time;

        presenceData.startTimestamp = timestamps[0];
        presenceData.endTimestamp = timestamps[1];

        presenceData.smallImageKey = VideoMedia.paused ? "pause" : "play";
        presenceData.smallImageText = VideoMedia.paused
          ? (await strings).pause
          : (await strings).play;

        if (VideoMedia.paused) {
          delete presenceData.startTimestamp;
          delete presenceData.endTimestamp;
        }
      }
    }
  } else if (path.includes("/news")) {
    presenceData.largeImageKey = "bbcnews_logo";
    presenceData.details = (await strings).browse;
    presenceData.smallImageKey = "reading";

    const title = document.querySelector("h1")?.textContent,
      newsPages: {
        [key: string]: PresenceData;
      } = {
        "/have_your_say": {
          details: (await strings).viewPage,
          state: "Your Coronavirus Stories"
        },
        "/coronavirus": {
          details: (await strings).viewPage,
          state: "Coronavirus pandemic"
        },
        "(-|/)([0-9])": {
          details: (await strings).readingAricle,
          state: title,
          buttons: [
            {
              label: "Read Aricle",
              url: document.baseURI
            }
          ]
        },
        "/in_pictures": {
          details: (await strings).viewPage,
          state: "In Pictures"
        },
        "/reality_check": {
          details: (await strings).viewPage,
          state: "Reality Check"
        },
        "/the_reporters": {
          details: (await strings).viewPage,
          state: "Long Reads"
        },
        "/newsbeat": {
          details: (await strings).readingAricle,
          state: "Newsbeat"
        },
        "/blogs": {
          details: (await strings).viewPage,
          state: "Blogs"
        },
        "/technology": {
          details: (await strings).viewPage,
          state: "Technology news"
        },
        "/science-environment": {
          details: (await strings).viewPage,
          state: "Technology news"
        },
        "/stories": {
          details: (await strings).viewPage,
          state: "Stories"
        },
        "/entertainment_and_arts": {
          details: (await strings).viewPage,
          state: "Entertainment and arts"
        },
        "/health": {
          details: (await strings).viewPage,
          state: "Health news"
        },
        "/world": {
          details: (await strings).viewPage,
          state: "World news"
        },
        "/business": {
          details: (await strings).viewPage,
          state: "Business news"
        }
      };

    for (const [key, value] of Object.entries(newsPages)) {
      if (
        path.match(key) &&
        !path.includes("/world/") &&
        !VideoMedia.duration
      ) {
        presenceData = { ...presenceData, ...value };
        break;
      } else if (path.includes("/world/") && !VideoMedia.duration) {
        presenceData.details = (await strings).viewPage;
        presenceData.state = "World News";
      } else if (VideoMedia.duration) {
        const timestamps = presence.getTimestamps(
          VideoMedia.currentTime,
          VideoMedia.duration
        );

        presenceData.details = title;
        presenceData.state = document.querySelector("time")?.textContent;

        presenceData.startTimestamp = timestamps[0];
        presenceData.endTimestamp = timestamps[1];

        presenceData.smallImageKey = VideoMedia.paused ? "pause" : "play";
        presenceData.smallImageText = VideoMedia.paused
          ? (await strings).pause
          : (await strings).play;

        if (VideoMedia.paused) {
          delete presenceData.startTimestamp;
          delete presenceData.endTimestamp;
        }

        presenceData.buttons = [
          {
            label: (await strings).watchVideo,
            url: document.baseURI
          }
        ];
      } else if (path.match(/(-[0-9])/)) {
        presenceData.details = (await strings).readingAricle;
        presenceData.state = title;

        presenceData.buttons = [
          {
            label: "Read Aricle",
            url: document.baseURI
          }
        ];
      }
    }
  } else if (path === "/search") {
    const searchValue =
      document.querySelector<HTMLInputElement>("#search-input")?.value;

    presenceData.details = (await strings).searchFor;
    presenceData.state = searchValue;
    presenceData.smallImageKey = "search";
  }

  if (!buttonsE) delete presenceData.buttons;
  if (presenceData.details === (await strings).searchFor && !showSearchQuery)
    presenceData.state = "(Hidden)";

  presence.setActivity(presenceData);
});

interface IPlayerData {
  episode?: {
    title: string;
    subtitle: string;
    labels?: {
      category: string;
    };
  };
  relatedEpisodes?: {
    count: number;
    episodes: {
      episode: {
        id: string;
        title: string;
        subtile: string;
        labels?: {
          category: string;
        };
      };
    }[];
  };
  channel?: {
    title: string;
    onAir: boolean;
  };
  header?: {
    title: string;
  };
}

interface IFrameData {
  iframe_video: {
    duration: number;
    currentTime: number;
    paused: boolean;
  };
  iframe_audio: {
    duration: number;
    currentTime: number;
    paused: boolean;
    title: string;
  };
}

interface MediaData {
  duration: number;
  currentTime: number;
  paused: boolean;
  title?: string;
}

interface SoundData {
  modules: {
    data: {
      data: {
        titles?: {
          primary?: string;
          secondary?: string;
          tertiary?: string;
        };
        network: {
          short_title: string;
        };
      }[];
    }[];
  };
}
