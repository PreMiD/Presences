type Functionlize<T> = {
  [P in keyof T]: () => T[P];
};

interface Route extends Functionlize<Partial<PresenceData>> {
  path: RegExp;
  playback?(): boolean;
  run?(): PresenceData;
}

enum Settings {
  TIMESTAMP = "timestamp",
  BUTTONS = "buttons",
  LOGO = "logo"
}

enum Icons {
  PAUSED = "paused",
  PLAYED = "played",
  SEARCHING = "searching",
  LOCATION = "location",
  DISCOVERY = "discovery"
}

enum Logos {
  LIGHT = "light-logo",
  DARK = "dark-logo"
}

let video = { duration: 0, currentTime: 0, paused: true };

const presence = new Presence({
    clientId: "770030754356396052"
  }),
  startTimestamp: number = Math.floor(Date.now() / 1000),
  router = ({ path, data }: { path: string; data: PresenceData }): Route => {
    const routes: Route[] = [
      { path: /^\/$/, details: () => "On Homepage" },
      {
        path: /^\/episode\//,
        run: () => {
          const timestamps = presence.getTimestamps(
            Math.floor(video.currentTime),
            Math.floor(video.duration)
          );

          [, data.endTimestamp] = timestamps;

          if (video.paused) {
            delete data.startTimestamp;
            delete data.endTimestamp;
          }

          return data;
        },
        playback: () => !video.paused,
        smallImageKey: () => (video.paused ? Icons.PAUSED : Icons.PLAYED),
        smallImageText: () => (video.paused ? "Paused" : "Played"),
        state: () =>
          document
            .querySelectorAll(".container")[1]
            .textContent.slice(1, -1)
            .split(" ")
            .slice(0, -2)
            .join(" "),
        details: () =>
          `Episode: ${document
            .querySelectorAll(".container")[1]
            .textContent.slice(1, -1)
            .split(" ")
            .pop()}`,
        buttons: () => [
          { label: "Watch Episode", url: location.href },
          {
            label: "View Anime",
            url: document
              .querySelector(".anime-page-link")
              .querySelector("a")
              .getAttribute("href")
          }
        ]
      },
      {
        path: /^\/\?search_param=(.*)/,
        smallImageKey: () => Icons.SEARCHING,
        smallImageText: () => "Searching",
        details: () =>
          `Results: ${document.querySelectorAll(".col-lg-2").length ?? 0}`,
        state: () =>
          `Searching: ${document
            .querySelectorAll(".container")[1]
            .textContent.split(" ")
            .slice(4, -1)
            .join(" ")}`,
        buttons: () => [{ label: "Results", url: location.href }]
      },
      {
        path: /^\/anime\/(.*)/,
        smallImageKey: () => Icons.LOCATION,
        smallImageText: () => "Viewing",
        details: () => "Viewing an Anime",
        state: () => document.querySelector(".anime-details-title").textContent,
        buttons: () => [
          { label: "View Anime", url: location.href },
          {
            label: "Last Episode",
            url: document
              .querySelector("#DivEpisodesList")
              .lastElementChild.querySelector("a")
              .getAttribute("href")
          }
        ]
      },
      {
        path: /^\/(%d9%82%d8%a7%d8%a6%d9%85%d8%a9-%d8%a7%d9%84%d8%a7%d9%86%d9%85%d9%8a|anime-(.*))/,
        smallImageKey: () => Icons.DISCOVERY,
        smallImageText: () => "Browsing",
        details: () => "Browsing for Anime",
        buttons: () => [{ label: "Browse", url: location.href }]
      },
      {
        path: /^\/%d9%85%d9%88%d8%a7%d8%b9%d9%8a%d8%af-%d8%b9%d8%b1%d8%b6-%d8%ad%d9%84%d9%82%d8%a7%d8%aa-%d8%a7%d9%84%d8%a7%d9%86%d9%85%d9%8a/,
        smallImageKey: () => Icons.DISCOVERY,
        smallImageText: () => "Discovering",
        details: () => "Discovering Episodes Releases",
        buttons: () => [{ label: "Discover", url: location.href }]
      }
    ];

    return routes.find((route) => route.path.test(path));
  };

presence.on(
  "iFrameData",
  (data: { duration: number; currentTime: number; paused: boolean }) => {
    video = data;
  }
);

presence.on("UpdateData", async () => {
  const showTimestamp: boolean = await presence.getSetting(Settings.TIMESTAMP),
    showButtons: boolean = await presence.getSetting(Settings.BUTTONS),
    logo: number = await presence.getSetting(Settings.LOGO),
    logoArr = [Logos.LIGHT, Logos.DARK];

  let data: PresenceData = {
    largeImageKey: logoArr[logo] || Logos.LIGHT
  };

  if (showTimestamp) data.startTimestamp = startTimestamp;

  const path = location.href.replace(`https://${location.hostname}`, ""),
    route = router({ data, path });

  if (!route) return presence.setActivity(data);

  if (route.run) data = route.run();
  if (route.state) data.state = route.state();
  if (route.details) data.details = route.details();
  if (showButtons && route.buttons) data.buttons = route.buttons();
  if (route.largeImageKey) data.largeImageKey = route.largeImageKey();
  if (route.smallImageKey) data.smallImageKey = route.smallImageKey();
  if (route.smallImageText) data.smallImageText = route.smallImageText();

  if (showTimestamp && route.endTimestamp)
    data.endTimestamp = route.endTimestamp();

  presence.setActivity(data, route.playback ? route.playback() : false);
});
