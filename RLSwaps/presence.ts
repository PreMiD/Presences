var presence = new Presence({
  clientId: "636614830698004480",
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
    largeImageKey: "rlswaps"
  };
  
  title = document.querySelector("#offer-balance");
  user = document.querySelector("#receive-balance");

  if (document.location.pathname.includes("/history")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing their history"
  } else if (title.innerText !== "0.00" || user.innerText !== "0.00") {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Trading...";
    presenceData.state = title.innerText + " keys worth for " + user.innerText + "worth of items";
  } else {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Going to trade..."
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