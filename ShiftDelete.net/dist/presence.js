const presence = new Presence({
    clientId: "643821029940133898"
}), pages = {
    "/": "Ana Sayfa",
    "/galeri": "Galeri",
    "/ukt": "UKT",
    "/nasil-yapilir": "Nasıl Yapılır?",
    "/android-uygulamalari": "Android Uygulamaları",
    "/ios": "iOS",
    "/yazilim/windows-10": "Windows 10 Haberleri",
    "/donanim": "Donanım Haberleri",
    "/otomobil": "Otomobil Haberleri",
    "/sdntv": "SDNTV",
    "/inceleme": "İncelemeler",
    "/mobil": "Mobil",
    "/oyun": "Oyun Haberleri",
    "/sosyal-medya": "Sosyal Medya Haberleri",
    "/populer-bilim": "Popüler Bilim Haberleri",
    "/uyelik.php": "Giriş / Kayıt",
    "/enler-haber": "En Çok Okunan Haberler",
    "/teknoloji-haberleri": "Teknoloji Haberleri",
    "/alinti-sartlari": "Alıntı Şartları",
    "/kunye": "Künye",
    "/site-kullanim-kosullari": "Site Kullanım Koşulları",
    "/hukuka-aykirilik-bildirimi": "Şikayet",
    "/gizlilik-bildirimi": "Gizlilik Politikası",
    "/whats-new": "Neler Yeni?",
    "/members": "Üyeler",
    "/members/list": "Üyeler",
    "/online": "Şu anda Aktif Kullanıcılar",
    "/whats-new/news-feed": "Haber Akışı",
    "/whats-new/latest-activity": "Son Akiviteler",
    "/find-threads/started": "Konularım",
    "/find-threads/contributed": "Mesajlarım & Konularım",
    "/find-threads/unanswered": "Cevaplanmamış Konular",
    "/watched/threads": "Takip Ettiğim Konular",
    "/watched/forums": "Takip Ettiğim Forumlar",
    "/conversations": "Mesajlar",
    "/account/alerts": "Bildirimler",
    "/account/reactions": "Alınan Tepkiler",
    "/account/bookmarks": "Yer İmleri",
    "/account/account-details": "Hesap Ayrıntıları",
    "/account/security": "Şifre & Güvenlik",
    "/account/privacy": "Gizlilik Ayarları",
    "/account/preferences": "Tercihler",
    "/account/connected-accounts": "Bağlı Hesaplar",
    "/account/following": "Takip Ettiklerim",
    "/account/ignored": "Yok Sayılanlar",
    "/account": "Hesap Ayrıntıları"
};
presence.on("UpdateData", async () => {
    const host = document.location.hostname, page = document.location.pathname;
    if (host == "shiftdelete.net") {
        const title = document.querySelector("body > div.wrapper > section > div > div.left.harber > h1"), author = document.querySelector("body > div.wrapper > section > div > div.left.harber > div.twtCommnets > div > div.desc > em"), time = document.querySelector("body > div.wrapper > section > div > div.left.harber > div.need_to_be_rendered") ||
            document.querySelector("body > div.wrapper > section > div > div.left.harber > div:nth-child(4)");
        if (title &&
            author &&
            time &&
            title.textContent != "" &&
            author.textContent != "" &&
            time.textContent != "") {
            presence.setActivity({
                largeImageKey: "sd-logo",
                details: title.textContent || "Belirsiz",
                state: `Yazar: ${author.textContent.replace("yazar", "")} (${time.textContent.trim().replace("eklendi", "")})`,
                smallImageKey: "read",
                smallImageText: "Bir gönderi okuyor...",
                startTimestamp: Math.floor(Date.now() / 1000)
            });
        }
        else if (page.includes("/yazar/")) {
            const title = document.title.split(" "), _author = title.slice(0, title.indexOf("Yazıları")).join(" ");
            presence.setActivity({
                largeImageKey: "sd-logo",
                details: "Bir yazara bakıyor:",
                state: _author || "Belirsiz",
                startTimestamp: Math.floor(Date.now() / 1000)
            });
        }
        else if (page.includes("/arama/")) {
            const searchingFor = document.querySelector("body > div.wrapper > section > div > div.left > h5 > strong");
            presence.setActivity({
                largeImageKey: "sd-logo",
                details: "Bir şey arıyor:",
                state: searchingFor && searchingFor.textContent
                    ? searchingFor.textContent.replace(/"/g, "")
                    : "Belirsiz",
                smallImageKey: "search",
                startTimestamp: Math.floor(Date.now() / 1000)
            });
        }
        else if (pages[page] || pages[page.slice(0, -1)]) {
            presence.setActivity({
                largeImageKey: "sd-logo",
                details: "Bir sayfaya göz atıyor:",
                state: pages[page] || pages[page.slice(0, -1)],
                startTimestamp: Math.floor(Date.now() / 1000)
            });
        }
    }
    else if (host == "forum.shiftdelete.net") {
        const user = document.querySelector("#top > div.p-body > div > div.p-body-main.p-body-main--withSidebar > div.p-body-content > div > div > div > div > div > div.memberHeader-main > div > h1 > span");
        if (page.includes("/members/") && user && user.textContent != "") {
            presence.setActivity({
                largeImageKey: "sd-logo",
                details: "Bir kullanıcıya bakıyor:",
                state: user.textContent,
                startTimestamp: Math.floor(Date.now() / 1000)
            });
        }
        else if (page.includes("/post-thread")) {
            const newTitle = document.querySelector(".js-titleInput");
            presence.setActivity({
                largeImageKey: "sd-logo",
                details: "Yeni bir forum gönderisi açıyor:",
                state: newTitle && newTitle.value != ""
                    ? newTitle.value
                    : "Henüz Başlık Girilmemiş",
                startTimestamp: Math.floor(Date.now() / 1000)
            });
        }
        else if (page.includes("/forums/")) {
            const forumTitle = document.querySelector("#top > div.p-body > div > div.p-body-header > div.p-title > h1");
            presence.setActivity({
                largeImageKey: "sd-logo",
                details: "Bir foruma göz atıyor:",
                state: forumTitle && forumTitle.textContent
                    ? forumTitle.textContent
                    : "Belirsiz",
                startTimestamp: Math.floor(Date.now() / 1000)
            });
        }
        else if (page.includes("/threads/")) {
            const title = document.querySelector("#top > div.p-body > div > div.p-body-header > div.p-title > h1"), author = document.querySelector("#js-XFUniqueId1"), time = document.querySelector("#top > div.p-body > div > div.p-body-header > div.p-description > ul > li:nth-child(2) > a > time");
            presence.setActivity({
                largeImageKey: "sd-logo",
                details: title && title.textContent != ""
                    ? title.textContent
                    : "Belirsiz Gönderi",
                state: `Yazar: ${author && author.textContent != ""
                    ? author.textContent
                    : "Belirsiz Gönderi Sahibi"} ${time && time.textContent != "" ? "(" + time.textContent + ")" : ""}`,
                smallImageKey: "forum",
                smallImageText: "Bir forum gönderisi okuyor.",
                startTimestamp: Math.floor(Date.now() / 1000)
            });
        }
        else if (page.includes("/search/")) {
            const searchingFor = document.querySelector("#top > div.p-body > div > div.p-body-header > div > h1 > a > em");
            presence.setActivity({
                largeImageKey: "sd-logo",
                details: "Forumda bir gönderi arıyor:",
                state: searchingFor && searchingFor.textContent != ""
                    ? searchingFor.textContent
                    : "Belirsiz",
                smallImageKey: "search",
                startTimestamp: Math.floor(Date.now() / 1000)
            });
        }
        else if (pages[page] || pages[page.slice(0, -1)]) {
            presence.setActivity({
                largeImageKey: "sd-logo",
                details: "Bir sayfaya göz atıyor:",
                state: pages[page] || pages[page.slice(0, -1)],
                smallImageKey: "forum",
                smallImageText: "Bu kullanıcı şuan da SDN Forum'da.",
                startTimestamp: Math.floor(Date.now() / 1000)
            });
        }
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUM1QixRQUFRLEVBQUUsb0JBQW9CO0NBQzlCLENBQUMsRUFDRixLQUFLLEdBQUc7SUFDUCxHQUFHLEVBQUUsV0FBVztJQUNoQixTQUFTLEVBQUUsUUFBUTtJQUNuQixNQUFNLEVBQUUsS0FBSztJQUNiLGdCQUFnQixFQUFFLGdCQUFnQjtJQUNsQyx1QkFBdUIsRUFBRSxzQkFBc0I7SUFDL0MsTUFBTSxFQUFFLEtBQUs7SUFDYixxQkFBcUIsRUFBRSxzQkFBc0I7SUFDN0MsVUFBVSxFQUFFLG1CQUFtQjtJQUMvQixXQUFXLEVBQUUsb0JBQW9CO0lBQ2pDLFFBQVEsRUFBRSxPQUFPO0lBQ2pCLFdBQVcsRUFBRSxhQUFhO0lBQzFCLFFBQVEsRUFBRSxPQUFPO0lBQ2pCLE9BQU8sRUFBRSxnQkFBZ0I7SUFDekIsZUFBZSxFQUFFLHdCQUF3QjtJQUN6QyxnQkFBZ0IsRUFBRSx5QkFBeUI7SUFDM0MsYUFBYSxFQUFFLGVBQWU7SUFDOUIsY0FBYyxFQUFFLHdCQUF3QjtJQUN4QyxzQkFBc0IsRUFBRSxxQkFBcUI7SUFDN0Msa0JBQWtCLEVBQUUsaUJBQWlCO0lBQ3JDLFFBQVEsRUFBRSxPQUFPO0lBQ2pCLDBCQUEwQixFQUFFLHlCQUF5QjtJQUNyRCw2QkFBNkIsRUFBRSxTQUFTO0lBQ3hDLHFCQUFxQixFQUFFLHFCQUFxQjtJQUM1QyxZQUFZLEVBQUUsYUFBYTtJQUMzQixVQUFVLEVBQUUsUUFBUTtJQUNwQixlQUFlLEVBQUUsUUFBUTtJQUN6QixTQUFTLEVBQUUsNEJBQTRCO0lBQ3ZDLHNCQUFzQixFQUFFLGFBQWE7SUFDckMsNEJBQTRCLEVBQUUsZ0JBQWdCO0lBQzlDLHVCQUF1QixFQUFFLFdBQVc7SUFDcEMsMkJBQTJCLEVBQUUsd0JBQXdCO0lBQ3JELDBC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