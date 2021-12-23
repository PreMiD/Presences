const presence = new Presence({
    clientId: "767402228825980929"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused",
    live: "presence.activity.live",
    search: "presence.activity.searching"
  });

let elapsed: number, oldUrl: string;

presence.on("UpdateData", async () => {
  let video: HTMLVideoElement = null,
    // eslint-disable-next-line no-one-time-vars/no-one-time-vars
    details,
    state,
    smallImageKey,
    smallImageText,
    startTimestamp,
    endTimestamp;

  const { href } = window.location,
    path = window.location.pathname,
    presenceData: PresenceData = {
      largeImageKey: "peacock",
      details
    };

  if (href !== oldUrl) {
    oldUrl = href;
    elapsed = Math.floor(Date.now() / 1000);
  }

  presenceData.startTimestamp = elapsed;

  if (path.includes("/watch/playback") || path.includes("/watch/asset")) {
    video = document.querySelector(".video-player-component video");
    if (video) {
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

      smallImageKey = live ? "live" : video.paused ? "pause" : "play";
      smallImageText = live
        ? (await strings).live
        : video.paused
        ? (await strings).pause
        : (await strings).play;
      presenceData.startTimestamp = live ? elapsed : startTimestamp;
      presenceData.endTimestamp = endTimestamp;

      if (live) delete presenceData.endTimestamp;
      if (video.paused) {
        delete presenceData.startTimestamp;
        delete presenceData.endTimestamp;
      }
    }
  }

  presenceData.state = state;
  presenceData.smallImageKey = smallImageKey;
  presenceData.smallImageText = smallImageText;
  presenceData.startTimestamp = startTimestamp;
  presenceData.endTimestamp = endTimestamp;

  presence.setActivity(presenceData, video ? !video.paused : true);
});
