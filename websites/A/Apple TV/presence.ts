class AppleTV extends Presence {
  constructor(presenceOptions: PresenceOptions) {
    super(presenceOptions);
  }

  getVideo() {
    return document
      .querySelector("apple-tv-plus-player")
      .shadowRoot.querySelector("amp-video-player-internal")
      .shadowRoot.querySelector("amp-video-player")
      .shadowRoot.querySelector(
        "#apple-music-video-player"
      ) as HTMLVideoElement;
  }

  getTitle(eyebrow = false) {
    if (this.isWatching()) {
      const title = document
        .querySelector("apple-tv-plus-player")
        .shadowRoot.querySelector("amp-video-player-internal")
        .shadowRoot.querySelector("div.info__eyebrow")?.textContent;

      if (title || eyebrow) return title;
      else
        return document
          .querySelector("apple-tv-plus-player")
          .shadowRoot.querySelector("amp-video-player-internal")
          .shadowRoot.querySelector("div.info__title")?.textContent;
    }
    const title = document.querySelector(
      "div.product-header__image-logo.clr-primary-text-on-dark > a > h2"
    )?.textContent;

    if (title) return title;
    else return document.querySelector<HTMLImageElement>("img").alt;
  }

  getEpisodeTitle() {
    return document
      .querySelector("apple-tv-plus-player")
      .shadowRoot.querySelector("amp-video-player-internal")
      .shadowRoot.querySelector("div.info__title")?.textContent;
  }

  isWatching() {
    return !!document
      .querySelector("apple-tv-plus-player")
      .shadowRoot.querySelector("amp-video-player-internal")
      .shadowRoot.querySelector("div.info__title")?.textContent;
  }
}

const presence = new AppleTV({
    clientId: "835157562432290836"
  }),
  data: {
    startedSince: number;
    settings?: {
      id: string;
      delete?: boolean;
      data: string[];
    }[];
    presence: {
      [key: string]: {
        setPresenceData?: () => void;
      };
    };
  } = {
    presence: {},
    startedSince: Math.floor(Date.now() / 1000)
  };

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "apple-tv",
    details: "Browsing...",
    smallImageKey: "browse",
    startTimestamp: data.startedSince
  };

  data.presence = {
    "/(show|episode)/([a-zA-Z0-9-]+)": {
      setPresenceData() {
        if (presence.isWatching()) {
          const video = presence.getVideo(),
            timestamps = presence.getTimestampsfromMedia(video);

          if (presence.getTitle(true)) {
            presenceData.details = presence.getTitle();
            presenceData.state = `${presence.getEpisodeTitle()}`;
          } else {
            presenceData.details = document.querySelector(
              "#about-footer > div.product-footer__info > div > div.review-card__title.typ-headline-emph > span"
            ).textContent;
            presenceData.state = `Trailer • ${presence.getTitle()}`;
          }

          presenceData.smallImageText = video.paused ? "Paused" : "Playing";
          presenceData.smallImageKey = video.paused ? "pause" : "play";

          presenceData.buttons = [
            {
              label: "Watch Show",
              url: document.URL
            }
          ];

          presenceData.endTimestamp = timestamps[1];

          if (video.paused) {
            delete presenceData.startTimestamp;
            delete presenceData.endTimestamp;
          }
        } else {
          presenceData.details = "Viewing show:";
          presenceData.state = presence.getTitle();

          presenceData.buttons = [
            {
              label: "View Show",
              url: document.URL
            }
          ];
        }
      }
    },
    "/movie/([a-zA-Z0-9-]+)": {
      setPresenceData() {
        if (presence.isWatching()) {
          const video = presence.getVideo(),
            timestamps = presence.getTimestampsfromMedia(video);

          presenceData.details = presence.getTitle();
          presenceData.state = "Movie";

          presenceData.smallImageText = video.paused ? "Paused" : "Playing";
          presenceData.smallImageKey = video.paused ? "pause" : "play";

          presenceData.buttons = [
            {
              label: "Watch Movie",
              url: document.URL
            }
          ];

          presenceData.endTimestamp = timestamps[1];

          if (video.paused) {
            delete presenceData.startTimestamp;
            delete presenceData.endTimestamp;
          }
        } else {
          presenceData.details = "Viewing movie:";
          presenceData.state = presence.getTitle();

          presenceData.buttons = [
            {
              label: "View Movie",
              url: document.URL
            }
          ];
        }
      }
    },
    "/person/([a-zA-Z0-9-]+)": {
      setPresenceData() {
        presenceData.details = "Viewing person:";
        presenceData.state = document.querySelector(
          "div.person-header__bio > h1"
        )?.textContent;
      }
    },
    "/settings": {
      setPresenceData() {
        presenceData.details = "Viewing their settings";
      }
    }
  };

  data.settings = [
    {
      id: "timestamp",
      delete: true,
      data: ["startTimestamp", "endTimestamp"]
    },
    {
      id: "buttons",
      delete: true,
      data: ["buttons"]
    }
  ];

  for (const [pathname, PData] of Object.entries(data.presence)) {
    if (document.location.pathname.match(pathname)) PData.setPresenceData();
  }

  for (const setting of data.settings) {
    const settingValue = await presence.getSetting(setting.id);

    if (!settingValue && setting.delete)
      for (const PData of setting.data)
        delete presenceData[PData as keyof PresenceData];
  }

  presence.setActivity(presenceData);
});
