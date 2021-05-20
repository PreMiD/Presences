interface LangStrings {
  play: string;
  pause: string;
  viewSeries: string;
  viewMovie: string;
  watchEpisode: string;
}

const presence = new Presence({
    clientId: "802964241179082822"
  }),
  getStrings = async (): Promise<LangStrings> => {
    return presence.getStrings(
      {
        play: "general.playing",
        pause: "general.paused",
        viewSeries: "general.buttonViewSeries",
        viewMovie: "general.buttonViewMovie",
        watchEpisode: "general.buttonViewEpisode"
      },
      await presence.getSetting("lang")
    );
  },
  nextEpisodeElement = document.querySelector(
    "div#sidebar-anime-info > div.border.rounded.mb-3.p-3:nth-child(2) > div:nth-child(1) > a.ka-url-wrapper"
  ),
  previousEpisodeElement = document.querySelector(
    "div#sidebar-anime-info > div.border.rounded.mb-3.p-3:nth-child(2) > div:nth-child(2) > a.ka-url-wrapper"
  );

let browsingStamp = Math.floor(Date.now() / 1000),
  video = {
    duration: 0,
    currentTime: 0,
    paused: true
  },
  currentTime: number,
  duration: number,
  paused = true,
  lastPlaybackState: boolean = null,
  playback: boolean,
  currentAnimeTitle: string,
  currentAnimeEpisode: string,
  isMovie: boolean = null,
  episodeNumber,
  strings: Promise<LangStrings> = getStrings(),
  oldLang: string = null;

function checkIfMovie() {
  nextEpisodeElement == null && previousEpisodeElement == null
    ? (isMovie = true)
    : nextEpisodeElement !== null && previousEpisodeElement == null
    ? (isMovie = false)
    : nextEpisodeElement == null && previousEpisodeElement !== null
    ? (isMovie = false)
    : nextEpisodeElement !== null && previousEpisodeElement !== null
    ? (isMovie = false)
    : (isMovie = true);

  !isMovie
    ? presence.getPageletiable("appData").then((appData) => {
        isMovie = appData.anime.types?.find((x) => x.name === "Movie")
          ? true
          : false;
      })
    : presence.info(
        "Unable to determine if show is a Movie or TV Series.\nYou may be watching an OVA, or this is broken & you need to contact Striker#1337"
      );
}

presence.on(
  "iFrameData",
  (data: { duration: number; currentTime: number; paused: boolean }) => {
    video = data;
    playback = video.duration !== null ? true : false;

    if (playback) {
      currentTime = video.currentTime;
      duration = video.duration;
      paused = video.paused;
    }

    if (lastPlaybackState != playback) {
      lastPlaybackState = playback;
      browsingStamp = Math.floor(Date.now() / 1000);
    }
  }
);

presence.on("UpdateData", async () => {
  const timestamps = presence.getTimestamps(
      Math.floor(currentTime),
      Math.floor(duration)
    ),
    presenceData: PresenceData = {
      largeImageKey: "kaa"
    },
    buttons = await presence.getSetting("buttons"),
    newLang = await presence.getSetting("lang");

  presenceData.startTimestamp = browsingStamp;

  if (!oldLang) {
    oldLang = newLang;
  } else if (oldLang !== newLang) {
    oldLang = newLang;
    strings = getStrings();
  }

  if (
    document.location.pathname.includes("/anime/") &&
    document.location.pathname.includes("/episode")
  ) {
    checkIfMovie();
    if (playback == true && !isNaN(duration)) {
      presenceData.smallImageKey = paused ? "pause" : "play";
      presenceData.smallImageText = paused
        ? (await strings).pause
        : (await strings).play;
      presenceData.startTimestamp = timestamps[0];
      presenceData.endTimestamp = timestamps[1];
      currentAnimeTitle =
        document.querySelector("a.ka-url-wrapper").textContent;
      currentAnimeEpisode = document.location.pathname
        .split("/")[3]
        .split("-")[1];
      if (!isMovie) {
        if (currentAnimeEpisode[0] == "0") {
          episodeNumber = currentAnimeEpisode.replace("0", "");
        } else {
          episodeNumber = currentAnimeEpisode;
        }
        currentAnimeEpisode = `Episode ${episodeNumber}`;

        if (buttons) {
          presenceData.buttons = [
            {
              label: (await strings).watchEpisode,
              url: document.URL
            },
            {
              label: (await strings).viewSeries,
              url: document.URL.replace(document.URL.split("/")[5], "")
            }
          ];
        }
      } else {
        currentAnimeEpisode = "Movie";

        if (buttons) {
          presenceData.buttons = [
            {
              label: (await strings).watchEpisode,
              url: document.URL
            },
            {
              label: (await strings).viewMovie,
              url: document.URL.replace(document.URL.split("/")[5], "")
            }
          ];
        }
      }

      presenceData.details = `${currentAnimeTitle}`;
      presenceData.state = `${currentAnimeEpisode}`;

      if (paused) {
        delete presenceData.startTimestamp;
        delete presenceData.endTimestamp;
      }
    } else {
      currentAnimeTitle =
        document.querySelector("a.ka-url-wrapper").textContent;
      currentAnimeEpisode = document.location.pathname
        .split("/")[3]
        .split("-")[1];
      if (!isMovie) {
        if (currentAnimeEpisode[0] == "0") {
          episodeNumber = currentAnimeEpisode.replace("0", "");
        } else {
          episodeNumber = currentAnimeEpisode;
        }
        currentAnimeEpisode = `Episode ${episodeNumber}`;

        if (buttons) {
          presenceData.buttons = [
            {
              label: (await strings).watchEpisode,
              url: document.URL
            },
            {
              label: (await strings).viewSeries,
              url: document.URL.replace(document.URL.split("/")[5], "")
            }
          ];
        }
      } else {
        currentAnimeEpisode = "Movie";

        if (buttons) {
          presenceData.buttons = [
            {
              label: (await strings).watchEpisode,
              url: document.URL
            },
            {
              label: (await strings).viewMovie,
              url: document.URL.replace(document.URL.split("/")[5], "")
            }
          ];
        }
      }

      presenceData.details = `${currentAnimeTitle}`;
      presenceData.state = `${currentAnimeEpisode}`;

      if (paused) {
        delete presenceData.startTimestamp;
        delete presenceData.endTimestamp;
      }
    }
  } else if (
    document.location.pathname.includes("/anime/") &&
    document.location.pathname.includes("/episode") == false
  ) {
    currentAnimeTitle = document.querySelector("h1.title").textContent;
    presenceData.details = "Looking at:";
    presenceData.state = `${currentAnimeTitle}`;
    presenceData.smallImageKey = "searching";

    if (buttons) {
      presenceData.buttons = [
        {
          label: (await strings).viewSeries,
          url: document.URL
        }
      ];
    }
  } else if (document.location.pathname.includes("anime-list")) {
    presenceData.details = "Looking at:";
    presenceData.state = "Anime List";
    presenceData.smallImageKey = "searching";
  } else if (document.location.pathname.includes("new-season")) {
    presenceData.details = "Looking at:";
    presenceData.state = "New Season";
    presenceData.smallImageKey = "searching";
  } else if (document.location.pathname.includes("favorites")) {
    presenceData.details = "Looking at:";
    presenceData.state = "Their Favorites";
    presenceData.smallImageKey = "searching";
  } else if (document.location.pathname.includes("watched")) {
    presenceData.details = "Looking at:";
    presenceData.state = "Watch History";
    presenceData.smallImageKey = "searching";
  } else if (document.location.pathname == "/") {
    presenceData.details = "Looking at:";
    presenceData.state = "Home Page";
    presenceData.smallImageKey = "searching";
  } else {
    presenceData.details = "Looking at:";
    presenceData.state = "An Unsupported Page";
  }

  presence.setActivity(presenceData);
});
