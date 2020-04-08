let presence = new Presence({
    clientId: "639534386538348565"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
  });

let repeats: any, timestamps: any;
let iFrameVideo: boolean, currentTime: any, duration: any, paused: any;
let video: HTMLVideoElement,
  videoDuration: any,
  videoCurrentTime: any,
  playback: any;

let lastPlaybackState = null;
let browsingStamp = Math.floor(Date.now() / 1000);

presence.on("iFrameData", (data) => {
  playback = data.iframe_video.duration !== null ? true : false;

  if (playback) {
    iFrameVideo = data.iframe_video.iFrameVideo;
    currentTime = data.iframe_video.currTime;
    duration = data.iframe_video.dur;
    paused = data.iframe_video.paused;
  }
});

presence.on("UpdateData", async () => {
  const presenceData: presenceData = {
    largeImageKey: "lr"
  };

  let sGlobalRepeat = await presence.getSetting("sGlobalRepeat");
  let sFormatRepeat = await presence.getSetting("sFormatRepeat");
  let sFormatGlobalRepeat = await presence.getSetting("sFormatGlobalRepeat");

  //TODO language selector and translation strings
  let repeatsTrans = "Repeats";
  let gRepeatTrans = "Global Repeats";

  let repeats = document
    .querySelector(
      "#content > div.main-area-offset > div:nth-child(2) > div.player-card > div > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > button:nth-child(2) > div > div > span"
    )
    .textContent.split(":")[1]
    .split("(")[0]
    .trim();
  let globalRepeats = document
    .querySelector(
      "#content > div.main-area-offset > div:nth-child(2) > div.player-card > div > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > button:nth-child(1) > div > div > span"
    )
    .textContent.split(":")[1]
    .split("(")[0]
    .trim();

  if (lastPlaybackState != playback) {
    lastPlaybackState = playback;
    browsingStamp = Math.floor(Date.now() / 1000);
  }

  if (iFrameVideo == true && !isNaN(duration)) {
    timestamps = getTimestamps(Math.floor(currentTime), Math.floor(duration));
    presenceData.smallImageKey = paused ? "pause" : "repeat";
    presenceData.smallImageText = paused
      ? (await strings).pause
      : (await strings).play;
    presenceData.startTimestamp = timestamps[0];
    presenceData.endTimestamp = timestamps[1];
    presenceData.details = document.title.split(" - Listen On Repeat")[0];

    if (globalRepeats !== null) {
      if (sGlobalRepeat) {
        presenceData.state = sFormatGlobalRepeat
          .replace("%repeatm", repeatsTrans)
          .replace("%repeats", repeats)
          .replace("%grepeatm", gRepeatTrans)
          .replace("%grepeats", globalRepeats);
      } else {
        presenceData.state = sFormatRepeat
          .replace("%repeatm", repeatsTrans)
          .replace("%repeats", repeats);
      }
    } else {
      presenceData.state = sFormatRepeat
        .replace("%repeatm", repeatsTrans)
        .replace("%repeats", repeats);
    }

    if (paused) {
      delete presenceData.startTimestamp;
      delete presenceData.endTimestamp;
    }
  } else if (iFrameVideo == null && isNaN(duration)) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Loading video...";
    presenceData.state = document.title.split(" - Listen On Repeat")[0];
    presenceData.smallImageKey = "reading";
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});

/**
 * Get Timestamps
 * @param {Number} videoTime Current video time seconds
 * @param {Number} videoDuration Video duration seconds
 */
function getTimestamps(videoTime: number, videoDuration: number) {
  let startTime = Date.now();
  let endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
  return [Math.floor(startTime / 1000), endTime];
}
