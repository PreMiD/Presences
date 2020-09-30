const presence = new Presence({
  clientId: "760926411090690074"
});

presence.on("UpdateData", () => {
  const presenceData: PresenceData = {
      largeImageKey: "xuply",
    },
    browsingStamp = Math.floor(Date.now() / 1000),
    page = window.location.pathname;
  if (page.toLowerCase() === "/") {
    presenceData.details = "Bir sayfa görüntülüyor:";
    presenceData.state = "Anasayfa";
    presenceData.startTimestamp = browsingStamp;
  } else if (page.toLowerCase() === "/about") {
    presenceData.details = "Bir sayfa görüntülüyor:";
    presenceData.state = "Bilgilendirme";
    presenceData.startTimestamp = browsingStamp;
  } else if (page.toLowerCase() === "/contact") {
    presenceData.details = "Bir sayfa görüntülüyor:";
    presenceData.state = "İletişim";
    presenceData.startTimestamp = browsingStamp;
  } else if (page.startsWith("/category")) {
    presenceData.details = "Bir kategori görüntülüyor:";
    presenceData.state = document.location.search
      ? document.querySelector(
          "body > main > div > div > div > div > nav > ol > li:nth-child(3) > a"
        ).textContent
      : "Tüm Kodlar";
    presenceData.startTimestamp = browsingStamp;
  } else if (page.toLowerCase() === "/codesharer") {
    presenceData.details = "Bir sayfa görüntülüyor:";
    presenceData.state = "Kod paylaşım";
    presenceData.startTimestamp = browsingStamp;
  } else if (page.startsWith("/admin")) {
    presenceData.details = "Bir sayfa görüntülüyor:";
    presenceData.state = "Admin Dashboard";
    presenceData.startTimestamp = browsingStamp;
  } else if (page.startsWith("/profile")) {
    presenceData.details = "Bir profil görüntülüyor:";
    presenceData.state =
      document.querySelector("body > main > div > div > div > div > div > h2")
        .textContent +
      " " +
      "adlı kullanıcının profilini görüntülüyor!";
    presenceData.startTimestamp = browsingStamp;
  } else if (page.startsWith("/code")) {
    presenceData.details = "Bir kod görüntülüyor:";
    presenceData.state =
      document.querySelector("body > main > div > div > div > div > div > h2")
        .textContent +
      " " +
      "adlı kodu görüntülüyor.";
    presenceData.startTimestamp = browsingStamp;
  }
  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
