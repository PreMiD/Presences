const presence = new Presence({
    clientId: "808762696023146578"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
  });

presence.on("UpdateData", async () => {
  const video: HTMLVideoElement = document.querySelector(
    ".vp-video-wrapper .vp-video video"
  );

  if (document.location.pathname == "/") {
    const browsingPresence: PresenceData = {
      details: "Browsing...",
      largeImageKey: "logo"
    };
    presence.setActivity(browsingPresence);
  } else {
    if (video && !isNaN(video.duration)) {
      const title = document.querySelector("._1fHNK").textContent,
        uploader = document.querySelector(".js-user_link").textContent,
        timestamps = presence.getTimestamps(
          Math.floor(video.currentTime),
          Math.floor(video.duration)
        ),
        data: PresenceData = {
          details: title,
          state: uploader,
          largeImageKey: "vimeo-logo",
          smallImageKey: video.paused ? "pause" : "play",
          smallImageText: video.paused
            ? (await strings).pause
            : (await strings).play,
          startTimestamp: timestamps[0],
          endTimestamp: timestamps[1]
        };

      if (video.paused) {
        delete data.startTimestamp;
        delete data.endTimestamp;
      }

      if (title !== null && uploader !== null) {
        presence.setActivity(data, !video.paused);
      }
    } else {
      const browsingPresence: PresenceData = {
        details: "Browsing...",
        largeImageKey: "logo"
      };
      presence.setActivity(browsingPresence);
    }
  }
});
