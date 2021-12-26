const presence = new Presence({
    clientId: "658230518520741915"
  }),
  browsingTimestamp = Math.floor(Date.now() / 1000),
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
        readingArticle: "general.readingArticle",
        viewPage: "general.viewPage",
        viewSeries: "general.buttonViewSeries"
      },
      await presence.getSetting<string>("lang")
    );

let oldLang: string = null,
  strings: Awaited<ReturnType<typeof getStrings>>,
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
    data.iframeVideo?.duration || data.iframeAudio.duration ? true : false;
  if (playback) {
    VideoMedia = data.iframeVideo;
    SoundMedia = data.iframeAudio;
  }
});

presence.on("UpdateData", async () => {
  const path = document.location.pathname,
    [newLang, IPlayer, soundData, buttonsE, showSearchQuery] =
      await Promise.all([
        presence.getSetting<string>("lang"),
        presence.getPageletiable<IPlayerData>("__IPLAYER_REDUX_STATE__"),
        presence.getPageletiable<SoundData>("__PRELOADED_STATE__"),
        presence.getSetting<boolean>("buttons"),
        presence.getSetting<boolean>("search")
      ]);

  if (oldLang !== newLang || !strings) {
    oldLang = newLang;
    strings = await getStrings();
  }

  let presenceData: PresenceData = {
    largeImageKey: "bbc_logo",
    details: strings.browse,
    startTimestamp: browsingTimestamp
  };

  if (path.includes("/iplayer")) {
    presenceData.largeImageKey = "bbciplayer_logo";
    presenceData.details = strings.browse;

    if (path.includes("/iplayer/episode")) {
      if (!VideoMedia.duration) {
        if (IPlayer.channel?.onAir) {
          presenceData.details = IPlayer.channel.title;
          presenceData.state = "Live";

          presenceData.smallImageKey = "live";
        } else if (!IPlayer.channel) {
          presenceData.details = strings.viewPage;
          presenceData.state = (IPlayer.episode || IPlayer.header).title;

          presenceData.startTimestamp = browsingTimestamp;
        }
      } else {
        const [startTimestamp, endTimestamp] = presence.getTimestamps(
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

        presenceData.startTimestamp = startTimestamp;
        presenceData.endTimestamp = endTimestamp;
        presenceData.smallImageKey = VideoMedia.paused ? "pause" : "play";
        presenceData.smallImageText = VideoMedia.paused
          ? strings.pause
          : strings.play;

        if (IPlayer.relatedEpisodes?.count) {
          presenceData.buttons = [
            {
              label: strings.viewEpisode,
              url: `https://www.bbc.co.uk/iplayer/episode/${
                document.location.pathname.split("/")[3]
              }`
            },
            {
              label: strings.viewSeries,
              url: `https://www.bbc.co.uk/iplayer/episode/${IPlayer.relatedEpisodes.episodes[0].episode.id}`
            }
          ];
        } else {
          presenceData.buttons = [
            {
              label: presenceData.state.toLocaleLowerCase().includes("film")
                ? strings.viewMovie
                : strings.viewEpisode,
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
    presenceData.details = strings.browse;

    if (path.includes("/play/")) {
      const [startTimestamp, endTimestamp] = presence.getTimestamps(
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
          soundData.modules.data[0].data[0].titles?.secondary;
        presenceData.smallImageKey =
          SoundMedia.paused || !SoundMedia.duration ? "pause" : "play";
      }

      presenceData.smallImageText =
        SoundMedia.paused || !SoundMedia.duration
          ? strings.pause
          : strings.play;

      presenceData.startTimestamp = startTimestamp;
      presenceData.endTimestamp = endTimestamp;

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
    presenceData.details = strings.browse;
    presenceData.smallImageKey = "reading";

    const title = document.querySelector("h1")?.textContent;

    if (path.includes("/sport/formula1")) {
      presenceData.details = strings.viewPage;
      presenceData.state = "Formula 1";

      if (path.includes("/latest")) {
        presenceData.details = strings.viewPage;
        presenceData.state = title;
      } else if (path.includes("/standings")) {
        presenceData.details = strings.viewPage;
        presenceData.state = title;
      } else if (path.includes("/sport/formula1/")) {
        presenceData.details = strings.readingArticle;
        presenceData.state = title;
        presenceData.buttons = [
          {
            label: "Read Article",
            url: document.baseURI
          }
        ];
      } else if (path.includes("/formula1/")) {
        presenceData.details = strings.readingArticle;
        presenceData.state = title;
        presenceData.buttons = [
          {
            label: "Read Article",
            url: document.baseURI
          }
        ];
      }
    } else if (path.includes("/sport/football")) {
      presenceData.details = strings.viewPage;
      presenceData.state = "Football";

      if (path.includes("/averages")) {
        presenceData.details = strings.viewPage;
        presenceData.state = title;
      } else if (path.includes("/teams/")) {
        presenceData.details = strings.viewTeam;
        presenceData.state = title;
      } else if (path.includes("/gossip")) {
        presenceData.details = strings.readingArticle;
        presenceData.state = title;
        presenceData.buttons = [
          {
            label: "Read Article",
            url: document.baseURI
          }
        ];
      } else if (path.includes("/transfers")) {
        presenceData.details = strings.readingArticle;
        presenceData.state = title;
        presenceData.buttons = [
          {
            label: "Read Article",
            url: document.baseURI
          }
        ];
      } else if (path.includes("/top-scorers")) {
        presenceData.details = strings.viewPage;
        presenceData.state = title;
      } else if (path.includes("/womens")) {
        presenceData.details = strings.viewPage;
        presenceData.state = "Women's Cricket";
      } else if (path.includes("/leagues-cups")) {
        presenceData.details = strings.viewPage;
        presenceData.state = title;
      } else if (path.includes("/european")) {
        presenceData.details = strings.viewPage;
        presenceData.state = "European's Cricket";
      } else if (path.includes("/football/")) {
        presenceData.details = strings.readingArticle;
        presenceData.state = title;
        presenceData.buttons = [
          {
            label: "Read Article",
            url: document.baseURI
          }
        ];
      }
    } else if (path.includes("/sport/cricket")) {
      presenceData.details = strings.viewPage;
      presenceData.state = "Cricket";

      presenceData.smallImageText = "Cricket";
      if (path.includes("/averages")) {
        presenceData.details = strings.viewPage;
        presenceData.state = title;
      } else if (path.includes("/teams/")) {
        presenceData.details = strings.viewTeam;
        presenceData.state = title;
        presenceData.smallImageText = "Cricket Team";
      } else if (
        document.querySelector(
          "li.sp-c-sport-navigation__item.sp-c-sport-navigation__item--secondary-selected"
        )?.textContent === "Squad"
      ) {
        presenceData.details = strings.viewPage;
        presenceData.state = title;
      } else if (path.includes("/counties")) {
        presenceData.details = strings.viewPage;
        presenceData.state = title;
      } else if (path.includes("/womens")) {
        presenceData.details = strings.viewPage;
        presenceData.state = "Women's Cricket";
      } else if (path.includes("/scorecard/")) {
        presenceData.details = "Viewing scoredcard of:";

        presenceData.state = `${
          document.querySelector(
            "span.sp-c-fixture__team.sp-c-fixture__team--time.sp-c-fixture__team--time-home.gel-long-primer > span > span"
          )?.textContent
        } & ${
          document.querySelector(
            "div.sp-c-fixture__wrapper > span.sp-c-fixture__team.sp-c-fixture__team--time.sp-c-fixture__team--time-away.gel-long-primer > span > span"
          )?.textContent
        }`;
      } else if (path.includes("/sport/cricket/")) {
        presenceData.details = strings.readingArticle;
        presenceData.state = title;
        presenceData.buttons = [
          {
            label: "Read Article",
            url: document.baseURI
          }
        ];
      }
    } else if (path.includes("/rugby-union")) {
      presenceData.details = strings.viewPage;
      presenceData.state = "Rugby Union";

      presenceData.smallImageText = "Rugby Union";

      if (path.includes("/teams/")) {
        presenceData.details = strings.viewTeam;
        presenceData.state = title;
        presenceData.smallImageText = "Rugby Union Team";
      } else if (path.includes("/rugby-union/")) {
        presenceData.details = strings.readingArticle;
        presenceData.state = title;
        presenceData.buttons = [
          {
            label: "Read Article",
            url: document.baseURI
          }
        ];
      }
    } else if (path.includes("/tennis")) {
      presenceData.details = strings.viewPage;
      presenceData.state = "Tennis";

      presenceData.smallImageText = "Tennis";

      if (path.includes("/live-scores")) {
        presenceData.details = strings.viewPage;
        presenceData.state = title;
      } else if (path.includes("/order-of-play")) {
        presenceData.details = strings.viewPage;
        presenceData.state = title;
      } else if (path.includes("/tennis/")) {
        presenceData.details = strings.readingArticle;
        presenceData.state = title;
        presenceData.buttons = [
          {
            label: "Read Article",
            url: document.baseURI
          }
        ];
      }
    } else if (path.includes("/golf")) {
      presenceData.details = strings.viewPage;
      presenceData.state = "Golf";

      presenceData.smallImageText = "Golf";

      if (path.includes("/athletics/")) {
        presenceData.details = strings.readingArticle;
        presenceData.state = title;
        presenceData.buttons = [
          {
            label: "Read Article",
            url: document.baseURI
          }
        ];
      }
    } else if (path.includes("/cycling")) {
      presenceData.details = strings.viewPage;
      presenceData.state = "Cycling";

      presenceData.smallImageText = "Cycling";

      if (path.includes("/cycling/")) {
        presenceData.details = strings.readingArticle;
        presenceData.state = title;
        presenceData.buttons = [
          {
            label: "Read Article",
            url: document.baseURI
          }
        ];
      }
    } else if (path.includes("/sport/")) {
      presenceData.details = strings.readingArticle;
      presenceData.state = title;
      presenceData.buttons = [
        {
          label: "Read Article",
          url: document.baseURI
        }
      ];

      if (VideoMedia.duration) {
        const [startTimestamp, endTimestamp] = presence.getTimestamps(
          VideoMedia.currentTime,
          VideoMedia.duration
        );

        presenceData.details = title;
        presenceData.state = document.querySelector("time")?.textContent;

        presenceData.startTimestamp = startTimestamp;
        presenceData.endTimestamp = endTimestamp;

        presenceData.smallImageKey = VideoMedia.paused ? "pause" : "play";
        presenceData.smallImageText = VideoMedia.paused
          ? strings.pause
          : strings.play;

        if (VideoMedia.paused) {
          delete presenceData.startTimestamp;
          delete presenceData.endTimestamp;
        }

        presenceData.buttons = [
          {
            label: strings.watchVideo,
            url: document.baseURI
          }
        ];
      }
    }

    if (path.includes("/scores-fixtures")) {
      presenceData.details = strings.viewPage;
      presenceData.state = title;
    } else if (path.includes("/table")) {
      presenceData.details = strings.viewPage;
      presenceData.state = title;
    } else if (path.includes("/results")) {
      presenceData.details = strings.viewPage;
      presenceData.state = title;
    } else if (path.includes("/calendar")) {
      presenceData.details = strings.viewPage;
      presenceData.state = title;
    } else if (path.includes("/leaderboard")) {
      presenceData.details = strings.viewPage;
      presenceData.state = title;
    } else if (path.includes("/av/")) {
      if (VideoMedia.duration) {
        const [startTimestamp, endTimestamp] = presence.getTimestamps(
          VideoMedia.currentTime,
          VideoMedia.duration
        );

        presenceData.details = title;
        presenceData.state = document.querySelector(
          "span.qa-status-date-output"
        )?.textContent;

        presenceData.startTimestamp = startTimestamp;
        presenceData.endTimestamp = endTimestamp;

        presenceData.smallImageKey = VideoMedia.paused ? "pause" : "play";
        presenceData.smallImageText = VideoMedia.paused
          ? strings.pause
          : strings.play;

        if (VideoMedia.paused) {
          delete presenceData.startTimestamp;
          delete presenceData.endTimestamp;
        }

        presenceData.buttons = [
          {
            label: strings.watchVideo,
            url: document.baseURI
          }
        ];
      }
    }
  } else if (path.includes("/weather")) {
    presenceData.largeImageKey = "bbcweather_logo";
    presenceData.details = strings.browse;

    const title = (
        document.querySelector("h2#wr-c-regional-forecast-slice__title") ||
        document.querySelector("h1")
      )?.textContent,
      weatherPages: {
        [key: string]: PresenceData;
      } = {
        "/weather/search": {
          details: strings.searchFor,
          state: document.querySelector<HTMLInputElement>(
            "input.location-search-input__input"
          )?.value,
          smallImageKey: "search"
        },
        "/weather/map": {
          details: strings.viewPage,
          state: "Map",
          smallImageKey: "map"
        },
        "/weather/([0-9])": {
          details: "Viewing weather of:",
          state:
            document
              .querySelector("h1#wr-location-name-id")
              ?.textContent.split(" - ")[0] || null,
          smallImageText: document.querySelector(
            "div.wr-day-summary > div > span"
          )?.textContent,
          smallImageKey: "reading",
          buttons: [
            {
              label: "View Weather",
              url: document.baseURI
            }
          ]
        },
        "/weather/features/([0-9])": {
          details: strings.readingArticle,
          state: title,
          smallImageKey: "reading",
          buttons: [
            {
              label: "Read Article",
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
        const [startTimestamp, endTimestamp] = presence.getTimestamps(
          VideoMedia.currentTime,
          VideoMedia.duration
        );

        presenceData.details = title;
        presenceData.state = (
          document.querySelector("time>span") || document.querySelector("b")
        )?.textContent;

        presenceData.startTimestamp = startTimestamp;
        presenceData.endTimestamp = endTimestamp;

        presenceData.smallImageKey = VideoMedia.paused ? "pause" : "play";
        presenceData.smallImageText = VideoMedia.paused
          ? strings.pause
          : strings.play;

        if (VideoMedia.paused) {
          delete presenceData.startTimestamp;
          delete presenceData.endTimestamp;
        }
      }
    }
  } else if (path.includes("/news")) {
    presenceData.largeImageKey = "bbcnews_logo";
    presenceData.details = strings.browse;
    presenceData.smallImageKey = "reading";

    const title = document.querySelector("h1")?.textContent,
      newsPages: {
        [key: string]: PresenceData;
      } = {
        "/have_your_say": {
          details: strings.viewPage,
          state: "Your Coronavirus Stories"
        },
        "/coronavirus": {
          details: strings.viewPage,
          state: "Coronavirus pandemic"
        },
        "(-|/)([0-9])": {
          details: strings.readingArticle,
          state: title,
          buttons: [
            {
              label: "Read Article",
              url: document.baseURI
            }
          ]
        },
        "/in_pictures": {
          details: strings.viewPage,
          state: "In Pictures"
        },
        "/reality_check": {
          details: strings.viewPage,
          state: "Reality Check"
        },
        "/the_reporters": {
          details: strings.viewPage,
          state: "Long Reads"
        },
        "/newsbeat": {
          details: strings.readingArticle,
          state: "Newsbeat"
        },
        "/blogs": {
          details: strings.viewPage,
          state: "Blogs"
        },
        "/technology": {
          details: strings.viewPage,
          state: "Technology news"
        },
        "/science-environment": {
          details: strings.viewPage,
          state: "Technology news"
        },
        "/stories": {
          details: strings.viewPage,
          state: "Stories"
        },
        "/entertainment_and_arts": {
          details: strings.viewPage,
          state: "Entertainment and arts"
        },
        "/health": {
          details: strings.viewPage,
          state: "Health news"
        },
        "/world": {
          details: strings.viewPage,
          state: "World news"
        },
        "/business": {
          details: strings.viewPage,
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
        presenceData.details = strings.viewPage;
        presenceData.state = "World News";
      } else if (VideoMedia.duration) {
        const [startTimestamp, endTimestamp] = presence.getTimestamps(
          VideoMedia.currentTime,
          VideoMedia.duration
        );

        presenceData.details = title;
        presenceData.state = document.querySelector("time")?.textContent;

        presenceData.startTimestamp = startTimestamp;
        presenceData.endTimestamp = endTimestamp;

        presenceData.smallImageKey = VideoMedia.paused ? "pause" : "play";
        presenceData.smallImageText = VideoMedia.paused
          ? strings.pause
          : strings.play;

        if (VideoMedia.paused) {
          delete presenceData.startTimestamp;
          delete presenceData.endTimestamp;
        }

        presenceData.buttons = [
          {
            label: strings.watchVideo,
            url: document.baseURI
          }
        ];
      } else if (path.match(/(-[0-9])/)) {
        presenceData.details = strings.readingArticle;
        presenceData.state = title;

        presenceData.buttons = [
          {
            label: "Read Article",
            url: document.baseURI
          }
        ];
      }
    }
  } else if (path === "/search") {
    presenceData.details = strings.searchFor;
    presenceData.state =
      document.querySelector<HTMLInputElement>("#search-input")?.value;
    presenceData.smallImageKey = "search";
  }

  if (!buttonsE) delete presenceData.buttons;
  if (presenceData.details === strings.searchFor && !showSearchQuery)
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
  iframeVideo: {
    duration: number;
    currentTime: number;
    paused: boolean;
  };
  iframeAudio: {
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
          shortTitle: string;
        };
      }[];
    }[];
  };
}
