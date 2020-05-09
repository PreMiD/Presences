const presence = new Presence({
  clientId: "708082807775428678"
});

const strings = presence.getStrings({
  playing: "presence.playback.playing",
  paused: "presence.playback.paused",
  browsing: "presence.activity.browsing"
});

function getTimestamps(
  videoTime: number,
  videoDuration: number
): Array<number> {
  var startTime = Date.now();
  var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
  return [Math.floor(startTime / 1000), endTime];
}

const startTimestamp = Math.floor(Date.now() / 1000);

let video: HTMLVideoElement;

presence.on("iFrameData", async (msg) => {
  if (!msg) return;
  video = msg;
});

presence.on("UpdateData", async () => {
  const data: presenceData = {
    largeImageKey: "aniturk"
  };

  const title = document.querySelector(
    "html > body > div.konter > a > div.icerik-bilgi"
  );
  const episode = document.querySelector(
    "html > body > div.konter > div.icerik-baslik"
  );

  if (!title || !episode) {
    video = null;
  }
  //Episode part
  if (title && episode) { 
    data.details = title.textContent;
    data.state = episode.textContent.replace(
      title.textContent.split(" ").slice(1).join(" "),
      ""
    );
  }
  //Home page part
  else { 
    data.details = (await strings).browsing;
    data.startTimestamp = startTimestamp;
  }

  if (video) {
    data.smallImageKey = video.paused ? "stop" : "resume";
    data.smallImageText = video.paused
      ? (await strings).paused
      : (await strings).playing;

    if (!video.paused && video.duration) {
      const timestamps = getTimestamps(
        Math.floor(video.currentTime),
        Math.floor(video.duration)
      );
      data.startTimestamp = timestamps[0];
      data.endTimestamp = timestamps[1];
    }
  }

  presence.setActivity(data);
});