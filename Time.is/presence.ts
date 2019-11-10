var presence = new Presence({
  clientId: "642714892201230336",
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
    largeImageKey: "time"
  };

  if (document.location.hostname == "time.is") {
    if (document.location.pathname == "/") {
      presenceData.details = "My time is:";
      presenceData.state = document.querySelector("#clock0").textContent;
    } else if (document.querySelector("#clock0") !== null) {
      presenceData.details = document.querySelector("#msgdiv > h1").textContent;
      presenceData.state = document.querySelector("#clock0").textContent;
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