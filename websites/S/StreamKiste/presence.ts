interface PageContext {
  middleware: (ref: Window, ...args: unknown[]) => boolean;
  exec: (
    context: Presence,
    data: PresenceData,
    options?: { [key: string]: unknown }
  ) => Promise<PresenceData> | PresenceData;
  destroy?: (data?: PresenceData) => void;
}
interface LocalizedStrings {
  [key: string]: string;
}

interface ExecutionArguments {
  frame: VideoContext;
  strings: LocalizedStrings;
  images: { [key: string]: string };
  [key: string]: unknown;
}
interface VideoContext {
  duration: number;
  currentTime: number;
  paused: boolean;
}
function getQuery() {
  const queryString = location.search.split("?", 2),
    query =
      queryString && queryString.length > 0 && queryString[1]
        ? queryString[1].split("&").reduce(function (l, r) {
            const entry = r ? r.split("=", 2) : null;
            if (entry == null) return l;
            return Object.assign(l, { [entry[0]]: entry[1] });
          }, {})
        : {};
  return query;
}
(function () {
  const pages: PageContext[] = [
      {
        middleware: (ref) =>
          !!ref.location.pathname.match(/^\/(movie|serie)\//i),
        exec: (
          context,
          data,
          { strings, images, frame }: ExecutionArguments
        ) => {
          if (!context) return null;
          const partName = location.pathname.match(/^\/(movie|serie)\//i)[1];
          if (!partName) return null;
          const type: "movie" | "series" | "other" =
            partName === "serie"
              ? "series"
              : partName === "movie"
              ? "movie"
              : "other";
          data.details = !frame
            ? strings.browsing
            : type === "movie"
            ? strings.watchingMovie
            : type === "series"
            ? strings.watchingSeries
            : strings.playing;
          data.state = document.querySelector(
            ".single-content.movie .title>h1"
          )?.textContent;
          if (frame) {
            const [startTimestamp, endTimestamp] = context.getTimestamps(
              frame.currentTime,
              frame.duration
            );
            data.details = strings.playing;
            data.smallImageKey = frame.paused ? images.PAUSE : images.PLAY;
            data.smallImageText = `${strings.playing} ${data.state}`;
            if (!frame.paused) {
              data.startTimestamp = startTimestamp;
              data.endTimestamp = endTimestamp;
            } else {
              if (data.startTimestamp) delete data.startTimestamp;
              if (data.endTimestamp) delete data.endTimestamp;
            }
          } else {
            data.smallImageKey = images.BROWSE;
            if (data.startTimestamp) delete data.startTimestamp;
            if (data.endTimestamp) delete data.endTimestamp;
          }
          data.buttons = [
            {
              label:
                strings[
                  {
                    movie: "buttonViewMovie",
                    series: "buttonViewSeries",
                    other: "buttonViewPage"
                  }[type]
                ],
              url: document.location.href
            }
          ];
          return data;
        }
      },
      {
        middleware: (ref) => !!ref.location.pathname.match(/^\/(cat)\//i),
        exec: (context, data, { strings, images }: ExecutionArguments) => {
          if (!context) return null;
          data.details = strings.searching;
          if (
            document
              .querySelector(`.category .arg > .type`)
              ?.textContent.toLowerCase()
              .indexOf("genre") === 0
          ) {
            data.state = `${strings.viewGenre} ${
              document.querySelector(`.category .arg > .q.arg_category`)
                ?.textContent
            }`;
          } else {
            delete data.state;
          }
          data.smallImageKey = images.SEARCH;
          return data;
        }
      },
      {
        middleware: (ref) => !!ref.location.hostname.match(/streamkiste/i),
        exec: (context, data, { strings, images }: ExecutionArguments) => {
          if (!context) return null;
          data.details = strings.browsing;
          delete data.state;
          data.smallImageKey = images.BROWSE;
          return data;
        }
      }
    ],
    presence = new Presence({
      clientId: "825531268581818419"
    });

  (function (app: Presence) {
    let lastPageIndex: number,
      currentLang: string,
      localizedStrings: { [key: string]: string },
      frameData: VideoContext;
    const IMAGES = {
      LOGO: "logox1024",
      PLAY: "playx1024",
      PAUSE: "pausex1024",
      BROWSE: "browsex1024",
      SEARCH: "searchx1024"
    };
    app.on("iFrameData", (data: VideoContext) => {
      frameData = data;
    });
    app.on("UpdateData", async () => {
      const newLang = await app.getSetting("lang");
      if (newLang !== currentLang) {
        currentLang = newLang;
        localizedStrings = await app.getStrings(
          {
            browsing: "presence.activity.browsing",
            watchingMovie: "general.watchingMovie",
            watchingSeries: "general.watchingSeries",
            buttonViewMovie: "general.buttonViewMovie",
            buttonViewSeries: "general.buttonViewSeries",
            buttonViewPage: "general.buttonViewPage",
            viewGenre: "general.viewGenre",
            playing: "general.playing",
            searching: "general.search",
            searchFor: "general.searchFor"
          },
          newLang
        );
      }
      const presenceData: PresenceData = {
          largeImageKey: IMAGES.LOGO
        },
        query: { [key: string]: unknown } = getQuery(),
        pageIndex = pages.findIndex((x) => x.middleware(window, [query])),
        context = pages[pageIndex];
      if (!context) return false;

      const result = Promise.resolve(
        context.exec(app, presenceData, {
          frame: frameData,
          strings: localizedStrings,
          query,
          images: IMAGES
        })
      );
      return await result
        .then((data) => {
          if (
            lastPageIndex !== undefined &&
            lastPageIndex !== pageIndex &&
            pages[lastPageIndex] &&
            typeof pages[lastPageIndex].destroy === "function"
          ) {
            pages[lastPageIndex].destroy(data);
            lastPageIndex = pageIndex;
          }
          if (!data) {
            presence.setTrayTitle();
            presence.setActivity({
              largeImageKey: IMAGES.LOGO,
              state: localizedStrings.browsing
            });
          } else {
            if (data.details) presence.setActivity(data);
            if (data.buttons && data.buttons.length === 0) delete data.buttons;
            else data.buttons = data.buttons?.slice(0, 2);
          }
          return data;
        })
        .catch(presence.error);
    });
  })(presence);
})();
