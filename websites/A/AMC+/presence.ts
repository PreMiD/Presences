const presence = new Presence({
    clientId: "877353878427959317"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused",
    live: "presence.activity.live",
    search: "presence.activity.searching"
  });

let elapsed: number, oldUrl: string;

presence.on("UpdateData", async () => {
  const video: HTMLVideoElement = document.querySelector("video"),
    { href } = window.location,
    data: PresenceData = {
      largeImageKey: "amc"
    };

  if (href !== oldUrl) {
    oldUrl = href;
    elapsed = Math.floor(Date.now() / 1000);
  }

  // Default details
  data.details = "Browsing catalogue...";

  data.startTimestamp = elapsed;

  if (video) {
    const slot1 = document.querySelector(".slot1"),
      slot2 = document.querySelector(".slot2"),
      slot3 = document.querySelector(".slot3"),
      isSeries = slot2 && slot3;

    data.details = slot1.textContent;

    if (isSeries) {
      // A series has slot1 (the series name), slot2 (the episode)
      // and slot3 (the episode name)
      data.details += `: ${slot2.textContent}`;
      data.state = slot3.textContent;
    } else {
      // A movie only has slot1 (the title)
      data.state = "Watching movie";
    }

    const [startTimestamp, endTimestamp] =
        presence.getTimestampsfromMedia(video),
      live = timestamps[1] === Infinity;

    data.smallImageText = live
      ? (await strings).live
      : video.paused
      ? (await strings).pause
      : (await strings).play;

    data.smallImageKey = live ? "live" : video.paused ? "pause" : "play";

    data.startTimestamp = live ? elapsed : startTimestamp;
    data.endTimestamp = endTimestamp;

    if (live) delete data.endTimestamp;
    if (video.paused) {
      delete data.startTimestamp;
      delete data.endTimestamp;
      if (!isSeries) data.state = "Paused";
    }
  }

  if (!data.details) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(data);
});
