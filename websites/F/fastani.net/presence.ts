const presence = new Presence({
    clientId: "788064233882910750"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
  });

let lastPlaybackState,
  previousTitle: HTMLElement,
  playback,
  browsingStamp = Math.floor(Date.now() / 1000);
const urlRegex = /watch\/.*?\/(\d+)\/(\d+)/;

if (lastPlaybackState !== playback) {
  lastPlaybackState = playback;
  browsingStamp = Math.floor(Date.now() / 1000);
}

presence.on("UpdateData", async () => {
  playback = document.querySelector("div.plyr__video-wrapper > video");

  const video: HTMLVideoElement = document.querySelector(
      "div.plyr__video-wrapper > video"
    ),
    presenceData: PresenceData = {
      largeImageKey: "logo"
    };

  if (!playback) {
    const scrapedTitle = document.querySelector(
      "div.anicb-i-title"
    ) as HTMLElement;
    // Stores the title for use if not on the title page.
    previousTitle = scrapedTitle || previousTitle;

    // If an anime card is on the screen it'll use the last seen title.
    presenceData.details =
      document.querySelector("div.aninfobox-content-body") && previousTitle
        ? `Viewing ${previousTitle.textContent}`
        : "Browsing...";
    presenceData.startTimestamp = browsingStamp;
    presence.setActivity(presenceData, true);
  }

  if (video !== null && !isNaN(video.duration)) {
    const videoTitle = document.querySelector(
        "div#watch-page-main"
      ) as HTMLElement,
      matched = location.href.match(urlRegex),
      seasonNumber = matched ? matched[1] : null,
      episodeNumber = matched ? matched[2] : null;
    [presenceData.startTimestamp, presenceData.endTimestamp] =
      presence.getTimestamps(
        Math.floor(video.currentTime),
        Math.floor(video.duration)
      );

    presenceData.smallImageKey = video.paused ? "pause" : "play";
    presenceData.smallImageText = video.paused
      ? (await strings).pause
      : (await strings).play;

    presence.setTrayTitle(video.paused ? "" : videoTitle.innerText);

    presenceData.details =
      videoTitle !== null
        ? videoTitle.dataset.fastaniTitle
        : "Title not found...";
    presenceData.state =
      matched !== null
        ? `Episode ${episodeNumber} · Season ${seasonNumber}`
        : "Episode not found...";

    if (video.paused) {
      delete presenceData.startTimestamp;
      delete presenceData.endTimestamp;
    }

    if (videoTitle !== null) presence.setActivity(presenceData, !video.paused);
  }
});
