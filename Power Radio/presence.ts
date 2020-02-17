var presence = new Presence({
  clientId: "640617785696976906",
  mediaKeys: false
}),
strings = presence.getStrings({
  play: "presence.playback.playing",
  pause: "presence.playback.paused"
});

var browsingStamp = Math.floor(Date.now()/1000);

var user : any;
var title : any;
var player : any;
var timestamps : any;
var dj : any;
var listeners : any;

presence.on("UpdateData", async () => {


  let presenceData: presenceData = {
    largeImageKey: "ppower"
  };
  if (document.querySelector("#pauseButtoni").className == "fa fa-pause") {
    user = document.querySelector("#infocontainer > div:nth-child(2) > p");
    title = document.querySelector("#infocontainer > div:nth-child(3) > p");
    presenceData.details = user.textContent;
    presenceData.state = title.textContent;
    presenceData.smallImageKey = "play";
    presenceData.smallImageText = "playing";
  }

  if (presenceData.details == null) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Browsing...";
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