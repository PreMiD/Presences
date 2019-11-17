var presence = new Presence({
  clientId: "639107568672702484",
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
var dj : any;
var listeners : any;

presence.on("UpdateData", async () => {


  let presenceData: presenceData = {
    largeImageKey: "tsr"
  };
//presenceData.startTimestamp = browsingStamp;
  if (document.querySelector("#mep_0 > div > div.radioplayer-controls > div.radioplayer-button.radioplayer-playpause-button.radioplayer-pause") !== null) {
    title = document.querySelector("#song > p > marquee > span");
    user = document.querySelector("#artist > p > span");
    dj = document.querySelector("#dj > p");
    listeners = document.querySelector("#listeners > span");
    presenceData.details = title.innerText + " by: " + user.innerText;
    presenceData.state = "DJ: " + dj.innerText + " Listeners: " + listeners.innerText;
    presenceData.smallImageKey = "play";
  } else if (document.location.pathname.includes("/staff")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing staff members"; 
  } else if (document.location.pathname.includes("/schedule")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing the schedule";
  } else if (document.location.pathname.includes("/request")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Requesting a song";
  } else if (document.location.pathname.includes("/apply")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Applying for staff";
  } else if (document.location.pathname.includes("/about")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Reading about TSR";
    presenceData.smallImageKey = "reading";
  } else if (document.location.pathname.includes("/contact")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Contacting TSR";
    presenceData.smallImageKey = "writing";
  } else if (document.location.pathname == "/") {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Browsing...";
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