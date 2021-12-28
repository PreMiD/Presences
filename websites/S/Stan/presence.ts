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
    meta: {},
    startedSince: ~~(Date.now() / 1000),
    oldLang: "null"
  };

let strings: Awaited<ReturnType<typeof getStrings>>;

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
      largeImageKey: "stan",
      details: strings.browse,
      smallImageKey: "browse",
      startTimestamp: data.startedSince
    },
    [newLang, privacy] = await Promise.all([
      presence.getSetting<string>("lang").catch(() => "en"),
      presence.getSetting<boolean>("privacy")
    ]);

  if (data.oldLang !== newLang || !strings) {
    data.oldLang = newLang;
    strings = await getStrings();
  }

  data.presence = {
    "/programs/([0-9]+)/play": {
      async setPresenceData() {
        const video = document.querySelector("video");

        data.meta.title =
          document.querySelector("h1.vjs-metadata.vjs-metadata--title")
            ?.textContent ?? "Loading...";
        data.meta.episode = document.querySelector(
          "h2.vjs-metadata.vjs-metadata--subtitle"
        )?.textContent;

        presenceData.smallImageKey = video.paused ? "pause" : "play";
        presenceData.smallImageText = video.paused
          ? strings.pause
          : strings.play;

        [, presenceData.endTimestamp] = presence.getTimestampsfromMedia(video);

        presenceData.buttons = [
          {
            label: data.meta.episode ? strings.viewEpisode : "Watch Video",
            url: document.URL
          }
        ];

        if (video.paused) {
          delete presenceData.endTimestamp;
          delete presenceData.startTimestamp;
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
        presenceData.details = strings.viewList;
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
        presenceData.details = strings.searchFor;
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
            v: strings.searchSomething
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
              replaced = replaced.replace(toReplace.input, toReplace.output);

            if (replaced)
              presenceData[presenceSetting.uses as "details"] = replaced;
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
  presence.setActivity(presenceData);
});
