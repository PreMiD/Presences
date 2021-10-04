const presence = new Presence({
    clientId: "760588725494218844"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused",
    browsing: "presence.activity.browsing"
  });

presence.on("UpdateData", async () => {
  const data: PresenceData = {
      largeImageKey: "lm"
    },
    video: HTMLVideoElement = document.querySelector("video");

  if (video !== null && !isNaN(video.duration)) {
    const timestamps = presence.getTimestamps(
      Math.floor(video.currentTime),
      Math.floor(video.duration)
    );

    if (document.location.pathname.includes("/shows/view")) {
      data.details = `${
        document.querySelector(".watch-heading > h1 > span").previousSibling
          .textContent
      }(${document.querySelector(".watch-heading > h1 > span").textContent})`;
      data.state = `${
        document.querySelector(".seasons-switcher > span").textContent
      } ${document.querySelector(".episodes-switcher > span").textContent}`;
    } else if (document.location.pathname.includes("/movies/view")) {
      data.details = document.querySelector(
        ".watch-heading > h1 > span"
      ).previousSibling.textContent;
      data.state = document.querySelector(
        ".watch-heading > h1 > span"
      ).textContent;
    }
    data.smallImageKey = video.paused ? "pause" : "play";
    data.smallImageText = video.paused
      ? (await strings).pause
      : (await strings).play;
    [presenceData.startTimestamp, presenceData.endTimestamp] = timestamps;

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
