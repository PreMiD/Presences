var presence = new Presence({
    clientId: "607916330271768579",
    mediaKeys: false
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
  });

  var lastPlaybackState = null;
  var reading;
  var browsingStamp = Math.floor(Date.now()/1000);

  if(lastPlaybackState != reading) {

      lastPlaybackState = reading;
      browsingStamp = Math.floor(Date.now()/1000);
      
  }

presence.on("UpdateData", async () => {

reading = 
  document.querySelector("._2ymbc a") !== null &&
  document.querySelector("._2d0an.lefgy select") !== null
  ? true : false;

var title : any, chapter : any, selected : any;

if(reading) {

title = document.querySelector("._2ymbc a");
chapter = document.querySelector("._2d0an.lefgy select");
selected = chapter.selectedOptions[0].text;


let presenceData: presenceData = {
  details: title.innerText,
  state: selected,
  largeImageKey: "lg"

};

presence.setActivity(presenceData, true);

} else {

  let presenceData: presenceData = {
    largeImageKey: "lg"
  }
  
  presenceData.details = "Browsing...";
  presenceData.startTimestamp = browsingStamp;

  delete presenceData.state;
  delete presenceData.smallImageKey;

  presence.setActivity(presenceData, true);

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