var presence = new Presence({
  clientId: "639583736970739733",
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
    largeImageKey: "aod"
  };

  if (document.location.hostname == "www.anime-on-demand.de") {
    if (document.location.pathname == "/") {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing home page";
    } else if (document.location.pathname.includes("/anime/")){
      presenceData.startTimestamp = browsingStamp;
      user = document.querySelector("body > div.l-off-canvas-container > div.l-mainsection > div > div:nth-child(1) > h1");
      presenceData.details = "Viewing anime:";
      presenceData.smallImageKey = "reading"
      presenceData.state = user.innerText;
    } else if (document.location.pathname.includes("/animes")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Browsing for animes";
    } else if (document.location.pathname.includes("/myanimes")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing their animes";
    } else if (document.location.pathname.includes("/articles/category")) {
      presenceData.startTimestamp = browsingStamp;
      title = document.querySelector("head > title");
      presenceData.details = "Viewing articles category:";
      presenceData.state = title.innerText.replace("Anime-News: ","").replace(" | Anime on Demand", "");
    } else if (document.location.pathname.includes("/articles")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing articles"
    } else if (document.location.pathname.includes("/article/")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.smallImageKey = "reading";
      title = document.querySelector("body > div.l-off-canvas-container > div.l-mainsection > div > h1");
      presenceData.details = "Reading article:";
      presenceData.state = title.innerText;
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