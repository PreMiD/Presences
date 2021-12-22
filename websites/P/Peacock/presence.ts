const presence = new Presence({
    clientId: "767402228825980929"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused",
    live: "presence.activity.live",
    search: "presence.activity.searching"
  });

let elapsed: number, oldUrl: string, title;

presence.on("UpdateData", async () => {
  let video: HTMLVideoElement = null,
    details,
    state,
    smallImageKey,
    smallImageText,
    startTimestamp,
    endTimestamp,
    extra = "...";

  const { href } = window.location,
    path = window.location.pathname,
    data: PresenceData = {
      largeImageKey: "peacock",
      details
    };

  if (href !== oldUrl) {
    oldUrl = href;
    elapsed = Math.floor(Date.now() / 1000);
  }

  if (path.includes("/movies/highlights")) extra = " Movies";
  else if (path.includes("/watch/tv/highlights")) extra = " TV Shows";
  else if (path.includes("/watch/kids/highlights")) extra = " Kids";
  else if (path.includes("/watch/sports/highlights")) extra = " Sports";
  else if (path.includes("/watch/latino/highlights")) extra = " Latino";

  // By default, details will be "Browsing..."
  details = `Browsing${extra}`;

  if (path.includes("/watch/search")) details = "Searching...";

  data.startTimestamp = elapsed;

  if (path.includes("/watch/playback") || path.includes("/watch/asset")) {
    video = document.querySelector(".video-player-component video");
    if (video) {
      title =
        document.querySelector(".playback-header__title") ||
        document.querySelector(".playback-metadata__container-title");
      const [startTimestamp, endTimestamp] = presence.getTimestamps(
          Math.floor(video.currentTime),
          Math.floor(video.duration)
        ),
        live = endTimestamp === Infinity,
        desc =
          document.querySelector(
            ".playback-metadata__container-episode-metadata-info"
          ) ||
          document.querySelector(".playback-metadata__container-description") ||
          document.querySelector(
            ".swiper-slide-active .playlist-item-overlay__container-title"
          );

      if (desc) state = desc.textContent;

      if (title) {
        details = title.textContent;
        if (path.includes("/watch/playback/playlist"))
          details = `${details} Playlist`;
      }

      smallImageKey = live ? "live" : video.paused ? "pause" : "play";
      smallImageText = live
        ? (await strings).live
        : video.paused
        ? (await strings).pause
        : (await strings).play;
      data.startTimestamp = live ? elapsed : startTimestamp;
      data.endTimestamp = endTimestamp;

      if (live) delete data.endTimestamp;
      if (video.paused) {
        delete data.startTimestamp;
        delete data.endTimestamp;
      }
    }
  }

  data.state = state;
  data.smallImageKey = smallImageKey;
  data.smallImageText = smallImageText;
  data.startTimestamp = startTimestamp;
  data.endTimestamp = endTimestamp;

  presence.setActivity(data, video ? !video.paused : true);
  presence.setTrayTitle(details);
});
