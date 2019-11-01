var presence = new Presence({
  clientId: "639616115873546261",
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
var playing : any;

presence.on("UpdateData", async () => {


  let presenceData: presenceData = {
    largeImageKey: "rock"
  };

  if (document.location.hostname == "www.rockradio.com") {
    if (document.location.pathname == "/") {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Browsing...";
    } else if (document.querySelector("#now-playing > div.info-container > div.progress-container > div > span > span > span.total") !== null) {
      user = document.querySelector("#now-playing > div.info-container > div.progress-container > div > span > span > span.remain");
      title = document.querySelector("#now-playing > div.info-container > div.title-container > div > span > span.artist-name");
      replace = document.querySelector("#now-playing > div.info-container > div.title-container > div > span > span.track-name");
      presenceData.details = title.innerText + replace.innerText;
      presenceData.state = user.innerText.replace("-", "") + " left";
      playing = document.querySelector("#play-button > div > a").className == "ico icon-pause" ? "play" : "pause";  
      presenceData.smallImageKey = playing;
    } else if (document.querySelector("#channel-title") !== null) {
      title = document.querySelector("#channel-title");
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing channel:";
      presenceData.state = title.innerText;
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