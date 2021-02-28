const presence = new Presence({
  clientId: "815653970445205544"
});

let lastPlaybackState = null;
let playback;
let browsingStamp = Math.floor(Date.now() / 1000);
let video = {
  duration: 0,
  currentTime: 0,
  paused: true
};

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

presence.on(
  "iFrameData",
  (data: { duration: number; currentTime: number; paused: boolean }) => {
    video = data;
  }
);

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "tioanime" };
  if (
    video != null &&
    !isNaN(video.duration) &&
    document.location.pathname.includes("/ver")) 
	{
    const videoTitle: Node = document
      .evaluate("//body//h1[1]", document)
      .iterateNext();
    const episode: Array<string> = videoTitle.textContent.split(/(\w+)$/);
    if (!video.paused) {
      const timestamps: Array<number> = getTimestamps(
        Math.floor(video.currentTime),
        Math.floor(video.duration) );
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
      episode[2] !== null ? "Episode " + episode[1] : "Episode not found...";

    presence.setActivity(presenceData, !video.paused);
	
  } else {
    presenceData.details = "Searching...";
    presenceData.startTimestamp = browsingStamp;
    delete presenceData.state;
    delete presenceData.smallImageKey;
    presence.setActivity(presenceData, true);
  }
});
