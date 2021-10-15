const presence = new Presence({
    clientId: "708082807775428678"
  }),
  strings = presence.getStrings({
    playing: "presence.playback.playing",
    paused: "presence.playback.paused",
    browsing: "presence.activity.browsing"
  }),
  startTimestamp = Math.floor(Date.now() / 1000);

let video: IFrameData;

interface IFrameData {
  duration: number;
  paused: boolean;
  currentTime: number;
}

presence.on("iFrameData", async (data: IFrameData) => {
  if (!data) return;
  video = data;
});

presence.on("UpdateData", async () => {
  const data: PresenceData = {
      largeImageKey: "aniturk"
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
  } else {
    //Home page part
    data.details = (await strings).browsing;
    data.startTimestamp = startTimestamp;
  }

  if (video) {
    data.smallImageKey = video.paused ? "stop" : "resume";
    data.smallImageText = video.paused
      ? (await strings).paused
      : (await strings).playing;

    if (!video.paused && video.duration) {
      [data.startTimestamp, data.endTimestamp] = presence.getTimestamps(
        Math.floor(video.currentTime),
        Math.floor(video.duration)
      );
    }
  }

  presence.setActivity(data);
});
