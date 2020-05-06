var presence = new Presence({
    clientId: "707525132322865152"
  });
  
  presence.on("UpdateData", () => {
    let presenceData = {
    };
  
    if (window.location.href.includes("https://gamedrake.com/editor-ol/")) {
      presenceData.details = "Editör Ol sayfasını görüntülüyor:";
    } else if (window.location.href.includes("ro-the-bot.ga")) {
      if (window.location.pathname.toLowerCase() === "/") {
        presenceData.details = "Anasayfayı görüntülüyor:";
        presenceData.state = "Anasayfa";
      }
      if (window.location.pathname.toLowerCase().includes("/k/oyun-haberleri")) {
        presenceData.details = "Oyun Haberlerini görüntülüyor:";
        presenceData.state = "Oyun Haberleri";
      }
      if (window.location.pathname.toLowerCase().includes("/k/donanim")) {
        presenceData.details = "Donanım Haberlerini görüntülüyor:";
        presenceData.state = "Donanım Haberleri";
      }
      if (window.location.pathname.toLowerCase().includes("/k/rehber")) {
        presenceData.details = "Oyun Rehberlerini görüntülüyor:";
        presenceData.state = "Oyun Rehberleri";
      }
      if (window.location.pathname.toLowerCase().includes("/k/inceleme")) {
        presenceData.details = "Oyun İncelemelerini görüntülüyor:";
        presenceData.state = "Oyun İncelemeleri";
      }
    }
    presence.setActivity(presenceData);
  });
