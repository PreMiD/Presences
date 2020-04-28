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
    const data = {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsRUFDRixLQUFLLEdBQUc7SUFDTixlQUFlLEVBQUUsY0FBYztJQUMvQixVQUFVLEVBQUUsU0FBUztJQUNyQixxQ0FBcUMsRUFBRSxxQkFBcUI7SUFDNUQsbUNBQW1DLEVBQUUsbUJBQW1CO0lBQ3hELGlDQUFpQyxFQUFFLGVBQWU7SUFDbEQsYUFBYSxFQUFFLFlBQVk7SUFDM0IsYUFBYSxFQUFFLCtCQUErQjtJQUM5Qyx5QkFBeUIsRUFBRSxPQUFPO0lBQ2xDLHdCQUF3QixFQUFFLGtCQUFrQjtJQUM1QyxjQUFjLEVBQUUsbUNBQW1DO0lBQ25ELGNBQWMsRUFBRSxhQUFhO0lBQzdCLHFCQUFxQixFQUFFLG9CQUFvQjtJQUMzQyxTQUFTLEVBQUUsaUJBQWlCO0lBQzVCLHFCQUFxQixFQUFFLFlBQVk7Q0FDcEMsQ0FBQztBQUVKLFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBQ25DLE1BQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUNyQyxXQUFXLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxlQUFlLENBQUMsRUFDckQsS0FBSyxHQUNGLFFBQVEsQ0FBQyxhQUFhLENBQUMsaUJBQWlCLENBQWlCO1FBQzFELFFBQVEsQ0FBQyxhQUFhLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDO1FBQy9ELFFBQVEsQ0FBQyxhQUFhLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDO2FBQzVELFdBQVcsSUFBSSxFQUFFO1FBQ2xCLENBQUMsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLGlCQUFpQixDQUFDLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQzthQUM1RCxXQUFXO1FBQ2hCLENBQUMsQ0FBQyxJQUFJLEVBQ1YsTUFBTSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQzdCLDZJQUE2SSxDQUMvSCxDQUFDO0lBRW5CLE1BQU0sSUFBSSxHQUF5QjtRQUNqQyxhQUFhLEVBQUUsU0FBUztRQUN4QixjQUFjLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDO0tBQzlDLENBQUM7SUFFRixJQUFJLFdBQVcsSUFBSSxXQUFXLENBQUMsV0FBVyxJQUFJLEVBQUUsRUFBRTtRQUNoRCxJQUFJLENBQUMsT0FBTyxHQUFHLHVCQUF1QixDQUFDO1FBQ3ZDLElBQUksQ0FBQyxLQUFLLEdBQUcsR0FBRyxXQUFXLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxHQUM1QyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxLQUFLLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUNsQyxFQUFFLENBQUM7S0FDSjtTQUFNLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7UUFDbEQsSUFBSSxDQUFDLE9BQU8sR0FBRyx5QkFBeUIsQ0FBQztRQUN6QyxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ3REO1NBQU0sSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFFO1FBQ2hDLElBQUksQ0FBQyxPQUFPLEdBQUcsaUJBQWlCLENBQUM7UUFDakMsSUFBSSxDQUFDLEtBQUs7WUFDUixRQUFRLENBQUMsS0FBSyxJQUFJLFFBQVEsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDO2dCQUN6RCxDQUFDLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLEVBQUUsRUFBRSxDQUFDO2dCQUM5QyxDQUFDLENBQUMsRUFBRSxDQUFDO1FBQ1QsSUFBSSxDQUFDLGFBQWEsR0FBRyxRQUFRLENBQUM7S0FDL0I7U0FBTSxJQUFJLE1BQU0sSUFBSSxNQUFNLENBQUMsV0FBVyxJQUFJLEVBQUUsRUFBRTtRQUM3QyxJQUFJLENBQUMsT0FBTyxHQUFHLDBCQUEwQixDQUFDO1FBQzFDLElBQUksQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztLQUN4QztTQUFNO1FBQ0wsSUFBSSxDQUFDLE9BQU8sR0FBRyx5QkFBeUIsQ0FBQztRQUN6QyxJQUFJLENBQUMsS0FBSyxHQUFHLFdBQVcsQ0FBQztLQUMxQjtJQUVELElBQUksSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxPQUFPLElBQUksRUFBRSxJQUFJLElBQUksQ0FBQyxLQUFLLElBQUksRUFBRTtRQUN0RSxRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQy9CLENBQUMsQ0FBQyxDQUFDIn0=