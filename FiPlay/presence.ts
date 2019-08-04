var presence = new Presence({
    clientId: "607678684010381330",
    mediaKeys: true
  }),

  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
  });

  var lastPlaybackState = null;
  var playback;
  var browsingStamp = Math.floor(Date.now()/1000);

  if(lastPlaybackState != playback) {

      lastPlaybackState = playback
      browsingStamp = Math.floor(Date.now()/1000)
      
  }

presence.on("UpdateData", async () => {

  playback = 
    document.querySelector(".jw-video video") !== null
      ? true : false
  
  if (!playback) {

    presenceData: presenceData = {
      largeImageKey: "lg"
    }
    
    presenceData.details = "Browsing...";
    presenceData.startTimestamp = browsingStamp;

    delete presenceData.state;
    delete presenceData.smallImageKey;

    presence.setActivity(presenceData, true);
    
  }

  var video: HTMLVideoElement = document.querySelector(".jw-video video");

  if (video !== null && !isNaN(video.duration)) {

      var videoTitle : any;

      videoTitle = document.querySelector('#bread .breadcrumb .active');

      var uploader =
          '',
        timestamps = getTimestamps(
          Math.floor(video.currentTime),
          Math.floor(video.duration)
        ),
        presenceData: presenceData = {
          largeImageKey: "lg",
          smallImageKey: video.paused ? "pause" : "play",
          smallImageText: video.paused
            ? (await strings).pause
            : (await strings).play,
          startTimestamp: timestamps[0],
          endTimestamp: timestamps[1]
        };

      presence.setTrayTitle(video.paused ? "" : videoTitle.innerText);

      presenceData.details = "Watching";
      presenceData.state = videoTitle.innerText;

      if (video.paused) {
        delete presenceData.startTimestamp;
        delete presenceData.endTimestamp;
      }
 
      if (videoTitle !== null) {
        presence.setActivity(presenceData, !video.paused);
      }
    
    }

});

presence.on("MediaKeys", (key: string) => {
  switch (key) {
    case "pause":
      var video = document.querySelector(".jw-video video") as HTMLVideoElement;
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