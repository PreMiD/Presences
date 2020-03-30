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
    let data = {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUM1QixRQUFRLEVBQUUsb0JBQW9CO0NBQzlCLENBQUMsRUFDRixLQUFLLEdBQUc7SUFDUCx1QkFBdUIsRUFBRSxjQUFjO0lBQ3ZDLDZCQUE2QixFQUFFLHdCQUF3QjtJQUN2RCxxQkFBcUIsRUFBRSxZQUFZO0lBQ25DLHFCQUFxQixFQUFFLFlBQVk7SUFDbkMsa0JBQWtCLEVBQUUsU0FBUztJQUM3QiwyQkFBMkIsRUFBRSwwQkFBMEI7SUFDdkQsbUNBQW1DLEVBQUUsWUFBWTtJQUNqRCxxQkFBcUIsRUFBRSxjQUFjO0lBQ3JDLDJCQUEyQixFQUFFLG1CQUFtQjtJQUNoRCwwQkFBMEIsRUFBRSxZQUFZO0lBQ3hDLHlCQUF5QixFQUFFLGdCQUFnQjtJQUMzQyx3QkFBd0IsRUFBRSxlQUFlO0lBQ3pDLGtCQUFrQixFQUFFLE9BQU87SUFDM0IsVUFBVSxFQUFFLE9BQU87SUFDbkIsU0FBUyxFQUFFLGdCQUFnQjtJQUMzQixXQUFXLEVBQUUsVUFBVTtDQUN2QixDQUFDO0FBQ0gsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsS0FBSyxJQUFJLEVBQUU7SUFDcEMsTUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQ3RDLFdBQVcsR0FDVCxRQUFRLENBQUMsYUFBYSxDQUN0Qiw0RkFBNEYsQ0FDNUU7UUFDaEIsUUFBUSxDQUFDLGFBQWEsQ0FDdEIscUpBQXFKLENBQ3JJO1FBQ2hCLFFBQVEsQ0FBQyxhQUFhLENBQ3RCLG1JQUFtSSxDQUNuSCxFQUNsQixLQUFLLEdBQ0gsUUFBUSxDQUFDLGFBQWEsQ0FDdEIsMkhBQTJILENBQ25IO1FBQ1QsUUFBUSxDQUFDLGFBQWEsQ0FDckIsMkhBQTJILENBQzNILENBQUMsVUFBVSxDQUFDLFNB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