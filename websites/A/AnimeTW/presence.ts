const presence = new Presence({
    clientId: "523553075680772106"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused",
    browsing: "presence.activity.browsing"
  });
let video = {
  duration: 0,
  currentTime: 0,
  paused: true
};

/**
 * Get Timestamps
 * @param {Number} videoTime Current video time seconds
 * @param {Number} videoDuration Video duration seconds
 */
function getTimestamps(
  videoTime: number,
  videoDuration: number
): Array<number> {
  const startTime = Date.now();
  const endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
  return [Math.floor(startTime / 1000), endTime];
}

presence.on(
  "iFrameData",
  (data: { duration: number; currentTime: number; paused: boolean }) => {
    video = data;
  }
);

presence.on("UpdateData", async () => {
  const data: PresenceData = {
    largeImageKey: "animetw"
  };

  if (
    video != null &&
    !isNaN(video.duration) &&
    document.location.pathname.includes("/ver")
  ) {
    const timestamps = getTimestamps(
      Math.floor(video.currentTime),
      Math.floor(video.duration)
    );

    data.details = document.querySelector("#head > title").textContent;
    (data.smallImageKey = video.paused ? "pause" : "play"),
      (data.smallImageText = video.paused
        ? (await strings).pause
        : (await strings).play),
      (data.startTimestamp = timestamps[0]),
      (data.endTimestamp = timestamps[1]);

    if (video.paused) {
      delete data.startTimestamp;
      delete data.endTimestamp;
    }

    presence.setActivity(data, !video.paused);
  } else {
    data.details = (await strings).browsing;
    data.smallImageKey = "search";
    data.smallImageText = (await strings).browsing;
    presence.setActivity(data);
  }
});
