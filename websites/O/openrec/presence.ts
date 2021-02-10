const presence = new Presence({
    clientId: "612652426180296849"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused",
    live: "presence.activity.live"
  }),
  presenceData: PresenceData = {
    largeImageKey: "logo"
  };

presence.on("UpdateData", async () => {
  const live: boolean =
      document.querySelector(".MovieTitle__Title-s181dg2v-4") != null,
    video: HTMLVideoElement = document.querySelector(
      live ? ".openrec-video" : "#capture-play"
    );
  if (video !== null && !isNaN(video.duration)) {
    const title = document.querySelector(
        live
          ? ".MovieTitle__Title-s181dg2v-4"
          : ".Component__CaptureTitle-s1nip9ch-16"
      ),
      game = document.querySelector(
        live ? ".TagButton__Button-otjf40-0" : ".text-hover"
      ),
      timestamps = presence.getTimestamps(
        Math.floor(video.currentTime),
        Math.floor(video.duration)
      );

    presenceData.details =
      title !== null
        ? (title as HTMLElement).textContent
        : "Title not found...";
    presenceData.state =
      game !== null ? (game as HTMLElement).textContent : "Game not found...";
    presenceData.largeImageKey = "logo";
    presenceData.smallImageKey = live
      ? "live"
      : video.paused
      ? "pause"
      : "play";
    presenceData.smallImageText = live
      ? (await strings).live
      : video.paused
      ? (await strings).pause
      : (await strings).play;
    presenceData.startTimestamp = timestamps[0];
    presenceData.endTimestamp = timestamps[1];

    presence.setTrayTitle(video.paused ? "" : title.textContent);

    if (video.paused || live) {
      delete presenceData.startTimestamp;
      delete presenceData.endTimestamp;
    }

    if (title !== null && game !== null) {
      presence.setActivity(presenceData, !video.paused);
    }
  } else {
    const pageData: PresenceData = {
      details: "Browsing..",
      largeImageKey: "logo"
    };
    presence.setActivity(pageData);
  }
});
