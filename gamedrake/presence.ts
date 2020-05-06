var presence = new Presence({
  clientId: "707525132322865152"
});
var browsingStamp = Math.floor(Date.now() / 1000);
var user;
presence.on("UpdateData", async () => {
  const data = {
    largeImageKey: "gd-logo",
    details: "Anasayfada dolaşıyor."
  };
  if (
    document.location.pathname == "/" ||
    document.location.pathname == "/"
  ) {
    data.startTimestamp = browsingStamp;
    data.details = "Anasayfaya göz atıyor..";
  } else if (document.location.pathname.includes("/k/oyun-haberleri")) {
    data.startTimestamp = browsingStamp;
    data.details = "Oyun Haberlerini göz atıyor:";
  } else if (document.location.pathname.includes("/k/donanim")) {
    data.startTimestamp = browsingStamp;
    data.details = "Donanım Haberlerini göz atıyor:";
  } else if (document.location.pathname.includes("/k/rehber")) {
    data.startTimestamp = browsingStamp;
    data.details = "Oyun Rehberlerine göz atıyor:";
  } else if (document.location.pathname.includes("/k/inceleme/")) {
    data.startTimestamp = browsingStamp;
    data.details = "Oyun İncelemelerine göz atıyor:";
  } else if (document.location.pathname.includes("/gizlilik-politikasi/")) {
    data.startTimestamp = browsingStamp;
    data.details = "Gizlilik Politasını okuyor:";
  } else if (document.location.pathname.includes("/editor-ol/")) {
    data.startTimestamp = browsingStamp;
    data.details = "Editör Başvuru Formuna bakıyor:";
  }
  if (data.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(data);
  }
});
