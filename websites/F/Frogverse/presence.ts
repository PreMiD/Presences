const presence = new Presence({
    //The client ID of the Application created at https://discordapp.com/developers/applications
    clientId: "922165604595679263"
    }),
    //You can use this to get translated strings in their browser language
    strings = presence.getStrings({
      play: "presence.playback.playing",
      pause: "presence.playback.paused"
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
  
  presence.on("UpdateData", async () => {
    /*UpdateData is always firing, and therefore should be used as your refresh cycle, or `tick`. This is called several times a second where possible.
  
      It is recommended to set up another function outside of this event function which will change variable values and do the heavy lifting if you call data from an API.*/
  
    const presenceData: PresenceData = {
      //The key (file name) of the Large Image on the presence. These are uploaded and named in the Rich Presence section of your application, called Art Assets
      largeImageKey: "logo",
      //The key (file name) of the Small Image on the presence. These are uploaded and named in the Rich Presence section of your application, called Art Assets
      smallImageKey: "key",
      //The text which is displayed when hovering over the small image
      smallImageText: "",
       //The upper section of the presence text
      details: "Viewing Frogverse",
      //The lower section of the presence text
      state: "Main Page",
      //The unix epoch timestamp for when to start counting from
      startTimestamp: 3133657200000,
      //If you want to show Time Left instead of Elapsed, this is the unix epoch timestamp at which the timer ends
      endTimestamp: 3133700400000
      //Optionally you can set a largeImageKey here and change the rest as variable subproperties, for example presenceData.type = "blahblah"; type examples: details, state, etc.
    };
    //Update the presence with all the values from the presenceData object
    if (presenceData.details) presence.setActivity(presenceData);
    //Update the presence with no data, therefore clearing it and making the large image the Discord Application icon, and the text the Discord Application name
    else presence.setActivity();
  });
