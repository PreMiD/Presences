var presence = new Presence({
  clientId: "640234287525920834",
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
    largeImageKey: "pix"
  };

  if (document.location.hostname == "www.pixiv.net") {
    if (document.location.pathname == "/" || document.location.pathname == "/en/") {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing home page";
    } else if (document.querySelector("#root > div:nth-child(2) > div > div > div > div:nth-child(2) > div > div > div:nth-child(2) > div > h1") !== null){
      presenceData.startTimestamp = browsingStamp;
      user = document.querySelector("#root > div:nth-child(2) > div > div > div > div:nth-child(2) > div > div > div:nth-child(2) > div > h1");
      presenceData.details = "Viewing user:";
      presenceData.state = user.innerText;
    } else if (document.location.pathname.includes("/novel/")) {
      if (document.querySelector("#root > div > div > div > main > section > div:nth-child(1) > div > div:nth-child(2) > h1") !== null) {
        title = document.querySelector("#root > div > div > div > main > section > div:nth-child(1) > div > div:nth-child(2) > h1");
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Viewing novel:";
        presenceData.state = title.innerText;
      } else {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Browsing for novels...";
      }
    } else if (document.location.pathname.includes("/artworks")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing artwork:";
      presenceData.state = document.querySelector("#root > div:nth-child(2) > div > div > main > section > div > div > figcaption > div > div > h1").textContent;
    } else if (document.location.pathname.includes("/ranking")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing:";
      presenceData.state = document.querySelector("#wrapper > div.layout-body > div > h1 > a").textContent;
    } else if (document.location.pathname.includes("/bookmark")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing bookmarks"
    } else if (document.location.pathname.includes("/fanbox")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing fanbox"
    } else if (document.location.pathname.includes("/event")) {
      if (document.querySelector("#contents > div.pane.full.group > h1") !== null) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Viewing event:";
        presenceData.state = document.querySelector("#contents > div.pane.full.group > h1").textContent;
      } else {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Browsing events..."
      }
    } else if (document.location.pathname.includes("/tag")) {
      title = document.querySelector("#container > div.page > div.main-wrap > div.profile > section > header > h1");
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing tag:"
      presenceData.state = title.innerText;
    } else if (document.location.pathname.includes("/search")) {
      search = document.querySelector("#wrapper > div.layout-body > div > div.column-header > div > h1 > a");
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Searching for:";
      presenceData.state = search.innerText;
      presenceData.smallImageKey = "search";
    }
  } else if (document.location.hostname == "sketch.pixiv.net") {
    presenceData.smallImageKey = "writing";
    if (document.location.pathname == "/" || document.location.pathname.includes("/public")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing sketch page";
    } else if (document.location.pathname.includes("/lives/")) {
      title = document.querySelector("#LiveSidebarLiveUser > div.name");
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Sketch- Viewing livestream";
      presenceData.state = "by user: " + title.innerText;
      presenceData.smallImageKey = "live";
    } else if (document.location.pathname.includes("/lives")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Sketch- Browsing livestreams";
    } else if (document.location.pathname.includes("/popular")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Sketch- Viewing popular posts";
    } else if (document.location.pathname.includes("/following")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Sketch- Viewing following posts";
    } else if (document.location.pathname.includes("/@")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Sketch- Viewing user:";
      presenceData.state = document.querySelector("#AppContent > div:nth-child(5) > div:nth-child(1) > div > div.UserHeaderBody > div > div.user > div.name").textContent;
    } else if (document.location.pathname.includes("/tags")) {
      search = document.querySelector("#TagHeader > div > div.CarouselOverlay > div > div");
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Sketch- Viewing tag:";
      presenceData.state = search.innerText;
    }
  }

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