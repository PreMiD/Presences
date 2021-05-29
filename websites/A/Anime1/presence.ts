const presence = new Presence({
  clientId: "841601256203485205" //The client ID of the Application created at https://discordapp.com/developers/applications
}),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused",
    browsing: "presence.activity.browsing",
  });

var browsingStamp = Math.floor(Date.now() / 1000);

function update() {
  //Grab and process all your data here
  presence.info('test');
  console.log('test');
  // element grabs //
  // api calls //
  // variable sets //
}

setInterval(update, 10000);


presence.on("UpdateData", async () => {
  /*UpdateData is always firing, and therefore should be used as your refresh cycle, or `tick`. This is called several times a second where possible.
  
    It is recommended to set up another function outside of this event function which will change variable values and do the heavy lifting if you call data from an API.*/
  const presenceData: PresenceData = {
    largeImageKey: "anime1_me" /*The key (file name) of the Large Image on the presence. These are uploaded and named in the Rich Presence section of your application, called Art Assets*/,
      state: "Inital details", //The lower section of the presence text
  };
  if (document.location.hostname == "anime1.me" || document.location.hostname.includes("www.")) {
    if (presenceData.details == null) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Watching:";
      presenceData.state = document
        .querySelector("head > title")
        .textContent.replace(" – Anime1.me 動畫線上看", "");
      presence.setActivity(presenceData);
    } else {
      presence.setActivity(presenceData);
    }
}});  
