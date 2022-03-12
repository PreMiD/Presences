const presence = new Presence({
    //The client ID of the Application created at https://discordapp.com/developers/applications
    clientId: "951615885922148412"
    }),
  
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
    //console.log("test | From Spectrum TV PreMiD")
    /*UpdateData is always firing, and therefore should be used as your refresh cycle, or `tick`. This is called several times a second where possible.
  
      It is recommended to set up another function outside of this event function which will change variable values and do the heavy lifting if you call data from an API.*/
    //code and apis
    //alert("hello");
    
    //presence e
    //console.log("test2 | From Spectrum TV PreMiD")
    const presenceData: PresenceData = {
      //The large image on the presence. This can be a key of an image uploaded on the Discord Developer Portal - Rich Presence - Art Assets, or a URL to an image
      largeImageKey: "tv_logo",
      //The small image on the presence. This can be a key of an image uploaded on the Discord Developer Portal - Rich Presence - Art Assets, or a URL to an image
      smallImageKey: "tv_logo",
      //The text which is displayed when hovering over the small image
      smallImageText: "Charter Spectrum",
       //The upper section of the presence text
      details: "",
      //The lower section of the presence text
      state: "",
      //The unix epoch timestamp for when to start counting from
      //startTimestamp: 0,
      //If you want to show Time Left instead of Elapsed, this is the unix epoch timestamp at which the timer ends
      //endTimestamp: 3133700400000
      //Optionally you can set a largeImageKey here and change the rest as variable subproperties, for example presenceData.type = "blahblah"; type examples: details, state, etc.
      /*buttons: [{
        label: "Watch TV | Spectrum TV",
        url: "https://watch.spectrum.net/livetv"
    }]*/
    };
    if (document.location.pathname.includes("/livetv")){presenceData.state = "Watching TV | Live TV"; presenceData.largeImageKey = document.getElementsByClassName("selected")[0].getElementsByClassName("channel-block")[0].getElementsByClassName("logo")[0].getElementsByTagName("img")[0].src; presenceData.details = "Watching " + document.getElementsByClassName("selected")[0].getElementsByClassName("channel-block")[0].getElementsByClassName("channel-number-callsign")[0].getElementsByClassName("chan-call-group")[0].getElementsByClassName("callsign")[0].getAttribute("aria-label") + "(" + document.getElementsByClassName("selected")[0].getElementsByClassName("program-title")[0].getElementsByClassName("title-episode")[0].getElementsByClassName("title")[0].textContent + ")";}/*do presences */ else if (document.location.pathname.includes("/guide")) {presenceData.details = "Looking at the guide"; presenceData.largeImageKey = "guide_img"} else if (document.location.pathname.includes("/ondemand")) {if(document.location.pathname.includes("/playcdvr")) {presenceData.details = "Watching " + document.getElementsByClassName("asset-title")[0].textContent; if(document.getElementsByClassName("asset-meta")[0]){presenceData.details = presenceData.details + " (" + document.getElementsByClassName("asset-meta")[0].textContent + ")"};presenceData.state = "Watching From DVR";} else if (document.location.pathname.includes("/play")) {presenceData.details = "Watching " + document.getElementsByClassName("asset-title")[0].textContent; if(document.getElementsByClassName("asset-meta")[0]){presenceData.details = presenceData.details + " (" + document.getElementsByClassName("asset-meta")[0].textContent + ")"};presenceData.state = "Watching On Demand";} else{presenceData.details = "Looking at what's On Demand"; presenceData.largeImageKey = "guide_img"}}else if (document.location.pathname.includes("/settings")){presenceData.details = "Looking at Spectrum TV Settings"; presenceData.largeImageKey = "settings_cog"}else if (document.location.pathname.includes("/cdvr")) {if(document.location.pathname.includes("/recorded")){presenceData.state = "Looking at Spectrum TV DVR";presenceData.details = "Looking what's been Recorded"; presenceData.largeImageKey = "spectrum_tv_logo_gfx"}else if (document.location.pathname.includes("/scheduled")){presenceData.state = "Looking at Spectrum TV DVR";presenceData.details = "Looking what's Scheduled to Record"; presenceData.largeImageKey = "spectrum_tv_logo_gfx"}} else if (document.location.pathname.includes("/mylibrary")) {presenceData.details = "In My Library"}
    if (presenceData.details) presence.setActivity(presenceData);
    //Update the presence with no data, therefore clearing it and making the large image the Discord Application icon, and the text the Discord Application name
    else presence.setActivity();
  });
