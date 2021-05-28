const presence = new Presence({
    clientId: "708082807775428678"
  }),
  strings = presence.getStrings({
    playing: "presence.playback.playing",
    paused: "presence.playback.paused",
    browsing: "presence.activity.browsing"
  }),
  startTimestamp = Math.floor(Date.now() / 1000);

let video: {
  paused: boolean;
  duration: number;
  currentTime: number;
};

presence.on(
  "iFrameData",
  async (msg: { paused: boolean; duration: number; currentTime: number }) => {
    if (!msg) return;
    video = msg;
  }
);

presence.on("UpdateData", async () => {
  const data: PresenceData = {
      largeImageKey: "aniturk",
      startTimestamp
    },
    title = document.querySelector(
      "html > body > div.konter > a > div.icerik-bilgi"
    ),
    episode = document.querySelector(
      "html > body > div.konter > div.icerik-baslik"
    );

  if (!title || !episode) video = null;

  //Episode part
  if (title && episode) {
    data.details = title.textContent;
    data.state = episode.textContent.replace(
      title.textContent.split(" ").slice(1).join(" "),
      ""
    );
  } else data.details = (await strings).browsing;

  if (video) {
    data.smallImageKey = video.paused ? "stop" : "resume";
    data.smallImageText = video.paused
      ? (await strings).paused
      : (await strings).playing;

    if (!video.paused && video.duration) {
      const [, endTimestamp] = presence.getTimestamps(
        Math.floor(video.currentTime),
        Math.floor(video.duration)
      );
      data.endTimestamp = endTimestamp;
    }
  }

  presence.setActivity(data);
});
