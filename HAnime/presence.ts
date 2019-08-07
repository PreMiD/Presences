var presence = new Presence({
  clientId: "608240091126824972",
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
    data.iv !== null
      ? true : false;

  if(playback) {

    iFrameVideo = data.iv.iFrameVideo;
    currentTime = data.iv.currTime;
    duration    = data.iv.dur;
    paused      = data.iv.paused;

  } else {

    iFrameVideo = null;
    currentTime = null;
    duration    = null;
    paused      = null;

  }
  

});

presence.on("UpdateData", async () => {
/*
  var iframe = document.querySelector('.htv-video-player iframe');

  if(iframe) {

    console.log("iframe deteced.");

    if(iframe.getAttribute("src").includes("/omni-player")){

      console.log("ADDDDDDDD");

    } else if(iframe.getAttribute("src").includes("player.hanime.tv")){

      console.log("VIDEOOOOO");

      var video : HTMLVideoElement = iframe.querySelector("video#primary_video_html5_api");

      console.log(video.getAttribute("src"));

    }

  } else console.log("no iframe detected.");
  */

if(!playback) {

  presenceData: presenceData = {
    largeImageKey: "lg"
  }
  
  presenceData.details = "Browsing...";
  presenceData.startTimestamp = browsingStamp;

  delete presenceData.state;
  delete presenceData.smallImageKey;

  presence.setActivity(presenceData, true);
  
}

if (iFrameVideo !== null && !isNaN(duration)) {


    var videoTitle : any, brand : any;

    videoTitle = document.querySelector('.title-views.flex.column h1.tv-title');
    brand      = document.querySelector('.hvpimbc-item.full a');

    console.log(videoTitle.innerText + " ---- " + brand.innerText);

    if(videoTitle && brand) {

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
          ? (await strings).paused
          : (await strings).play,
      };

    presence.setTrayTitle(paused ? "" : videoTitle.innerText);

    presenceData.details = videoTitle.innerText;
    presenceData.state = "Brand: " + brand.innerText;

    if (paused) {
      delete presenceData.startTimestamp;
      delete presenceData.endTimestamp;
    }

    if (videoTitle !== null) {
      presence.setActivity(presenceData, !paused);
    }
  }
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