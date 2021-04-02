interface PageContext {
  middleware: (ref: Window, ...args: unknown[]) => boolean;
  exec: (
    context: Presence,
    data: PresenceData,
    options?: { [key: string]: unknown }
  ) => Promise<PresenceData> | PresenceData;
}
interface LocalizedStrings {
  [key: string]: string;
}
interface AnimeVideoEntity {
  "@type": string;
  name: string;
  duration: string;
  description: string;
  thumbnail: string;
  thumbnailUrl: string;
  contentUrl: string;
  uploadDate: string;
}

interface AnimeEpisodeEntity {
  "@type": string;
  url: string;
  name: string;
  inLanguage: string;
  subtitleLanguage: string;
  episodeNumber: number;
  thumbnailUrl: string;
  position: number;
}

interface AnimeEntity {
  "@id": string;
  url: string;
  "@type": string;
  name: string;
  alternateName: string;
  description: string;
  image: string;
  inLanguage: string;
  numberOfEpisodes: number;
  aggregateRating: AggregateRating;
}

interface AggregateRating {
  "@type": string;
  ratingValue: string;
  ratingCount: number;
  worstRating: number;
  bestRating: number;
}

interface ExecutionArguments {
  strings: LocalizedStrings;
  images: { [key: string]: string };
  [key: string]: unknown;
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
function getAnimeEntity(): AnimeEntity {
  const object = Array.from(
    document.querySelectorAll(`script[type="application/ld+json"]`)
  ).find(
    (x) =>
      x.textContent.indexOf(location.pathname) !== -1 &&
      x.textContent.indexOf(`"@type":"TVSeries"`) !== -1
  )?.textContent;
  if (!object) return null;
  return JSON.parse(object);
}
function getAnimeEpsiodeEntity(): AnimeEpisodeEntity {
  const object = Array.from(
    document.querySelectorAll(`script[type="application/ld+json"]`)
  ).find(
    (x) =>
      x.textContent.indexOf(location.pathname) !== -1 &&
      x.textContent.indexOf(`"@type":"TVEpisode"`) !== -1
  )?.textContent;
  if (!object) return null;
  return JSON.parse(object);
}
(function () {
  const pages: PageContext[] = [
      {
        middleware: (ref) =>
          !!ref.location.pathname.match(
            /series\/(\d+)(.*)\/episode\/(\d+)(.*)/i
          ),
        exec: (context, data, { strings, images }: ExecutionArguments) => {
          if (!context) return null;
          const animeData = getAnimeEntity(),
            animeEpisode = getAnimeEpsiodeEntity();
          if (!animeData) return data;
          const videoInstance = document.querySelector<HTMLVideoElement>(
              `.jw-wrapper video`
            ),
            videoTime = context.getTimestamps(
              videoInstance.currentTime,
              videoInstance.duration
            );
          data.state = `${animeEpisode.episodeNumber} - ${
            animeData.alternateName || animeData.name
          }`;
          data.smallImageText = `Episode ${animeEpisode.episodeNumber}`;
          data.smallImageKey = videoInstance.paused
            ? images.PAUSE
            : images.PLAY;
          data.details = strings.viewEpisode;
          if (videoInstance.paused) {
            if (data.startTimestamp) delete data.startTimestamp;
            if (data.endTimestamp) delete data.endTimestamp;
          } else {
            data.startTimestamp = videoTime[0];
            data.endTimestamp = videoTime[1];
          }
          return data;
        }
      },
      {
        middleware: (ref) =>
          !!ref.location.pathname.match(/series\/(\d+)(.*)/i),
        exec: (context, data, { strings, images }: ExecutionArguments) => {
          if (!context) return null;
          const animeData = getAnimeEntity();
          if (!animeData) return data;
          data.state = `${animeData.alternateName || animeData.name}`;
          data.smallImageText = animeData.name;
          data.smallImageKey = images.BROWSE;
          data.details = strings.viewAnime;
          return data;
        }
      },
      {
        middleware: (ref) => !!ref.location.pathname.match(/^\/series$/i),
        exec: (context, data, { strings, images }: ExecutionArguments) => {
          if (!context) return null;
          const searchSidebar = document.querySelector(`.uk-filter-content`);
          if (!searchSidebar) return data;
          const searchedValue = searchSidebar.querySelector<HTMLInputElement>(
              `input[type="text"]`
            )?.value,
            isExclude =
              searchSidebar
                .querySelector<HTMLInputElement>(
                  `.uk-section-content:nth-child(2) input[type="text"]`
                )
                ?.value.toLowerCase() === "exclude";
          if (!searchedValue) {
            const genres = Array.from(
              searchSidebar.querySelectorAll(
                isExclude
                  ? `#genre-container > li:nth-child(2) .el-checkbox`
                  : `#genre-container .el-checkbox`
              )
            );
            let activatedGenres: string[] = [];
            if (
              genres.length > 0 &&
              (activatedGenres = genres
                .filter((x) => x.classList.contains("is-checked"))
                .map((x) => x.querySelector(".el-checkbox__label").textContent))
                .length > 0
            ) {
              data.state = `${
                isExclude ? "Exclude - " : ""
              } ${activatedGenres.slice(0, 5).join(", ")}`;
            } else {
              data.state = "-";
            }
          } else {
            data.state = searchedValue;
          }
          data.smallImageText = strings.searching;
          data.smallImageKey = images.BROWSE;
          data.details = strings.searchFor;
          return data;
        }
      },
      {
        middleware: (ref) => !!ref.location.pathname.match(/schedule/i),
        exec: (context, data, { strings, images }: ExecutionArguments) => {
          if (!context) return null;
          data.details = strings.viewPage;
          data.state = "Schedule";
          data.smallImageKey = images.BROWSE;
          data.smallImageText = strings.browsing;
          return data;
        }
      },
      {
        middleware: (ref) => !!ref.location.hostname.match(/animefever.tv/i),
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
      clientId: "823505641548283934"
    });

  (function (app: Presence) {
    let currentLang: string, localizedStrings: { [key: string]: string };
    const IMAGES = {
      LOGO: "logox1024",
      PLAY: "play_iconx1024",
      PAUSE: "pause_iconx1024",
      BROWSE: "browse_iconx1024"
    };
    app.on("UpdateData", async () => {
      const newLang = await app.getSetting("lang");
      if (newLang !== currentLang) {
        currentLang = newLang;
        localizedStrings = await app.getStrings(
          {
            browsing: "presence.activity.browsing",
            watching: "presence.playback.playing",
            watchVideo: "general.buttonWatchVideo",
            searching: "general.search",
            searchFor: "general.searchFor",
            viewProfile: "general.buttonViewProfile",
            viewAnime: "general.viewAnime",
            viewEpisode: "general.viewEpisode",
            viewPage: "general.viewPage"
          },
          newLang
        );
      }
      const presenceData: PresenceData = {
          largeImageKey: IMAGES.LOGO
        },
        query: { [key: string]: unknown } = getQuery(),
        context = pages.find((x) => x.middleware(window, [query]));
      if (!context) return false;

      const result = Promise.resolve(
        context.exec(app, presenceData, {
          strings: localizedStrings,
          query,
          images: IMAGES
        })
      );
      return result
        .then((data) => {
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
