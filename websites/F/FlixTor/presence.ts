const presence = new Presence({
    clientId: "616754182858342426"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
  });

let lastPlaybackState,
  playback: boolean,
  browsingStamp = Math.floor(Date.now() / 1000);

if (lastPlaybackState !== playback) {
  lastPlaybackState = playback;
  browsingStamp = Math.floor(Date.now() / 1000);
}

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
      details: "Unknown page",
      largeImageKey: "lg"
    },
    video: HTMLVideoElement = document.querySelector(
      "#player > div.jw-wrapper.jw-reset > div.jw-media.jw-reset > video"
    );

  playback = video !== null ? true : false;

  if (!playback) {
    presenceData.details = "Browsing...";
    presenceData.startTimestamp = browsingStamp;

    presence.setActivity(presenceData);
  }

  if (video !== null && !isNaN(video.duration)) {
    const videoTitle: HTMLElement = document.querySelector(
        "div.watch-header.h4.mb-0.font-weight-normal.link.hidden-sm-down"
      ),
      season: HTMLElement = document.querySelector(
        "#playercontainer span.outPes"
      ),
      episode: HTMLElement = document.querySelector(
        "#playercontainer span.outPep"
      );

    presenceData.smallImageKey = video.paused ? "pause" : "play";
    presenceData.smallImageText = video.paused
      ? (await strings).pause
      : (await strings).play;
    [presenceData.startTimestamp, presenceData.endTimestamp] =
      presence.getTimestamps(
        Math.floor(video.currentTime),
        Math.floor(video.duration)
      );

    presence.setTrayTitle(
      video.paused
        ? ""
        : videoTitle !== null
        ? videoTitle.innerText
        : "Title not found..."
    );

    if (season && episode) {
      presenceData.details =
        videoTitle !== null ? videoTitle.innerText : "Title not found...";
      presenceData.state = `Season ${season.innerText}, Episode ${episode.innerText}`;
    } else if (!season && episode) {
      presenceData.details =
        videoTitle !== null ? videoTitle.innerText : "Title not found...";
      presenceData.state = `Episode ${episode.innerText}`;
    } else {
      presenceData.details = "Watching";
      presenceData.state =
        videoTitle !== null ? videoTitle.innerText : "Title not found...";
    }

    if (video.paused) {
      delete presenceData.startTimestamp;
      delete presenceData.endTimestamp;
    }

    if (videoTitle !== null) presence.setActivity(presenceData, !video.paused);
  }
});
