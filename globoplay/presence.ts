var presence = new Presence({
  clientId: "641394369651277834",
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
    largeImageKey: "globo"
  };

  if (document.location.hostname == "globoplay.globo.com") {
    if (document.location.pathname == "/") {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing home page";
    } else if (document.location.pathname.includes("/categorias/")){
      presenceData.startTimestamp = browsingStamp;
      user = document.querySelector("#app > div > div > div > div.application-controller__view > span > div > div > div > div.page-template__header > h1");
      presenceData.details = "Viewing category:";
      presenceData.state = user.textContent;
      presenceData.smallImageKey = "reading";
    } else if (document.location.pathname.includes("/busca")){
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Getting ready to";
      presenceData.state = "search something up...";
      search = document.querySelector("#search-bar-input");
      if (search.value.length > 2) {
        presenceData.details = "Searching for:";
        presenceData.state = search.value;
      }
    } else if (document.location.pathname.includes("/p/")){
      presenceData.startTimestamp = browsingStamp;
      user = document.querySelector("#app > div > div > div > div.application-controller__view > span > div > div > div.program-header > div > div.playkit-container > div > div.playkit-media-cover__header > h1");
      presenceData.details = "Viewing show:";
      presenceData.state = user.textContent;
      presenceData.smallImageKey = "reading";
    } else if (document.location.pathname.includes("/t/")){
      presenceData.startTimestamp = browsingStamp;
      user = document.querySelector("#app > div > div > div > div.application-controller__view > span > div > div > div.title-header > div > div.playkit-container > div > div.playkit-media-cover__header > h1");
      presenceData.details = "Viewing movie:";
      presenceData.state = user.textContent;
      presenceData.smallImageKey = "reading";
    } else if (document.location.pathname.includes("/v/")) {
      var currentTime : any, duration : any, paused : any, timestamps : any, video : HTMLVideoElement;
      video = document.querySelector("#app > div > div > div > div.application-controller__view > span > div > div > div.video-stage.video-stage--compact > div > div > div.video-stage__stage-container > div > section > div > div > div > div.container.master-container.pointer-enabled > div.id-playback > video");
      if (video == null) {
        video = video = document.querySelector("#app > div > div > div > div.application-controller__view > span > div > div > div.video-stage.video-stage--extended > div > div > div.video-stage__stage-container > div > section > div > div > div > div.container.master-container.pointer-enabled > div.id-playback > video");
      }
      title = document.querySelector("#app > div > div > div > div.application-controller__view > span > div > div > div.video-stage.video-stage--compact > div > div > div.video-stage__video-info-area-wrapper > div > div > div.playkit-video-info__container_info.playkit-video-stage__area-video-info-container > section > div.playkit-video-info__program-title > a > span.playkit-video-info__link-text");
      if (title == null) {
        title = document.querySelector("#app > div > div > div > div.application-controller__view > span > div > div > div.video-stage.video-stage--extended > div > div > div.video-stage__video-info-area-wrapper > div > div > div.playkit-video-info__container_info.playkit-video-stage__area-video-info-container > section > div.playkit-video-info__program-title > a > span.playkit-video-info__link-text");
      }
      user = document.querySelector("#app > div > div > div > div.application-controller__view > span > div > div > div.video-stage.video-stage--compact > div > div > div.video-stage__video-info-area-wrapper > div > div > div.playkit-video-info__container_info.playkit-video-stage__area-video-info-container > section > div.playkit-video-info__ep-section > h1");
      if (user == null) {
        user = document.querySelector("#app > div > div > div > div.application-controller__view > span > div > div > div.video-stage.video-stage--extended > div > div > div.video-stage__video-info-area-wrapper > div > div > div.playkit-video-info__container_info.playkit-video-stage__area-video-info-container > section > div.playkit-video-info__ep-section > h1");
      }
      currentTime = video.currentTime;
      duration = video.duration;
      paused = video.paused;
      timestamps = getTimestamps(Math.floor(currentTime),Math.floor(duration));
      if (!isNaN(duration)) {
        presenceData.smallImageKey = paused ? "pause" : "play";
        presenceData.smallImageText = paused ? (await strings).pause : (await strings).play;
        presenceData.startTimestamp = timestamps[0];
        presenceData.endTimestamp = timestamps[1];

        presenceData.details = title.textContent;
        presenceData.state = user.textContent;
    
        if (paused) {
          delete presenceData.startTimestamp;
          delete presenceData.endTimestamp;
        }

      } else if (isNaN(duration)) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Looing at:";
        presenceData.state = title.textContent;
      }
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