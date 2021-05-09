const presence = new Presence({
    clientId: "607352899214901248"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
  });

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
      largeImageKey: "lg"
    },
    showTime = await presence.getSetting("time");

  switch (window.location.pathname) {
    case "/view_video.php":
      const video: HTMLVideoElement =
          document.querySelector(".mgp_videoWrapper video") ?? null,
        title = document.querySelector(".video-wrapper .title-container .title")
          .textContent,
        uploader = document.querySelector(
          ".video-actions-container .video-info-row .usernameWrap a"
        ).textContent;

      if (video && !isNaN(video.duration)) {
        const timestamps = presence.getTimestampsfromMedia(video);

        presenceData.details = title ?? "Title not found...";
        presenceData.state = uploader ?? "Uploader not found...";

        presenceData.smallImageKey = video.paused ? "pause" : "play";
        (presenceData.smallImageText = video.paused
          ? (await strings).pause
          : (await strings).play),
          (presenceData.endTimestamp = timestamps[1]);
      }
      //* Remove timestamps if paused or not show timestamps
      if (video?.paused || !showTime) {
        delete presenceData.endTimestamp;
      }
      break;
  }

  if (presenceData.details != null) {
    presence.setActivity(presenceData);
  } else {
    presence.setActivity();
    presence.setTrayTitle();
  }
});
