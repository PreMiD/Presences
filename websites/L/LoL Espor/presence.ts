const presence = new Presence({
  clientId: "759897044323794985"
});

const time = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "logo"
  };
  const path = window.location.pathname;
  if (path === "/") {
    presenceData.details = "Anasayfa";
    presenceData.state = "Hiçbir şey yapmıyor.";
    presenceData.startTimestamp = time;
  } else if (path === "/news") {
    presenceData.details = "Haberler";
    presenceData.state = "Bir habere bakıyor.";
    presenceData.startTimestamp = time;
  } else if (path.startsWith("/schedule")) {
    presenceData.details = "Fikstür";
    presenceData.state = "Maç karşılaşmalarına bakıyor.";
    presenceData.startTimestamp = time;
  }else if(path.startsWith("/live/") ){
    const test = document.querySelector("div.teams").textContent;
      presenceData.details = "Canlı Yayın";
    presenceData.state = test.replace("VS", " vs ") + " izliyor.";
    presenceData.startTimestamp = time;
    

  }else if(path.startsWith("/article/")){
    presenceData.details = "Haber okuyor";
    presenceData.state = "Haber: " + document.querySelector("div.title").textContent;
    presenceData.startTimestamp = time;
  }else if(path.startsWith("/vods/")){
    presenceData.details = "Tekrarlar";
    presenceData.state = "Maç geçmişlerine göz atıyor."
    presenceData.startTimestamp = time;
  }else if(path.startsWith("/vod/")){
    let test = document.querySelector("div.teams").textContent;
    presenceData.details = "Tekrar izliyor";
    presenceData.state = test.replace("VS", " vs ") + " maç tekrarını izliyor." 
    presenceData.startTimestamp = time;
  }else if(path.startsWith("/standings/")){
    presenceData.details = "Puan Durumu";
    presenceData.state = "Puan Durumlarına bakıyor.";
    presenceData.startTimestamp = time;
  }
  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
