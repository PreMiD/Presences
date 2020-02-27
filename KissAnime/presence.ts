var presence = new Presence({
    clientId: "609500599238656000",
    mediaKeys: false
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

var iFrameVideo : any, currentTime : any, duration : any, paused : any;

presence.on("iFrameData", data => {

  playback = 
    data.iframe_video !== null
      ? true : false

  if(playback) {

    iFrameVideo = data.iframe_video.iFrameVideo;
    currentTime = data.iframe_video.currTime;
    duration    = data.iframe_video.dur;
    paused      = data.iframe_video.paused;

  }

});

presence.on("UpdateData", async () => {

  if (iFrameVideo !== false && !isNaN(duration) && document.location.pathname.includes("/Anime/")) {

      var videoTitle : any, episod : any, episode : any, tabTitle : any;

      tabTitle = document.title;
      var pattern = "Episode";
      var truncateAfter = function (str, pattern) {
        return str.slice(0, str.indexOf(pattern));
      }       

      videoTitle = truncateAfter(document.title, pattern);
      episode = document.querySelector("select#selectEpisode");
      episod = episode.options[episode.selectedIndex].text;

      var a =
        '',
        timestamps = getTimestamps(
          Math.floor(currentTime),
          Math.floor(duration)
        ),
        presenceData: presenceData = {
          largeImageKey: "lg",
          smallImageKey: paused ? "pause" : "play",
          smallImageText: paused
            ? (await strings).pause
            : (await strings).play,
          startTimestamp: timestamps[0],
          endTimestamp: timestamps[1]
        };

      presence.setTrayTitle(paused ? "" : videoTitle.innerText);

      presenceData.details = videoTitle;
      presenceData.state = episod;

      if (paused) {
        delete presenceData.startTimestamp;
        delete presenceData.endTimestamp;
      }
 
      if (videoTitle !== null) {
        presence.setActivity(presenceData, !paused);
      }
    
    } else {

      presenceData: presenceData = {
        largeImageKey: "lg"
      }
      
      presenceData.details = "Browsing...";
      presenceData.startTimestamp = browsingStamp;
  
      delete presenceData.state;
      delete presenceData.smallImageKey;
  
      presence.setActivity(presenceData, true);
      
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