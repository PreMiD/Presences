interface LangStrings {
  play: string;
  pause: string;
  viewSeries: string;
  watchEpisode: string;
}

const presence = new Presence({
    clientId: "806539630878261328"
  }),
  getStrings = async (): Promise<LangStrings> => {
    return presence.getStrings(
      {
        play: "general.playing",
        pause: "general.paused",
        viewSeries: "general.buttonViewSeries",
        watchEpisode: "general.buttonViewEpisode"
      },
      await presence.getSetting("lang")
    );
  };

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
  currentAnimeWatching: string,
  currentAnimeWatch: string,
  currentAnimeTitle: string,
  currentAnimeEpisode: string,
  strings: Promise<LangStrings> = getStrings(),
  oldLang: string = null;

presence.on(
  "iFrameData",
  (data: { duration: number; currentTime: number; paused: boolean }) => {
    video = data;
    playback = video.duration !== null ? true : false;

    if (playback) ({ currentTime, duration, paused } = video);

    if (lastPlaybackState !== playback) {
      lastPlaybackState = playback;
      browsingStamp = Math.floor(Date.now() / 1000);
    }
  }
);

presence.on("UpdateData", async () => {
  const [, endTimestamp] = presence.getTimestamps(
      Math.floor(currentTime),
      Math.floor(duration)
    ),
    presenceData: PresenceData = {
      largeImageKey: "animelon",
      startTimestamp: browsingStamp
    },
    buttons = await presence.getSetting("buttons"),
    newLang = await presence.getSetting("lang");

  if (!oldLang) oldLang = newLang;
  else if (oldLang !== newLang) {
    oldLang = newLang;
    strings = getStrings();
  }

  if (document.location.pathname.includes("/video/")) {
    if (playback && !isNaN(duration)) {
      presenceData.smallImageKey = paused ? "pause" : "play";
      presenceData.smallImageText = paused
        ? (await strings).pause
        : (await strings).play;
      presenceData.endTimestamp = endTimestamp;
      [currentAnimeWatching, currentAnimeWatch] = document.title
        .replace(" - Animelon", "")
        .split(" Episode ");
      currentAnimeTitle = currentAnimeWatching;
      currentAnimeEpisode = `Episode ${currentAnimeWatch}`;

      presenceData.details = `${currentAnimeTitle}`;
      presenceData.state = `${currentAnimeEpisode}`;

      if (buttons) {
        presenceData.buttons = [
          {
            label: (await strings).watchEpisode,
            url: document.URL
          },
          {
            label: (await strings).viewSeries,
            url: `https://animelon.com/series/${encodeURI(currentAnimeTitle)}`
          }
        ];
      }

      if (paused) {
        delete presenceData.startTimestamp;
        delete presenceData.endTimestamp;
      }
    } else {
      [currentAnimeWatching, currentAnimeWatch] = document.title
        .replace(" - Animelon", "")
        .split(" Episode ");
      currentAnimeTitle = currentAnimeWatching;
      currentAnimeEpisode = `Episode ${currentAnimeWatch}`;

      presenceData.details = `${currentAnimeTitle}`;
      presenceData.state = `${currentAnimeEpisode}`;

      if (buttons) {
        presenceData.buttons = [
          {
            label: (await strings).watchEpisode,
            url: document.URL
          },
          {
            label: (await strings).viewSeries,
            url: `https://animelon.com/series/${encodeURI(currentAnimeTitle)}`
          }
        ];
      }

      if (paused) {
        delete presenceData.startTimestamp;
        delete presenceData.endTimestamp;
      }
    }
  } else if (document.location.pathname.includes("/series/")) {
    presenceData.details = "Browsing...";
    currentAnimeTitle = document.title.replace(" - Animelon", "");
    presenceData.state = currentAnimeTitle;
    if (buttons) {
      presenceData.buttons = [
        {
          label: (await strings).viewSeries,
          url: document.URL
        }
      ];
    }
  } else presenceData.details = "Browsing...";

  presence.setActivity(presenceData);
});
