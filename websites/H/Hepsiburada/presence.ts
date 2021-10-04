const presence = new Presence({
    clientId: "629650221634158592"
  }),
  pages: {
    [name: string]: string;
  } = {
    "/siparislerim": "Siparişlerim",
    "/hesabim": "Hesabım",
    "/ayagina-gelsin/teslimat-adreslerim": "Teslimat Adreslerim",
    "/ayagina-gelsin/fatura-adreslerim": "Fatura Adreslerim",
    "/ayagina-gelsin/hediye-ceklerim": "Hedi Çeklerim",
    "/yorumlarim": "Yorumlarım",
    "/mesajlarim": "Müşteri Hizmetleri Mesajlarım",
    "/ayagina-gelsin/sepetim": "Sepet",
    "/gunun-firsati-teklifi": "Günün Fırsatları",
    "/hepsiglobal": "Yurt Dışı Alışveriş (Hepsiglobal)",
    "/kampanyalar": "Kampanyalar",
    "/girisimci-kadinlar": "Girişimci Kadınlar",
    "/yardim": "Yardım & Destek",
    "/hesabim/bize-sorun": "Bize Sorun"
  };

presence.on("UpdateData", async () => {
  const page = document.location.pathname,
    productName = document.querySelector("#product-name"),
    attr = document.querySelector("#offering-price").attributes as unknown as {
      [name: string]: HTMLElement;
    },
    price =
      (document.querySelector("#offering-price") as HTMLElement) &&
      attr.content &&
      attr.content.textContent !== ""
        ? attr.content.textContent
        : null,
    seller = document.querySelector(
      "#productResult > div > div > div > div.col.lg-1.md-1.sm-1.filter-content > section > div > div.title-wrapper.with-bg.for-desktop.brand > h1"
    ) as HTMLElement,
    data: PresenceData = {
      largeImageKey: "hb-logo",
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
  } else if (page.includes("/ara")) {
    data.details = "Bir şey arıyor:";
    data.state =
      document.title && document.title.includes(" - Hepsiburada")
        ? document.title.replace(" - Hepsiburada", "")
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
