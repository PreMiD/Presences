var presence = new Presence({
  clientId: "639591760791732224",
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
    largeImageKey: "bb"
  };

  if (document.location.hostname == "www.bilibili.com") {
    if (document.location.pathname == "/") {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Browsing...";
    } else if (document.location.pathname.includes("/read/")){
      user = document.querySelector("body > div.page-container > div.head-container > div.title-container > h1 > font > font");
      if (user == null) {
        user = document.querySelector("body > div.page-container > div.head-container > div.title-container > h1");
      }

      if (user !== null) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Reading article:";
        presenceData.smallImageKey = "reading";
        presenceData.state = user.innerText;
      } else {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Browsing for articles";
      }
    } else if (document.location.pathname.includes("/video/")) {
      var video : HTMLVideoElement, videoDuration : any, videoCurrentTime : any, paused : any;
      video = document.querySelector("#bilibiliPlayer > div.bilibili-player-area.video-state-pause.video-control-show.video-state-blackside > div.bilibili-player-video-wrap > div.bilibili-player-video > video");
      if (video == null) {
        video = document.querySelector("#bilibiliPlayer > div.bilibili-player-area.video-state-blackside.video-state-pause > div.bilibili-player-video-wrap > div.bilibili-player-video > video");
      }
      if (video == null) {
        video = document.querySelector("#bilibiliPlayer > div.bilibili-player-area.video-state-blackside > div.bilibili-player-video-wrap > div.bilibili-player-video > video");
      }
      if (video == null) {
        video = document.querySelector(".bilibili-player-video > video");
      }
      videoDuration = video.duration;
      videoCurrentTime = video.currentTime;
      paused = video.paused;

      var timestamps = getTimestamps(Math.floor(videoCurrentTime), Math.floor(videoDuration));

      presenceData.smallImageKey = paused ? "pause" : "play";
      presenceData.smallImageText = paused ? (await strings).pause : (await strings).play;
      presenceData.startTimestamp = timestamps[0];
      presenceData.endTimestamp = timestamps[1];
      
      if (paused) {
        delete presenceData.startTimestamp;
        delete presenceData.endTimestamp;
      }
      
      title = document.querySelector("#viewbox_report > h1");
      user = document.querySelector("#v_upinfo > div.u-info > div.name");
      if (user == null) {
        user = document.querySelector("#v_upinfo > div.info > div.user.clearfix > a")
      }
      presenceData.details = title.innerText;
      presenceData.state = "By user: " + user.innerText;
    } else if (document.location.pathname.includes("/myanimes")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing their animes";
    } else if (document.location.pathname.includes("/articles/category")) {
      presenceData.startTimestamp = browsingStamp;
      title = document.querySelector("head > title");
      presenceData.details = "Viewing articles category:";
      presenceData.state = title.innerText.replace("Anime-News: ","").replace(" | Anime on Demand", "");
    } else if (document.location.pathname.includes("/articles")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing articles"
    } else if (document.location.pathname.includes("/article/")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.smallImageKey = "reading";
      title = document.querySelector("body > div.l-off-canvas-container > div.l-mainsection > div > h1");
      presenceData.details = "Reading article:";
      presenceData.state = title.innerText;
    }
  }

  if (presenceData.details == null) {
    title = document.querySelector("head > title");
    presenceData.details = title.innerText.replace("-bilibili","");
    presenceData.startTimestamp = browsingStamp;
    presence.setActivity(presenceData);
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