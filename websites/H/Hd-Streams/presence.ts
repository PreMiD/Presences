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
  const matchYoutubeUrl = (url: string): boolean =>
      !!url.match(
        /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w-]+\?v=|embed\/|v\/)?)([\w-]+)(\S+)?$/gm
      ),
    pages: PageContext[] = [
      {
        middleware: (ref) =>
          !!ref.location.pathname.match(
            /^\/(movies|series)\/[a-z0-9]+(?:-[a-z0-9]+)*/i
          ),
        exec: (
          context,
          data,
          { strings, images, frame }: ExecutionArguments
        ) => {
          if (!context) return null;
          const partName = location.pathname.match(/^\/(movies|series)\//i)[1];
          if (!partName) return null;
          const type: "movie" | "series" | "other" =
            partName === "series"
              ? "series"
              : partName === "movies"
              ? "movie"
              : "other";
          data.details = !frame
            ? strings.browsing
            : type === "movie"
            ? strings.watchingMovie
            : type === "series"
            ? strings.watchingSeries
            : strings.playing;
          data.state = (
            document.querySelector(
              ".v-main__wrap .v-breadcrumbs > li:last-child > a"
            ) ||
            document.querySelector(
              ".v-main__wrap .v-breadcrumbs > li:last-child .v-btn__content"
            )
          )?.textContent
            .trim()
            .replace(/\r?\n(.*)/g, "");
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
        },
        destroy: (data) => {
          if (data.startTimestamp) delete data.startTimestamp;
          if (data.endTimestamp) delete data.endTimestamp;
          if (data.state) delete data.state;
        }
      },
      {
        middleware: (ref) =>
          !!ref.location.pathname.match(
            /^\/(actors)\/[a-z0-9]+(?:-[a-z0-9]+)*/i
          ),
        exec: (context, data, { strings, images }: ExecutionArguments) => {
          if (!context) return null;
          data.details = strings.viewPage;
          data.state = document
            .querySelector(".v-main__wrap .v-breadcrumbs > li:last-child > a")
            ?.textContent.trim();
          data.smallImageKey = images.SEARCH;
          data.buttons = [
            {
              label: strings.buttonViewPage,
              url: document.location.href
            }
          ];
          return data;
        },
        destroy: (data) => {
          if (data.buttons) delete data.buttons;
        }
      },
      {
        middleware: (ref) =>
          !!ref.location.pathname.match(
            /^\/(movies|series|seasons|actors|popular|cinema)$/i
          ),
        exec: (context, data, { strings, images }: ExecutionArguments) => {
          if (!context) return null;
          const type = location.pathname.match(
            /^\/(movies|series|seasons|actors|popular|cinema)$/i
          )[1];
          data.details = strings.searching;
          data.state = {
            movies: "Movies",
            series: "Series",
            seasons: "Series Seasons",
            actors: "Actors",
            popular: "Popular Series/Movies",
            cinema: "Cinema titles"
          }[type];
          data.smallImageKey = images.SEARCH;
          return data;
        }
      },
      {
        middleware: (ref) => !!ref.location.hostname.match(/hd-streams/i),
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
      clientId: "825696879223635988"
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
            viewPage: "general.viewPage",
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
      if (
        Array.from(document.querySelectorAll("iframe")).filter(
          (x) => !matchYoutubeUrl(x.src)
        ).length === 0 &&
        frameData
      )
        frameData = null;
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
