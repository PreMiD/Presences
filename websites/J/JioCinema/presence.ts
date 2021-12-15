const presence: Presence = new Presence({
    clientId: "632479205707350037"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
  }),
  startTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
      largeImageKey: "large_img",
      startTimestamp
    },
    url = window.location.href;
  if (url.includes("/watch/")) {
    const [video] = document.getElementsByTagName("video"),
      timestamps = presence.getTimestamps(
        Math.floor(video.currentTime),
        Math.floor(video.duration)
      ),
      title = document.getElementsByClassName("meta-data-title")[0].textContent;
    presenceData.details = title;
    presenceData.largeImageKey = "large_img";
    presenceData.smallImageKey = video.paused ? "pause" : "play";
    presenceData.smallImageText = video.paused
      ? (await strings).pause
      : (await strings).play;
    [presenceData.startTimestamp, presenceData.endTimestamp] = timestamps;
    if (url.includes("/tv/")) {
      const episode = (
        document.querySelectorAll("div.now-playing") as NodeListOf<HTMLElement>
      )[0].offsetParent.querySelectorAll("span.jioTitle")[1].textContent;
      presenceData.state = episode.replace("| ", "");
    } else if (url.includes("/movies/")) presenceData.state = "Movie";
    else if (url.includes("/playlist/")) presenceData.state = "Music Video";
    else presenceData.state = "Video";

    if (video.paused) {
      delete presenceData.startTimestamp;
      delete presenceData.endTimestamp;
    }
  } else if (url.includes("/search/")) {
    presenceData.details = "Searching...";
    presenceData.smallImageKey = "search";
  } else presenceData.details = "Browsing";

  presence.setActivity(presenceData, true);
});
