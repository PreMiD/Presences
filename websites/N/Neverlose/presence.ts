const presence = new Presence({
  clientId: "851818492847194172" 
}),
strings = presence.getStrings({
  play: "presence.playback.playing",
  pause: "presence.playback.paused"
});
var browsingStamp = Math.floor(Date.now() / 1000);

var title: any;
var search: any;

presence.on("UpdateData", async () => {

const presenceData: PresenceData = {
  largeImageKey:
    "neverlose"
};
//main page
if (document.location.pathname == "/") {
  presenceData.details = "Browsing The Home Page!";
}
//profile settings
else if (document.location.pathname == "/me"){
  presenceData.details = "Viewing Their Profile!";
}
//faq
else if (document.location.pathname == "/help"){
  presenceData.details = "Viewing The FAQ!";
}
//tickets that are open
else if (document.location.pathname == "/tickets"){
  presenceData.details = "Viewing Their Tickets!";
}
//purchases
else if (document.location.pathname == "/market/history"){
  presenceData.details = "Viewing Their Purchases!";
}
//current subscription
else if (document.location.pathname.includes("/sub")) {
  //csgo product
  if (document.URL.includes("type=csgo")){
    presenceData.details = "Viewing Their CS:GO Sub!";
  }
  //apex product
  else if(document.URL.includes("type=apex")){
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing Their Apex Legends Sub!";
  }
}
else if (document.location.pathname.includes("/product")) {
  //csgo product
  if (document.URL.includes("/product?type=csgo")){
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing The CS:GO Product!";
  }
  //apex product
  else if(document.URL.includes("/product?type=apex")){
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing The Apex Legends Product!";
  }
}
//main market
else if (document.location.pathname.includes("/market")){
  presenceData.details = "Viewing Paid Configs!";
  presenceData.startTimestamp = browsingStamp;
  //free scripts
  if(document.URL.includes("type=3")){
    presenceData.details = "Viewing Free Scripts!";
  }
  //paid scripts
  else if(document.URL.includes("type=2")){
    presenceData.details = "Viewing Paid Scripts!";
  }
  //free configs
  else if(document.URL.includes("type=1")){
    presenceData.details = "Viewing Free Configs!";
  }
  //paid configs
  else if(document.URL.includes("type=0")){
    presenceData.details = "Viewing Paid Configs!";
  }
  
}

if (presenceData.details == null) {
  presence.setTrayTitle();
  presenceData.startTimestamp = browsingStamp;
  presence.setActivity();
} else {
  presence.setActivity(presenceData);
}
});