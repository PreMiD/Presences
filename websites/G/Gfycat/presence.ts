const presence = new Presence({
    clientId: "630874255990587402"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
  });

presence.on("UpdateData", async () => {
  const data: PresenceData = {
    largeImageKey: "gfycat"
  };

  if (document.location.pathname.startsWith("/discover")) {
    const section = document.querySelector(".multiple-view__title").textContent;
    if (section) data.state = section;

    data.details = "Browsing...";
    data.startTimestamp = Date.now();

    presence.setActivity(data);
  } else if (document.location.pathname.startsWith("/gifs/search")) {
    const searchText = document.querySelector(
      ".feed-with-player__title"
    ).textContent;

    data.details = "Searching...";
    if (searchText) data.state = searchText;

    data.startTimestamp = Date.now();
    data.smallImageKey = "search";
    data.smallImageText = "Searching";

    presence.setActivity(data);
  } else if (
    document.location.pathname.startsWith("/upload") ||
    document.location.pathname.startsWith("/create")
  ) {
    data.details = "Uploading...";
    data.startTimestamp = Date.now();

    presence.setActivity(data);
  } else if (document.location.pathname.startsWith("/@")) {
    const profile = document.querySelector(
      ".profile-container .profile-info-container .name"
    ).textContent;

    data.details = "Viewing profile";
    data.state = profile;
    data.startTimestamp = Date.now();

    presence.setActivity(data);
  } else if (document.location.pathname.startsWith("/jobs")) {
    data.details = "Browsing jobs";
    data.startTimestamp = Date.now();

    presence.setActivity(data);
  } else {
    const player: HTMLVideoElement = document.querySelector(
      ".video-player-wrapper video"
    );

    if (player) {
      const title = document.querySelector(".gif-info .title").textContent,
        views = document.querySelector(".gif-info .gif-views").textContent;
      [data.startTimestamp, data.endTimestamp] = presence.getTimestamps(
        Math.floor(player.currentTime),
        Math.floor(player.duration)
      );

      data.details = title;
      data.state = views;
      data.smallImageKey = player.paused ? "pause" : "play";
      data.smallImageText = player.paused
        ? (await strings).pause
        : (await strings).play;

      if (player.paused) {
        delete data.startTimestamp;
        delete data.endTimestamp;
      }

      presence.setActivity(data);
    } else {
      data.details = "Browsing...";
      data.startTimestamp = Date.now();

      presence.setActivity(data);
    }
  }
});
