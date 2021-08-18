const presence = new Presence({
    clientId: "844106861711196179"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused",
    live: "presence.activity.live"
  }),
  elapsed = Math.floor(Date.now() / 1000);
let title;

presence.on("UpdateData", async () => {
  const data: PresenceData = {
      largeImageKey: "logo"
    },
    video: HTMLVideoElement = document.querySelector(".aPWk0-TaQEzvggxIT6qvP");
  if (video && !isNaN(video.duration)) {
    const Ad = document.querySelector("._3uUpH58Juk_Qbizq6j5ThG")
      ? true
      : false;
    if (!Ad) {
      const path = document.location.pathname;
      if (path.includes("/live/")) {
        title = document.querySelector("._3tdt8zwgvMCJ6v_sElXneQ").textContent;
        data.smallImageKey = "live";
        data.smallImageText = (await strings).live;
        data.startTimestamp = elapsed;
      } else {
        title = document.querySelector(".bodyTitle___DZEtt").textContent;
        const [, endTimestamp] = presence.getTimestamps(
          Math.floor(video.currentTime),
          Math.floor(video.duration)
        );
        data.smallImageKey = video.paused ? "pause" : "play";
        data.smallImageText = video.paused
          ? (await strings).pause
          : (await strings).play;
        data.endTimestamp = endTimestamp;
      }
      const subtitle = document.querySelector(
        "._39WJKEhrSYo7ftwMlFjZtA  ._3tdt8zwgvMCJ6v_sElXneQ"
      ).textContent;
      data.details = title;
      data.state = subtitle;

      if (video.paused) {
        delete data.startTimestamp;
        delete data.endTimestamp;
      }

      if (title !== null && subtitle !== null) {
        presence.setActivity(data, !video.paused);
      }
    } else {
      (data.details = "Watching an Ad"), presence.setActivity(data);
    }
  } else {
    (data.details = "Browsing..."), presence.setActivity(data);
  }
});
