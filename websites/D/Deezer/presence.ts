const presence = new Presence({
    clientId: "607651992567021580"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused",
    live: "presence.activity.live"
  });

function parseTimestamp(time: string) {
  return parseInt(time.split(":")[0]) * 60 + parseInt(time.split(":")[1]);
}

let currentTime, duration, parsedTimestamps, title, author, episode;

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
      ).textContent),
      (parsedTimestamps = [
        parseTimestamp(currentTime),
        parseTimestamp(duration)
      ]);

    const timestamps = presence.getTimestamps(
        parsedTimestamps[0],
        parsedTimestamps[1]
      ),
      show = document.querySelector(".track-link:nth-child(2)") === null
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
    const pathname = document.location.pathname;

    if (pathname.includes("shows")) {
      const data: PresenceData = {
        details: "Browsing...",
        state: "Shows",
        largeImageKey: "deezer"
      };
      presence.setActivity(data);
    } else if (pathname.includes("channels")) {
      const data: PresenceData = {
        details: "Browsing...",
        state: "Channels",
        largeImageKey: "deezer"
      };
      presence.setActivity(data);
    } else if (pathname.includes("loved")) {
      const data: PresenceData = {
        details: "Browsing...",
        state: "User's Loved",
        largeImageKey: "deezer"
      };
      presence.setActivity(data);
    } else if (pathname.includes("playlists")) {
      const data: PresenceData = {
        details: "Browsing...",
        state: "User's Playlists",
        largeImageKey: "deezer"
      };
      presence.setActivity(data);
    } else if (pathname.includes("albums")) {
      const data: PresenceData = {
        details: "Browsing...",
        state: "User's Albums",
        largeImageKey: "deezer"
      };
      presence.setActivity(data);
    } else if (pathname.includes("artists")) {
      const data: PresenceData = {
        details: "Browsing...",
        state: "User's Artists",
        largeImageKey: "deezer"
      };
      presence.setActivity(data);
    } else if (pathname.includes("podcasts")) {
      const data: PresenceData = {
        details: "Browsing...",
        state: "User's Podcasts",
        largeImageKey: "deezer"
      };
      presence.setActivity(data);
    } else if (pathname.includes("playlist")) {
      const data: PresenceData = {
        details: "Looking at...",
        state: "A Playlist",
        largeImageKey: "deezer"
      };
      presence.setActivity(data);
    } else if (pathname.includes("album")) {
      const data: PresenceData = {
        details: "Looking at...",
        state: "An Album",
        largeImageKey: "deezer"
      };
      presence.setActivity(data);
    } else if (pathname.includes("artist")) {
      const data: PresenceData = {
        details: "Looking at...",
        state: "An Artist",
        largeImageKey: "deezer"
      };
      presence.setActivity(data);
    } else {
      const data: PresenceData = {
        details: "Browsing...",
        largeImageKey: "deezer"
      };
      presence.setActivity(data);
    }
  }
});
