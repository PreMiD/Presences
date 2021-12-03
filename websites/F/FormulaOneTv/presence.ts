const presence = new Presence({
  //The client ID of the Application created at https://discordapp.com/developers/applications
  clientId: "916438450952097834"
}),
  //You can use this to get translated strings in their browser language
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
  });

function getEpoch(): number {
  return Math.floor(+new Date() / 1000)
}

function updateActivity() {
  //Grab and process all your data here


  // element grabs //
  // api calls //
  // variable sets //
}

setInterval(updateActivity, 10000);
//Run the function separate from the UpdateData event every 10 seconds to get and set the variables which UpdateData picks up

presence.on("UpdateData", async () => {
  /*UpdateData is always firing, and therefore should be used as your refresh cycle, or `tick`. This is called several times a second where possible.

    It is recommended to set up another function outside of this event function which will change variable values and do the heavy lifting if you call data from an API.*/

  const presenceData: PresenceData = {
    //The key (file name) of the Large Image on the presence. These are uploaded and named in the Rich Presence section of your application, called Art Assets
    largeImageKey: "logo_512",
    //The key (file name) of the Small Image on the presence. These are uploaded and named in the Rich Presence section of your application, called Art Assets
    // smallImageKey: "logo_512",
    //The text which is displayed when hovering over the small image
    // smallImageText: "Formula 1 TV",
    //The upper section of the presence text
    details: "Browsing main page",
    //The lower section of the presence text
    state: "",
    //The unix epoch timestamp for when to start counting from
    startTimestamp: getEpoch(),
    //If you want to show Time Left instead of Elapsed, this is the unix epoch timestamp at which the timer ends
    // endTimestamp: getEpoch()
    //Optionally you can set a largeImageKey here and change the rest as variable subproperties, for example presenceData.type = "blahblah"; type examples: details, state, etc.
  };
  
  //Update the presence with all the values from the presenceData object
  if (presenceData.details) presence.setActivity(presenceData);
  //Update the presence with no data, therefore clearing it and making the large image the Discord Application icon, and the text the Discord Application name
  else presence.setActivity();
});
