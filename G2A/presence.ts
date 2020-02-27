var presence = new Presence({
  clientId: "633805202868273153",
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
    largeImageKey: "g2alogo"
  };

  if (document.location.hostname == "www.g2a.com") {
    presenceData.startTimestamp = browsingStamp;
    if (document.location.pathname.includes("/wishlist")) {
      presenceData.details = "Viewing their wishlist";
    } else if (document.location.pathname.includes("/cart")) {
      presenceData.details = "Viewing their cart";
    } else if (document.location.pathname.includes("/search")) {
      presenceData.details = "Searching for:";
      search = document.querySelector("head > title");
      presenceData.state = title.innerText.replace("\" - G2A.COM", "").replace("Search results - \"", "");
      presenceData.smallImageKey = "search";
    } else if (document.location.pathname.includes("/category")) {
      presenceData.details = "Viewing category:";
      title = document.querySelector("head > title");
      presenceData.state = title.innerText.replace(" - G2A.COM", "");
    } else if (document.querySelector("#app > div > div.content > div > article > header > div > div > h1 > span") !== null) {
      presenceData.details = "Viewing item:";
      title = document.querySelector("#app > div > div.content > div > article > header > div > div > h1 > span");
      presenceData.state = title.innerText;
    } else if (document.location.pathname.includes("/user")) {
      presenceData.details = "Viewing user:";
      user = document.querySelector("#app > div > div.content > div > div > div > section > div.user-info > button > strong");
      presenceData.state = user.innerText;
    } else if (document.location.pathname.includes("/goldmine")) {
      presenceData.details = "Using the goldmine";
    } else if (document.location.pathname.includes("/news/")) {
      presenceData.startTimestamp = browsingStamp;
      title = document.querySelector("body > div.single-article.single-article--feature.default-template > div.review-top > div.review-top__wrapper > div > header > h1");
      if (title == null) {
        presenceData.details = "Browsing news section";
      } else {
        presenceData.details = "News - Reading:";
        presenceData.state = title.innerText;
        presenceData.smallImageKey = "reading";
      }
    }
  } else if (document.location.hostname == "id.g2a.com") {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing their account details";
  } else if (document.location.hostname == "dashboard.g2a.com") {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing their dashboard";
  } else if (document.location.hostname == "pay.g2a.com") {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Using G2A Pay";
  } else if (document.location.hostname == "plus.g2a.com") {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "G2A Plus - Viewing:";
    title = document.querySelector("head > title");
    presenceData.state = title.innerText.replace(" - G2A Plus", "");
  } else if (document.location.hostname == "loot.g2a.com") {
    presenceData.startTimestamp = browsingStamp;
    if (document.location.pathname == "/") {
      presenceData.details = "Browsing G2A Loot";
    } else {
      presenceData.details = "G2A Loot - Viewing:";
      title = document.querySelector("head > title");
      presenceData.state = title.innerText.replace(" - G2A Loot", "");
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