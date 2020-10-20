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
  var startTime = Date.now();
  var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
  return [Math.floor(startTime / 1000), endTime];
}

let episode,
  current: number,
  duration: number,
  paused: boolean,
  played: boolean;

presence.on("iFrameData", (data) => {
  current = data.current;
  duration = data.duration;
  paused = data.paused;
  played = data.played;
});

presence.on("UpdateData", async () => {
  const strings = await presence.getStrings({
    playing: "presence.playback.playing",
    paused: "presence.playback.paused",
    browsing: "presence.activity.browsing"
  });

  const presenceData: PresenceData = {
    largeImageKey: "animedao_lg"
  };
  
  const StreamUrls = [
    "animedao10.stream",
    "animedao11.stream",
    "animedao12.stream",
    "animedao13.stream",
    "animedao14.stream",
    "animedao15.stream",
    "animedao16.stream",
    "animedao17.stream",
    "animedao18.stream",
    "animedao19.stream",
    "animedao20.stream",
    "animedao21.stream",
    "animedao22.stream",
    "animedao23.stream",
    "animedao24.stream",
    "animedao25.stream",
    "animedao26.stream",
    "animedao27.stream",
    "animedao28.stream",
    "animedao29.stream",
    "animedao30.stream",
    "animedao31.stream",
    "animedao32.stream",
    "animedao33.stream",
    "animedao34.stream",
    "animedao35.stream",
    "animedao36.stream"
  ]
  
  const MainSiteUrls = [
    "animedao.com",
    "animedao.to"
  ]
  
  if (StreamUrls.includes(hostname)) {
    const title = document.querySelector("h2").textContent.trim();
    if ((episode = title.match(/\WEpisode\W\d{1,3}/)) != null) {
      presenceData.details = title.replace(episode[0], "");
      presenceData.state = `${episode[0]} - ${
        document.querySelector(`h4`).textContent
      }`;
    } else {
      presenceData.details = title;
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
  } else if (MainSiteUrls.includes(hostname)) {
    presenceData.startTimestamp = startTimestamp;
    if (pathname === `/`) {
      presenceData.details = (await strings).browsing;
    } else if (pathname.startsWith(`/animelist`)) {
      presenceData.details = `Viewing the Animelist`;
    } else if (pathname.startsWith(`/genre`)) {
      const genre = document.querySelector(`h2`).textContent.trim();
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
