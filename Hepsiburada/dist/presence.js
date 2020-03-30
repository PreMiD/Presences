const presence = new Presence({
    clientId: "629650221634158592"
}), pages = {
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
    const page = document.location.pathname, productName = document.querySelector("#product-name"), price = document.querySelector("#offering-price") &&
        document.querySelector("#offering-price").attributes["content"] &&
        document.querySelector("#offering-price").attributes["content"]
            .textContent != ""
        ? document.querySelector("#offering-price").attributes["content"]
            .textContent
        : null, seller = document.querySelector("#productResult > div > div > div > div.col.lg-1.md-1.sm-1.filter-content > section > div > div.title-wrapper.with-bg.for-desktop.brand > h1");
    let data = {
        largeImageKey: "hb-logo",
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
    else if (page.includes("/ara")) {
        data.details = "Bir şey arıyor:";
        data.state =
            document.title && document.title.includes(" - Hepsiburada")
                ? document.title.replace(" - Hepsiburada", "")
                : "";
        data.smallImageKey = "search";
    }
    else if (seller && seller.textContent != "") {
        data.details = "Bir mağazaya göz atıyor:";
        data.state = seller.textContent.trim();
    }
    else {
        data.details = "Bir sayfaya göz atıyor:";
        data.state = "Ana Sayfa";
    }
    if (data.details && data.state && data.details != "" && data.state != "")
        presence.setActivity(data);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUM1QixRQUFRLEVBQUUsb0JBQW9CO0NBQzlCLENBQUMsRUFDRixLQUFLLEdBQUc7SUFDUCxlQUFlLEVBQUUsY0FBYztJQUMvQixVQUFVLEVBQUUsU0FBUztJQUNyQixxQ0FBcUMsRUFBRSxxQkFBcUI7SUFDNUQsbUNBQW1DLEVBQUUsbUJBQW1CO0lBQ3hELGlDQUFpQyxFQUFFLGVBQWU7SUFDbEQsYUFBYSxFQUFFLFlBQVk7SUFDM0IsYUFBYSxFQUFFLCtCQUErQjtJQUM5Qyx5QkFBeUIsRUFBRSxPQUFPO0lBQ2xDLHdCQUF3QixFQUFFLGtCQUFrQjtJQUM1QyxjQUFjLEVBQUUsbUNBQW1DO0lBQ25ELGNBQWMsRUFBRSxhQUFhO0lBQzdCLHFCQUFxQixFQUFFLG9CQUFvQjtJQUMzQyxTQUFTLEVBQUUsaUJBQWlCO0lBQzVCLHFCQUFxQixFQUFFLFlBQVk7Q0FDbkMsQ0FBQztBQUVILFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBQ3BDLE1BQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUN0QyxXQUFXLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxlQUFlLENBQUMsRUFDckQsS0FBSyxHQUNILFFBQVEsQ0FBQyxhQUFhLENBQUMsaUJBQWlCLENBQWlCO1FBQzFELFFBQVEsQ0FBQyxhQUFhLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDO1FBQy9ELFFBQVEsQ0FBQyxhQUFhLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDO2FBQzdELFdBQVcsSUFBSSxFQUFFO1FBQ2xCLENBQUMsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLGlCQUFpQixDQUFDLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQzthQUM5RCxXQUFXO1FBQ2QsQ0FBQyxDQUFDLElBQUksRUFDUixNQUFNLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FDOUIsNklBQTZJLENBQzlILENBQUM7SUFFbEIsSUFBSSxJQUFJLEdBQXlCO1FBQ2hDLGFBQWEsRUFBRSxTQUFTO1FBQ3hCLGNBQWMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUM7S0FDN0MsQ0FBQztJQUVGLElBQUksV0FBVyxJQUFJLFdBQVcsQ0FBQyxXQUFXLElBQUksRUFBRSxFQUFFO1FBQ2pELElBQUksQ0FBQyxPQUFPLEdBQUcsdUJBQXVCLENBQUM7UUFDdkMsSUFBSSxDQUFDLEtBQUssR0FBRyxHQUFHLFdBQVcsQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLEdBQzdDLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLEtBQUssR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQ2pDLEVBQUUsQ0FBQztLQUNIO1NBQU0sSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTtRQUNuRCxJQUFJLENBQUMsT0FBTyxHQUFHLHlCQUF5QixDQUFDO1FBQ3pDLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDckQ7U0FBTSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEVBQUU7UUFDakMsSUFBSSxDQUFDLE9BQU8sR0FBRyxpQkFBaUIsQ0FBQztRQUNqQyxJQUFJLENBQUMsS0FBSztZQUNULFFBQVEsQ0FBQyxLQUFLLElBQUksUUFBUSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUM7Z0JBQzFELENBQUMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBRSxFQUFFLENBQUM7Z0JBQzlDLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFDUCxJQUFJLENBQUMsYUFBYSxHQUFHLFFBQVEsQ0FBQztLQUM5QjtTQUFNLElBQUksTUFBTSxJQUFJLE1BQU0sQ0FBQyxXQUFXLElBQUksRUFBRSxFQUFFO1FBQzlDLElBQUksQ0FBQyxPQUFPLEdBQUcsMEJBQTBCLENBQUM7UUFDMUMsSUFBSSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxDQUFDO0tBQ3ZDO1NBQU07UUFDTixJQUFJLENBQUMsT0FBTyxHQUFHLHlCQUF5QixDQUFDO1FBQ3pDLElBQUksQ0FBQyxLQUFLLEdBQUcsV0FBVyxDQUFDO0tBQ3pCO0lBRUQsSUFBSSxJQUFJLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLE9BQU8sSUFBSSxFQUFFLElBQUksSUFBSSxDQUFDLEtBQUssSUFBSSxFQUFFO1FBQ3ZFLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDN0IsQ0FBQyxDQUFDLENBQUMifQ==