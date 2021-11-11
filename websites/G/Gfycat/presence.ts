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

    presenceData.details = "Browsing...";
    data.startTimestamp = Date.now();

    presence.setActivity(data);
  } else if (document.location.pathname.startsWith("/gifs/search")) {
    const searchText = document.querySelector(
      ".feed-with-player__title"
    ).textContent;

    presenceData.details = "Searching...";
    if (searchText) data.state = searchText;

    data.startTimestamp = Date.now();
    data.smallImageKey = "search";
    data.smallImageText = "Searching";

    presence.setActivity(data);
  } else if (
    document.location.pathname.startsWith("/upload") ||
    document.location.pathname.startsWith("/create")
  ) {
    presenceData.details = "Uploading...";
    data.startTimestamp = Date.now();

    presence.setActivity(data);
  } else if (document.location.pathname.startsWith("/@")) {
    presenceData.details = "Viewing profile";
    data.state = document.querySelector(
      ".profile-container .profile-info-container .name"
    ).textContent;
    data.startTimestamp = Date.now();

    presence.setActivity(data);
  } else if (document.location.pathname.startsWith("/jobs")) {
    presenceData.details = "Browsing jobs";
    data.startTimestamp = Date.now();

    presence.setActivity(data);
  } else {
    const player: HTMLVideoElement = document.querySelector(
      ".video-player-wrapper video"
    );

    if (player) {
      [data.startTimestamp, data.endTimestamp] = presence.getTimestamps(
        Math.floor(player.currentTime),
        Math.floor(player.duration)
      );

      presenceData.details =
        document.querySelector(".gif-info .title").textContent;
      data.state = document.querySelector(".gif-info .gif-views").textContent;
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
      presenceData.details = "Browsing...";
      data.startTimestamp = Date.now();

      presence.setActivity(data);
    }
  }
});
