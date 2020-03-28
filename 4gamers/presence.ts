var presence = new Presence({
    clientId: "648494004870184981",
  }),
  strings = presence.getStrings({
    reading: "presence.playback.reading",
  });

var browsingStamp = Math.floor(Date.now() / 1000);

var user: any;
var title: any;
var replace: any;
var search: any;

presence.on("UpdateData", async () => {
  let presenceData: presenceData = {
    largeImageKey: "4gamers",
  };

  if (document.location.hostname == "www.4gamers.com.tw") {
    if (document.location.pathname == "/") {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing home page";
    } else if (document.location.pathname.includes("/new")) {
      var title = document.getElementsByClassName("news-header-title")[0]
        .innerHTML;
      var category = document.getElementsByClassName("news-header-category ")[0]
        .innerHTML;
      presenceData.details = title;
      presenceData.state = "Category: " + category;
    } else if (document.location.pathname.includes("magazine")) {
      var title = document.getElementsByClassName("magazine-content-title")[0]
        .innerHTML;
      var time = document.getElementsByClassName("magazine-content-time")[0]
        .innerHTML;
      presenceData.details = title;
      presenceData.state = "Publish Date: " + time;
    } else if (document.location.pathname.includes("tournament")) {
      presenceData.details = "賽事專欄";
    }
  }
  if (presenceData.details == null) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing site:";
    presenceData.state = "4gamers";
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
