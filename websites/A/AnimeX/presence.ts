const presence = new Presence({
  clientId: "663821800014348300"
});

let lastPlaybackState = null;
let playback;
let browsingStamp = Math.floor(Date.now() / 1000);

/**
 * Get Timestamps
 * @param {number} videoTime Current video time in seconds
 * @param {number} videoDurationFormatted Video duration in seconds
 */
function getTimestamps(
  videoTime: number,
  videoDuration: number
): Array<number> {
  const startTime = Date.now();
  const endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
  return [Math.floor(startTime / 1000), endTime];
}

if (lastPlaybackState != playback) {
  lastPlaybackState = playback;
  browsingStamp = Math.floor(Date.now() / 1000);
}

presence.on("UpdateData", async () => {
  const re = new RegExp("https://animex.tech/anime/(.*)/(.*)", "g");
  playback = re.exec(window.location.href) !== null ? true : false;
  const presenceData: PresenceData = {
    largeImageKey: "animex"
  };

  if (playback === false) {
    presenceData.details = "Browsing...";
    presenceData.startTimestamp = browsingStamp;
    delete presenceData.state;
    delete presenceData.smallImageKey;
    presence.setActivity(presenceData, true);
  } else {
    const video: HTMLVideoElement = document
      .evaluate("//video[@class='jw-video jw-reset']", document)
      .iterateNext() as HTMLVideoElement;
    const videoTitle: Node = document
      .evaluate("//body//h1[1]", document)
      .iterateNext();
    const episode: Array<string> = videoTitle.textContent.split(" - Episode ");
    if (!video.paused) {
      const timestamps: Array<number> = getTimestamps(
        Math.floor(video.currentTime),
        Math.floor(video.duration)
      );
      presenceData.startTimestamp = timestamps[0];
      presenceData.endTimestamp = timestamps[1];
    } else {
      delete presenceData.startTimestamp;
      delete presenceData.endTimestamp;
    }
    presenceData.smallImageKey = video.paused ? "paused" : "playing";
    presenceData.smallImageText = video.paused ? "Paused" : "Playing";

    presenceData.details =
      episode[0] !== null ? episode[0] : "Title not found...";
    presenceData.state =
      episode[1] !== null ? "Episode " + episode[1] : "Episode not found...";

    presence.setActivity(presenceData, !video.paused);
  }
});
