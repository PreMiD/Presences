const presence = new Presence({
  clientId: "749319733807153162"
});
presence.on("UpdateData", () => {
  const presenceData: PresenceData = {
      largeImageKey: "logo"
    },
    page = window.location.pathname,
    browsingStamp = Math.floor(Date.now() / 1000);

  presenceData.startTimestamp = browsingStamp;
  if (page.startsWith("/kullanici/")) {
    presenceData.details = "Bir kullanıcının profilini görüntülüyor:";
    presenceData.state = document.querySelector(
      "body > div:nth-child(6) > div > h3"
    ).textContent;
  } else if (page.startsWith("/hakkimizda")) {
    presenceData.details = "Bir sayfayı görüntülüyor:";
    presenceData.state = "Hakkımızda";
  } else if (page.startsWith("/javascript")) {
    presenceData.details = "Bir sayfayı görüntülüyor:";
    presenceData.state = "JS Komutlar";
    presenceData.smallImageKey = "js";
  } else if (page.startsWith("/kod")) {
    presenceData.details = "Bir kodu görüntülüyor:";
    presenceData.state = document.querySelector(
      "body > div.post.post-single > div.post-thumbnail > center > h1"
    ).textContent;
  } else if (page.startsWith("/html")) {
    presenceData.details = "Bir sayfayı görüntülüyor:";
    presenceData.state = "HTML kodları";
    presenceData.smallImageKey = "html";
  } else if (page.endsWith("/rapor"))
    presenceData.details = "Bir şeyi bildiriyor...";
  else if (page.endsWith("/yetersiz-rol")) {
    presenceData.details = "Erişemeyeceği bir yere erişmeye çalışıyor... 👀";
    presenceData.smallImageKey = "x";
  } else if (page.startsWith("/altyapi")) {
    presenceData.details = "Altyapıları görüntülüyor...";
    presenceData.smallImageKey = "alt";
  } else if (page.startsWith("/booster")) {
    presenceData.details = "Booster kısmını görüntülüyor...";
    presenceData.smallImageKey = "booster";
  } else if (page.startsWith("/yetkili"))
    presenceData.details = "Yetkili sayfasında dolaşıyor...";

  if (!presenceData.details) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});
