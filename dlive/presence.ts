var presence = new Presence({
    clientId: "609531561389588480",
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
    document.querySelector("video.dplayer-video.dplayer-video-current") !== null
      ? true : false
  
  if (!playback) {

    let presenceData: presenceData = {
      largeImageKey: "lg"
    };
    
    presenceData.details = "Browsing...";
    presenceData.startTimestamp = browsingStamp;

    delete presenceData.state;
    delete presenceData.smallImageKey;

    presence.setActivity(presenceData, true);
    
  }

  var video: HTMLVideoElement = document.querySelector("video.dplayer-video.dplayer-video-current");

  if (video !== null) {

      var videoTitle : any, streamer : any;

      videoTitle = document.querySelector('.info-line-left.flex-box .flex-column.flex-justify-center div');
      streamer = document.querySelector('div.channel-header span.dlive-name span.overflow-ellipsis');

      let presenceData: presenceData = {
        largeImageKey: "lg",
        smallImageKey: "live"
      };

      presence.setTrayTitle(videoTitle.innerText);

      presenceData.details = videoTitle.innerText;
      presenceData.state = streamer.innerText;
      presenceData.startTimestamp = browsingStamp;
 
      presence.setActivity(presenceData, true);
    
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