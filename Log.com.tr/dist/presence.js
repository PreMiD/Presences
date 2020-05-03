const presence = new Presence({
  clientId: "657615662537244673"
});

presence.on("UpdateData", () => {
  const page = document.location.pathname;
  const browsingStamp = Math.floor(Date.now() / 1000);

  var presenceData = {
    largeImageKey: "log-logo",
    startTimestamp: browsingStamp
  };

  if (page.length == 1) {
    presenceData.details = "Ana Sayfa";
    presenceData.state = "Haberlere göz atıyor...";
  }

  if (document.getElementsByClassName("entry-title").length > 0) {
    // Reading an article
    let title = document.getElementsByClassName("entry-title")[0];
    presenceData.details = "Bir haber okuyor...";
    presenceData.state = title ? title.textContent : "Bilinmeyen";
  }

  if (page.includes("/page")) {
    let pagenum = parseInt(document.location.pathname.split("/")[2]);
    presenceData.details = "Ana Sayfa";
    presenceData.state = "Sayfa: " + pagenum;
  }
  if (page.includes("/asfalt")) makeCategoryRPC("Asfalt");
  if (page.includes("/teknoloji-haberleri")) makeCategoryRPC("Teknoloji");
  if (page.includes("/radar")) makeCategoryRPC("Radar");
  if (page.includes("/play")) makeCategoryRPC("Play");
  if (page.includes("/dosya-konusu")) makeCategoryRPC("Dosya");
  if (page.includes("/uygulama-rehberi")) makeCategoryRPC("Uygulama Rehberi");
  if (page.includes("/nasil-yapilir")) makeCategoryRPC("Nasıl yapılır?");
  if (page.includes("/test")) makeCategoryRPC("Test");
  if (page.includes("/etiket")) {
    let tag = document.querySelector(
      "body > div.container > div.grid12.first.breadcrumbs.borderTop.borderBottom.marginBottom.padding > h1"
    );
    presenceData.details = "Bir etiket görüntülüyor:";
    presenceData.state = tag ? tag.textContent : "Bilinmeyen";
  }

  function makeCategoryRPC(title) {
    presenceData.details = "Bir kategoriye göz atıyor:";
    presenceData.state = title;
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity({ largeImageKey: "log-logo" });
  } else {
    presence.setActivity(presenceData);
  }
});
