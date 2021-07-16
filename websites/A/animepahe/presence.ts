// Note: Developer has been working on a new website design for ages,
//       maybe at some point he'll finish it and this will need updating.

const presence = new Presence({
    clientId: "629355416714739732" // Contact if you want me to edit the discord assets/keys/whatever
  }),
  waitStrings = async (lang: string) =>
    await presence.getStrings(
      {
        play: "presence.playback.playing",
        pause: "presence.playback.paused",
        browse: "general.browsing",
        page: "general.page",
        episode: "general.episode",
        watching: "general.watching",
        watchingMovie: "general.watchingMovie",
        viewing: "general.viewing",
        viewGenre: "general.viewGenre",
        viewCategory: "general.viewCategory",
        viewPage: "general.viewPage",
        viewMovie: "general.viewMovie",
        watchEpisode: "general.buttonViewEpisode",
        watchMovie: "general.buttonViewMovie",
        latest: "animepahe.latestRelease",
        season: "animepahe.season",
        special: "animepahe.special",
        viewOn: "animepahe.view",
        timeSeason: "animepahe.timeSeason"
      },
      lang
    );

let iframeResponse = {
  paused: true,
  duration: 0,
  currentTime: 0
};

type storeType = Record<
  string,
  { id: number; listing: [string, string]; time: number }
>;

class AnimeStorage {
  private list: storeType;

  public anime(title: string, listing: [string, string] | false) {
    if (this.list[title] && this.list[title].listing) return this.list[title];
    else if (!listing) return undefined;
    else {
      const shareLink = document.getElementsByClassName("modal-body")[1]
        .lastElementChild.lastElementChild as HTMLAnchorElement;

      this.list[title] = {
        id: parseInt(shareLink.href.split("/a/")[1]),
        listing,
        time: Date.now()
      };

      // Removes the oldest stored anime if the store length has exceeded 10
      if (Object.keys(this.list).length === 11) {
        delete this.list[
          Object.entries(Object.assign({}, this.list)).sort(
            (a, b) => a[1].time - b[1].time
          )[0][0]
        ];
      }

      localStorage.setItem("presence_data", btoa(JSON.stringify(this.list)));
    }
  }

  constructor() {
    let storage: storeType | string | null =
      localStorage.getItem("presence_data");

    if (storage) {
      storage = JSON.parse(atob(storage));

      this.list = storage as storeType;

      if (!Object.entries(this.list)[0][1].listing) this.list = {};
    } else this.list = {};
  }
}

const animeStore = new AnimeStorage();

function getTimes(time: number): Record<string, number> {
  let seconds = Math.round(time),
    minutes = Math.floor(seconds / 60);

  seconds -= minutes * 60;

  const hours = Math.floor(minutes / 60);

  minutes -= hours * 60;

  return {
    sec: seconds,
    min: minutes,
    hrs: hours
  };
}

const lessTen = (d: number) => (d < 10 ? "0" : "");

function getTimestamp(time: number): string {
  const { sec, min, hrs } = getTimes(time);

  return hrs > 0
    ? `${hrs}:${lessTen(min)}${min}:${lessTen(sec)}${sec}`
    : `${min}:${lessTen(sec)}${sec}`;
}

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1),
  uncapitalize = (s: string) => s.charAt(0).toLowerCase() + s.slice(1);

function parseInfo(dom: HTMLParagraphElement[]) {
  const entries: Record<string, string | HTMLAnchorElement[]> = {};

  for (const entry of dom) {
    let title = entry.children[0].textContent.slice(0, -1);
    const [, secondChild] = entry.childNodes;

    if (title.indexOf(" ") !== -1) {
title = title
        .split(" ")
        .map((e) => uncapitalize(e))
        .join("_");
} else title = uncapitalize(title);

    if (secondChild.nodeName === "#text" && entry.childNodes.length === 2)
      entries[title] = secondChild.textContent;
    else {
      entries[title] = [];

      for (const node of entry.childNodes) {
        if (node.nodeName !== "STRONG" && node.nodeName !== "#text") {
(entries[title] as HTMLAnchorElement[]).push(
            node as HTMLAnchorElement
          );
}
      }
    }
  }
  return entries;
}

presence.on(
  "iFrameData",
  (data: { paused: boolean; duration: number; currentTime: number }) => {
    iframeResponse = data;
  }
);

presence.on("UpdateData", async () => {
  const path = document.location.pathname.split("/").slice(1),
    presenceData: PresenceData = {
      largeImageKey: "animepahe",
      details: "loading",
      startTimestamp: Math.floor(Date.now() / 1000)
    },
    strings = await waitStrings(
      await presence.getSetting("lang").catch(() => "en")
    ),
    viewing = strings.viewing.slice(0, -1),
    watching = strings.watching.slice(0, -1);
  let playback = false;

  switch (path[0]) {
    // homepage / browsing new releases
    case "":
      {
        presenceData.details = strings.latest;

        let page = new URLSearchParams(document.location.href)
          .values()
          .next().value;

        if (page === "") page = "1";

        presenceData.state = `${strings.page} ${page}`;
        presenceData.smallImageKey = "presence_browsing_home";
        presenceData.smallImageText = strings.browse;
      }
      break;
    case "anime":
      {
        // browsing a-z all
        if (path.length === 1) {
          presenceData.details = `${viewing} A-Z:`;
          presenceData.state =
            document.querySelector("a.nav-link.active").textContent;
          presenceData.smallImageKey = "presence_browsing_all";
          presenceData.smallImageText = strings.browse;
        } else {
          switch (path[1]) {
            case "genre":
              {
                // viewing genre
                presenceData.details = strings.viewGenre;
                presenceData.state = capitalize(path[2]);
                presenceData.smallImageKey = "presence_browsing_genre";
                presenceData.smallImageText = strings.browse;
              }
              break;
            case "season":
              {
                // viewing anime/time season
                presenceData.details = `${viewing} Anime ${strings.timeSeason}:`;
                presenceData.state =
                  document.getElementsByTagName("h1")[0].textContent;
                presenceData.smallImageKey = "presence_browsing_time";
                presenceData.smallImageText = strings.browse;
              }
              break;
            default: {
              if (
                !path[1].match(
                  /[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/
                )
              ) {
                // viewing a misc. category (eg. Airing, TV, etc)
                presenceData.details = strings.viewCategory;

                const heading =
                  document.getElementsByTagName("h1")[0].textContent;
                presenceData.state =
                  heading.indexOf(" ") !== -1
                    ? heading
                        .split(" ")
                        .map((s) => capitalize(s))
                        .join(" ")
                    : capitalize(heading);
                presenceData.smallImageKey = "presence_browsing_all";
                presenceData.smallImageText = strings.browse;
              } else {
                // viewing specific
                const info = parseInfo(
                    document.getElementsByClassName("anime-info")[0]
                      .children as unknown as HTMLParagraphElement[]
                  ),
                  title =
                    document.getElementsByClassName("title-wrapper")[0]
                      .children[1].textContent,
                  listing = (() => {
                    const links = info.external_links as HTMLAnchorElement[];

                    if (links[0].textContent === "AniList")
                      return ["AniList", links[0].href];

                    for (const link of links) {
if (link.textContent === "MyAnimeList")
                        return ["MAL", link.href];
}
                  })() as [string, string];

                presenceData.details = (() => {
                  switch ((info.type[0] as HTMLAnchorElement).textContent) {
                    case "Movie":
                      return strings.viewMovie;
                    case "TV":
                      return `${viewing} ${strings.season}:`;
                    case "Special":
                      return `${viewing} ${strings.special}:`;
                    default:
                      return `${viewing} ${
                        (info.type[0] as HTMLAnchorElement).textContent
                      }:`;
                  }
                })();

                presenceData.state = title;

                presenceData.smallImageKey = "presence_browsing_season";
                presenceData.smallImageText = strings.browse;

                presenceData.buttons = [
                  {
                    label: strings.viewOn.replace("{0}", "Pahe"),
                    url: `https://pahe.win/a/${
                      animeStore.anime(title, listing).id
                    }`
                  },
                  {
                    label: strings.viewOn.replace("{0}", listing[0]),
                    url: listing[1]
                  }
                ];
              }
            }
          }
        }
      }
      break;
    // playback
    case "play":
      {
        const movie: boolean =
            document.getElementsByClassName("anime-status")[0].firstElementChild
              .textContent === "Movie",
          title =
            document.getElementsByClassName("theatre-info")[0].children[1]
              .children[1].textContent,
          episode = parseInt(
            document
              .getElementById("episodeMenu")
              .textContent.split("Episode ")[1]
              .replace(/^\s+|\s+$/g, "")
          );

        if (!movie)
          presenceData.details = `${watching} ${strings.episode} ${episode}`;
        else presenceData.details = strings.watchingMovie;

        presenceData.state = title;

        presenceData.smallImageKey = `presence_playback_${
          iframeResponse.paused ? "paused" : "playing"
        }`;

        presenceData.smallImageText = iframeResponse.paused
          ? strings.pause
          : strings.play;

        if (!iframeResponse.paused) {
          [, presenceData.endTimestamp] = presence.getTimestamps(
            Math.floor(iframeResponse.currentTime),
            Math.floor(iframeResponse.duration)
          );
        } else {
          presenceData.startTimestamp = null;
          presenceData.smallImageText += ` - ${getTimestamp(
            iframeResponse.currentTime
          )}`;
        }

        const anime = animeStore.anime(title, false);

        if (anime) {
          presenceData.buttons = [
            {
              label: movie ? strings.watchMovie : strings.watchEpisode,
              url: `https://pahe.win/a/${anime.id}/${episode}`
            },
            {
              label: strings.viewOn.replace("{0}", anime.listing[0]),
              url: anime.listing[1]
            }
          ];
        }

        playback = true;
      }
      break;
    default: {
      presenceData.details = strings.viewPage;
      presenceData.state = document.getElementsByTagName("h1")[0].textContent;
    }
  }
  presence.setActivity(presenceData, playback);
});
