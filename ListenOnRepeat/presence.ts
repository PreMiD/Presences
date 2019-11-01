var presence = new Presence({
    clientId: "639534386538348565",
    mediaKeys: false
 }),

  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
  });

  var browsingStamp = Math.floor(Date.now()/1000);

  var title : any, views : any, air : any, air2 : any;
  var iFrameVideo : boolean, currentTime : any, duration : any, paused : any;

  var video : HTMLVideoElement, videoDuration : any, videoCurrentTime : any;

  var lastPlaybackState = null;
  var playback;
  var browsingStamp = Math.floor(Date.now()/1000);

  var user : any;
  var oldTitle : any;
  var search : any;
  
  if(lastPlaybackState != playback) {
  
      lastPlaybackState = playback
      browsingStamp = Math.floor(Date.now()/1000)
        
  }

  

 
  presence.on("iFrameData", data => {

    playback = 
    data.iframe_video.duration !== null
      ? true : false

  if(playback) {

    iFrameVideo = data.iframe_video.iFrameVideo;
    currentTime = data.iframe_video.currTime;
    duration    = data.iframe_video.dur;
    paused      = data.iframe_video.paused;
    title       = data.iframe_video.vidTitle;

  }
  
  });


presence.on("UpdateData", async () => {
var a =
        '',
        timestamps = getTimestamps(
          Math.floor(currentTime),
          Math.floor(duration)
        ),
        presenceData: presenceData = {
          largeImageKey: "lr"
      };
    
      

if (title !== null) {
  if (iFrameVideo == true && !isNaN(duration)) {
    presenceData.smallImageKey = paused ? "pause" : "play";
    presenceData.smallImageText = paused ? (await strings).pause : (await strings).play;
    presenceData.startTimestamp = timestamps[0];
    presenceData.endTimestamp = timestamps[1];
    
    if (title !== undefined && title !== "" && title !== null) {
      presenceData.details = title;
      oldTitle = title;
    } else {
      presenceData.details = oldTitle;
    }

    air = document.querySelector("#content > div.main-area-offset > div:nth-child(2) > div.player-card > div > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > button:nth-child(2) > div > span");
    
    presenceData.state = "Repeats: " + air.innerText;
        
      if (paused) {
        delete presenceData.startTimestamp;
        delete presenceData.endTimestamp;
      }

  } else if (iFrameVideo == null && isNaN(duration)) {

     presenceData.startTimestamp = browsingStamp;
     presenceData.details = "Loading video...";
     presenceData.state = title;
     presenceData.smallImageKey = "reading";

  }
  
} else {
  presenceData.details = "Browsing...";
  presenceData.smallImageKey = "reading";
  presenceData.startTimestamp = browsingStamp;
}

if (presenceData.details !== null) {}
  presence.setActivity(presenceData);
}

);



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