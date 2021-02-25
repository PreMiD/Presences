const presence = new Presence({
    clientId: "640644330666852382"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
  });

let lastPlaybackState = null,
  playback,
  browsingStamp = Math.floor(Date.now() / 1000);

if (lastPlaybackState != playback) {
  lastPlaybackState = playback;
  browsingStamp = Math.floor(Date.now() / 1000);
}
presence.on("UpdateData", async () => {
  playback =
    document.querySelector(".vjs-current-time-display") !== null ? true : false;
  const presenceData: PresenceData = {
    largeImageKey: "logo"
  };
  if (!playback) {
    presenceData.details = "Browsing...";
    presenceData.startTimestamp = browsingStamp;

    delete presenceData.state;
    delete presenceData.smallImageKey;

    presence.setActivity(presenceData, true);
  }

  const video: HTMLVideoElement = document.querySelector(
    "#example_video_1_html5_api"
  );

  if (video !== null && !isNaN(video.duration)) {
    const series = document.querySelector("a#titleleft"),
      seriesTitle = series.textContent,
      episode = document.querySelector("span#titleleft").textContent,
      timestamps = presence.getTimestamps(
        Math.floor(video.currentTime),
        Math.floor(video.duration)
      );
    presenceData.smallImageKey = video.paused ? "pause" : "play";
    presenceData.smallImageText = video.paused
      ? (await strings).pause
      : (await strings).play;
    presenceData.startTimestamp = timestamps[0];
    presenceData.endTimestamp = timestamps[1];

    presence.setTrayTitle(video.paused ? "" : seriesTitle);

    presenceData.buttons = [
      {
        label: "Watch Episode",
        url: document.baseURI
      },
      {
        label: "View Series",
        url: series.getAttribute("href")
      }
    ];

    presenceData.details = seriesTitle;
    presenceData.state = episode;

    if (video.paused) {
      delete presenceData.startTimestamp;
      delete presenceData.endTimestamp;
    }
    presence.setActivity(presenceData, !video.paused);
  }
});
