var presence = new Presence({
  clientId: "645328419588014110",
  mediaKeys: false
});

var browsingStamp = Math.floor(Date.now()/1000);

presence.on("UpdateData", async () => {


  let presenceData: presenceData = {
    largeImageKey: "chroma"
  };

  presenceData.startTimestamp = browsingStamp;
  presenceData.details = "Listening to Chroma";
  presenceData.smallImageKey = "play";

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
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