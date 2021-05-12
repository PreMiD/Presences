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
  strings: LocalizedStrings;
  images: { [key: string]: string };
  [key: string]: unknown;
}
interface GameEntity {
  "@type": string;
  name: string;
  applicationCategory: string;
  image: string;
  operatingSystem: string;
  softwareVersion: string;
  description: string;
}

function getGameEntity(): GameEntity {
  const object = Array.from(
    document.querySelectorAll(`script[type="application/ld+json"]`)
  )
    .find((x) => x.textContent.indexOf(`"@type": "SoftwareApplication"`) !== -1)
    ?.textContent.replace(/\r?\n/g, ""); // filter out new lines - required by json
  if (!object) return null;
  return JSON.parse(object);
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
  const timers: { [key: string]: Date } = {},
    pages: PageContext[] = [
      {
        middleware: (ref) =>
          !!ref.location.pathname.match(/^\/games\/(.*)\/play/i),
        exec: (context, data, { strings, images }: ExecutionArguments) => {
          if (!context) return null;
          const game = {
            name: document.title.replace(/ \| Nutaku$/g, "")
          };
          if (!timers.playing) timers.playing = new Date();
          data.startTimestamp = timers.playing.getTime();
          data.details = strings.playing;
          data.state = game.name;
          data.smallImageKey = images.PLAY;
          data.smallImageText = game.name;
          data.buttons = [
            {
              label: strings.viewPageButton,
              url: document.location.href.replace(/play\/$/, "")
            }
          ];
          return data;
        },
        destroy(data) {
          delete timers.playing;
          if (data?.buttons) delete data.buttons;
        }
      },
      {
        middleware: (ref) =>
          !!ref.location.pathname.match(/^\/games/i) &&
          !!document.querySelector(".cnt-game-catalog > .game-search"),
        exec: (context, data, { strings, images }: ExecutionArguments) => {
          if (!context) return null;
          data.details = strings.searching;
          let search: string;
          if (
            !(search = document.querySelector<HTMLInputElement>(
              `.modal.open input.search-field[data-search-url]`
            )?.value)
          ) {
            delete data.state;
            delete data.smallImageText;
          } else {
            data.state = search;
            data.smallImageText = `${strings.searchingFor} ${search}`;
          }
          data.smallImageKey = images.BROWSE;
          return data;
        }
      },
      {
        middleware: (ref) =>
          !!ref.location.pathname.match(/^\/games\/(.*)\/$/i),
        exec: (context, data, { strings, images }: ExecutionArguments) => {
          if (!context) return null;
          const game = getGameEntity();
          if (!game) return null;
          data.details = strings.browsing;
          data.state = game.name;
          data.smallImageKey = images.BROWSE;
          data.smallImageText = game.name;
          data.buttons = [
            {
              label: strings.viewPageButton,
              url: document.location.href.replace(/play\/$/, "")
            }
          ];
          return data;
        }
      },
      {
        middleware: (ref) =>
          !!ref.location.pathname.match(/^\/news-(page|updates)\/(\d+)\//i),
        exec: (context, data, { strings, images }: ExecutionArguments) => {
          if (!context) return null;
          if (!timers.readingArticle) timers.readingArticle = new Date();
          data.startTimestamp = timers.readingArticle.getTime();
          data.details = strings.readingArticle;
          data.state = document.title;
          data.smallImageKey = images.BROWSE;
          data.smallImageText = `${strings.readingArticle} ${document.title}`;
          data.buttons = [
            {
              label: strings.readingArticleButton,
              url: document.location.href
            }
          ];
          return data;
        },
        destroy(data) {
          delete timers.readingArticle;
          if (data?.buttons) delete data.buttons;
        }
      },
      {
        middleware: (ref) =>
          !!ref.location.pathname.match(/^\/news-(page|updates)/i),
        exec: (context, data, { strings, images }: ExecutionArguments) => {
          if (!context) return null;
          data.details = strings.browsing;
          data.state = "News";
          data.smallImageKey = images.BROWSE;
          data.smallImageText = "News";
          return data;
        }
      },
      {
        middleware: (ref) => !!ref.location.hostname.match(/nutaku.net/i),
        exec: (context, data, { strings }: ExecutionArguments) => {
          if (!context) return null;
          data.details = strings.browsing;
          delete data.state;
          if (data.smallImageKey) delete data.smallImageKey;
          return data;
        }
      }
    ],
    presence = new Presence({
      clientId: "823951719331004426"
    });

  (function (app: Presence) {
    let lastPageIndex: number,
      currentLang: string,
      localizedStrings: { [key: string]: string };
    const IMAGES = {
      LOGO: "logox1024",
      PLAY: "playx1024",
      PAUSE: "pausex1024",
      BROWSE: "browsex1024"
    };
    app.on("UpdateData", async () => {
      const newLang = await app.getSetting("lang");
      if (newLang !== currentLang) {
        currentLang = newLang;
        localizedStrings = await app.getStrings(
          {
            browsing: "presence.activity.browsing",
            playing: "general.playing",
            readingArticle: "general.readingArticle",
            readingArticleButton: "general.buttonReadArticle",
            searching: "general.search",
            searchFor: "general.searchFor",
            viewPageButton: "general.buttonViewPage"
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
