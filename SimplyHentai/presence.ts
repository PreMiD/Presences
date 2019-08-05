var presence = new Presence({
    clientId: "608043966285348944",
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
  document.querySelector(".margin-bottom-12 h1 a") !== null
  ? true : false;

var something : any, chapter : any, selected : any, a : any, b : any;

if(reading) {

something = document.querySelectorAll(".margin-bottom-12 h1 a");
a = something[0];
b = something[1];

var page = document.querySelector(".page-jump.text-center").getAttribute('value');



let presenceData: presenceData = {
  details: a.innerText,
  state: b.innerText + " [Page: " + page + "]",
  largeImageKey: "lg"

};

presenceData.startTimestamp = browsingStamp;

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