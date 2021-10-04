const presence = new Presence({
    clientId: "632914600949710868"
  }),
  pages: { [page: string]: string } = {
    "/yildiz-firsatlar": "Yıldız Fırsatlar",
    "/tum-kampanyalar": "Tüm Kampanyalar",
    "/cadde": "Cadde",
    "/nasil-iade-yapilir": "Nasıl İade Yapılır?",
    "/ayagina-gelsin/hediye-ceklerim": "Hedi Çeklerim",
    "/BanaOzel/satin-aldiklarim.php": "Siparişlerim",
    "/BanaOzel/sattiklarim.php": "Sattığım Ürünler",
    "/BanaOzel/satislarim.php": "Satışlarım",
    "/hesabim/izlediklerim": "İzlediklerim",
    "/bana-ozel/mesajlarim": "Mesajlarım",
    "/BanaOzel/favorilerim.php": "Favorilerim",
    "/BanaOzel/performans_raporu.php": "Performans Raporu",
    "/BanaOzel/hesaplarim.php": "Hesap Hareketlerim",
    "/BanaOzel/ayarlarim.php": "Bilgilerim",
    "/bana-ozel/promosyonlarim": "Promosyonlarım",
    "/sepetim": "Sepetim"
  };

presence.on("UpdateData", async () => {
  const page = document.location.pathname,
    productName =
      (document.querySelector("#sp-title") as HTMLElement) ||
      (document.querySelector(
        "#ProductTitle > div.h1-container > h1 > span.title"
      ) as HTMLElement),
    price =
      (document.querySelector(".lastPrice") as HTMLElement) ||
      (document.querySelector(
        "#col-center > div > div.border-e3e3e3 > ul.table-ul.gray-content.border-top-e3e3e3 > li.row-li.product-detail-product-price-info-ab-variant > ul > li.col-li.gg-w-17.gg-d-17.gg-t-16.gg-m-16.posr > div:nth-child(2) > div > div.low-price.extra-price.all-price.robotobold.clear.pl8.pt5"
      ) as HTMLElement),
    seller = document.querySelector(
      "#store-page-title > div.store-name > h1"
    ) as HTMLElement,
    data: { [k: string]: string | number } = {
      largeImageKey: "gg-logo",
      startTimestamp: Math.floor(Date.now() / 1000)
    };

  if (productName && productName.textContent !== "") {
    data.details = "Bir ürüne göz atıyor:";
    data.state = `${productName.textContent}${
      price ? ` - ${price.textContent.trim()}` : ""
    }`;
  } else if (pages[page] || pages[page.slice(0, -1)]) {
    // We are using slice(0, -1) here to slice the last "/" and check if there's a record on pages variable.
    data.details = "Bir sayfaya göz atıyor:";
    data.state = pages[page] || pages[page.slice(0, -1)];
  } else if (page.includes("/arama")) {
    data.details = "Bir şey arıyor:";
    data.state =
      document.title && document.title.includes(" - GittiGidiyor")
        ? document.title.replace(" - GittiGidiyor", "")
        : "";
    data.smallImageKey = "search";
  } else if (seller && seller.textContent !== "") {
    data.details = "Bir mağazaya göz atıyor:";
    data.state = seller.textContent.trim();
  } else {
    data.details = "Bir sayfaya göz atıyor:";
    data.state = "Ana Sayfa";
  }

  if (data.details && data.state) presence.setActivity(data);
});
