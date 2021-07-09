const presence = new Presence({
    clientId: "823524858746241085"
  }),
  startTimestamp = Math.floor(Date.now() / 1000),
  pagesData: {
    [key: string]: {
      title?: string;
      episode?: string;
      day?: string;
      SearchQuery?: string;
    };
  } = {};

let playback: boolean,
  duration: number,
  currentTime: number,
  paused: boolean,
  PageStatus: string;

presence.on("iFrameData", (data: IFrameData) => {
  playback = data.iframe_video?.duration !== undefined ? true : false;

  if (playback) {
    duration = data.iframe_video.duration;
    currentTime = data.iframe_video.currentTime;
    paused = data.iframe_video.paused;
  }
});

presence.on("UpdateData", async () => {
  PageStatus = "";
  const presenceData: PresenceData = {
      largeImageKey: "logo"
    },
    presenceSettings: {
      [key in keyof PresenceData]:
        | boolean
        | {
            condition: {
              page: string;
              setTo?: string;
              enabled?: boolean;
              replace?: {
                toRepalce: {
                  text: "%episode%" | "%title%" | "%day%";
                  with: "episode" | "title" | "day";
                }[];
              };
              delete?: boolean;
            }[];
          };
    } = {
      endTimestamp: await presence.getSetting("timestamp"),
      startTimestamp: await presence.getSetting("timestamp"),
      buttons: await presence.getSetting("buttons"),
      state: {
        condition: [
          {
            page: "Searching",
            delete: true,
            enabled: await presence.getSetting("searchQuery")
          },
          {
            page: "WatchingAnime",
            setTo: await presence.getSetting("AnimeState"),
            replace: {
              toRepalce: [
                {
                  text: "%episode%",
                  with: "episode"
                },
                {
                  text: "%title%",
                  with: "title"
                }
              ]
            }
          },
          {
            page: "viewAnime",
            setTo: await presence.getSetting("ViewAnime2"),
            replace: {
              toRepalce: [
                {
                  text: "%title%",
                  with: "title"
                }
              ]
            }
          },
          {
            page: "ViewSchedule",
            setTo: await presence.getSetting("ViewSchedule2"),
            replace: {
              toRepalce: [
                {
                  text: "%day%",
                  with: "day"
                }
              ]
            }
          }
        ]
      },
      details: {
        condition: [
          {
            page: "WatchingAnime",
            setTo: await presence.getSetting("AnimeDetails"),
            replace: {
              toRepalce: [
                {
                  text: "%episode%",
                  with: "episode"
                },
                {
                  text: "%title%",
                  with: "title"
                }
              ]
            }
          },
          {
            page: "viewAnime",
            setTo: await presence.getSetting("ViewAnime"),
            replace: {
              toRepalce: [
                {
                  text: "%title%",
                  with: "title"
                }
              ]
            }
          },
          {
            page: "ViewSchedule",
            setTo: await presence.getSetting("ViewSchedule"),
            replace: {
              toRepalce: [
                {
                  text: "%day%",
                  with: "day"
                }
              ]
            }
          },
          {
            page: "Searching",
            setTo: "Seaching",
            enabled: await presence.getSetting("searchQuery")
          }
        ]
      }
    },
    pages = {
      "/schedule"() {
        const day = Array.from(document.querySelectorAll("span")).find((x) =>
          YouCanSeeThis(x)
        )?.textContent;

        if (day) {
          PageStatus = "ViewSchedule";
        } else {
          presenceData.details = "Viewing schedule";
        }

        presenceData.smallImageKey = "search";
        presenceData.startTimestamp = startTimestamp;

        return { day };
      },
      "/stream/"() {
        const timestamps = presence.getTimestamps(currentTime, duration),
          title = document
            .querySelector("span:nth-child(3) > a > span")
            ?.textContent.trim(),
          episode = (document
            .querySelector("div.entry-content > h2")
            ?.textContent.replace(title, "")
            .match(/[1-9]?[0-9]?[0-9]/g) || ["0"])[0];

        if (isNaN(duration)) {
          PageStatus = "viewAnime";

          presenceData.smallImageKey = "search";
          presenceData.smallImageText = `Episode ${episode}`;

          presenceData.startTimestamp = startTimestamp;

          presenceData.buttons = [
            {
              label: "View Anime",
              url: document.baseURI
            }
          ];

          return { title };
        } else {
          PageStatus = "WatchingAnime";

          presenceData.startTimestamp = timestamps[0];
          presenceData.endTimestamp = timestamps[1];

          presenceData.smallImageKey = paused ? "pause" : "play";
          presenceData.smallImageText = paused ? "Paused" : "Playing";

          presenceData.buttons = [
            {
              label: "Watch Episode",
              url: document.baseURI
            },
            {
              label: "View Series",
              url: document.querySelector<HTMLAnchorElement>(
                "div.breadcrumb > span:nth-child(3) > a"
              ).href
            }
          ];

          if (paused) {
            delete presenceData.startTimestamp;
            delete presenceData.endTimestamp;
          }

          return { title, episode };
        }
      },
      "/anime/"() {
        PageStatus = "viewAnime";

        presenceData.smallImageKey = "search";
        presenceData.startTimestamp = startTimestamp;

        presenceData.buttons = [
          {
            label: "View Anime",
            url: document.baseURI
          }
        ];

        return { title: document.querySelector("h1 > div")?.textContent };
      },
      "/browse/"() {
        const SearchQuery = new URLSearchParams(document.location.search).get(
          "search"
        );

        if (SearchQuery) {
          PageStatus = "Searching";

          presenceData.details = "Seaching for:";
          presenceData.state = SearchQuery;

          presenceData.smallImageKey = "search";
          presenceData.startTimestamp = startTimestamp;

          return { SearchQuery };
        } else {
          presenceData.details = "Browsing...";
          presenceData.startTimestamp = startTimestamp;
        }
      }
    };

  for (const [pathname, setPresenceData] of Object.entries(pages)) {
    if (document.location.pathname.includes(pathname)) {
      if (!PageStatus) PageStatus = pathname.replace(/\//g, "");
      pagesData[PageStatus] = setPresenceData();
    }
  }

  for (const [setting, settingData] of Object.entries(presenceSettings)) {
    if (typeof settingData !== "boolean") {
      for (const condition of settingData.condition) {
        if (
          condition.page === PageStatus &&
          condition.setTo &&
          !condition.enabled &&
          !condition.replace &&
          !condition.delete
        ) {
          presenceData[setting as "state" | "details"] = condition.setTo;
        } else if (
          condition.page === PageStatus &&
          !condition.enabled &&
          condition.delete
        ) {
          delete presenceData[setting as keyof PresenceData];
        } else if (condition.page === PageStatus && condition.replace) {
          let replaced = condition.setTo;

          for (const replace of condition.replace.toRepalce)
            replaced = replaced.replace(
              replace.text,
              (pagesData[condition.page] || {})[replace.with] || "Loading..."
            );

          presenceData[setting as "state" | "details"] = replaced;
        } else if (condition.delete && !condition.enabled)
          delete presenceData[setting as keyof PresenceData];
      }
    } else if (!settingData) delete presenceData[setting as keyof PresenceData];
  }

  if (!presenceData.details) {
    presence.setActivity();
    presence.setTrayTitle();
  } else {
    presence.setActivity(presenceData);
  }
});

/**
 * Check if you can see this Element
 * @param element The element you want to check
 * @returns The result you want
 */

function YouCanSeeThis(element: HTMLElement) {
  const clientRect = element.getBoundingClientRect();
  return (
    clientRect.top >= 0 &&
    clientRect.left >= 0 &&
    clientRect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    clientRect.right <=
      (window.innerWidth || document.documentElement.clientWidth)
  );
}

interface IFrameData {
  iframe_video: {
    duration: number;
    currentTime: number;
    paused: boolean;
  };
}
