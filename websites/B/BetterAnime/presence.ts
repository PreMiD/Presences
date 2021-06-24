const presence = new Presence({
    clientId: "839409255979155516"
  }),
  getStrings = async () => {
    return presence.getStrings(
      {
        play: "general.playing",
        pause: "general.paused",
        browse: "general.browsing",
        searchFor: "general.searchFor",
        searchSomething: "general.searchSomething",
        viewEpisode: "general.buttonViewEpisode",
        viewAnime: "general.viewAnime",
        viewSeries: "general.buttonViewSeries",
        viewAccount: "general.viewAccount",
        viewMovie: "general.viewMovie",
        buttonViewMovie: "general.buttonViewMovie",
        watchMovie: "general.watchingMovie",
        watchSeries: "general.watchingSeries"
      },
      await presence.getSetting("lang").catch(() => "en")
    );
  },
  data: {
    oldLang?: string;
    startedSince?: number;
    meta?: {
      [key: string]: string;
    };
    settings?: {
      id?: string;
      delete?: boolean;
      value?: boolean;
      uses?: (keyof PresenceData)[];
      presence?: {
        page: string;
        uses?: keyof PresenceData;
        setTo?: string;
        if?:
          | {
              k: boolean;
              v?: string;
              delete?: boolean;
            }
          | {
              k: boolean;
              v?: string;
              delete?: boolean;
            }[];
        replace?: {
          input: string;
          output: string;
        }[];
      }[];
    }[];
    presence: {
      [key: string]: {
        disabled?: boolean;
        setPresenceData?: () => void;
      };
    };
    presenceData: PresenceData;
  } = {
    presence: {},
    meta: {},
    oldLang: "",
    startedSince: ~~(Date.now() / 1000),
    presenceData: {
      largeImageKey: "betteranime",
      smallImageKey: "browse"
    }
  };

let strings = getStrings(),
  video: {
    duration: number;
    currentTime: number;
    paused: boolean;
  };

presence.on("iFrameData", (data: typeof video) => {
  if (data) video = data;
});

presence.on("UpdateData", async () => {
  const newLang = await presence.getSetting("lang").catch(() => "en"),
    privacy = await presence.getSetting("privacy"),
    anime = await presence.getSetting("anime"),
    movie = await presence.getSetting("movie"),
    browse = await presence.getSetting("browse"),
    timestamp = await presence.getSetting("timestamp");

  if (browse) data.presenceData.details = (await strings).browse;
  if (
    timestamp &&
    !data.presenceData.startTimestamp &&
    !data.presenceData.endTimestamp
  )
    data.presenceData.startTimestamp = data.startedSince;

  if (!data.oldLang) data.oldLang = newLang;
  else if (data.oldLang !== newLang) {
    data.oldLang = newLang;
    strings = getStrings();
  }

  data.presence = {
    "/anime/(dublado|legendado)/([a-zA-Z0-9-]+)/([a-z-0-9]+)": {
      disabled: !anime,
      async setPresenceData() {
        const [, endTimestamp] = presence.getTimestamps(
          video.currentTime,
          video.duration
        );

        data.meta.episode = document.querySelector(
          "div.anime-title > h3"
        ).textContent;
        data.meta.title = document
          .querySelector("div.anime-title")
          .textContent.replace(data.meta.episode, "");

        data.presenceData.smallImageKey = video.paused ? "pause" : "play";
        data.presenceData.smallImageText = video.paused
          ? (await strings).pause
          : (await strings).play;

        data.presenceData.endTimestamp = endTimestamp;

        data.presenceData.buttons = [
          {
            label: (await strings).viewEpisode,
            url: document.URL
          },
          {
            label: (await strings).viewSeries,
            url: document.querySelector<HTMLAnchorElement>(
              "div.anime-title > h2 > a"
            ).href
          }
        ];

        if (video.paused) {
          delete data.presenceData.endTimestamp;
          delete data.presenceData.startTimestamp;
        }
      }
    },
    "/anime/(dublado|legendado)/([a-zA-Z0-9-]+)": {
      disabled: privacy || !anime,
      async setPresenceData() {
        data.presenceData.details = (await strings).viewAnime;
        data.presenceData.state = document.querySelector(
          "div.infos_left > div > h2"
        ).textContent;

        data.presenceData.buttons = [
          {
            label: (await strings).viewSeries,
            url: document.URL
          }
        ];
      }
    },
    "/filme/(dublado|legendado)/([a-zA-Z0-9-]+)/([a-z-]+)": {
      disabled: !movie,
      async setPresenceData() {
        const [, endTimestamp] = presence.getTimestamps(
          video.currentTime,
          video.duration
        );

        data.meta.title = document
          .querySelector("div.anime-title")
          .textContent.replace(
            document.querySelector("div.anime-title > h3").textContent,
            ""
          );

        data.presenceData.smallImageKey = video.paused ? "pause" : "play";
        data.presenceData.smallImageText = video.paused
          ? (await strings).pause
          : (await strings).play;

        data.presenceData.endTimestamp = endTimestamp;

        data.presenceData.buttons = [
          {
            label: (await strings).buttonViewMovie,
            url: document.URL
          }
        ];

        if (video.paused) {
          delete data.presenceData.endTimestamp;
          delete data.presenceData.startTimestamp;
        }
      }
    },
    "/filme/(dublado|legendado)/([a-zA-Z0-9-]+)": {
      disabled: privacy || !movie,
      async setPresenceData() {
        data.presenceData.details = (await strings).viewMovie;
        data.presenceData.state = document.querySelector(
          "div.infos_left > div > h2"
        ).textContent;

        data.presenceData.buttons = [
          {
            label: (await strings).buttonViewMovie,
            url: document.URL
          }
        ];
      }
    },
    "/minha-conta": {
      disabled: privacy,
      async setPresenceData() {
        data.presenceData.details = (await strings).viewAccount;
      }
    },
    "/pesquisa": {
      async setPresenceData() {
        data.presenceData.details = (await strings).searchFor;
        data.presenceData.state = new URLSearchParams(
          document.location.search
        ).get("titulo");
      }
    }
  };

  data.settings = [
    {
      id: "timestamp",
      delete: true,
      uses: ["startTimestamp", "endTimestamp"]
    },
    {
      id: "buttons",
      delete: true,
      uses: ["buttons"]
    },
    {
      id: "privacy",
      delete: true,
      value: true,
      uses: ["buttons"]
    },
    {
      presence: [
        {
          page: "/pesquisa",
          uses: "state",
          if: {
            k: privacy,
            delete: true
          }
        },
        {
          page: "/pesquisa",
          uses: "details",
          if: {
            k: privacy,
            v: (await strings).searchSomething
          }
        },
        {
          page: "/anime/(dublado|legendado)/([a-zA-Z0-9-]+)/([a-z-0-9]+)",
          uses: "details",
          setTo: await presence.getSetting("AnimeDetails"),
          if: [
            {
              k: privacy && anime,
              v: (await strings).watchSeries
            },
            {
              k: !anime,
              delete: true
            }
          ],
          replace: [
            {
              input: "%title%",
              output: data.meta.title
            },
            {
              input: "%episode%",
              output: data.meta.episode
            }
          ]
        },
        {
          page: "/anime/(dublado|legendado)/([a-zA-Z0-9-]+)/([a-z-0-9]+)",
          uses: "state",
          setTo: await presence.getSetting("AnimeState"),
          if: {
            k:
              !anime ||
              privacy ||
              (await presence.getSetting("AnimeState")).includes("{0}"),
            delete: true
          },
          replace: [
            {
              input: "%title%",
              output: data.meta.title
            },
            {
              input: "%episode%",
              output: data.meta.episode
            }
          ]
        },
        {
          page: "/filme/(dublado|legendado)/([a-zA-Z0-9-]+)/([a-z-0-9]+)",
          uses: "details",
          setTo: await presence.getSetting("MovieDetails"),
          if: [
            {
              k: privacy && movie,
              v: (await strings).watchMovie
            },
            {
              k: !movie,
              delete: true
            }
          ],
          replace: [
            {
              input: "%title%",
              output: data.meta.title
            }
          ]
        },
        {
          page: "/filme/(dublado|legendado)/([a-zA-Z0-9-]+)/([a-z-0-9]+)",
          uses: "state",
          setTo: await presence.getSetting("MovieState"),
          if: {
            k:
              !movie ||
              privacy ||
              (await presence.getSetting("MovieState")).includes("{0}"),
            delete: true
          },
          replace: [
            {
              input: "%title%",
              output: data.meta.title
            }
          ]
        }
      ]
    }
  ];

  for (const [k, v] of Object.entries(data.presence)) {
    if (document.location.pathname.match(k) && !v.disabled) {
      v.setPresenceData();
      break;
    }
  }

  for (const setting of data.settings) {
    const settingValue = await presence
      .getSetting(setting.id)
      .catch(() => null);

    if (
      ((!settingValue && setting.value === undefined) ||
        settingValue === setting.value) &&
      setting.delete &&
      !setting.presence
    ) {
      for (const PData of setting.uses)
        delete data.presenceData[PData as keyof PresenceData];
    } else if (setting.presence) {
      for (const presenceSetting of setting.presence) {
        if (document.location.pathname.match(presenceSetting.page)) {
          if (presenceSetting.setTo && !presenceSetting.replace) {
            data.presenceData[presenceSetting.uses as "details"] =
              presenceSetting.setTo;
          } else if (presenceSetting.setTo && presenceSetting.replace) {
            let replaced = presenceSetting.setTo;

            for (const toReplace of presenceSetting.replace)
              replaced = replaced.replace(toReplace.input, toReplace.output);

            if (replaced)
              data.presenceData[presenceSetting.uses as "details"] = replaced;
          }

          if (presenceSetting.if) {
            if (Array.isArray(presenceSetting.if)) {
              for (const setting of presenceSetting.if) {
                if (setting.k) {
                  if (setting.delete && !setting.v)
                    delete data.presenceData[presenceSetting.uses];
                  else if (setting.v) {
                    data.presenceData[presenceSetting.uses as "details"] =
                      setting.v;
                  }
                }
              }
            } else {
              if (presenceSetting.if.k) {
                if (presenceSetting.if.delete && !presenceSetting.if.v)
                  delete data.presenceData[presenceSetting.uses];
                else if (presenceSetting.if.v) {
                  data.presenceData[presenceSetting.uses as "details"] =
                    presenceSetting.if.v;
                }
              }
            }
          }
        }
      }
    }
  }

  for (const x of ["state", "details"]) {
    if (data.presenceData[x as "details"] === "undefined")
      delete data.presenceData[x as "details"];
  }

  if (!data.presenceData.details) {
    presence.setActivity();
    presence.setTrayTitle();
  } else presence.setActivity(data.presenceData);
});
