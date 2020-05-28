var presence = new Presence({
    clientId: "611668948131512321"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
  }),
  presenceData: PresenceData = {
    largeImageKey: "logo"
  };

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

presence.on("UpdateData", async () => {
  var video: HTMLVideoElement = document.querySelector("#dmp_Video");
  if (video !== null && !isNaN(video.duration)) {
    var title: any, uploader: any, timestamps: any;

    title = document.querySelector(".VideoInfoTitle__videoTitle___3WLlw");
    uploader = document.querySelector(".ChannelLine__channelName___3JE1B");
    timestamps = getTimestamps(
      Math.floor(video.currentTime),
      Math.floor(video.duration)
    );
    presenceData.details =
      title !== null ? (title as HTMLElement).innerText : "Title not found...";
    presenceData.state =
      uploader !== null
        ? (uploader as HTMLElement).textContent
        : "Uploader not found...";
    presenceData.largeImageKey = "logo";
    presenceData.smallImageKey = video.paused ? "pause" : "play";
    presenceData.smallImageText = video.paused
      ? (await strings).pause
      : (await strings).play;
    presenceData.startTimestamp = timestamps[0];
    presenceData.endTimestamp = timestamps[1];

    presence.setTrayTitle(video.paused ? "" : title.innerText);

    if (video.paused) {
      delete presenceData.startTimestamp;
      delete presenceData.endTimestamp;
    }

    if (title !== null && uploader !== null) {
      presence.setActivity(presenceData, !video.paused);
    }
  } else {
    var pageData: PresenceData = {
      details: "Browsing..",
      largeImageKey: "logo"
    };
    presence.setActivity(pageData);
  }
});
