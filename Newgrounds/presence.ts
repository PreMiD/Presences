var presence = new Presence({
    clientId: "610929230192181274",
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

  console.log(data.iframe_video)

  playback = 
    data.iframe_video
      ? true : false

  if(playback) {

    iFrameVideo = data.iframe_video.iFrameVideo;
    currentTime = data.iframe_video.currTime;
    duration    = data.iframe_video.dur;
    paused      = data.iframe_video.paused;

  }

});

var videoTitle : any, author: any;

presence.on("UpdateData", async () => {
  
  if(!playback && !videoTitle && !author) {

    presenceData: presenceData = {
      largeImageKey: "lg"
    }
    
    presenceData.details = "Browsing...";
    presenceData.startTimestamp = browsingStamp;

    delete presenceData.state;
    delete presenceData.smallImageKey;

    presence.setActivity(presenceData, true);
    
  }

  if(document.location.pathname.includes("/portal/view/")) {

    videoTitle = document.querySelector("#embed_header > h2");
    author = document.querySelector("div > div.item-details > div.item-details-main > h4 > a");

    if (iFrameVideo !== null && !isNaN(duration)) {

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

        presenceData.details = videoTitle.innerText;
        presenceData.state = author.innerText;

        if (paused) {
          delete presenceData.startTimestamp;
          delete presenceData.endTimestamp;
        }
  
        if (videoTitle !== null) {
          presence.setActivity(presenceData, !paused);
        }
      
      } else if(!iFrameVideo && isNaN(duration) && videoTitle.innerText && author.innerText) {

        presenceData: presenceData = {
          largeImageKey: "lg"
        }
        
        presenceData.details = "Playing " + videoTitle.innerText;
        presenceData.state = "By " + author.innerText;
        presenceData.startTimestamp = browsingStamp;
    
        delete presenceData.smallImageKey;
    
        presence.setActivity(presenceData, true);

      }

  } else if(document.location.pathname.includes("/audio/")) {

    videoTitle = document.querySelector("div.pod-head > h2");
    author = document.querySelector("div > div.item-details > div.item-details-main > h4 > a");

    presenceData: presenceData = {
      largeImageKey: "lg"
    }
    
    presenceData.details = "Listening to " + videoTitle.innerText;
    presenceData.state = "By " + author.innerText;
    presenceData.startTimestamp = browsingStamp;

    delete presenceData.smallImageKey;

    presence.setActivity(presenceData, true);

  } else if(document.location.pathname.includes("/art/")) {

    videoTitle = document.querySelector("div.pod-head > h2");
    author = document.querySelector("div > div.item-details > div.item-details-main > h4 > a");

    presenceData: presenceData = {
      largeImageKey: "lg"
    }
    
    presenceData.details = "Art: " + videoTitle.innerText;
    presenceData.state = "By " + author.innerText;
    presenceData.startTimestamp = browsingStamp;

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