const presence = new Presence({
    clientId: "794408060847390760"
  }),
  strings = presence.getStrings({
    playing: "presence.playback.playing",
    paused: "presence.playback.paused",
    browsing: "presence.activity.browsing",
    episode: "presence.media.info.episode"
  }),
  startTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const data: PresenceData = {
    largeImageKey: "exxen"
  };
  if (document.location.pathname.indexOf("watch") > -1) {
    const video: HTMLVideoElement = document.querySelector(".rmp-video"),
      episodeName = document.querySelector(".content-name").textContent,
      episode = episodeName.split(".Bölüm")[0].split(" ")[
        episodeName.split(".Bölüm")[0].split(" ").length - 1
      ],
      timestamps = presence.getTimestamps(video.currentTime, video.duration);
    data.details = episodeName
      .replace(`${episode}.Bölüm`, "")
      .replace(`Episode ${episode}`, "");
    data.state = (await strings).episode.replace("{0}", episode);
    if (!video.paused) {
      data.smallImageKey = "playing";
      data.smallImageText = (await strings).playing;
      data.startTimestamp = timestamps[0];
      data.endTimestamp = timestamps[1];
    } else {
      data.smallImageKey = "paused";
      data.smallImageText = (await strings).paused;
    }
  } else {
    data.startTimestamp = startTimestamp;
    data.details = (await strings).browsing;
    if (document.location.pathname.indexOf("detail") > -1)
      data.state = document.querySelector(".title").textContent;
  }
  presence.setActivity(data);
});
