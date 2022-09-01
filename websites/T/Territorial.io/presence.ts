const presence = new Presence({
    //The client ID of the Application created at https://discordapp.com/developers/applications
    clientId: "1014825207791362088",
    }),
    browsingTimestamp = Math.floor(Date.now() / 1000);
  
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
  details: "Playing on Territorial.io",
  state: "Possibly making moves...",
  largeImageKey: "https://i.imgur.com/gIRlwXD.png",
  smallImageKey: "https://i.imgur.com/gIRlwXD.png",
  smallImageText: "https://territorial.io/",
  startTimestamp: browsingTimestamp,
  //endTimestamp: 1564444634734,
  buttons: [
    {
            label: "Play now",
            url: "https://territorial.io/"
        },
    ]
};
    //Update the presence with all the values from the presenceData object
    if (presenceData.details) presence.setActivity(presenceData);
    //Update the presence with no data, therefore clearing it and making the large image the Discord Application icon, and the text the Discord Application name
    else presence.setActivity();
  });