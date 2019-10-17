let  presence : Presence = new Presence({
    clientId: "632479205707350037",
    mediaKeys: true
}),
strings = presence.getStrings({
  play: "presence.playback.playing",
  pause: "presence.playback.paused"
}),
startTimestamp = Math.floor(Date.now() / 1000);
presence.on("UpdateData", async () => {
    let presenceData: presenceData = {
        largeImageKey: "large_img",
        startTimestamp
    };
    const url = window.location.href;
    if (url.includes("/watch/"))
    {
      let video: HTMLVideoElement = document.getElementsByTagName("video")[0],
      timestamps = getTimestamps(
        Math.floor(video.currentTime),
        Math.floor(video.duration)),
      title = document.getElementsByClassName("meta-data-title")[0].textContent;
      presenceData = {
        details: title,
        largeImageKey: "large_img",
        smallImageKey: video.paused ? "pause" : "play",
        smallImageText: video.paused
          ? (await strings).pause
          : (await strings).play,
        startTimestamp: timestamps[0],
        endTimestamp: timestamps[1]
      };
      if (url.includes("/tv/"))
      {
        const episode = document.querySelectorAll("div.now-playing")[0].offsetParent.querySelectorAll("span.jioTitle")[1].textContent;
        presenceData.state = episode.replace("| ","");
      }
      else if (url.includes("/movies/"))
      {
        presenceData.state = "Movie";
      }
      else if (url.includes("/playlist/"))
      {
        presenceData.state = "Music Video";
      }
      else
      {
        presenceData.state = "Video";
      }
      if (video.paused) {
        delete presenceData.startTimestamp;
        delete presenceData.endTimestamp;
      }
    }
    else if (url.includes("/search/"))
    {
      presenceData.details = "Searching...";
      presenceData.smallImageKey = "search";
    }
    else
    {
      presenceData.details = "Browsing";
    }

    presence.setActivity(presenceData, true);
});

function getTimestamps(videoTime: number, videoDuration: number) {
  var startTime = Date.now();
  var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
  return [Math.floor(startTime / 1000), endTime];
}
