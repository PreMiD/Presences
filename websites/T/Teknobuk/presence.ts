const presence = new Presence({
  clientId: "658192386899312651"
});
let presenceData: presenceData;

function makeRPC(title, category): void {
  if (category == "kategori") {
    presenceData.details = "Bir kategoriye göz atıyor:";
    presenceData.state = title;
  } else if (category == "etiket") {
    presenceData.details = "Bir etikete göz atıyor:";
    presenceData.state = title;
  } else if (category == "author") {
    presenceData.details = "Bir yazara göz atıyor:";
    presenceData.state = title;
  }
}

presence.on("UpdateData", () => {
  const page = document.location.pathname;
  const browsingStamp = Math.floor(Date.now() / 1000);
  var pageray = [
    "/kategori",
    "/author",
    "/ara",
    "/page",
    "/",
    "",
    "/wp-login",
    "/wp-admin",
    "/etiket"
  ];
  presenceData = {
    largeImageKey: "buk-logo",
    startTimestamp: browsingStamp
  };

  // Homepage
  if (page.length <= 1 || page.startsWith("/page")) {
    presenceData.details = "Ana Sayfa";
    presenceData.state = "Haberlere göz atıyor...";
  }

  // Reading an article
  if (
    document.getElementsByClassName("entry-title").length == 1 &&
    pageray.some((pagey) => !page.includes(pagey))
  ) {
    const title = document.getElementsByClassName("entry-title")[0];
    presenceData.details = "Bir haber okuyor...";
    presenceData.state = title ? title.textContent : "Bilinmeyen";
  }

  if (page.startsWith("/kategori") && page !== "/kategori") {
    const category = document.querySelector("#blog-entries > header > h1")
      ? document
          .querySelector("#blog-entries > header > h1")
          .textContent.substring(10)
      : "Bilinmeyen";
    makeRPC(category, "kategori");
  }

  if (page.startsWith("/etiket") && page !== "/etiket") {
    let category = document.querySelector("#blog-entries > header > h1")
      ? document
          .querySelector("#blog-entries > header > h1")
          .textContent.substring(8)
      : "Bilinmeyen";
    category = category.charAt(0).toUpperCase() + category.substring(1);
    makeRPC(category, "etiket");
  }

  if (page.startsWith("/author")) {
    const author = document.querySelector("#blog-entries > header > h1 > span");
    const authort = author ? author.textContent : "Bilinmeyen";
    makeRPC(authort, "author");
  }

  if (page.startsWith("/ara")) {
    presenceData.details = "Arama bölümünde...";
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity({
      largeImageKey: "buk-logo",
      details: "Bilinmeyen bir sayfada..."
    });
  } else {
    presence.setActivity(presenceData);
  }
});
