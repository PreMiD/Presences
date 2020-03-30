const presence = new Presence({
    clientId: "643758670131363840"
}), pages = {
    "/butik/liste/erkek": "Erkek Giyim",
    "/butik/liste/kadin": "Kadın Giyim",
    "/butik/liste/cocuk": "Çocuk Giyim",
    "/butik/liste/ayakkabi--canta": "Ayakkabı & Çanta",
    "/butik/liste/saat--aksesuar": "Saat & Aksesuar",
    "/kozmetik": "Kozmetik",
    "/ev--yasam": "Ev & Yaşam",
    "/elektronik": "Elektronik",
    "/supermarket": "Süper Market",
    "/yardim/sorular": "Yardım & Destek",
    "/sepetim": "Sepet",
    "/bizeulasin": "Bize Ulaşın",
    "/saticibasvuru": "Satıcı Başvuru",
    "/s/kampanyalar": "Aktif Kampanyalar",
    "/s/elite": "En Trend Ürünler",
    "/login": "Giriş Yap",
    "/Hesabim": "Hesabım",
    "/Hesabim/Degerlendirmelerim": "Değerlendirmelerim",
    "/Hesabim/KullaniciBilgileri": "Kullanıcı Bilgileri",
    "/Hesabim/IndirimKuponlari": "İndirim Kuponları",
    "/Hesabim/AdresBilgileri": "Adres Bilgileri",
    "/Hesabim/KrediKartlarim": "Kredi Kartları",
    "/Hesabim/Elite": "Trendyol Elite",
    "/Hesabim/DuyuruTercihleri": "Duyuru Tercihleri",
    "/Hesabim/Favoriler": "Favoriler"
};
presence.on("UpdateData", () => async () => {
    const page = document.location.pathname, category = document.querySelector("#root > div > div:nth-child(2) > div.filter-sticky-container > div.boutique-detail-component.v-2.timer-none > ul > li.boutique-title > h1") ||
        document.querySelector("#root > div > div:nth-child(2) > div.filter-sticky-container > div.boutique-detail-component.v-2 > ul > li.boutique-title > h1"), product = document.querySelector("#product-detail-app > div > div.pr-cn > div.pr-cn-in > div.pr-in-w > div:nth-child(1) > div.pr-in-cn > h1 > a"), product2 = document.querySelector("#product-detail-app > div > div.pr-cn > div.pr-cn-in > div.pr-in-w > div:nth-child(1) > div.pr-in-cn > h1 > span"), price = document.querySelector("#product-detail-app > div > div.pr-cn > div.pr-cn-in > div.pr-in-w > div:nth-child(1) > div.pr-in-cn > div.pr-bx-w > div > span.prc-slg") ||
        document.querySelector("#product-detail-app > div > div.pr-cn > div.pr-cn-in > div.pr-in-w > div:nth-child(1) > div.pr-in-cn > div.pr-bx-w > div > span") ||
        document.querySelector("#product-detail-app > div > div.pr-cn > div.pr-cn-in > div.pr-in-w > div:nth-child(1) > div.pr-in-cn > div.pr-bx-w > div > div.pr-bx-pr-dsc > span"), searchingFor = document.querySelector("#search-app > div > div.srch-rslt-cntnt > div.srch-prdcts-cntnr > div.srch-rslt-title > div.srch-ttl-cntnr-wrppr > div > h1");
    if (page.includes("/yardim/sorular/")) {
        presence.setActivity({
            largeImageKey: "ty-logo",
            details: "Bir sayfaya göz atıyor:",
            state: "Yardım & Sorular",
            startTimestamp: Math.floor(Date.now() / 1000)
        });
    }
    else if ((page == "/tum--urunler" && document.location.search.includes("?q=")) ||
        (searchingFor && searchingFor.textContent != "")) {
        presence.setActivity({
            largeImageKey: "ty-logo",
            details: "Bir şey arıyor:",
            state: searchingFor.textContent || "Belirsiz",
            smallImageKey: "search",
            startTimestamp: Math.floor(Date.now() / 1000)
        });
    }
    else if (category && category.textContent != "") {
        presence.setActivity({
            largeImageKey: "ty-logo",
            details: "Bir kategoriye göz atıyor:",
            state: category.textContent || "Belirsiz",
            startTimestamp: Math.floor(Date.now() / 1000)
        });
    }
    else if (product &&
        product2 &&
        product.textContent != "" &&
        product2.textContent != "" &&
        price.textContent != "") {
        presence.setActivity({
            largeImageKey: "ty-logo",
            details: "Bir ürüne göz atıyor:",
            state: `${product.textContent} | ${product2.textContent} ${price && price.textContent != "" ? `(${price.textContent})` : ""}` || "Belirsiz",
            startTimestamp: Math.floor(Date.now() / 1000)
        });
    }
    else if (pages[page] || pages[page.slice(0, -1)]) {
        presence.setActivity({
            largeImageKey: "ty-logo",
            details: "Bir sayfaya göz atıyor:",
            state: pages[page] || pages[page.slice(0, -1)],
            startTimestamp: Math.floor(Date.now() / 1000)
        });
    }
    else {
        presence.setActivity({
            largeImageKey: "ty-logo",
            details: "Bir sayfaya göz atıyor:",
            state: "Ana Sayfa",
            startTimestamp: Math.floor(Date.now() / 1000)
        });
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUM1QixRQUFRLEVBQUUsb0JBQW9CO0NBQzlCLENBQUMsRUFDRixLQUFLLEdBQUc7SUFDUCxvQkFBb0IsRUFBRSxhQUFhO0lBQ25DLG9CQUFvQixFQUFFLGFBQWE7SUFDbkMsb0JBQW9CLEVBQUUsYUFBYTtJQUNuQyw4QkFBOEIsRUFBRSxrQkFBa0I7SUFDbEQsNkJBQTZCLEVBQUUsaUJBQWlCO0lBQ2hELFdBQVcsRUFBRSxVQUFVO0lBQ3ZCLFlBQVksRUFBRSxZQUFZO0lBQzFCLGFBQWEsRUFBRSxZQUFZO0lBQzNCLGNBQWMsRUFBRSxjQUFjO0lBQzlCLGlCQUFpQixFQUFFLGlCQUFpQjtJQUNwQyxVQUFVLEVBQUUsT0FBTztJQUNuQixhQUFhLEVBQUUsYUFBYTtJQUM1QixnQkFBZ0IsRUFBRSxnQkFBZ0I7SUFDbEMsZ0JBQWdCLEVBQUUsbUJBQW1CO0lBQ3JDLFVBQVUsRUFBRSxrQkFBa0I7SUFDOUIsUUFBUSxFQUFFLFdBQVc7SUFDckIsVUFBVSxFQUFFLFNBQVM7SUFDckIsNkJBQTZCLEVBQUUsb0JBQW9CO0lBQ25ELDZCQUE2QixFQUFFLHFCQUFxQjtJQUNwRCwyQkFBMkIsRUFBRSxtQkFBbUI7SUFDaEQseUJBQXlCLEVBQUUsaUJBQWlCO0lBQzVDLHlCQUF5QixFQUFFLGdCQUFnQjtJQUMzQyxnQkFBZ0IsRUFBRSxnQkFBZ0I7SUFDbEMsMkJBQTJCLEVBQUUsbUJBQW1CO0lBQ2hELG9CQUFvQixFQUFFLFdBQVc7Q0FDakMsQ0FBQztBQUVILFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEdBQUcsRUFBRSxDQUFDLEtBQUssSUFBSSxFQUFFO0lBQzFDLE1BQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUN0QyxRQUFRLEdBQ1AsUUFBUSxDQUFDLGFBQWEsQ0FDckIsMklBQTJJLENBQzNJO1FBQ0QsUUFBUSxDQUFDLGFBQWEsQ0FDckIsZ0lBQWdJLENBQ2hJLEVBQ0YsT0FBTyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQy9CLCtHQUErRyxDQUMvRyxFQUNELFFBQVEsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUNoQyxrSEFBa0gsQ0FDbEgsRUFDRCxLQUFLLEdBQ0osUUFBUSxDQUFDLGFBQWEsQ0FDckIseUlBQXlJLENBQ3pJO1FBQ0QsUUFBUSxDQUFDLGFBQWEsQ0FDckIsaUlBQWlJLENBQ2pJO1FBQ0QsUUFBUSxDQUFDLGFBQWEsQ0FDckIsb0pBQW9KLENBQ3BKLEVBQ0YsWUFBWSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQ3BDLDZIQUE2SCxDQUM3SCxDQUFDO0lBRUgsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLGtCQUFrQixDQUFDLEVBQUU7UUFDdEMsUUFBUSxDQUFDLFdBQVcsQ0FBQztZQUNwQixhQUFhLEVBQUUsU0FBUztZQUN4QixPQUFPLEVBQUUseUJBQXlCO1lBQ2xDLEtBQUssRUFBRSxrQkFBa0I7WUFDekIsY0FBYyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQztTQUM3QyxDQUFDLENBQUM7S0FDSDtTQUFNLElBQ04sQ0FBQyxJQUFJLElBQUksZUFBZSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNyRSxDQUFDLFlBQVksSUFBSSxZQUFZLENBQUMsV0FBVyxJQUFJLEVBQUUsQ0FBQyxFQUMvQztRQUNELFFBQVEsQ0FBQyxXQUFXLENBQUM7WUFDcEIsYUFBYSxFQUFFLFNBQVM7WUFDeEIsT0FBTyxFQUFFLGlCQUFpQjtZQUMxQixLQUFLLEVBQUUsWUFBWSxDQUFDLFdBQVcsSUFBSSxVQUFVO1lBQzdDLGFBQWEsRUFBRSxRQUFRO1lBQ3ZCLGNBQWMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUM7U0FDN0MsQ0FBQyxDQUFDO0tBQ0g7U0FBTSxJQUFJLFFBQVEsSUFBSSxRQUFRLENBQUMsV0FBVyxJQUFJLEVBQUUsRUFBRTtRQUNsRCxRQUFRLENBQUMsV0FBVyxDQUFDO1lBQ3BCLGFBQWEsRUFBRSxTQUFTO1lBQ3hCLE9BQU8sRUFBRSw0QkFBNEI7WUFDckMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxXQUFXLElBQUksVUFBVTtZQUN6QyxjQUFjLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDO1NBQzdDLENBQUMsQ0FBQztLQUNIO1NBQU0sSUFDTixPQUFPO1FBQ1AsUUFBUTtRQUNSLE9BQU8sQ0FBQyxXQUFXLElBQUksRUFBRTtRQUN6QixRQUFRLENBQUMsV0FBVyxJQUFJLEVBQUU7UUFDMUIsS0FBSyxDQUFDLFdBQVcsSUFBSSxFQUFFLEVBQ3RCO1FBQ0QsUUFBUSxDQUFDLFdBQVcsQ0FBQztZQUNwQixhQUFhLEVBQUUsU0FBUztZQUN4QixPQUFPLEVBQUUsdUJBQXVCO1lBQ2hDLEtBQUssRUFDSixHQUFHLE9BQU8sQ0FBQyxXQUFXLE1BQU0sUUFBUSxDQUFDLFdBQVcsSUFDL0MsS0FBSyxJQUFJLEtBQUssQ0FBQyxXQUFXLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFDL0QsRUFBRSxJQUFJLFVBQVU7WUFDakIsY0FBYyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQztTQUM3QyxDQUFDLENBQUM7S0FDSDtTQUFNLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7UUFDbkQsUUFBUSxDQUFDLFdBQVcsQ0FBQztZQUNwQixhQUFhLEVBQUUsU0FBUztZQUN4QixPQUFPLEVBQUUseUJBQXlCO1lBQ2xDLEtBQUssRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDOUMsY0FBYyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQztTQUM3QyxDQUFDLENBQUM7S0FDSDtTQUFNO1FBQ04sUUFBUSxDQUFDLFdBQVcsQ0FBQztZQUNwQixhQUFhLEVBQUUsU0FBUztZQUN4QixPQUFPLEVBQUUseUJBQXlCO1lBQ2xDLEtBQUssRUFBRSxXQUFXO1lBQ2xCLGNBQWMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUM7U0FDN0MsQ0FBQyxDQUFDO0tBQ0g7QUFDRixDQUFDLENBQUMsQ0FBQyJ9