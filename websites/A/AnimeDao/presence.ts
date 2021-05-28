const presence = new Presence({
    clientId: "633637979952250881"
  }),
  strings = presence.getStrings({
    playing: "presence.playback.playing",
    paused: "presence.playback.paused",
    browsing: "presence.activity.browsing"
  }),
  { pathname } = window.location,
  { hostname } = window.location,
  startTimestamp = Math.floor(Date.now() / 1000);

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
    ({ current, duration, paused, played } = data);
  }
);

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "animedao_lg"
  };

  if (pathname.startsWith("/view/")) {
    const title: string = document.querySelector("h2").textContent.trim();
    if ((episode = title.match(/\WEpisode\W\d{1,3}/)) !== null) {
      presenceData.details = title.replace(episode[0], "");
      presenceData.state = `${episode[0]} - ${
        document.querySelector("h4").textContent
      }`;
    } else presenceData.details = title;

    const video: HTMLVideoElement = document.querySelector("video");
    if (video !== null) {
      ({ duration, paused } = video);
      played = video.currentTime !== 0;
      current = video.currentTime;
    }
    if (played) {
      if (!paused) {
        const [, endTimestamp] = presence.getTimestamps(current, duration);
        presenceData.endTimestamp = endTimestamp;
      }
      presenceData.smallImageKey = paused ? "pause" : "play";
      presenceData.smallImageText = paused
        ? (await strings).paused
        : (await strings).playing;
    }
  } else if (hostname === "animedao.to") {
    presenceData.startTimestamp = startTimestamp;
    if (pathname === "/") presenceData.details = (await strings).browsing;
    else if (pathname.startsWith("/animelist"))
      presenceData.details = "Viewing the Animelist";
    else if (pathname.startsWith("/genre")) {
      const genre: string = document.querySelector("h2").textContent.trim();
      presenceData.details = "Viewing genres";
      if (pathname !== "/genre") {
        presenceData.state = `${genre.replace(
          genre.match(/Genre\W-\W/)[0],
          ""
        )}`;
      }
    } else if (pathname.startsWith("/popular-anime"))
      presenceData.details = "Viewing popular anime";
    else if (pathname.startsWith("/anime")) {
      const title = document.querySelector("h2");
      presenceData.details = "Viewing an anime";
      presenceData.state = `${title ? title.textContent.trim() : undefined}`;
    } else if (pathname.startsWith("/search")) {
      presenceData.details = "Searching";
      presenceData.smallImageKey = "search";
      presenceData.smallImageText = "Searching";
    }
  }
  presence.setActivity(presenceData, true);
});
