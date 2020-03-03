var presence = new Presence({
  clientId: "675322225490001924",
  mediaKeys: false
}), presenceData: presenceData = {
  largeImageKey: "logo"
}, customData:boolean = false;

var browsingStamp = Math.floor(Date.now()/1000);
var user : any;
var title : any;
var subtitle : any;
var countryrank : any;
var rank : any;
var pp : any;

presence.on("UpdateData", async () => {
  customData = false;

  if(document.location.pathname == ("/")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Home Page";

  } else if (document.location.pathname.includes("/leaderboard")) {
  presenceData.startTimestamp = browsingStamp;
  presenceData.details = "Browsing Leaderboard";
  /*
  presenceData.state = "osu!Standard";

  } else if (document.location.pathname.includes("/leaderboard?mode=1")) {
    
  presenceData.details = "Browsing Leaderboard";
  presenceData.state = "osu!Taiko";

  } else if (document.location.pathname.includes("/leaderboard?mode=2")) {
    
  presenceData.details = "Browsing Leaderboard";
  presenceData.state = "osu!Catch the Beat";

  } else if (document.location.pathname.includes("/leaderboard?mode=3")) {
    
  presenceData.details = "Browsing Leaderboard";
  presenceData.state = "osu!mania";
  */
} else if (document.location.pathname.includes("/clans")) {
  presenceData.startTimestamp = browsingStamp;
  presenceData.details = "Browsing Clans";

} else if (document.location.pathname.includes("/u")) {
  user = document.querySelector("body > div.ui.full.height.main.wrapper > div.h-container > div:nth-child(2) > div.ui.top.attached.segment.overflow.auto > div:nth-child(1) > div:nth-child(2) > h1");
  pp = document.querySelector("body > div.ui.full.height.main.wrapper > div.h-container > div:nth-child(2) > div:nth-child(5) > div > div > div:nth-child(3) > div:nth-child(1) > table > tbody > tr:nth-child(3) > td.right.aligned");
  rank = document.querySelector("body > div.ui.full.height.main.wrapper > div.h-container > div:nth-child(2) > div:nth-child(5) > div > div > div:nth-child(3) > div:nth-child(1) > table > tbody > tr:nth-child(1) > td.right.aligned");
  subtitle = document.querySelector("body > div.ui.full.height.main.wrapper > div.h-container > div:nth-child(2) > div:nth-child(5) > div > div > div:nth-child(1) > b:nth-child(2)");
  countryrank = document.querySelector("body > div.ui.full.height.main.wrapper > div.h-container > div:nth-child(2) > div:nth-child(5) > div > div > div:nth-child(3) > div:nth-child(1) > table > tbody > tr:nth-child(2) > td.right.aligned");
  presenceData.startTimestamp = browsingStamp;
  presenceData.details = user.innerText + "'s profile";
  presenceData.state = rank.innerText + " | " + pp.innerText + "pp | " + subtitle.innerText +"(" + countryrank.innerText + ")";

} else if (document.location.pathname.includes("/c")) {
  title = document.querySelector("body > div.ui.full.height.main.wrapper > div.h-container > div:nth-child(2) > div.ui.top.attached.segment.overflow.auto.aligned > div > div > h1");
  pp = document.querySelector("body > div.ui.full.height.main.wrapper > div.h-container > div:nth-child(2) > div:nth-child(3) > div.ui.two.column.divided.stackable.grid > div > div:nth-child(1) > table > tbody > tr:nth-child(3) > td.right.aligned");
  rank = document.querySelector("body > div.ui.full.height.main.wrapper > div.h-container > div:nth-child(2) > div:nth-child(3) > div.ui.two.column.divided.stackable.grid > div > div:nth-child(1) > table > tbody > tr:nth-child(2) > td.right.aligned");
  subtitle = document.querySelector("body > div.ui.full.height.main.wrapper > div.h-container > div:nth-child(2) > div.ui.top.attached.segment.overflow.auto.aligned > div > div > div");
  presenceData.startTimestamp = browsingStamp;
  presenceData.details = "Viewing Clans";
  presenceData.state = title.innerText + subtitle.innerText + " | " + pp.innerText + "pp(" + rank.innerText + ")";

} else if (document.location.pathname.includes("/about")) {
  presenceData.startTimestamp = browsingStamp;
  presenceData.details = "Viewing About";

} else if (document.location.pathname.includes("/doc")) {
  title = document.querySelector("body > div.ui.full.height.main.wrapper > div.h-container > div:nth-child(2) > div > div:nth-child(1) > h1");
  presenceData.startTimestamp = browsingStamp;
  presenceData.details = "Viewing Documentation";
  presenceData.state = title.innerText;


} else if (document.location.pathname == ("/beatmaps")) {
  presenceData.startTimestamp = browsingStamp;    
  presenceData.details = "Viewing beatmaps";

} else if (document.location.pathname.includes("/beatmaps/rank_request")) {
  presenceData.startTimestamp = browsingStamp;
  presenceData.details = "Viewing beatmaps";
  presenceData.state = "Request beatmap ranking"

} else if (document.location.pathname.includes("/friends")) {
  presenceData.startTimestamp = browsingStamp;
  presenceData.details = "Viewing friends";

} else if (document.location.pathname.includes("/settings")) {
  presenceData.startTimestamp = browsingStamp;
  presenceData.details = "Viewing their settings";
}

  if(!customData) {
    presence.setActivity(presenceData);
  }
});

presence.on('iFrameData', function(data) {
  console.log(data);
});


