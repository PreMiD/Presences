const presence = new Presence({
    clientId: "798368817318330400"
  }),
  strings = presence.getStrings({
    search: "presence.playback.search",
  });

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "tokopedia"
  };
 
  
  var path = document.location.pathname;
  if(path.includes("/p")){
     presenceData.details="Viewing Product List....";
     }
});
