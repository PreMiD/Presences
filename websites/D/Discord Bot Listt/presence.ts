const presence = new Presence({
  clientId: "750473295140225135"
});

const second = Math.floor(Date.now() / 1000);

presence.on("UpdateData", () => {
  const presenceData: PresenceData = {
    largeImageKey: "logo"
  };
if (document.location.hostname == "dis.cordbots.cf") {
    presenceData.details = "Looking at a Page:";
    presenceData.state = "Home page";
    presenceData.startTimestamp = second;
    if (document.location.pathname.includes("/bots")) {
      presenceData.details = "Looking at a Page:";
      presenceData.state = "Bots";
      presenceData.startTimestamp = second;
    } else if (document.location.pathname.includes("/certification")) {
      presenceData.details = "Looking at a Page:";
      presenceData.state = "Certification";
      presenceData.startTimestamp = second;
    } else if (document.location.pathname.includes("/add")) {
      presenceData.details = "Looking at a Page:";
      presenceData.state = "Bot Add";
      presenceData.startTimestamp = second;
    } else if(document.location.pathname.includes("/user/")) {
      let isim = document.getElementById("username")
      presenceData.details = "Looking at a profile:";
      presenceData.state = isim.innerText;
      presenceData.startTimestamp = second;
    } else if(document.location.pathname.includes("/bot/")) {
      let botisim = document.getElementById("botisim")
      presenceData.details = "Looking at a Bot:";
      presenceData.state = botisim.innerText || "Not found";
      presenceData.startTimestamp = second;
    }
} 
      if (presenceData.details == null) {
        
        presence.setTrayTitle(); 
        presence.setActivity(); 
    } else {
       
        presence.setActivity(presenceData); 
    }
  
