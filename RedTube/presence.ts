var presence = new Presence({
    clientId: "605861238852943988",
    mediaKeys: true
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
  });

presence.on("UpdateData", async () => {

  var video: HTMLVideoElement = document.querySelector(".mhp1138_videoWrapper video");
  if (video[0] !== null && !isNaN(video.duration)) {
    //* Get required tags
    var title : any;
      title =
        document.querySelector("#redtube_layout #section_main #content_float #content_wrapper #content_container #main-container #video_left_col .video_left_section .video_header_container #video_header h1");

    var uploader =
        document.querySelector("#redtube_layout #section_main #content_float #content_wrapper #content_container #main-container #video_left_col #video_underplayer #video-infobox #video-infobox-wrap .video-infobox-col .video-infobox-row .video-infobox-content .video-infobox-link"),
      timestamps = getTimestamps(
        Math.floor(video.currentTime),
        Math.floor(video.duration)
      ),
      presenceData: presenceData = {
        details: title.innerText,
        state: uploader.textContent,
        largeImageKey: "lg",
        smallImageKey: video.paused ? "pause" : "play",
        smallImageText: video.paused
          ? (await strings).pause
          : (await strings).play,
        startTimestamp: timestamps[0],
        endTimestamp: timestamps[1]
      };

    presence.setTrayTitle(video.paused ? "" : title.innerText);

    //* Remove timestamps if paused
    if (video.paused) {
      delete presenceData.startTimestamp;
      delete presenceData.endTimestamp;
    }

    //* If tags are not "null"
    if (video && title !== null && uploader !== null) {
      presence.setActivity(presenceData, !video.paused);
    }
  } else {
    presence.setActivity();
    presence.setTrayTitle();
  }
});

presence.on("MediaKeys", (key: string) => {
  switch (key) {
    case "pause":
      var video = document.querySelector(".mhp1138_videoWrapper video") as HTMLVideoElement;
      video.paused ? video.play() : video.pause();
      break;
  }
});

/**
 * Get Timestamps
 * @param {Number} videoTime Current video time seconds
 * @param {Number} videoDuration Video duration seconds
 */
function getTimestamps(videoTime: number, videoDuration: number) {
  var startTime = Date.now();
  var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
  return [Math.floor(startTime / 1000), endTime];
}