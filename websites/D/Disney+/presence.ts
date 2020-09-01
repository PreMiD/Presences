const presence: Presence = new Presence({
  clientId: "630236276829716483"
});

const strings = presence.getStrings({
  play: "presence.playback.playing",
  pause: "presence.playback.paused",
  browsing: "presence.activity.browsing"
});

/**
 * Get Timestamps
 * @param {Number} videoTime Current video time seconds
 * @param {Number} videoDuration Video duration seconds
 */
function getTimestamps(
  videoTime: number,
  videoDuration: number
): Array<number> {
  var startTime = Date.now();
  var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
  return [Math.floor(startTime / 1000), endTime];
}

let title: string;
let subtitle: string;

presence.on("UpdateData", async () => {
  const isHostDP = /(www\.)?disneyplus\.com/.test(location.hostname);
  const isHostHS = /(www\.)?hotstar\.com/.test(location.hostname);
  const data: PresenceData = {};

  if (isHostDP) {
    data.largeImageKey = "disneyplus-logo"
  } else if (isHostHS) {
    data.largeImageKey = "disneyplus-hotstar-logo"
  }

  // Disney+ video
  if (isHostDP && location.pathname.includes("/video")) {
    const video: HTMLVideoElement = document.querySelector(
      ".btm-media-clients video"
    );

    if (video && !isNaN(video.duration)) {
      const timestamps: number[] = getTimestamps(
        Math.floor(video.currentTime),
        Math.floor(video.duration)
      );

      const titleField: HTMLDivElement = document.querySelector(
        ".btm-media-overlays-container .title-field"
      );
      title = titleField ? titleField.textContent : null;
      const subtitleField: HTMLDivElement = document.querySelector(
        ".btm-media-overlays-container .subtitle-field"
      );
      subtitle = subtitleField ? subtitleField.textContent : null;

      // subtitleField is episode for series, empty for movies
      data.details = title;
      data.state = subtitle ? subtitle : "Movie";

      data.smallImageKey = video.paused ? "pause" : "play";
      data.smallImageText = video.paused
        ? (await strings).pause
        : (await strings).play;
      data.startTimestamp = timestamps[0];
      data.endTimestamp = timestamps[1];

      if (video.paused) {
        delete data.startTimestamp;
        delete data.endTimestamp;
      }

      if (title) presence.setActivity(data, !video.paused);
    }
  // Disney+ Hotstar video
  } else if (isHostHS && /\/(tv|movies)\//.test(location.pathname)) {
    const video: HTMLVideoElement = document.querySelector(
      ".player-base video"
    );

    if (video && !isNaN(video.duration)) {
      const timestamps: number[] = getTimestamps(
        Math.floor(video.currentTime),
        Math.floor(video.duration)
      );

      const titleField: HTMLDivElement = document.querySelector(
        ".controls-overlay .primary-title"
      );
      title = titleField ? titleField.textContent : null;
      const subtitleField: HTMLDivElement = document.querySelector(
        ".controls-overlay .show-title"
      );
      subtitle = subtitleField ? subtitleField.textContent : null;

      // subtitleField is episode for series, empty for movies
      data.details = title;
      data.state = subtitle ? subtitle : "Movie";

      data.smallImageKey = video.paused ? "pause" : "play";
      data.smallImageText = video.paused
        ? (await strings).pause
        : (await strings).play;
      data.startTimestamp = timestamps[0];
      data.endTimestamp = timestamps[1];

      if (video.paused) {
        delete data.startTimestamp;
        delete data.endTimestamp;
      }

      if (title) presence.setActivity(data, !video.paused);
    }
  } else {
    data.details = (await strings).browsing;
    presence.setActivity(data);
  }
});
