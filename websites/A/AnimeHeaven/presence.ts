const presence = new Presence({
    clientId: "822949091776004177"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);

type VideoData = {
  paused: boolean;
  currentTime: number;
  duration: number;
};
let iFrameVideo: VideoData;
presence.on("iFrameData", (videoData: VideoData) => {
  iFrameVideo = videoData;
});

const paths = {
  async "/watch"(presenceData: PresenceData) {
    const title = document.querySelector(".now2 .c a").textContent,
      episode = document
        .querySelector(".now2 .c")
        .lastChild.textContent.match(/\s*-\s*(.+)/)[1];

    presenceData.details = title;
    presenceData.state = episode;

    if (iFrameVideo) {
      const video = iFrameVideo;

      presenceData.smallImageKey = video.paused ? "pause" : "play";
      presenceData.smallImageText = video.paused
        ? (await strings).pause
        : (await strings).play;

      if (!video.paused) {
        const [startTimestamp, endTimestamp] = presence.getTimestamps(
          video.currentTime,
          video.duration
        );
        presenceData.startTimestamp = startTimestamp;
        presenceData.endTimestamp = endTimestamp;
      }

      return !video.paused;
    }
  },
  "/search"(presenceData: PresenceData) {
    presenceData.state = "Searching...";

    const searchParams = new URLSearchParams(window.location.search);
    let searchQuery = searchParams.get("q");

    if (searchQuery) {
      if (searchQuery.length > 18) {
        searchQuery = `${searchQuery.substring(0, 18)}…`;
      }
      presenceData.details = `"${searchQuery}"`;
    }
  },
  "/detail"(presenceData: PresenceData) {
    presenceData.state = "Viewing...";

    const title = document.querySelector(
      ".infobox .infoboxc .infodesbox .infodes h1"
    ).textContent;
    presenceData.details = title;
  },
  "/animeheaven.eu"(presenceData: PresenceData) {
    presenceData.state = "Viewing front page...";
  },
  "/anime-list"(presenceData: PresenceData) {
    presenceData.details = "Latest Anime";
  },
  "/dubbed-anime"(presenceData: PresenceData) {
    presenceData.details = "Latest Dubbed Anime";
  },
  "/anime-series"(presenceData: PresenceData) {
    presenceData.details = "Anime";
  },
  "/anime-movies"(presenceData: PresenceData) {
    presenceData.details = "Anime Movies";
  },
  "/ongoing"(presenceData: PresenceData) {
    presenceData.details = "Ongoing Anime";
  },
  "/popular"(presenceData: PresenceData) {
    presenceData.details = "Popular Anime";
  },
  "/schedule"(presenceData: PresenceData) {
    presenceData.details = "Anime Schedule";
  },
  "/"(presenceData: PresenceData) {
    presenceData.state = "Viewing landing page...";
  }
};

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
      largeImageKey: "logo"
    },
    currentPath = window.location.pathname.toLowerCase();

  presenceData.state = "Browsing...";
  presenceData.startTimestamp = browsingStamp;

  let playback = true;
  for (const [path, setPresence] of Object.entries(paths)) {
    if (currentPath.startsWith(path)) {
      const isPlaying = await setPresence(presenceData);
      if (isPlaying === false) playback = isPlaying;
      break;
    }
  }

  presence.setActivity(presenceData, playback);
});
