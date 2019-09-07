var presence = new Presence({
    clientId: "616754182858342426",
    mediaKeys: true
  }),

  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
  });

  var lastPlaybackState = null;
  var playback;
  var browsingStamp = Math.floor(Date.now()/1000);

  var season : any, episode : any;

  if(lastPlaybackState != playback) {

      lastPlaybackState = playback
      browsingStamp = Math.floor(Date.now()/1000)
      
  }

presence.on("UpdateData", async () => {

  playback = 
  document.querySelector("#player > div.jw-media.jw-reset > video") !== null
      ? true : false
  
  if (!playback) {

    presenceData: presenceData = {
      largeImageKey: "lg"
    }
    
    presenceData.details = "Browsing...";
    presenceData.startTimestamp = browsingStamp;

    delete presenceData.state;
    delete presenceData.smallImageKey;

    presence.setActivity(presenceData);
    
  }

  var video: HTMLVideoElement = document.querySelector("#player > div.jw-media.jw-reset > video");

  if (video !== null && !isNaN(video.duration)) {

      var videoTitle : any;

      videoTitle = document.querySelector("div.watch-header.h4.mb-0.font-weight-normal.link.hidden-sm-down");

      season = document.querySelector("#playercontainer span.outPes");

      episode = document.querySelector("#playercontainer span.outPep");

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

      if(season && episode) {

        presenceData.details = videoTitle.innerText
        presenceData.state = "Season " + season.innerText + ", Episode " + episode.innerText;

      } else if(!season && episode) {

        presenceData.details = videoTitle.innerText
        presenceData.state = "Episode " + episode.innerText;

      } else {

      presenceData.details = "Watching";
      presenceData.state = videoTitle.innerText;

      }

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
      var video = document.querySelector("#player > div.jw-media.jw-reset > video") as HTMLVideoElement;
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