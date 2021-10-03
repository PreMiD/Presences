const presence = new Presence({
    clientId: "607881666836561930"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
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
  const startTime = Date.now(),
   endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
  return [Math.floor(startTime / 1000), endTime];
}

let lastPlaybackState = null,
 playback,
 browsingStamp = Math.floor(Date.now() / 1000);

if (lastPlaybackState != playback) {
  lastPlaybackState = playback;
  browsingStamp = Math.floor(Date.now() / 1000);
}

presence.on("UpdateData", async () => {
  playback = document.querySelector(".AT-player video") !== null ? true : false;

  const presenceData: PresenceData = {
    largeImageKey: "lg"
  };

  if (!playback) {
    presenceData.details = "Browsing...";
    presenceData.startTimestamp = browsingStamp;

    delete presenceData.state;
    delete presenceData.smallImageKey;

    presence.setActivity(presenceData, true);
  }

  const video: HTMLVideoElement = document.querySelector(".AT-player video");

  if (video !== null && !isNaN(video.duration)) {
    let videoTitle: any,
     seasonepisode;

    videoTitle = document.querySelector(".series-title span");
    seasonepisode = document.querySelector(".series-episode");

    const timestamps = getTimestamps(
      Math.floor(video.currentTime),
      Math.floor(video.duration)
    );

    presenceData.smallImageKey = video.paused ? "pause" : "play";
    presenceData.smallImageText = video.paused
      ? (await strings).pause
      : (await strings).play;
    presenceData.startTimestamp = timestamps[0];
    presenceData.endTimestamp = timestamps[1];

    presence.setTrayTitle(video.paused ? "" : videoTitle.innerText);

    presenceData.details =
      videoTitle !== null ? videoTitle.innerText : "Title not found...";
    presenceData.state =
      seasonepisode !== null ? seasonepisode.innerText : "Episode not found...";

    if (video.paused) {
      delete presenceData.startTimestamp;
      delete presenceData.endTimestamp;
    }

    if (videoTitle !== null) 
      presence.setActivity(presenceData, !video.paused);
    
  }
});
