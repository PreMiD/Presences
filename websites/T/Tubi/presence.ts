const presence = new Presence({
    clientId: "621835880474345473"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
  });

let subtitle;

presence.on("UpdateData", async () => {
  const data: PresenceData = {
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
      );
    if (document.querySelector("h2._29XQF._24NNJ") ? false : true)
      subtitle = "Movie";
    else subtitle = document.querySelector("h2._29XQF._24NNJ").textContent;

    presenceData.details = title;
    data.state = subtitle;
    data.smallImageKey = video.paused ? "pause" : "play";
    data.smallImageText = video.paused
      ? (await strings).pause
      : (await strings).play;
    data.startTimestamp = startTimestamp;
    data.endTimestamp = endTimestamp;

    if (video.paused) {
      delete data.startTimestamp;
      delete data.endTimestamp;
    }

    if (title && subtitle) presence.setActivity(data, !video.paused);
  } else {
    presenceData.details = "Browsing...";
    presence.setActivity(data);
  }
});
