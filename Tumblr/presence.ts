var presence = new Presence({
  clientId: "640963335826833418",
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
    largeImageKey: "tumblr"
  };

  if (document.location.hostname == "www.tumblr.com") {
    if (document.location.pathname == "/") {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing home page";
    } else if (document.location.pathname.includes("/u/")){
      presenceData.startTimestamp = browsingStamp;
      user = document.querySelector("#container > div.page > div.main-wrap > div > section > header > h2");
      presenceData.details = "Viewing user:";
      presenceData.state = user.innerText;
    } else if (document.querySelector("#container > div.page > div.main-wrap > div.profile > section > header > h2") !== null) {
      user = document.querySelector("#container > div.page > div.main-wrap > div.profile > section > header > h2");
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing catagory:";
      presenceData.state = user.innerText;
    } else if (document.location.pathname.includes("/dashboard")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing their dashboard";
    } else if (document.location.pathname.includes("/new")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Making a new post...";
      presenceData.smallImageKey = "writing";
    } else if (document.location.pathname.includes("/trending")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing what's trending";
    } else if (document.location.pathname.includes("/staff-picks")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing staff picks";
    } else if (document.location.pathname.includes("/photos")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing photos";
    } else if (document.location.pathname.includes("/gif")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing GIF's";
    } else if (document.location.pathname.includes("/audio")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing audio's";
    } else if (document.location.pathname.includes("/inbox")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing their inbox";
    } else if (document.location.pathname.includes("/video")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing video's";
    } else if (document.location.pathname.includes("/text")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Reading texts";
      presenceData.smallImageKey = "reading";
    } else if (document.location.pathname.includes("/recommended-for-you")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing recommendations";
    } else if (document.location.pathname.includes("/settings")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing their settings";
    } else if (document.location.pathname.includes("/asks")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Reading questions";
      presenceData.smallImageKey = "reading";
    } else if (document.location.pathname.includes("/quotes")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Reading quotes";
      presenceData.smallImageKey = "reading";
    } else if (document.location.pathname.includes("/chats")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Reading chats";
      presenceData.smallImageKey = "reading";
    } else if (document.location.pathname.includes("/search")) {
      search = document.querySelector("#search_actions_search > div.l-container.l-container--flex > div > div > div.search_sub_header > h1");
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Searching for:";
      presenceData.state = search.textContent;
      presenceData.smallImageKey = "search";
    }
  } else if (document.querySelector("#header > div.blog-title-wrapper.content > div > h1 > a") !== null) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing user:";
    presenceData.state = document.querySelector("#header > div.blog-title-wrapper.content > div > h1 > a").textContent;
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