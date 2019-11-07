var presence = new Presence({
  clientId: "641969062083035146",
  mediaKeys: false
}),
strings = presence.getStrings({
  play: "presence.playback.playing",
  pause: "presence.playback.paused"
});

var browsingStamp = Math.floor(Date.now()/1000);

var user : any;
var title : any;
var replace : any;
var search : any;

presence.on("UpdateData", async () => {


  let presenceData: presenceData = {
    largeImageKey: "sdarot"
  };

  
  if (document.location.pathname == "/") {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "צופה בדף הבית";
  } else if (document.location.pathname.includes("/watch/")) {
    var currentTime : any, duration : any, paused : any, timestamps : any, video : HTMLVideoElement;
    video = document.querySelector("#playerDiv > div > video");
    if (video == null) {
      video = document.querySelector("#videojs_html5_api");
    }
    title = document.querySelector("#watchEpisode > div.poster > div > h1").textContent;
    user = document.querySelector("#player > div.head > p").textContent;
    if (user.includes(" - ")) {
      user = user.split(" - ")[1];
    }

    if (video !== null) {
      currentTime = video.currentTime;
      duration = video.duration;
      paused = video.paused;
      timestamps = getTimestamps(Math.floor(currentTime),Math.floor(duration));
    }
    
    if (!isNaN(duration)) {
      presenceData.smallImageKey = paused ? "pause" : "play";
      presenceData.smallImageText = paused ? (await strings).pause : (await strings).play;
      presenceData.startTimestamp = timestamps[0];
      presenceData.endTimestamp = timestamps[1];

      presenceData.details = title;
      presenceData.state = user;
  
      if (paused) {
        delete presenceData.startTimestamp;
        delete presenceData.endTimestamp;
      }

    } else if (isNaN(duration)) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = ":צופה ב";
      presenceData.state = title + " - " + user;
    }
  }  

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity()
  } else {
    presence.setActivity(presenceData);
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