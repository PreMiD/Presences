var genericStyle = "font-weight: 800; padding: 2px 5px; color: white;";

function PMD_info(message) {
  console.log(
    "%cPreMiD%cINFO%c " + message,
    genericStyle + "border-radius: 25px 0 0 25px; background: #596cae;",
    genericStyle + "border-radius: 0 25px 25px 0; background: #5050ff;",
    "color: unset;"
  );
}

function PMD_error(message) {
  console.log(
    "%cPreMiD%cERROR%c " + message,
    genericStyle + "border-radius: 25px 0 0 25px; background: #596cae;",
    genericStyle + "border-radius: 0 25px 25px 0; background: #ff5050;",
    "color: unset;"
  );
}

function PMD_success(message) {
  console.log(
    "%cPreMiD%cSUCCESS%c " + message,
    genericStyle + "border-radius: 25px 0 0 25px; background: #596cae;",
    genericStyle +
      "border-radius: 0 25px 25px 0; background: #50ff50; color: black;",
    "color: unset;"
  );
}

PMD_info("An error might be created called: \"Cannot read property 'duration'\". You may ignore this error, as it is automatically fixed in seconds.");

var presence = new Presence({
    clientId: "614388233886760972", // CLIENT ID FOR YOUR PRESENCE
    mediaKeys: true
 }),

  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
  });

  var browsingStamp = Math.floor(Date.now()/1000);

  var title : any, views : any, air : any, air2 : any;
  var iFrameVideo : any, currentTime : any, duration : any, paused : any;

  // the video variable is a html video element
  var video : HTMLVideoElement, videoDuration : any, videoCurrentTime : any;

  var lastPlaybackState = null;
  var playback;
  var browsingStamp = Math.floor(Date.now()/1000);
  
  if(lastPlaybackState != playback) {
  
      lastPlaybackState = playback
      browsingStamp = Math.floor(Date.now()/1000)
        
  }

if (document.location.pathname.includes(".html")) {

  presence.on("iFrameData", data => {

    playback = 
    data.iframe_video.duration !== null
      ? true : false

  //console.log(data.iframe_video);
  //console.log(document.location.pathname);

  if(playback) {

    iFrameVideo = data.iframe_video.iFrameVideo;
    currentTime = data.iframe_video.currTime;
    duration    = data.iframe_video.dur;
    paused      = data.iframe_video.paused;

  }
  
  });
}

presence.on("UpdateData", async () => {
  
// Get the video
video = document.querySelector("#mediaplayer > div.jw-wrapper.jw-reset > div.jw-media.jw-reset > video");

// Check if it can find the video
if (document.location.pathname.includes(".html") && document.location.pathname.includes("/pages/")) {
  presence.setActivity();
  presence.setTrayTitle();
} else if (document.location.pathname.includes(".html")) {
  if (iFrameVideo !== null && !isNaN(duration)) {
    var a =
        '',
        timestamps = getTimestamps(
          Math.floor(currentTime),
          Math.floor(duration)
        ),
        presenceData: presenceData = {
          largeImageKey: "ksow123stack",
          smallImageKey: paused ? "pause" : "play",
         smallImageText: paused
          ? (await strings).pause
          : (await strings).play,
        startTimestamp: timestamps[0],
        endTimestamp: timestamps[1]
      };

    title = document.querySelector("#player > div.alert.alert-info.hidden-xs > div.media > div > a > h1"); 
    views = document.querySelector("#player > div.alert.alert-info.hidden-xs > div.media > div > p:nth-child(7)");
    presenceData.details = title.innerText;

    air = document.querySelector("#player > div.alert.alert-info.hidden-xs > div.media > div > p:nth-child(9)");
    air2 = document.querySelector("#player > div.alert.alert-info.hidden-xs > div.media > div > p:nth-child(8)");
    
    if (air !== null && air.innerText.includes("Air on:")) {
      presenceData.state = views.innerText.replace("Status: ", "") + ", " + air.innerText;
    } else if (air2 !== null && air2.innerText.includes("Air on:")) {
      presenceData.state = views.innerText.replace("Status: ", "") + ", " + air2.innerText;
    } else {
      presenceData.state = views.innerText;
    }
  
    // Set presence state to views value
    
      if (paused) {
        delete presenceData.startTimestamp;
        delete presenceData.endTimestamp;
      }
 
      presence.setActivity(presenceData);

  } else if (iFrameVideo == null && isNaN(duration)) {
    title = document.querySelector("#player > div.alert.alert-info.hidden-xs > div.media > div > a > h1"); 

    var a =
        '',
        timestamps = getTimestamps(
          Math.floor(currentTime),
          Math.floor(duration)
        ),
        presenceData: presenceData = {
          largeImageKey: "ksow123stack",
          smallImageKey: paused ? "pause" : "play",
         smallImageText: paused
          ? (await strings).pause
          : (await strings).play,
        startTimestamp: timestamps[0],
        endTimestamp: timestamps[1]
      };

     delete presenceData.endTimestamp;
     presenceData.startTimestamp = browsingStamp;
     presenceData.details = "Looking at: ";
     presenceData.state = title.innerText;
     delete presenceData.smallImageText;
     presenceData.smallImageKey = "reading";

     presence.setActivity(presenceData);

  }
  
} else if (document.location.pathname == "/") {
  var a =
        '',
        presenceData: presenceData = {
          largeImageKey: "ksow123stack"
      };

      presenceData.details = "Browsing through";
      presenceData.state = "the main page";
      delete presenceData.endTimestamp;
      presenceData.startTimestamp = browsingStamp;
      delete presenceData.smallImageText;
      presenceData.smallImageKey = "reading";

      presence.setActivity(presenceData);
} else if (document.location.pathname == "/show/latest/") {
  var a =
        '',
        presenceData: presenceData = {
          largeImageKey: "ksow123stack"
      };

      presenceData.details = "Browsing through";
      presenceData.state = "the latest shows";
      delete presenceData.endTimestamp;
      presenceData.startTimestamp = browsingStamp;
      delete presenceData.smallImageText;
      presenceData.smallImageKey = "reading";

      presence.setActivity(presenceData);
} else if (document.location.pathname == "/show/popular/") {
  var a =
        '',
        presenceData: presenceData = {
          largeImageKey: "ksow123stack"
      };

      presenceData.details = "Browsing through";
      presenceData.state = "the most popular shows";
      delete presenceData.endTimestamp;
      presenceData.startTimestamp = browsingStamp;
      delete presenceData.smallImageText;
      presenceData.smallImageKey = "reading";

      presence.setActivity(presenceData);
} else if (document.location.pathname == "/show/rated/") {
  var a =
        '',
        presenceData: presenceData = {
          largeImageKey: "ksow123stack"
      };

      presenceData.details = "Browsing through";
      presenceData.state = "the highest rated shows";
      delete presenceData.endTimestamp;
      presenceData.startTimestamp = browsingStamp;
      delete presenceData.smallImageText;
      presenceData.smallImageKey = "reading";

      presence.setActivity(presenceData);
} else if (document.location.pathname == "/show/") {
  var a =
        '',
        presenceData: presenceData = {
          largeImageKey: "ksow123stack"
      };

      presenceData.details = "Browsing through";
      presenceData.state = "a list of all shows";
      delete presenceData.endTimestamp;
      presenceData.startTimestamp = browsingStamp;
      delete presenceData.smallImageText;
      presenceData.smallImageKey = "reading";

      presence.setActivity(presenceData);
} else if (document.location.pathname.includes("/show/")) {
  var a =
        '',
        presenceData: presenceData = {
          largeImageKey: "ksow123stack"
      };

      views = document.querySelector("#info > div.media > div > h1 > a");

      presenceData.details = "Browsing through all episodes of:";
      presenceData.state = views.innerText;
      delete presenceData.endTimestamp;
      presenceData.startTimestamp = browsingStamp;
      delete presenceData.smallImageText;
      presenceData.smallImageKey = "reading";

      presence.setActivity(presenceData);
} else if (document.location.pathname.includes("/search/")) {
  var a =
        '',
        presenceData: presenceData = {
          largeImageKey: "ksow123stack"
      };

      views = document.querySelector("#featured > div.page-header > h3");

      presenceData.details = "Searching for:";
      presenceData.state = views.innerText;
      delete presenceData.endTimestamp;
      presenceData.startTimestamp = browsingStamp;
      delete presenceData.smallImageText;
      presenceData.smallImageKey = "search";
      presence.setActivity(presenceData);
      
} else {
  presence.setActivity();
  presence.setTrayTitle();
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