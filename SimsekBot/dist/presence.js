var presence = new Presence({
    clientId: "706234362575847536"
})
 
var browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", () => {
  let presenceData = {
    largeImageKey: "simsekbot_logo"
  };
  if (document.location.hostname == "simsekbot.com") {  
    if (document.location.pathname === "/") {
      presenceData.details = "Anasayfayı inceliyor.";
      presenceData.startTimestamp = browsingStamp;
    } else if (document.location.pathname.includes("/komutlar")) {
      presenceData.details = "Bot komutlarını inceliyor.";
      presenceData.startTimestamp = browsingStamp;
    }
  } else if(document.location.hostname === "istatistik.simsekbot.com") {
      presenceData.details = "Bot istatistiklerini inceliyor.";
      presenceData.startTimestamp = browsingStamp;
  }
  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});