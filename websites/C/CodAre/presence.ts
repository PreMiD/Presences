const presence = new Presence({
  clientId: "737633529738952765"
});

presence.on("UpdateData", () => {
  const presenceData: PresenceData = {
    largeImageKey: "logo"
  };

  const browsingStamp = Math.floor(Date.now() / 1000),
  page = window.location.pathname;
  if (page.toLowerCase() === "/") {
    presenceData.details = "Bir sayfa görüntülüyor:";
    presenceData.state = "Anasayfa";
    presenceData.startTimestamp = browsingStamp;
  } else if (page.toLowerCase() === "/sss") {
    presenceData.details = "Bir sayfa görüntülüyor:";
    presenceData.state = "Sıkça Sorulan Sorular";
    presenceData.startTimestamp = browsingStamp;
  } else if (page.toLowerCase() === "/yetkililer") {
    presenceData.details = "Bir sayfa görüntülüyor:";
    presenceData.state = "Yetkililer";
    presenceData.startTimestamp = browsingStamp;
  } else if (page.toLowerCase() === "/paylas") {
    presenceData.details = "Bir sayfa görüntülüyor:";
    presenceData.state = "Kod Paylaş";
    presenceData.startTimestamp = browsingStamp;
  } else if (page.startsWith("/kod")) {
    presenceData.details = "Bir kod görüntülüyor:";
    presenceData.state = 
     document.querySelector("#\\32  > div > div > div > div > h3")
        .textContent +
      " " +
      "adlı kodu görüntülüyor!";
    presenceData.startTimestamp = browsingStamp;
  }  else if (page.startsWith("/users")) {
    presenceData.details = "Bir profil görüntülüyor:";
    presenceData.state = 
      document.querySelector("body > div > center > div > div > div.topSectionNormal-2-vo2m > header > div.headerInfo-30uryT > div.nameTag-2IFDfL.userSelectText-1o1dQ7.nameTag-m8r81H > span")
        .textContent +
      " " +
      "adlı kullanıcının profilini görüntülüyor!";
    presenceData.startTimestamp = browsingStamp;
  } else if (page.toLowerCase() === "/kategori/js") {
    presenceData.details = "Bir kategori görüntülüyor:";
    presenceData.state = "Javascript";
    presenceData.startTimestamp = browsingStamp;
  } else if (page.toLowerCase() === "/kategori/html") {
    presenceData.details = "Bir kategori görüntülüyor:";
    presenceData.state = "HTML";
    presenceData.startTimestamp = browsingStamp;
  } else if (page.toLowerCase() === "/kategori/py") {
    presenceData.details = "Bir kategori görüntülüyor:";
    presenceData.state = "Python";
    presenceData.startTimestamp = browsingStamp;
  } else if (page.toLowerCase() === "/kategori/diger") {
    presenceData.details = "Bir kategori görüntülüyor:";
    presenceData.state = "Diğer";
    presenceData.startTimestamp = browsingStamp;
  } else if (page.toLowerCase() === "/kategori/jsplus") {
    presenceData.details = "Bir kategori görüntülüyor:";
    presenceData.state = "Javascript+";
    presenceData.startTimestamp = browsingStamp;
  } else if (page.toLowerCase() === "/kategori/altyapi") {
    presenceData.details = "Bir kategori görüntülüyor:";
    presenceData.state = "Altyapılar";
    presenceData.startTimestamp = browsingStamp;
  } else if (page.toLowerCase() === "/kategori/booster") {
    presenceData.details = "Bir kategori görüntülüyor:";
    presenceData.state = "Booster";
    presenceData.startTimestamp = browsingStamp;
  }
  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
