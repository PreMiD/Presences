const presence = new Presence({
    clientId: "758234121574678588"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused",
    browsing: "presence.activity.browsing"
  });

presence.on("UpdateData", async () => {
  const data: PresenceData = {
      largeImageKey: "cp"
    },
    buttons = await presence.getSetting("buttons");

  if (document.location.pathname.includes("/watch")) {
    const video: HTMLVideoElement = document.querySelector(".player-box video");
    if (buttons) {
      data.buttons = [
        {
          label: "Watch",
          url: document.URL
        }
      ];
    }
    if (video && !isNaN(video.duration)) {
      if (document.querySelector(".CPplayer-header-subtitle")) {
        data.state = ` ${
          document.querySelector(".CPplayer-header-subtitle").textContent
        }`;
      } else data.state = "Movie";

      [data.startTimestamp, data.endTimestamp] = presence.getTimestamps(
        Math.floor(video.currentTime),
        Math.floor(video.duration)
      );
      data.details = ` ${
        document.querySelector(".CPplayer-header-title span").textContent
      }`;
      (data.smallImageKey = video.paused ? "pause" : "play"),
        (data.smallImageText = video.paused
          ? (await strings).pause
          : (await strings).play);
      if (video.paused) {
        delete data.startTimestamp;
        delete data.endTimestamp;
      }
      presence.setActivity(data, !video.paused);
    }
  } else {
    data.details = (await strings).browsing;
    presence.setActivity(data);
  }
});
