const presence = new Presence({
    clientId: "632914600949710868"
}), pages = {
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
    const page = document.location.pathname, productName = document.querySelector("#sp-title") ||
        document.querySelector("#ProductTitle > div.h1-container > h1 > span.title"), price = document.querySelector(".lastPrice") ||
        document.querySelector("#col-center > div > div.border-e3e3e3 > ul.table-ul.gray-content.border-top-e3e3e3 > li.row-li.product-detail-product-price-info-ab-variant > ul > li.col-li.gg-w-17.gg-d-17.gg-t-16.gg-m-16.posr > div:nth-child(2) > div > div.low-price.extra-price.all-price.robotobold.clear.pl8.pt5"), seller = document.querySelector("#store-page-title > div.store-name > h1");
    const data = {
        largeImageKey: "gg-logo",
        startTimestamp: Math.floor(Date.now() / 1000)
    };
    if (productName && productName.textContent != "") {
        data.details = "Bir ürüne göz atıyor:";
        data.state = `${productName.textContent}${price ? " - " + price.textContent.trim() : ""}`;
    }
    else if (pages[page] || pages[page.slice(0, -1)]) {
        data.details = "Bir sayfaya göz atıyor:";
        data.state = pages[page] || pages[page.slice(0, -1)];
    }
    else if (page.includes("/arama")) {
        data.details = "Bir şey arıyor:";
        data.state =
            document.title && document.title.includes(" - GittiGidiyor")
                ? document.title.replace(" - GittiGidiyor", "")
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsRUFDRixLQUFLLEdBQUc7SUFDTixtQkFBbUIsRUFBRSxrQkFBa0I7SUFDdkMsa0JBQWtCLEVBQUUsaUJBQWlCO0lBQ3JDLFFBQVEsRUFBRSxPQUFPO0lBQ2pCLHFCQUFxQixFQUFFLHFCQUFxQjtJQUM1QyxpQ0FBaUMsRUFBRSxlQUFlO0lBQ2xELGdDQUFnQyxFQUFFLGNBQWM7SUFDaEQsMkJBQTJCLEVBQUUsa0JBQWtCO0lBQy9DLDBCQUEwQixFQUFFLFlBQVk7SUFDeEMsdUJBQXVCLEVBQUUsY0FBYztJQUN2Qyx1QkFBdUIsRUFBRSxZQUFZO0lBQ3JDLDJCQUEyQixFQUFFLGFBQWE7SUFDMUMsaUNBQWlDLEVBQUUsbUJBQW1CO0lBQ3RELDBCQUEwQixFQUFFLG9CQUFvQjtJQUNoRCx5QkFBeUIsRUFBRSxZQUFZO0lBQ3ZDLDJCQUEyQixFQUFFLGdCQUFnQjtJQUM3QyxVQUFVLEVBQUUsU0FBUztDQUN0QixDQUFDO0FBRUosUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsS0FBSyxJQUFJLEVBQUU7SUFDbkMsTUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQ3JDLFdBQVcsR0FDUixRQUFRLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBaUI7UUFDbkQsUUFBUSxDQUFDLGFBQWEsQ0FDckIsb0RBQW9ELENBQ3JDLEVBQ25CLEtBQUssR0FDRixRQUFRLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBaUI7UUFDcEQsUUFBUSxDQUFDLGFBQWEsQ0FDckIsMlJBQTJSLENBQzVRLEVBQ25CLE1BQU0sR0FDSixRQUFRLENBQUMsYUFBYSxDQUFDLHlDQUF5QyxDQUNyRCxDQUFDO0lBRWhCLE1BQU0sSUFBSSxHQUF5QjtRQUNqQyxhQUFhLEVBQUUsU0FBUztRQUN4QixjQUFjLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDO0tBQzlDLENBQUM7SUFFRixJQUFJLFdBQVcsSUFBSSxXQUFXLENBQUMsV0FBVyxJQUFJLEVBQUUsRUFBRTtRQUNoRCxJQUFJLENBQUMsT0FBTyxHQUFHLHVCQUF1QixDQUFDO1FBQ3ZDLElBQUksQ0FBQyxLQUFLLEdBQUcsR0FBRyxXQUFXLENBQUMsV0FBVyxHQUNyQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUM3QyxFQUFFLENBQUM7S0FDSjtTQUFNLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7UUFFbEQsSUFBSSxDQUFDLE9BQU8sR0FBRyx5QkFBeUIsQ0FBQztRQUN6QyxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ3REO1NBQU0sSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1FBQ2xDLElBQUksQ0FBQyxPQUFPLEdBQUcsaUJBQWlCLENBQUM7UUFDakMsSUFBSSxDQUFDLEtBQUs7WUFDUixRQUFRLENBQUMsS0FBSyxJQUFJLFFBQVEsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLGlCQUFpQixDQUFDO2dCQUMxRCxDQUFDLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsaUJBQWlCLEVBQUUsRUFBRSxDQUFDO2dCQUMvQyxDQUFDLENBQUMsRUFBRSxDQUFDO1FBQ1QsSUFBSSxDQUFDLGFBQWEsR0FBRyxRQUFRLENBQUM7S0FDL0I7U0FBTSxJQUFJLE1BQU0sSUFBSSxNQUFNLENBQUMsV0FBVyxJQUFJLEVBQUUsRUFBRTtRQUM3QyxJQUFJLENBQUMsT0FBTyxHQUFHLDBCQUEwQixDQUFDO1FBQzFDLElBQUksQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztLQUN4QztTQUFNO1FBQ0wsSUFBSSxDQUFDLE9BQU8sR0FBRyx5QkFBeUIsQ0FBQztRQUN6QyxJQUFJLENBQUMsS0FBSyxHQUFHLFdBQVcsQ0FBQztLQUMxQjtJQUVELElBQUksSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxPQUFPLElBQUksRUFBRSxJQUFJLElBQUksQ0FBQyxLQUFLLElBQUksRUFBRTtRQUN0RSxRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQy9CLENBQUMsQ0FBQyxDQUFDIn0=