const presence = new Presence({
  clientId: "633714339999645737"
});

function getTimestamps(curr: number, dura: number): Array<number> {
  const startTime = Math.floor(Date.now() / 1000),
    duration = Math.floor(startTime - curr + dura);
  return [startTime, duration];
}

presence.on("UpdateData", async () => {
  const video = document.querySelector("video"),
    strings = await presence.getStrings({
      playing: "presence.playback.playing",
      paused: "presence.playback.paused",
      browsing: "presence.activity.browsing"
    });

  if (video !== null) {
    const timestamps = getTimestamps(video.currentTime, video.duration),
      presenceData: PresenceData = {
        state: document.querySelector("body > div.menu.main > div > h2")
          .textContent,
        largeImageKey: "logo",
        startTimestamp: timestamps[0],
        endTimestamp: timestamps[1],
        smallImageKey: video.paused ? "pause" : "play",
        smallImageText: video.paused
          ? (await strings).paused
          : (await strings).playing
      };

    if (video.paused) {
      delete presenceData.startTimestamp;
      delete presenceData.endTimestamp;
    }

    presence.setActivity(presenceData);
  } else presence.setActivity();
});
