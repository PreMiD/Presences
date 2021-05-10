const presence = new Presence({
    clientId: "610102236374368267"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused",
    live: "presence.activity.live"
  });

let author: string, title: string, url: string, openUrlText: string;

presence.on("UpdateData", async () => {
  const player = document.querySelector(
    "[class^='PlayerControls__PlayerContainer']"
  );

  if (player) {
    const normalIsPlaying: boolean =
        document
          .querySelector("div[class^='PlayButton__PlayerControl']")
          ?.getAttribute("aria-label") === "Pause",
      liveIsPlaying: boolean =
        document
          .querySelector(
            "[class^=LiveVideo__VideoContainer] .shaka-play-button"
          )
          ?.getAttribute("icon") === "pause",
      isPlaying = normalIsPlaying || liveIsPlaying;

    if (normalIsPlaying) {
      const normalDetails = document.querySelector(
        "[class^='shared__ShowDetails'] > a:nth-child(1)"
      );

      title = normalDetails.textContent;
      url = new URL(normalDetails.getAttribute("href"), window.location.origin)
        .href;
      openUrlText = "Listen to Show";
      author = document.querySelector(
        "[class^='PlayerControls__ShowOwnerName']"
      ).textContent;
    } else if (liveIsPlaying) {
      url = window.location.href;
      openUrlText = "View Livestream";
      title = document.querySelector(
        "[class^='LiveStreamDetails__StreamTitleContainer'] > h4"
      ).textContent;
      author = document.querySelector(
        "[class^='LiveStreamStreamerDetails__StreamerDetailsTextContainer'] h4"
      ).textContent;
    }

    const data: PresenceData = {
      details: title,
      state: author,
      largeImageKey: "mixcloud",
      smallImageKey: isPlaying ? "play" : "pause",
      smallImageText: isPlaying ? (await strings).play : (await strings).pause,
      buttons: [{ label: openUrlText, url: url }]
    };

    if (liveIsPlaying) {
      data.smallImageKey = "live";
      data.smallImageText = (await strings).live;
    }

    if (isPlaying) {
      presence.setActivity(data);
    } else {
      presence.setActivity();
      presence.setTrayTitle();
    }
  }
});
