var presence = new Presence({
  clientId: "609364070684033044",
  mediaKeys: false
}),
strings = presence.getStrings({
  play: "presence.playback.playing",
  pause: "presence.playback.paused"
});

var browsingStamp = Math.floor(Date.now()/1000);

var title : any;

var actionURL = new URL(document.location.href);
var title2URL = new URL(document.location.href);

presence.on("UpdateData", async () => {

  let presenceData: presenceData = {
    details: "In construction",
    state: "-",
    largeImageKey: "lg"
  };

  title = document.querySelector('h1#firstHeading');

  var actionResult = actionURL.searchParams.get("action");
  var title2Result = title2URL.searchParams.get("title");


  if(document.location.pathname == "/wiki/Main_Page") {


      presenceData.state = "Main Page | Home";

      presenceData.startTimestamp = browsingStamp;

      delete presenceData.details;


  } else if(title && document.location.pathname.includes("/wiki/")) {

      presenceData.details = "Reading about:"

      presenceData.state = title.innerText;

      presenceData.startTimestamp = browsingStamp;

  } else if(actionResult == "history" && title2Result && document.location.pathname.includes("/w/")) {

      presenceData.details = "Viewing revision history of:"

      if(title2Result.includes("_")) {

        presenceData.state = title2Result.replace(/_/g, " ");

      } else {

      presenceData.state = title2Result;

      }

      presenceData.startTimestamp = browsingStamp;

} else if(actionResult == "edit" && title2Result && document.location.pathname.includes("/w/")) {

  presenceData.details = "Editing a page:"

  if(title2Result.includes("_")) {

    presenceData.state = title2Result.replace(/_/g, " ");

  } else {

  presenceData.state = title2Result;

  }

  presenceData.startTimestamp = browsingStamp;

}


  presence.setActivity(presenceData);

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