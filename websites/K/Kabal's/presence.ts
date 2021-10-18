const presence = new Presence({
  clientId: "655837567962447882"
});

presence.on("UpdateData", () => {
  const presenceData: PresenceData = {
      largeImageKey: "logo"
    },
    browsingStamp = Math.floor(Date.now() / 1000),
    page = window.location.pathname;

  if (page.endsWith("panel")) {
    presenceData.details = "Bir sayfayı görüntülüyor:";
    presenceData.state = "Panel";
    presenceData.startTimestamp = browsingStamp;
  } else if (page.endsWith("yonetim")) {
    presenceData.details = "Bir sayfayı görüntülüyor:";
    presenceData.state = "Sunucularım";
    presenceData.startTimestamp = browsingStamp;
  } else if (page.startsWith("/yonetim/")) {
    presenceData.details = "Bir sunucuyu yönetiyor:";
    presenceData.state = document.querySelector(
      "body > div > div > div.col-4.col-sm-4.col-md-4.col-lg-4.col-xl-4 > div > div > h5 > center"
    ).textContent;
    presenceData.startTimestamp = browsingStamp;
  } else if (page.endsWith("komutlar")) {
    presenceData.details = "Bir sayfayı görüntülüyor:";
    presenceData.state = "Komutlar";
    presenceData.startTimestamp = browsingStamp;
  } else if (page.endsWith("irtibat")) {
    presenceData.details = "Bir sayfayı görüntülüyor:";
    presenceData.state = "İrtibat";
    presenceData.startTimestamp = browsingStamp;
  }
  if (!presenceData.details) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});
