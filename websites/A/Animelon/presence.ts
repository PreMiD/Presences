const presence = new Presence({
    clientId: "806539630878261328"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
  });

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
  currentAnimeWatching: Array<string>,
  currentAnimeTitle: string,
  currentAnimeEpisode: string;

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
      largeImageKey: "animelon"
    };

  presenceData.startTimestamp = browsingStamp;

  if (document.location.pathname.includes("/video/")) {
    if (playback == true && !isNaN(duration)) {
      presenceData.smallImageKey = paused ? "pause" : "play";
      presenceData.smallImageText = paused
        ? (await strings).pause
        : (await strings).play;
      presenceData.startTimestamp = timestamps[0];
      presenceData.endTimestamp = timestamps[1];
      currentAnimeWatching = document.title
        .replace(" - Animelon", "")
        .split(" Episode ");
      currentAnimeTitle = currentAnimeWatching[0];
      currentAnimeEpisode = "Episode " + currentAnimeWatching[1];

      presenceData.details = `${currentAnimeTitle}`;
      presenceData.state = `${currentAnimeEpisode}`;

      if (paused) {
        delete presenceData.startTimestamp;
        delete presenceData.endTimestamp;
      }
    } else {
      currentAnimeWatching = document.title
        .replace(" - Animelon", "")
        .split(" Episode ");
      currentAnimeTitle = currentAnimeWatching[0];
      currentAnimeEpisode = "Episode " + currentAnimeWatching[1];

      presenceData.details = `${currentAnimeTitle}`;
      presenceData.state = `${currentAnimeEpisode}`;

      if (paused) {
        delete presenceData.startTimestamp;
        delete presenceData.endTimestamp;
      }
    }
  } else if (document.location.pathname.includes("/series/")) {
    presenceData.details = "Browsing...";
    currentAnimeTitle = document.title.replace(" - Animelon", "");
    presenceData.state = currentAnimeTitle;
  } else {
    presenceData.details = "Browsing...";
  }

  presence.setActivity(presenceData);
});
