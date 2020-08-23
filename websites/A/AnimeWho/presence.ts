const presence = new Presence({
  clientId: "747190301676011550"
});

const strings = presence.getStrings({
  playing: "presence.playback.playing",
  paused: "presence.playback.paused",
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

const startTimestamp = Math.floor(Date.now() / 1000);

let video: HTMLVideoElement;

presence.on("iFrameData", async (msg: any) => {
  if (!msg) return;
  video = msg;
});

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "animewho"
  };

  const title = document.querySelector(
    "head > title"  
  );

  if (!title) {
    video = null;
  }

  // Anime

  if (title) {
    presenceData.details = title.textContent;
	presenceData.startTimestamp = startTimestamp;
  }

  // Arama
  else {
    presenceData.details = (await strings).browsing;
    presenceData.startTimestamp = startTimestamp;
  }

  if (video) {
    presenceData.smallImageKey = video.paused ? "pause" : "play";
    presenceData.smallImageText = video.paused
      ? (await strings).paused
      : (await strings).playing;

    if (!video.paused && video.duration) {
      const timestamps = getTimestamps(
        Math.floor(video.currentTime),
        Math.floor(video.duration)
      );
      presenceData.startTimestamp = timestamps[0];
      presenceData.endTimestamp = timestamps[1];
    }
  }

  presence.setActivity(presenceData);
});
