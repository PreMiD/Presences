var presence = new Presence({
  clientId: "642119548803219466",
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
    largeImageKey: "fa"
  };

  if (document.location.hostname == "flipanim.com") {
    if (document.location.pathname == "/") {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing home page";
      presenceData.smallImageKey = "writing";
    } else if (document.location.pathname.includes("/anim")){
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing anim:";
      presenceData.state = document.querySelector("#mainDivActive > div:nth-child(6) > div").textContent + " by: " + document.querySelector("#mainDivActive > div:nth-child(10) > div:nth-child(2) > div.anim_author > a:nth-child(1)").textContent;
      presenceData.smallImageKey = "reading";
    } else if (document.location.pathname.includes("/profile")){
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing profile of:";
      presenceData.state = document.querySelector("#mainDivActive > div:nth-child(4) > div.profileAvatar > div.text_normal").textContent;
      presenceData.smallImageKey = "reading";
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