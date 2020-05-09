const presence = new Presence({
    clientId: "629588152679399424"
}), pages = {
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
    const page = document.location.pathname, productName = document.querySelector("#contentProDetail > div > div.proDetailArea > div.proDetail > div.proNameHolder > div > h1") ||
        document.querySelector("#unf-p-id > div > div.unf-p-cvr > div.unf-p-left.proDetailArea > div.unf-p-lBox > div.unf-p-detail > div.unf-p-title > div.proNameHolder > div > h1") ||
        document.querySelector("#contentProDetail > div.container.product-detail-container > section.box-view.pro-detail-part > div.pro-prop > div.pro-title > h1"), price = document.querySelector("#contentProDetail > div > div.proDetailArea > div.proDetail > div.paymentDetail > div.price-cover > div > div > div > ins") &&
        document.querySelector("#contentProDetail > div > div.proDetailArea > div.proDetail > div.paymentDetail > div.price-cover > div > div > div > ins").attributes["content"]
        ? document.querySelector("#contentProDetail > div > div.proDetailArea > div.proDetail > div.paymentDetail > div.price-cover > div > div > div > ins").attributes["content"].textContent
        : null;
    const data = {
        largeImageKey: "n11-logo",
        startTimestamp: Math.floor(Date.now() / 1000)
    };
    if (productName && productName.textContent != "") {
        data.details = "Bir ürüne göz atıyor:";
        data.state = `${productName.textContent.trim()}${price ? " - " + price + " TL" : ""}`;
    }
    else if (pages[page] || pages[page.slice(0, -1)]) {
        data.details = "Bir sayfaya göz atıyor:";
        data.state = pages[page] || pages[page.slice(0, -1)];
    }
    else if (page.includes("/arama") &&
        document.location.search != "?s=GOB2CGlobal") {
        data.details = "Bir şey arıyor:";
        data.state =
            document.title && document.title.includes(" - n11.com")
                ? document.title.replace(" - n11.com", "")
                : "";
        data.smallImageKey = "search";
    }
    else if (document.location.search == "?s=GOB2CGlobal") {
        data.details = "Bir sayfaya göz atıyor:";
        data.state = "Yurt Dışından Ürünler";
    }
    else if (page.includes("/magaza/")) {
        data.details = "Bir mağazaya göz atıyor:";
        data.state = document.querySelector("#contentSellerShop > div > section.shopHeader > div.sellerInfo > div.sellerDetail > div.title > h1")
            ? document.querySelector("#contentSellerShop > div > section.shopHeader > div.sellerInfo > div.sellerDetail > div.title > h1").textContent
            : "Belirsiz";
    }
    else {
        data.details = "Bir sayfaya göz atıyor:";
        data.state = "Ana Sayfa";
    }
    if (data.details && data.state && data.details != "" && data.state != "")
        presence.setActivity(data);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsRUFDRixLQUFLLEdBQUc7SUFDTix1QkFBdUIsRUFBRSxjQUFjO0lBQ3ZDLDZCQUE2QixFQUFFLHdCQUF3QjtJQUN2RCxxQkFBcUIsRUFBRSxZQUFZO0lBQ25DLHFCQUFxQixFQUFFLFlBQVk7SUFDbkMsa0JBQWtCLEVBQUUsU0FBUztJQUM3QiwyQkFBMkIsRUFBRSwwQkFBMEI7SUFDdkQsbUNBQW1DLEVBQUUsWUFBWTtJQUNqRCxxQkFBcUIsRUFBRSxjQUFjO0lBQ3JDLDJCQUEyQixFQUFFLG1CQUFtQjtJQUNoRCwwQkFBMEIsRUFBRSxZQUFZO0lBQ3hDLHlCQUF5QixFQUFFLGdCQUFnQjtJQUMzQyx3QkFBd0IsRUFBRSxlQUFlO0lBQ3pDLGtCQUFrQixFQUFFLE9BQU87SUFDM0IsVUFBVSxFQUFFLE9BQU87SUFDbkIsU0FBUyxFQUFFLGdCQUFnQjtJQUMzQixXQUFXLEVBQUUsVUFBVTtDQUN4QixDQUFDO0FBQ0osUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsS0FBSyxJQUFJLEVBQUU7SUFDbkMsTUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQ3JDLFdBQVcsR0FDUixRQUFRLENBQUMsYUFBYSxDQUNyQiw0RkFBNEYsQ0FDN0U7UUFDaEIsUUFBUSxDQUFDLGFBQWEsQ0FDckIscUpBQXFKLENBQ3RJO1FBQ2hCLFFBQVEsQ0FBQyxhQUFhLENBQ3JCLG1JQUFtSSxDQUNwSCxFQUNuQixLQUFLLEdBQ0YsUUFBUSxDQUFDLGFBQWEsQ0FDckIsMkhBQTJILENBQ3BIO1FBQ1QsUUFBUSxDQUFDLGFBQWEsQ0FDcEIsMkhBQTJILENBQzVILENBQUMsVUFBVSxDQUFDLFNB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