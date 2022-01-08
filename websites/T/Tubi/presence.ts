const presence = new Presence({
    clientId: "621835880474345473"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
  });

let subtitle;

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
      largeImageKey: "tubi-logo"
    },
    video: HTMLVideoElement = document.querySelector(
      "video#videoPlayerComponent"
    );
  if (video && !isNaN(video.duration)) {
    const title = document.querySelector("h1._1PDoZ._1nW6s").textContent,
      [startTimestamp, endTimestamp] = presence.getTimestamps(
        Math.floor(video.currentTime),
        Math.floor(video.duration)
      ),
      subtitleCheck = document.querySelector("h2._29XQF._24NNJ");

    if (!subtitleCheck) subtitle = "Movie";
    else subtitle = subtitleCheck.textContent;

    presenceData.details = title;
    presenceData.state = subtitle;
    presenceData.smallImageKey = video.paused ? "pause" : "play";
    presenceData.smallImageText = video.paused
      ? (await strings).pause
      : (await strings).play;
    presenceData.startTimestamp = startTimestamp;
    presenceData.endTimestamp = endTimestamp;

    if (video.paused) {
      delete presenceData.startTimestamp;
      delete presenceData.endTimestamp;
    }

    if (title && subtitle) presence.setActivity(presenceData, !video.paused);
  } else {
    presenceData.details = "Browsing...";
    presence.setActivity(presenceData);
  }
});
