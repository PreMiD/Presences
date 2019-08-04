var presence = new Presence({
    clientId: "605437254776651786",
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
    document.querySelector("#hbo-sdk--controller-container #hbo-sdk--controller-osd #hbo-sdk--vid #hbo-sdk--vid_Clpp_html5_mse_smooth_api") !== null &&
    document.querySelector('#hbo-sdk--controller-osd #hbo-sdk--player-header span#player-title') !== null
      ? true : false

  var video: HTMLVideoElement = document.querySelector("#hbo-sdk--controller-container #hbo-sdk--controller-osd #hbo-sdk--vid #hbo-sdk--vid_Clpp_html5_mse_smooth_api");
  
  if (!playback || video.paused && video[0] == null) {

    presenceData: presenceData = {
      largeImageKey: "lg"
    }
    
    presenceData.details = "Browsing...";
    presenceData.startTimestamp = browsingStamp;

    delete presenceData.state;
    delete presenceData.smallImageKey;

    presence.setActivity(presenceData, true);
    
  }

  if (video[0] !== null && !isNaN(video.duration)) {
      //* Get required tags
      var videoTitle : any, state : any, playerTitle : any;

      var a : any = document.querySelector('#hbo-sdk--controller-osd #hbo-sdk--player-header #player-title span');

      playerTitle = document.querySelector('#hbo-sdk--controller-osd #hbo-sdk--player-header span#player-title');

      if(a.innerText.length > 0) {

        videoTitle = playerTitle.firstChild.nodeValue;

        state = document.querySelector('#hbo-sdk--controller-osd #hbo-sdk--player-header #player-title span');

      } else {

        videoTitle = "Watching";
        state = document.querySelector('#hbo-sdk--controller-osd #hbo-sdk--player-header #player-title');

      }

      var uploader =
          document.querySelector(".video-actions-container .video-info-row .usernameWrap a"),
        timestamps = getTimestamps(
          Math.floor(video.currentTime),
          Math.floor(video.duration)
        ),
        presenceData: presenceData = {
          details: videoTitle,
          state: state.innerText,
          largeImageKey: "lg",
          smallImageKey: video.paused ? "pause" : "play",
          smallImageText: video.paused
            ? (await strings).pause
            : (await strings).play,
          startTimestamp: timestamps[0],
          endTimestamp: timestamps[1]
        };

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

presence.on("MediaKeys", (key: string) => {
  switch (key) {
    case "pause":
      var video = document.querySelector("#hbo-sdk--controller-container #hbo-sdk--controller-osd #hbo-sdk--vid #hbo-sdk--vid_Clpp_html5_mse_smooth_api") as HTMLVideoElement;
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