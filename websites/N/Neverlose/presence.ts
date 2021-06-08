const presence = new Presence({
  clientId: "851818492847194172" //The client ID of the Application created at https://discordapp.com/developers/applications
}),
strings = presence.getStrings({
  play: "presence.playback.playing",
  pause: "presence.playback.paused"
  //You can use this to get translated strings in their browser language
});

/*

function myOutsideHeavyLiftingFunction(){
  //Grab and process all your data here

  // element grabs //
  // api calls //
  // variable sets //
}

setInterval(myOutsideHeavyLiftingFunction, 10000);
//Run the function separate from the UpdateData event every 10 seconds to get and set the variables which UpdateData picks up

*/
var browsingStamp = Math.floor(Date.now() / 1000);

var title: any;
var search: any;

presence.on("UpdateData", async () => {
/*UpdateData is always firing, and therefore should be used as your refresh cycle, or `tick`. This is called several times a second where possible.

  It is recommended to set up another function outside of this event function which will change variable values and do the heavy lifting if you call data from an API.*/

const presenceData: PresenceData = {
  largeImageKey:
    "neverlose"
};

if (document.location.pathname == "/") {
  presenceData.details = "Browsing The Home Page!";
}
else if (document.location.pathname == "/me"){
  presenceData.details = "Viewing Their Profile!";
}
else if (document.location.pathname == "/help"){
  presenceData.details = "Viewing The FAQ!";
}
else if (document.location.pathname == "/tickets"){
  presenceData.details = "Viewing Their Tickets!";
}
else if (document.location.pathname == "/market/history"){
  presenceData.details = "Viewing Their Purchases!";
}
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
else if (document.location.pathname == "https://forum.neverlose.cc/"){

}
else if (document.location.pathname.includes("/market")){
  presenceData.details = "Viewing Paid Configs!";
  presenceData.startTimestamp = browsingStamp;
  //fre scripts
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
  //This will fire if you do not set presence details
  presence.setTrayTitle(); //Clears the tray title for mac users
  presenceData.startTimestamp = browsingStamp;
  presence.setActivity(); /*Update the presence with no data, therefore clearing it and making the large image the Discord Application icon, and the text the Discord Application name*/
} else {
  //This will fire if you set presence details
  presence.setActivity(presenceData); //Update the presence with all the values from the presenceData object
}
});