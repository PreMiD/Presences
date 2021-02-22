const presence = new Presence({
    clientId: "607651992567021580"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused",
    live: "presence.activity.live"
  });

let currentTime, duration, title, author, episode;

presence.on("UpdateData", async () => {
  const player = document.querySelector(".page-player");

  if (player) {
    const paused =
      document.querySelector(
        ".svg-icon-group-item:nth-child(3) .svg-icon-pause"
      ) === null;
    (currentTime = document.querySelector(
      "div.player-track > div.track-container > div.track-seekbar > div.slider.slider-autohide > div.slider-counter.slider-counter-current"
    ).textContent),
      (duration = document.querySelector(
        "div.player-track > div.track-container > div.track-seekbar > div.slider.slider-autohide > div.slider-counter.slider-counter-max"
      ).textContent);

    const timestamps = presence.getTimestamps(
        presence.timestampFromFormat(currentTime),
        presence.timestampFromFormat(duration)
      ),
      show =
        document.querySelector(".track-link:nth-child(2)") === null
          ? true
          : false;

    if (!show) {
      (title = document.querySelector(".track-link:nth-child(1)").textContent),
        (author = document.querySelector(".track-link:nth-child(2)")
          .textContent);

      const data: PresenceData = {
        details: title,
        state: author,
        largeImageKey: "deezer",
        smallImageKey: paused ? "pause" : "play",
        smallImageText: paused ? (await strings).pause : (await strings).play,
        startTimestamp: timestamps[0],
        endTimestamp: timestamps[1]
      };

      if (paused) {
        delete data.startTimestamp;
        delete data.endTimestamp;
      }

      presence.setActivity(data, !paused);
    } else {
      title = document
        .querySelector("div.marquee-content")
        .textContent.split(" · ")[1];
      episode = document
        .querySelector("div.marquee-content")
        .textContent.split(" · ")[0];

      const data: PresenceData = {
        details: title,
        state: episode,
        largeImageKey: "deezer",
        smallImageKey: paused ? "pause" : "play",
        smallImageText: paused ? (await strings).pause : (await strings).play,
        startTimestamp: timestamps[0],
        endTimestamp: timestamps[1]
      };

      if (paused) {
        delete data.startTimestamp;
        delete data.endTimestamp;
      }

      presence.setActivity(data, !paused);
    }
  } else {
    const pathname = document.location.pathname,
      data: PresenceData = {
        largeImageKey: "deezer"
      };
    if (pathname.includes("shows")) {
      data.details = "Browsing...";
      data.state = "Shows";
    } else if (pathname.includes("channels")) {
      data.details = "Browsing...";
      data.state = "Channels";
    } else if (pathname.includes("loved")) {
      data.details = "Browsing...";
      data.state = "User's Loved";
    } else if (pathname.includes("playlists")) {
      (data.details = "Browsing..."), (data.state = "User's Playlists");
    } else if (pathname.includes("albums")) {
      data.details = "Browsing...";
      data.state = "User's Albums";
    } else if (pathname.includes("artists")) {
      data.details = "Browsing...";
      data.state = "User's Artists";
    } else if (pathname.includes("podcasts")) {
      data.details = "Browsing...";
      data.state = "User's Podcasts";
    } else if (pathname.includes("playlist")) {
      data.details = "Looking at...";
      data.state = "A Playlist";
    } else if (pathname.includes("album")) {
      data.details = "Looking at...";
      data.state = "An Album";
    } else if (pathname.includes("artist")) {
      data.details = "Looking at...";
      data.state = "An Artist";
    } else {
      data.details = "Browsing...";
    }
    presence.setActivity(data);
  }
});
