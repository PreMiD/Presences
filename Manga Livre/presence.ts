var presence = new Presence({
  clientId: "641409342566039558",
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
    largeImageKey: "ml"
  };

  if (document.location.hostname == "mangalivre.com") {
    if (document.location.pathname == "/") {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Browsing...";
    } else if (document.querySelector("#reader-wrapper > div:nth-child(10) > div.page-navigation-wrapper > div > div.page-navigation > span > em:nth-child(1)") !== null) {
      presenceData.details = "Reading '" + document.querySelector("#reader-wrapper > div.reader-navigation.clear-fix > div.series-info-container > div.series-info > div.series-title > span.title").textContent + "'";
      presenceData.state = "Chapter " + document.querySelector("#reader-wrapper > div.reader-navigation.clear-fix > div.chapter-selection-container > div.chapter-selection > span.current-chapter > em").textContent + " - Page " + document.querySelector("#reader-wrapper > div:nth-child(10) > div.page-navigation-wrapper > div > div.page-navigation > span > em:nth-child(1)").textContent;
      presenceData.startTimestamp = browsingStamp;
      presenceData.smallImageKey = "reading";
    } else if (document.location.pathname.includes("/manga/")){
      presenceData.startTimestamp = browsingStamp;
      user = document.querySelector("#series-data > div.series-info.touchcarousel > span.series-title > h1");
      presenceData.details = "Viewing the manga:";
      presenceData.state = user.textContent;
      presenceData.smallImageKey = "reading";
    } else if (document.location.pathname.includes("/lista-de-mangas")){
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing manga list";
      presenceData.smallImageKey = "reading";
    } else if (document.location.pathname.includes("/lista-de-categorias")){
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing category list";
      presenceData.smallImageKey = "reading";
    } else if (document.location.pathname.includes("/grupos")){
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing group list";
      presenceData.smallImageKey = "reading";
    } else if (document.location.pathname.includes("/scanlator/")){
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing group:";
      presenceData.state = document.querySelector("#wraper > div > div.content-wraper.scan-data > div > ul > li > div.series-info.touchcarousel > span.series-title").textContent;
    } else if (document.location.pathname.includes("/mangas/")){
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing category:";
      presenceData.state = document.querySelector("#wraper > div > a > div > h2").textContent.replace(document.querySelector("#wraper > div > a > div > h2 > div > span").textContent, "");
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