var presence = new Presence({
  clientId: "641440553069707275",
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
    largeImageKey: "ab"
  };

  if (document.location.hostname == "weareabstract.com") {
    presenceData.smallImageKey = "play";
    presenceData.smallImageText = "Playing";
    presenceData.details = "DJ: " + document.querySelector("body > div.site-wrapper > div.row.h-100 > div > div > div > div.main_player > div > div.col.text-left.info > h3").textContent;
    presenceData.state = document.querySelector("body > div.site-wrapper > div.row.h-100 > div > div > div > div.main_player > div > div.col.text-left.info > p").textContent;
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