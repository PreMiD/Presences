var playing = new Presence({
    clientId: "706234362575847536"
})
 
var browsingStamp = Math.floor(Date.now() / 1000);

playing.on("UpdateData", () => {
  let playingData = {
    largeImageKey: "simsekbot_logo",
	details: "",
	startTimestamp: 0
  };
  if (document.location.hostname == "simsekbot.com" || document.location.hostname == "www.simsekbot.com") {  
    if (document.location.pathname === "/") {
      playingData.details = "Anasayfayı inceliyor.";
      playingData.startTimestamp = browsingStamp;
    } else if (document.location.pathname === "/komutlar/") {
      playingData.details = "Bot komutlarını inceliyor.";
      playingData.startTimestamp = browsingStamp;
    }
  } else if(document.location.hostname === "istatistik.simsekbot.com") {
      playingData.details = "Bot istatistiklerini inceliyor.";
      playingData.startTimestamp = browsingStamp;
  }
  if (playingData.details == null) {
    playing.setTrayTitle();
    playing.setActivity();
  } else {
    playing.setActivity(playingData);
  }
});
