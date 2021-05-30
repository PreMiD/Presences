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
  } = {
    presence: {},
    meta: {},
    startedSince: ~~(Date.now() / 1000),
    oldLang: ""
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
  const presenceData: PresenceData = {
      largeImageKey: "betteranime",
      smallImageKey: "browse",
      startTimestamp: data.startedSince
    },
    newLang = await presence.getSetting("lang").catch(() => "en"),
    privacy = await presence.getSetting("privacy"),
    anime = await presence.getSetting("anime"),
    movie = await presence.getSetting("movie"),
    browse = await presence.getSetting("browse");

  if (browse) presenceData.details = (await strings).browse;

  if (!data.oldLang) {
    data.oldLang = newLang;
  } else if (data.oldLang !== newLang) {
    data.oldLang = newLang;
    strings = getStrings();
  }

  data.presence = {
    "/anime/(dublado|legendado)/([a-zA-Z0-9-]+)/([a-z-0-9]+)": {
      disabled: !anime,
      async setPresenceData() {
        const timestamps = presence.getTimestamps(
          video.currentTime,
          video.duration
        );

        data.meta["episode"] = document.querySelector(
          "div.anime-title > h3"
        ).textContent;
        data.meta["title"] = document
          .querySelector("div.anime-title")
          .textContent.replace(data.meta["episode"], "");

        presenceData.smallImageKey = video.paused ? "pause" : "play";
        presenceData.smallImageText = video.paused
          ? (await strings).pause
          : (await strings).play;

        presenceData.endTimestamp = timestamps[1];

        presenceData.buttons = [
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
          delete presenceData.endTimestamp;
          delete presenceData.startTimestamp;
        }
      }
    },
    "/anime/(dublado|legendado)/([a-zA-Z0-9-]+)": {
      disabled: privacy || !anime,
      async setPresenceData() {
        presenceData.details = (await strings).viewAnime;
        presenceData.state = document.querySelector(
          "div.infos_left > div > h2"
        ).textContent;

        presenceData.buttons = [
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
        const timestamps = presence.getTimestamps(
          video.currentTime,
          video.duration
        );

        data.meta["title"] = document
          .querySelector("div.anime-title")
          .textContent.replace(
            document.querySelector("div.anime-title > h3").textContent,
            ""
          );

        presenceData.smallImageKey = video.paused ? "pause" : "play";
        presenceData.smallImageText = video.paused
          ? (await strings).pause
          : (await strings).play;

        presenceData.endTimestamp = timestamps[1];

        presenceData.buttons = [
          {
            label: (await strings).buttonViewMovie,
            url: document.URL
          }
        ];

        if (video.paused) {
          delete presenceData.endTimestamp;
          delete presenceData.startTimestamp;
        }
      }
    },
    "/filme/(dublado|legendado)/([a-zA-Z0-9-]+)": {
      disabled: privacy || !movie,
      async setPresenceData() {
        presenceData.details = (await strings).viewMovie;
        presenceData.state = document.querySelector(
          "div.infos_left > div > h2"
        ).textContent;

        presenceData.buttons = [
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
        presenceData.details = (await strings).viewAccount;
      }
    },
    "/pesquisa": {
      async setPresenceData() {
        presenceData.details = (await strings).searchFor;
        presenceData.state = new URLSearchParams(document.location.search).get(
          "titulo"
        );
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
              output: data.meta["title"]
            },
            {
              input: "%episode%",
              output: data.meta["episode"]
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
              output: data.meta["title"]
            },
            {
              input: "%episode%",
              output: data.meta["episode"]
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
              output: data.meta["title"]
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
              output: data.meta["title"]
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
      ((!settingValue && !setting.value) || settingValue === setting.value) &&
      setting.delete &&
      !setting.presence
    )
      for (const PData of setting.uses)
        delete presenceData[PData as keyof PresenceData];
    else if (setting.presence) {
      for (const presenceSetting of setting.presence) {
        if (document.location.pathname.match(presenceSetting.page)) {
          if (presenceSetting.setTo && !presenceSetting.replace)
            presenceData[presenceSetting.uses as "details"] =
              presenceSetting.setTo;
          else if (presenceSetting.setTo && presenceSetting.replace) {
            let replaced = presenceSetting.setTo;

            for (const toReplace of presenceSetting.replace)
              replaced = replaced.replace(toReplace.input, toReplace.output);

            if (replaced)
              presenceData[presenceSetting.uses as "details"] = replaced;
          }

          if (presenceSetting.if) {
            if (Array.isArray(presenceSetting.if)) {
              for (const setting of presenceSetting.if) {
                if (setting.k) {
                  if (setting.delete && !setting.v)
                    delete presenceData[presenceSetting.uses];
                  else if (setting.v)
                    presenceData[presenceSetting.uses as "details"] = setting.v;
                }
              }
            } else {
              if (presenceSetting.if.k) {
                if (presenceSetting.if.delete && !presenceSetting.if.v)
                  delete presenceData[presenceSetting.uses];
                else if (presenceSetting.if.v)
                  presenceData[presenceSetting.uses as "details"] =
                    presenceSetting.if.v;
              }
            }
          }
        }
      }
    }
  }

  for (const x of ["state", "details"])
    if (presenceData[x as "details"] === "undefined")
      delete presenceData[x as "details"];

  if (!presenceData.details) {
    presence.setActivity();
    presence.setTrayTitle();
  } else presence.setActivity(presenceData);
});
