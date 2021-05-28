const presence = new Presence({
    clientId: "760586876854992926"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused",
    browsing: "presence.activity.browsing"
  });

presence.on("UpdateData", async () => {
  const data: PresenceData = {
      largeImageKey: "anlg"
    },
    playback: boolean = document.querySelector("anghami-player") !== null;

  if (playback) {
    const selectors: NodeListOf<Node> =
        document.querySelectorAll(".duration-text"),
      current: number = presence.timestampFromFormat(
        (selectors[0] && selectors[0].textContent.trim()) || "00:00"
      ),
      length: number = presence.timestampFromFormat(
        (selectors[1] && selectors[1].textContent.trim()) || "00:00"
      ),
      [, endTimestamp] = presence.getTimestamps(current, length),
      playing: boolean =
        document.querySelector("anghami-player anghami-icon.icon.pause") !==
        null;
    let selector: Node = document.querySelector(
      "anghami-player .action-title .trim"
    );
    data.details = (selector && selector.textContent) || null;
    selector = document.querySelector("anghami-player .action-artist .trim");
    data.state = (selector && selector.textContent) || null;

    data.smallImageKey = playing ? "play" : "pause";
    data.smallImageText = playing
      ? (await strings).play
      : (await strings).pause;
    data.endTimestamp = endTimestamp;

    if (!playing) {
      delete data.startTimestamp;
      delete data.endTimestamp;
    }

    presence.setActivity(data, playback);
  } else {
    data.details = (await strings).browsing;
    data.smallImageKey = "search";
    data.smallImageText = (await strings).browsing;
    presence.setActivity(data);
  }
});
