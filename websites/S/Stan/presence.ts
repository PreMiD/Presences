const presence = new Presence({
    clientId: "835732953844940822"
  }),
  getStrings = async () => {
    return presence.getStrings(
      {
        play: "general.playing",
        pause: "general.paused",
        browse: "general.browsing",
        watchingSeries: "general.watchingSeries",
        searchFor: "general.searchFor",
        searchSomething: "general.searchSomething",
        viewEpisode: "general.buttonViewEpisode",
        watchVideo: "general.buttonWatchVideo",
        viewList: "netflix.viewList"
      },
      await presence.getSetting<string>("lang").catch(() => "en")
    );
  },
  data: {
    oldLang?: string;
    startedSince?: number;
    meta?: {
      [key: string]: string;
    };
    strings: Awaited<ReturnType<typeof getStrings>>;
    coverUrls?: {
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
        if?: {
          k: boolean;
          v?: string;
          delete?: boolean;
        };
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
    coverUrls: {},
    strings: null,
    meta: {},
    startedSince: Math.round(Date.now() / 1000),
    oldLang: null
  };

async function getShortURL(url: string) {
  if (!url || url.length < 256) return url;
  if (data.coverUrls[url]) return data.coverUrls[url];
  try {
    const pdURL = await (
      await fetch(`https://pd.premid.app/create/${url}`)
    ).text();
    data.coverUrls[url] = pdURL;
    return pdURL;
  } catch (err) {
    presence.error(err);
    return url;
  }
}

presence.on("UpdateData", async () => {
  const [newLang, privacy, cover] = await Promise.all([
    presence.getSetting<string>("lang").catch(() => "en"),
    presence.getSetting<boolean>("privacy"),
    presence.getSetting<boolean>("cover")
  ]);

  if (data.oldLang !== newLang || !data.strings) {
    data.oldLang = newLang;
    data.strings = await getStrings();
  }

  const presenceData: PresenceData = {
    largeImageKey: "stan",
    details: data.strings.browse,
    smallImageKey: "browse",
    startTimestamp: data.startedSince
  };

  data.presence = {
    "/programs/([0-9]+)/play": {
      async setPresenceData() {
        const video = document.querySelector("video");

        if (video) {
          data.meta.title = document.querySelector(
            "h1.vjs-metadata.vjs-metadata--title"
          )?.textContent;
          data.meta.episode = document.querySelector(
            "h2.vjs-metadata.vjs-metadata--subtitle"
          )?.textContent;
          data.meta.coverUrl = document
            .querySelector<HTMLElement>(".vjs-end-slate-image")
            ?.style?.backgroundImage?.match(/url\("(.*)"\)/)?.[1];

          presenceData.smallImageKey = video.paused ? "pause" : "play";
          presenceData.smallImageText = video.paused
            ? data.strings.pause
            : data.strings.play;

          presenceData.endTimestamp = presence
            .getTimestampsfromMedia(video)
            .pop();

          presenceData.buttons = [
            {
              label: data.meta.episode
                ? data.strings.viewEpisode
                : data.strings.watchVideo,
              url: document.URL
            }
          ];

          if (video.paused) {
            delete presenceData.endTimestamp;
            delete presenceData.startTimestamp;
          }
        }
      }
    },
    "/programs/([0-9]+)": {
      disabled: privacy,
      setPresenceData() {
        presenceData.details = "Viewing program:";
        presenceData.state =
          document.querySelector<HTMLImageElement>(
            "img.program__title.program__title--logo"
          )?.alt ?? document.querySelector("h1.program__title")?.textContent;

        presenceData.buttons = [
          {
            label: "View Program",
            url: document.URL
          }
        ];
      }
    },
    "/my/list": {
      disabled: privacy,
      async setPresenceData() {
        presenceData.details = data.strings.viewList;
      }
    },
    "/my/history": {
      disabled: privacy,
      async setPresenceData() {
        presenceData.details = "Viewing their watch history";
      }
    },
    "/search": {
      async setPresenceData() {
        presenceData.details = data.strings.searchFor;
        presenceData.state = new URLSearchParams(document.location.search).get(
          "q"
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
          page: "/search",
          uses: "state",
          if: {
            k: privacy,
            delete: true
          }
        },
        {
          page: "/search",
          uses: "details",
          if: {
            k: privacy,
            v: data.strings.searchSomething
          }
        },
        {
          page: "/programs/([0-9]+)/play",
          uses: "details",
          setTo: await presence.getSetting<string>("seriesDetail"),
          if: {
            k: privacy,
            v: "Watching something"
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
          page: "/programs/([0-9]+)/play",
          uses: "state",
          setTo: await presence.getSetting<string>("seriesState"),
          if: {
            k: privacy,
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
          page: "/programs/([0-9]+)/play",
          uses: "largeImageKey",
          if: {
            k: cover,
            v: await getShortURL(data.meta.coverUrl)
          }
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
      .getSetting<boolean>(setting.id)
      .catch(() => null);

    if (
      ((!settingValue && !setting.value) || settingValue === setting.value) &&
      setting.delete &&
      !setting.presence
    )
      for (const PData of setting.uses) delete presenceData[PData];
    else if (setting.presence) {
      for (const presenceSetting of setting.presence) {
        if (document.location.pathname.match(presenceSetting.page)) {
          if (presenceSetting.setTo && !presenceSetting.replace) {
            presenceData[presenceSetting.uses as "details"] =
              presenceSetting.setTo;
          } else if (presenceSetting.setTo && presenceSetting.replace) {
            let replaced = presenceSetting.setTo;

            for (const toReplace of presenceSetting.replace)
              replaced = replaced.replace(
                toReplace.input,
                toReplace.output ?? ""
              );

            presenceData[presenceSetting.uses as "details"] = replaced.trim();
          }

          if (presenceSetting.if) {
            if (presenceSetting.if.k && presenceSetting.if.delete)
              delete presenceData[presenceSetting.uses];
            else if (presenceSetting.if.k && presenceSetting.if.v) {
              presenceData[presenceSetting.uses as "details"] =
                presenceSetting.if.v;
            }
          }
        }
      }
    }
  }

  if (presenceData.details) presence.setActivity(presenceData);
  else presence.setActivity();
});
