const presence = new Presence({
    clientId: "808758769424138252"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
  });

presence.on("UpdateData", async () => {
  const video: HTMLVideoElement = document.querySelector(
      "#adn-video-js_html5_api"
    ),
    presenceData: PresenceData = {
      largeImageKey: "logo"
    };

  if (document.location.pathname.includes("video") && video) {
    if (video && !isNaN(video.duration)) {
      const title = document.querySelector(
          'meta[name="description"]'
        ) as HTMLMetaElement,
        title2 = title.content.replace(/[0-9]/g, " ").substr(6),
        title3 = title2.length - 131;
      if (title3 < 0) {
        const title4 = title2.length - 112;
        presenceData.details = title2.slice(0, title4);
      } else presenceData.details = title2.slice(0, title3);

      const timestamps = presence.getTimestamps(
        Math.floor(video.currentTime),
        Math.floor(video.duration)
      );
      presenceData.smallImageKey = video.paused ? "pause" : "play";
      presenceData.smallImageText = video.paused
        ? (await strings).pause
        : (await strings).play;
      presenceData.endTimestamp = timestamps[1];

      if (video.paused) {
        delete presenceData.startTimestamp;
        delete presenceData.endTimestamp;
      }
    } else if (video && isNaN(video.duration)) {
      const title = document.querySelector(
          'meta[name="description"]'
        ) as HTMLMetaElement,
        title2 = title.content.replace(/[0-9]/g, " ").substr(6),
        title3 = title2.length - 131;
      if (title3 < 0) {
        const title4 = title2.length - 112;
        presenceData.state = title2.slice(0, title4);
      } else presenceData.state = title2.slice(0, title3);

      presenceData.details = "Looking at";
    }
  } else if (document.location.pathname.includes("video") && !video) {
    const title = document.querySelector(
        'meta[name="description"]'
      ) as HTMLMetaElement,
      title2 = title.content.replace(/[0-9]/g, " ").substr(31),
      title3 = title2.length - 101;
    presenceData.details = "Looking at";
    presenceData.state = title2.slice(0, title3);
  } else presenceData.details = "Browsing...";
  if (presenceData.details === null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});
