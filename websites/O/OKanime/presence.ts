const presence = new Presence({
    clientId: "760589463792910388"
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

presence.on(
  "iFrameData",
  (data: { duration: number; currentTime: number; paused: boolean }) => {
    video = data;
  }
);

presence.on("UpdateData", async () => {
  const data: PresenceData = {
    largeImageKey: "oa"
  };

  if (video !== null && !isNaN(video.duration) && video.duration > 0) {
    const timestamps = presence.getTimestamps(
      Math.floor(video.currentTime),
      Math.floor(video.duration)
    );

    data.details = document.querySelector(
      "body div.summary-block > p > a"
    ).textContent;
    if (
      document
        .querySelector("body div.summary-block > p")
        ?.firstChild?.textContent.includes("حلقة")
    ) {
      data.state = document
        .querySelector("body div.summary-block > p")
        .firstChild.textContent.substr(
          0,
          document
            .querySelector("body div.summary-block > p")
            .firstChild.textContent.indexOf("من")
        );
    }

    data.smallImageKey = video.paused ? "pause" : "play";
    data.smallImageText = video.paused
      ? (await strings).pause
      : (await strings).play;
    [data.startTimestamp, data.endTimestamp] = timestamps;

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
