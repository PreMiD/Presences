const presence = new Presence({
    clientId: "877353878427959317"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused",
    live: "presence.activity.live",
    search: "presence.activity.searching"
  });

let elapsed: number = undefined,
  oldUrl: string = undefined;

presence.on("UpdateData", async () => {
  let details: string,
    state: string,
    smallImageKey: string,
    smallImageText: string,
    startTimestamp: number,
    endTimestamp: number;

  const video: HTMLVideoElement = document.querySelector("video"),
    { href } = window.location;

  if (href !== oldUrl) {
    oldUrl = href;
    elapsed = Math.floor(Date.now() / 1000);
  }

  // Default details
  details = "Browsing catalogue...";

  startTimestamp = elapsed;

  if (video) {
    const slot1 = document.querySelector(".slot1"),
      slot2 = document.querySelector(".slot2"),
      slot3 = document.querySelector(".slot3"),
      isSeries = slot2 && slot3;

    details = slot1.textContent;

    if (isSeries) {
      // A series has slot1 (the series name), slot2 (the episode)
      // and slot3 (the episode name)
      details += `: ${slot2.textContent}`;
      state = slot3.textContent;
    } else {
      // A movie only has slot1 (the title)
      state = "Watching movie";
    }

    const timestamps = presence.getTimestampsfromMedia(video),
      live = timestamps[1] === Infinity;

    smallImageText = live
      ? (await strings).live
      : video.paused
      ? (await strings).pause
      : (await strings).play;

    smallImageKey = live ? "live" : video.paused ? "pause" : "play";

    if (live) startTimestamp = elapsed;
    endTimestamp = live ? undefined : timestamps[1];
    if (video.paused) {
      startTimestamp = undefined;
      endTimestamp = undefined;
      if (!isSeries) state = "Paused";
    }
  }

  const data: PresenceData = {
    largeImageKey: "amc",
    details
  };

  if (state !== undefined) data.state = state;

  if (smallImageKey !== undefined) data.smallImageKey = smallImageKey;

  if (smallImageText !== undefined) data.smallImageText = smallImageText;

  if (startTimestamp !== undefined) data.startTimestamp = startTimestamp;

  if (endTimestamp !== undefined) data.endTimestamp = endTimestamp;

  presence.setActivity(data);
  presence.setTrayTitle(details);
});
