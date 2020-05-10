const presence = new Presence({ clientId: "650497315391537153" });
const pages = {
    "/kontrolpaneli": "Üye Kontrol Paneli",
    "/groups": "Sosyal Gruplar",
    "/members/albums.html": "Albümler",
    "/profil/arkadaslistesi/": "Arkadaş Listesi",
    "/profil/imzadegistir/": "İmza Değiştirme",
    "/profil/duzenle": "Profiliniz Düzenliyor",
    "/profil/seceneklerim/": "Seçenekleri Düzenliyor",
    "/online.php": "Kimler Online",
    "/r10likelist.php": "R10 Like Listesi",
    "/uzmanara.php": "Uzman Ara",
    "/site-analiz/": "Site Analiz",
    "/seo-analiz/": "SEO Analiz",
    "/sira-bulucu/": "Sıra Bulucu",
    "/whois/": "WHOIS Sorgulama",
    "/itrader_main.php": "Ticaret Bölümü",
    "/search.php": "Arama",
    "/pm/": "Özel Mesajlar"
};
presence.on("UpdateData", async () => {
    const page = document.location.pathname;
    const kategori = document.querySelector("body > main > div > div.threadList > div > ul > li:nth-child(1)");
    const post = document.querySelector("body > main > div > div.pagination > div.left.double > a.rbtn.rgreen > span:nth-child(2)");
    const cevap = document.querySelector("body > main > div > form > div:nth-child(12) > div.head");
    const head = document.querySelector("head > title");
    const analiz = document.querySelector("body > div.page-header.r10title > div > div > h4 > span");
    const report = document.querySelector("body > main > div > form > div > div.head");
    const presenceData = {
        largeImageKey: "logo_beyaz",
        startTimestamp: Math.floor(Date.now() / 1000)
    };
    if (kategori && kategori.textContent != "") {
        presenceData.details = "Bir kategoriyi inceliyor:";
        presenceData.state = document.querySelector("body > main > div > div.breadCrumb > div.top > div.left > div:nth-child(2) > span:nth-child(1) > h2").textContent;
    }
    else if (post && post.textContent != "") {
        presenceData.details = "Bir konuyu inceliyor:";
        presenceData.state = document.querySelector("body > main > div > div.breadCrumb > div.top > div.left > div:nth-child(2) > span > h2").textContent;
    }
    else if (head.textContent.includes("Profil bilgileri:")) {
        presenceData.details = "Bir kullanıcıyı inceliyor:";
        presenceData.state = document.querySelector("body > main > div.container > div.left > div:nth-child(1) > div > div.top > div.info > div.name > a").textContent;
    }
    else if (cevap && cevap.textContent != "") {
        presenceData.details = "Bir konuya cevap yazıyor:";
        presenceData.state = document.querySelector("body > main > div > div.breadCrumb > div.bottom > ul > li:nth-child(4) > a > span").textContent;
    }
    else if (analiz &&
        analiz.textContent == "R10.net - Webmaster & SEO Araçları") {
        presenceData.details = "Forumda geziniyor:";
        presenceData.state = "Webmaster & SEO Araçları";
    }
    else if (report && report.textContent == "Mesajı Moderatöre Bildir") {
        presenceData.details = "Bir konuyu moderatöre bildiriyor:";
        presenceData.state = document.querySelector("body > main > div > div.breadCrumb > div.bottom > ul > li:nth-child(4) > a > span").textContent;
    }
    else if (pages[page] || pages[page.slice(0, -1)]) {
        presenceData.details = "Forumda geziniyor:";
        presenceData.state = pages[page] || pages[page.slice(0, -1)];
    }
    else {
        presenceData.details = "Forumda geziniyor:";
        presenceData.state = "Ana Sayfa";
    }
    if (presenceData.details == null) {
        presence.setTrayTitle();
        presence.setActivity();
    }
    else {
        presence.setActivity(presenceData);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQyxFQUFFLFFBQVEsRUFBRSxvQkFBb0IsRUFBRSxDQUFDLENBQUM7QUFDbEUsTUFBTSxLQUFLLEdBQUc7SUFDWixnQkFBZ0IsRUFBRSxvQkFBb0I7SUFDdEMsU0FBUyxFQUFFLGdCQUFnQjtJQUMzQixzQkFBc0IsRUFBRSxVQUFVO0lBQ2xDLHlCQUF5QixFQUFFLGlCQUFpQjtJQUM1Qyx1QkFBdUIsRUFBRSxpQkFBaUI7SUFDMUMsaUJBQWlCLEVBQUUsdUJBQXVCO0lBQzFDLHVCQUF1QixFQUFFLHdCQUF3QjtJQUNqRCxhQUFhLEVBQUUsZUFBZTtJQUM5QixrQkFBa0IsRUFBRSxrQkFBa0I7SUFDdEMsZUFBZSxFQUFFLFdBQVc7SUFDNUIsZUFBZSxFQUFFLGFBQWE7SUFDOUIsY0FBYyxFQUFFLFlBQVk7SUFDNUIsZUFBZSxFQUFFLGFBQWE7SUFDOUIsU0FBUyxFQUFFLGlCQUFpQjtJQUM1QixtQkFBbUIsRUFBRSxnQkFBZ0I7SUFDckMsYUFBYSxFQUFFLE9BQU87SUFDdEIsTUFBTSxFQUFFLGVBQWU7Q0FDeEIsQ0FBQztBQUVGLFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBQ25DLE1BQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDO0lBQ3hDLE1BQU0sUUFBUSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQ3JDLGlFQUFpRSxDQUNsRSxDQUFDO0lBQ0YsTUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FDakMsMEZBQTBGLENBQzNGLENBQUM7SUFDRixNQUFNLEtBQUssR0FBRyxRQUFRLENBQUMsYUFBYSxDQUNsQyx5REFBeUQsQ0FDMUQsQ0FBQztJQUNGLE1BQU0sSUFBSSxHQUFHLFFBQVEs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