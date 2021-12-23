const presence = new Presence({
    clientId: "760588725494218844"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused",
    browsing: "presence.activity.browsing"
  });

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
      largeImageKey: "lm"
    },
    video: HTMLVideoElement = document.querySelector("video");

  if (video && !isNaN(video.duration)) {
    if (document.location.pathname.includes("/shows/view")) {
      presenceData.details = `${
        document.querySelector(".watch-heading > h1 > span").previousSibling
          .textContent
      }(${document.querySelector(".watch-heading > h1 > span").textContent})`;
      presenceData.state = `${
        document.querySelector(".seasons-switcher > span").textContent
      } ${document.querySelector(".episodes-switcher > span").textContent}`;
    } else if (document.location.pathname.includes("/movies/view")) {
      presenceData.details = document.querySelector(
        ".watch-heading > h1 > span"
      ).previousSibling.textContent;
      presenceData.state = document.querySelector(
        ".watch-heading > h1 > span"
      ).textContent;
    }
    presenceData.smallImageKey = video.paused ? "pause" : "play";
    presenceData.smallImageText = video.paused
      ? (await strings).pause
      : (await strings).play;
    [presenceData.startTimestamp, presenceData.endTimestamp] =
      presence.getTimestamps(
        Math.floor(video.currentTime),
        Math.floor(video.duration)
      );

    if (video.paused) {
      delete presenceData.startTimestamp;
      delete presenceData.endTimestamp;
    }

    presence.setActivity(presenceData, !video.paused);
  } else {
    presenceData.details = (await strings).browsing;
    presenceData.smallImageKey = "search";
    presenceData.smallImageText = (await strings).browsing;
    presence.setActivity(presenceData);
  }
});
