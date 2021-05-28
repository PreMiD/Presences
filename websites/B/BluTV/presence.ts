const presence = new Presence({
    clientId: "664216462038401066"
  }),
  strings = presence.getStrings({
    playing: "presence.playback.playing",
    paused: "presence.playback.paused",
    browsing: "presence.activity.browsing"
  }),
  startTimestamp = Math.floor(Date.now() / 1000);

function seriesName(name: string): string {
  return name.replace(/([^\W_]+[^\s-]*) */g, function (text) {
    return text.charAt(0).toUpperCase() + text.substr(1).toLowerCase();
  });
}

let data: {
    video: { paused: boolean; duration: number; currentTime: number };
    movie?: { name: string };
    series?: { name: string; ep: string; season: string };
  },
  video: { paused: boolean; duration: number; currentTime: number };

presence.on("iFrameData", async (msg: typeof data) => {
  if (!msg) return;
  data = msg;
  ({ video } = msg);
});

presence.on("UpdateData", async () => {
  const path = document.location.pathname,
    presenceData: PresenceData = {
      largeImageKey: "blutv"
    };

  if (!path.includes("izle")) {
    video = null;
    data = null;
  }

  if (data) {
    if (data.series) {
      const name = data.series.name
        ? data.series.name
        : seriesName(path.split("/")[3].replace(/-/gi, " "));

      presenceData.details = name;
      presenceData.state = `${data.series.season} | ${data.series.ep}`;
    } else {
      presenceData.details = path.startsWith("/canli-yayin")
        ? "Bir televizyon yayını izliyor:"
        : "Bir film izliyor:";
      presenceData.state = data.movie.name;
    }

    if (video) {
      presenceData.smallImageKey = video.paused ? "pause" : "play";
      presenceData.smallImageText = video.paused
        ? (await strings).paused
        : (await strings).playing;

      const [, endTimestamp] = presence.getTimestamps(
        Math.floor(video.currentTime),
        Math.floor(video.duration)
      );
      if (
        video.duration &&
        !video.paused &&
        !document.location.pathname.startsWith("/canli-yayin")
      )
        presenceData.endTimestamp = endTimestamp;
    }
  } else {
    presenceData.startTimestamp = startTimestamp;
    presenceData.details = (await strings).browsing;
  }

  presence.setActivity(presenceData);
});
