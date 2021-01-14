const presence = new Presence({
    clientId: `633637979952250881`
  }),
  { pathname } = window.location,
  { hostname } = window.location,
  startTimestamp = Math.floor(Date.now() / 1000);

/**
 * Get Timestamps
 * @param {Number} videoTime Current video time seconds
 * @param {Number} videoDuration Video duration seconds
 */
function getTimestamps(
  videoTime: number,
  videoDuration: number
): Array<number> {
  const startTime = Math.floor(Date.now() / 1000),
    endTime = Math.floor(startTime - videoTime + videoDuration);
  return [startTime, endTime];
}

let episode,
  current: number,
  duration: number,
  paused: boolean,
  played: boolean;

presence.on(
  "iFrameData",
  (data: {
    current: number;
    duration: number;
    paused: boolean;
    played: boolean;
  }) => {
    current = data.current;
    duration = data.duration;
    paused = data.paused;
    played = data.played;
  }
);

presence.on("UpdateData", async () => {
  const strings = await presence.getStrings({
    playing: "presence.playback.playing",
    paused: "presence.playback.paused",
    browsing: "presence.activity.browsing"
  });

  const presenceData: PresenceData = {
    largeImageKey: "animedao_lg"
  };
  if (pathname.startsWith(`/view/`)) {
    const title: string = document.querySelector("h2").textContent.trim();
    if ((episode = title.match(/\WEpisode\W\d{1,3}/)) != null) {
      presenceData.details = title.replace(episode[0], "");
      presenceData.state = `${episode[0]} - ${
        document.querySelector(`h4`).textContent
      }`;
    } else {
      presenceData.details = title;
    }
    const video: HTMLVideoElement = document.querySelector(`video`);
    if (video != null) {
      played = video.currentTime != 0;
      duration = video.duration;
      current = video.currentTime;
      paused = video.paused;
    }
    if (played) {
      if (!paused) {
        const timestamps = getTimestamps(current, duration);
        presenceData.startTimestamp = timestamps[0];
        presenceData.endTimestamp = timestamps[1];
      }
      presenceData.smallImageKey = paused ? "pause" : "play";
      presenceData.smallImageText = paused
        ? (await strings).paused
        : (await strings).playing;
    }
  } else if (hostname === `animedao.to`) {
    presenceData.startTimestamp = startTimestamp;
    if (pathname === `/`) {
      presenceData.details = (await strings).browsing;
    } else if (pathname.startsWith(`/animelist`)) {
      presenceData.details = `Viewing the Animelist`;
    } else if (pathname.startsWith(`/genre`)) {
      const genre: string = document.querySelector(`h2`).textContent.trim();
      presenceData.details = `Viewing genres`;
      if (pathname !== `/genre`) {
        presenceData.state = `${genre.replace(
          genre.match(/Genre\W-\W/)[0],
          ``
        )}`;
      }
    } else if (pathname.startsWith(`/popular-anime`)) {
      presenceData.details = `Viewing popular anime`;
    } else if (pathname.startsWith(`/anime`)) {
      const title = document.querySelector(`h2`);
      presenceData.details = `Viewing an anime`;
      presenceData.state = `${title ? title.textContent.trim() : undefined}`;
    } else if (pathname.startsWith(`/search`)) {
      presenceData.details = `Searching`;
      presenceData.smallImageKey = `search`;
      presenceData.smallImageText = `Searching`;
    }
  }
  presence.setActivity(presenceData, true);
});
