const presence = new Presence({
    clientId: "629588152679399424"
  }),
  pages: {
    [name: string]: string;
  } = {
    "/hesabim/siparislerim": "Siparişlerim",
    "/hesabim/iptal-degisim-iade": "İptal, Değişim ve İade",
    "/hesabim/biletlerim": "Biletlerim",
    "/hesabim/kuponlarim": "Kuponlarım",
    "/hesabim/garajim": "Garajım",
    "/hesabim/istek-listelerim": "Favorilerim / Listelerim",
    "/hesabim/yorumlarim-incelemelerim": "Yorumlarım",
    "/hesabim/soru-cevap": "Soru & Cevap",
    "/hesabim/bilgi-guncelleme": "Üyelik Bilgilerim",
    "/hesabim/teslimat-adresi": "Adreslerim",
    "/hesabim/sifre-degistir": "Şifre Değiştir",
    "/hesabim/uyelik-iptali": "Üyelik İptali",
    "/hesabim/sepetim": "Sepet",
    "/sepetim": "Sepet",
    "/moda11": "Moda11 (giybi)",
    "/market11": "Market11"
  };
presence.on("UpdateData", async () => {
  const page = document.location.pathname,
    productName =
      (document.querySelector(
        "#contentProDetail > div > div.proDetailArea > div.proDetail > div.proNameHolder > div > h1"
      ) as HTMLElement) ||
      (document.querySelector(
        "#unf-p-id > div > div.unf-p-cvr > div.unf-p-left.proDetailArea > div.unf-p-lBox > div.unf-p-detail > div.unf-p-title > div.proNameHolder > div > h1"
      ) as HTMLElement) ||
      (document.querySelector(
        "#contentProDetail > div.container.product-detail-container > section.box-view.pro-detail-part > div.pro-prop > div.pro-title > h1"
      ) as HTMLElement),
    price =
      document.querySelector(
        "#contentProDetail > div > div.proDetailArea > div.proDetail > div.paymentDetail > div.price-cover > div > div > div > ins"
      ) &&
      (
        document.querySelector(
          "#contentProDetail > div > div.proDetailArea > div.proDetail > div.paymentDetail > div.price-cover > div > div > div > ins"
        ).attributes as unknown as { [name: string]: string }
      ).content
        ? (
            (
              document.querySelector(
                "#contentProDetail > div > div.proDetailArea > div.proDetail > div.paymentDetail > div.price-cover > div > div > div > ins"
              ).attributes as unknown as { [name: string]: string }
            ).content as Element
          ).textContent
        : null,
    data: PresenceData = {
      largeImageKey: "n11-logo",
      startTimestamp: Math.floor(Date.now() / 1000)
    };

  if (productName && productName.textContent !== "") {
    data.details = "Bir ürüne göz atıyor:";
    data.state = `${productName.textContent.trim()}${
      price ? ` - ${price} TL` : ""
    }`;
  } else if (pages[page] || pages[page.slice(0, -1)]) {
    data.details = "Bir sayfaya göz atıyor:";
    data.state = pages[page] || pages[page.slice(0, -1)];
  } else if (
    page.includes("/arama") &&
    document.location.search !== "?s=GOB2CGlobal"
  ) {
    data.details = "Bir şey arıyor:";
    data.state =
      document.title && document.title.includes(" - n11.com")
        ? document.title.replace(" - n11.com", "")
        : "";
    data.smallImageKey = "search";
  } else if (document.location.search === "?s=GOB2CGlobal") {
    data.details = "Bir sayfaya göz atıyor:";
    data.state = "Yurt Dışından Ürünler";
  } else if (page.includes("/magaza/")) {
    data.details = "Bir mağazaya göz atıyor:";
    data.state = document.querySelector(
      "#contentSellerShop > div > section.shopHeader > div.sellerInfo > div.sellerDetail > div.title > h1"
    )
      ? document.querySelector(
          "#contentSellerShop > div > section.shopHeader > div.sellerInfo > div.sellerDetail > div.title > h1"
        ).textContent
      : "Belirsiz";
  } else {
    data.details = "Bir sayfaya göz atıyor:";
    data.state = "Ana Sayfa";
  }

  if (data.details && data.state) presence.setActivity(data);
});
