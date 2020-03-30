const presence = new Presence({
    clientId: "643777046731816962"
}), pages = {
    "/giris": "Giriş",
    "/kayit": "Kayıt",
    "/ilanlarim": "İlanlarım",
    "/ilanlarim/pasif": "Yayında Olmayan İlanlarım",
    "/ekspertiz-satin-al": "Ekspertiz Firması Bul",
    "/ekspertiz-islemlerim": "Ekspertiz İşlemlerim",
    "/ekspertiz-raporlarim": "Ekspertiz Raporlarım",
    "/get": "Güvenli e-Ticaret",
    "/mevcut-siparislerim": "Siparişlerim",
    "/iade-islemlerim": "İade İşlemlerim",
    "/tamamlananlar": "Tamamlanan Siparişlerim",
    "/mesafeli-satis-sozlesmelerim/alis": "Mesafeli Satış Sözleşmelerim",
    "/satistaki-urunlerim": "Satıştaki Ürünlerim",
    "/kargolayacaklarim": "Kargolayacaklarım",
    "/alicidan-onay-beklediklerim": "Alıcıdan Onay Beklediklerim",
    "/basarili-satislarim": "Başarılı Satışlarım",
    "/iade-edilenler": "İade Edilenler",
    "/satista-olmayan-urunlerim": "Satışta Olmayan Ürünlerim",
    "/banka-bilgilerim": "Banka Bilgilerim",
    "/kolay-alisveris-profillerim": "Kayıtlı Kredi Kartlarım",
    "/hesap-hareketlerim": "Hesap Hareketlerim",
    "/kullanici-engelle": "Engellenen Kullanıcılar",
    "/listeleme-urunlerim": "Listeleme Ürünlerim",
    "/izinlerim/bildirimler": "Bildirim İzinlerim",
    "/izinlerim/iletisim": "İletişim İzinlerim",
    "/izinlerim/okundu-bilgisi": "Mesaj Okundu Bilgisi",
    "/merkez-adres": "Merkez Adresim",
    "/mesafeli-satis-sozlesmelerim/satis": "Mesafeli Satış Sözleşmelerim (Satış)",
    "/adreslerim": "Adreslerim",
    "/yorum-yonetimi": "Yorum Yönetimi",
    "/kurumsal/hakkimizda": "Hakkımızda",
    "/kurumsal/sayilarla-sahibinden": "Hakkımızda",
    "/kurumsal/aksoy-grup": "Hakkımızda",
    "/kurumsal/reklam-filmleri": "Reklam Filmleri",
    "/kurumsal/iletisim": "İletişim",
    "/doping-tanitim": "sahibinden.com Doping",
    "/toplu-urun-girisi": "Toplu Ürün Girişi",
    "/reklam": "Reklam",
    "/sahibinden-dogal-reklam": "sahibinden Doğal Reklam",
    "/mobil": "Mobil Uygulama",
    "/magazam": "Mağazam",
    "/magaza-kategori-secimi": "Mağaza Kategori Seçimi",
    "/neden-magaza": "Neden Mağaza?",
    "/magaza-fiyatlari": "Mağaza Fiyatları",
    "/emlakofisim": "Emlak Ofisim",
    "/galerim": "Galerim",
    "/guvenli-alisverisin-ipuclari": "Güvenli Alışverişin İpuçları",
    "/sozlesmeler": "Sözleşmeler",
    "/sozlesmeler/bireysel-uyelik-sozlesmesi-0": "Bireysel Üyelik Sözleşmesi",
    "/sozlesmeler/kullanim-kosullari-35": "Kullanım Koşulları",
    "/site-haritasi": "Site Haritası",
    "/sozlesmeler/kisisel-verilerin-korunmasi-58": "Kişisel Verilerin Korunması",
    "/mesajlarim": "Mesajlarım",
    "/get/mesajlarim": "GET Mesajlarım",
    "/bilgilendirmeler": "Bilgilendirmeler",
    "/urun-ve-hizmetlerimiz": "Ürün ve Hizmetlerimiz",
    "/hasar-sorgu": "Hasar Sorgu",
    "/arac-detay-sorgu": "Araç Detay Sorgu",
    "/gecmis-sorgularim": "Geçmiş Sorgularım",
    "/urun-ve-hizmetlerimiz/arac-sigorta-teklifleri": "Araç Sigortası Teklifleri",
    "/urun-ve-hizmetlerimiz/ekspertiz-hizmeti": "Ekspertiz Hizmeti",
    "/urun-ve-hizmetlerimiz/emlak-endeksi": "Emlak Endeksi",
    "/favori-ilanlar": "Favori İlanlarım",
    "/favori-aramalarim": "Favori Aramalarım",
    "/favori-saticilarim": "Favori Satıcılarım",
    "/en": "English Homepage"
};
presence.on("UpdateData", () => async () => {
    const page = document.location.pathname, searchingFor = document.querySelector("#searchResultsSearchForm > div > div.searchResultsRight > div.relativeContainer > div.infoSearchResults > div > div.result-text > h1 > span") ||
        document.querySelector("#wideContainer > div > div.results-header > h1 > strong > b"), category = document.querySelector("#container > div.top-menu-container.clearfix.custom-category-container > div.top-menu-left > div > div.uiInlineBoxTitle > h1") ||
        document.querySelector("#searchContainer > div.searchResultsPage.uiContent > div.specialCatHeaders > div > h1") ||
        document.querySelector("#container > div > div.categoryPageLeft > div:nth-child(1) > div.uiInlineBoxTitle > h1");
    if (page.includes("/kategori/") || (category && category.textContent != "")) {
        presence.setActivity({
            largeImageKey: "s-logo",
            details: "Bir kategoriye göz atıyor:",
            state: category.textContent.trim() || "Belirsiz",
            startTimestamp: Math.floor(Date.now() / 1000)
        });
    }
    else if (page.includes("/kelime-ile-arama") ||
        (searchingFor && searchingFor.textContent != "")) {
        presence.setActivity({
            largeImageKey: "s-logo",
            details: "Bir şey arıyor:",
            state: searchingFor && searchingFor.textContent
                ? searchingFor.textContent
                : "Belirsiz",
            smallImageKey: "search",
            startTimestamp: Math.floor(Date.now() / 1000)
        });
    }
    else if (page.includes("/ilan/")) {
        const stuff = document.querySelector("#classifiedDetail > div.classifiedDetail > div.classifiedDetailTitle > h1"), price = document.querySelector("#classifiedDetail > div.classifiedDetail > div.classifiedDetailContent > div.classifiedInfo > h3");
        presence.setActivity({
            largeImageKey: "s-logo",
            details: "Bir ilana göz atıyor:",
            state: stuff && stuff.textContent != ""
                ? `${stuff.textContent.trim()} ${price && price.textContent != ""
                    ? "(" + price.textContent.trim().split(" ")[0] + " TL)"
                    : ""}`
                : "Belirsiz",
            startTimestamp: Math.floor(Date.now() / 1000)
        });
    }
    else if (pages[page] || pages[page.slice(0, -1)]) {
        presence.setActivity({
            largeImageKey: "s-logo",
            details: "Bir sayfaya göz atıyor:",
            state: pages[page] || pages[page.slice(0, -1)],
            startTimestamp: Math.floor(Date.now() / 1000)
        });
    }
    else if (document.location.hostname == "banaozel.sahibinden.com" &&
        document.location.pathname == "/") {
        presence.setActivity({
            largeImageKey: "s-logo",
            details: "Bir sayfaya göz atıyor:",
            state: "Bana Özel",
            startTimestamp: Math.floor(Date.now() / 1000)
        });
    }
    else {
        presence.setActivity({
            largeImageKey: "s-logo",
            details: "Bir sayfaya göz atıyor:",
            state: "Ana Sayfa",
            startTimestamp: Math.floor(Date.now() / 1000)
        });
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUM1QixRQUFRLEVBQUUsb0JBQW9CO0NBQzlCLENBQUMsRUFDRixLQUFLLEdBQUc7SUFDUCxRQUFRLEVBQUUsT0FBTztJQUNqQixRQUFRLEVBQUUsT0FBTztJQUNqQixZQUFZLEVBQUUsV0FBVztJQUN6QixrQkFBa0IsRUFBRSwyQkFBMkI7SUFDL0MscUJBQXFCLEVBQUUsdUJBQXVCO0lBQzlDLHVCQUF1QixFQUFFLHNCQUFzQjtJQUMvQyx1QkFBdUIsRUFBRSxzQkFBc0I7SUFDL0MsTUFBTSxFQUFFLG1CQUFtQjtJQUMzQixzQkFBc0IsRUFBRSxjQUFjO0lBQ3RDLGtCQUFrQixFQUFFLGlCQUFpQjtJQUNyQyxnQkFBZ0IsRUFBRSx5QkFBeUI7SUFDM0Msb0NBQW9DLEVBQUUsOEJBQThCO0lBQ3BFLHNCQUFzQixFQUFFLHFCQUFxQjtJQUM3QyxvQkFBb0IsRUFBRSxtQkFBbUI7SUFDekMsOEJBQThCLEVBQUUsNkJBQTZCO0lBQzdELHNCQUFzQixFQUFFLHFCQUFxQjtJQUM3QyxpQkFBaUIsRUFBRSxnQkFBZ0I7SUFDbkMsNEJBQTRCLEVBQUUsMkJBQTJCO0lBQ3pELG1CQUFtQixFQUFFLGtCQUFrQjtJQUN2Qyw4QkFBOEIsRUFBRSx5QkFBeUI7SUFDekQscUJBQXFCLEVBQUUsb0JBQW9CO0lBQzNDLG9CQUFvQixFQUFFLHlCQUF5QjtJQUMvQyxzQkFBc0IsRUFBRSxxQkFBcUI7SUFDN0Msd0JBQXdCLEVBQUUsb0JBQW9CO0lBQzlDLHFCQUFxQixFQUFFLG9CQUFvQjtJQUMzQywyQkFBMkIsRUFBRSxzQkFBc0I7SUFDbkQsZUFBZSxFQUFFLGdCQUFnQjtJQUNqQyxxQ0FBcUMsRUFDcEMsc0NBQXNDO0lBQ3ZDLGFBQWEsRUFBRSxZQUFZO0lBQzNCLGlCQUFp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