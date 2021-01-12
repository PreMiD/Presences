const presence = new Presence({
    clientId: "798368817318330400" //The client ID of the Application created at https://discordapp.com/developers/applications
  }),
  strings = presence.getStrings({
    search: "presence.playback.search",
    //You can use this to get translated strings in their browser language
  });

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "tokopedia"
  };
 
  
  var path = document.location.pathname;
  if(path.includes("/p"){
     presenceData.details="Viewing Product List....";
     }
});
