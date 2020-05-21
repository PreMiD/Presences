var presence = new Presence({
    clientId: "605437254776651786"
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
  var startTime = Date.now();
  var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
  return [Math.floor(startTime / 1000), endTime];
}

var lastPlaybackState = null;
var playback;
var browsingStamp = Math.floor(Date.now() / 1000);

if (lastPlaybackState != playback) {
  lastPlaybackState = playback;
  browsingStamp = Math.floor(Date.now() / 1000);
}

presence.on("UpdateData", async () => {
  playback =
    document.querySelector(
      "#hbo-sdk--controller-container #hbo-sdk--controller-osd #hbo-sdk--vid #hbo-sdk--vid_Clpp_html5_mse_smooth_api"
    ) !== null &&
    document.querySelector(
      "#hbo-sdk--controller-osd #hbo-sdk--player-header span#player-title"
    ) !== null
      ? true
      : false;

  var video: HTMLVideoElement = document.querySelector(
    "#hbo-sdk--controller-container #hbo-sdk--controller-osd #hbo-sdk--vid #hbo-sdk--vid_Clpp_html5_mse_smooth_api"
  );

  var presenceData: PresenceData = {
    largeImageKey: "lg"
  };
  if (!playback || (video.paused && video[0] == null)) {
    presenceData.details = "Browsing...";
    presenceData.startTimestamp = browsingStamp;

    delete presenceData.state;
    delete presenceData.smallImageKey;

    presence.setActivity(presenceData, true);
  }

  if (video[0] !== null && !isNaN(video.duration)) {
    //* Get required tags
    var videoTitle: any, state: any, playerTitle: any;

    var a: any = document.querySelector(
      "#hbo-sdk--controller-osd #hbo-sdk--player-header #player-title span"
    );

    playerTitle = document.querySelector(
      "#hbo-sdk--controller-osd #hbo-sdk--player-header span#player-title"
    );

    if (a.innerText.length > 0) {
      videoTitle = playerTitle.firstChild.nodeValue;

      state = document.querySelector(
        "#hbo-sdk--controller-osd #hbo-sdk--player-header #player-title span"
      );
    } else {
      videoTitle = "Watching";
      state = document.querySelector(
        "#hbo-sdk--controller-osd #hbo-sdk--player-header #player-title"
      );
    }

    var timestamps = getTimestamps(
      Math.floor(video.currentTime),
      Math.floor(video.duration)
    );

    presenceData.details = videoTitle;
    presenceData.state =
      state !== null ? state.innerText : "State not found...";
    presenceData.smallImageKey = video.paused ? "pause" : "play";
    presenceData.smallImageText = video.paused
      ? (await strings).pause
      : (await strings).play;
    presenceData.startTimestamp = timestamps[0];
    presenceData.endTimestamp = timestamps[1];

    presence.setTrayTitle(video.paused ? "" : videoTitle.innerText);

    //* Remove timestamps if paused
    if (video.paused) {
      delete presenceData.startTimestamp;
      delete presenceData.endTimestamp;
    }

    //* If tags are not "null"
    if (videoTitle !== null && state !== null) {
      presence.setActivity(presenceData, !video.paused);
    }
  } else {
    presence.setActivity();
    presence.setTrayTitle();
  }
});
