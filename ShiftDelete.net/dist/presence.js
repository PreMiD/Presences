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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsRUFDRixLQUFLLEdBQUc7SUFDTixHQUFHLEVBQUUsV0FBVztJQUNoQixTQUFTLEVBQUUsUUFBUTtJQUNuQixNQUFNLEVBQUUsS0FBSztJQUNiLGdCQUFnQixFQUFFLGdCQUFnQjtJQUNsQyx1QkFBdUIsRUFBRSxzQkFBc0I7SUFDL0MsTUFBTSxFQUFFLEtBQUs7SUFDYixxQkFBcUIsRUFBRSxzQkFBc0I7SUFDN0MsVUFBVSxFQUFFLG1CQUFtQjtJQUMvQixXQUFXLEVBQUUsb0JBQW9CO0lBQ2pDLFFBQVEsRUFBRSxPQUFPO0lBQ2pCLFdBQVcsRUFBRSxhQUFhO0lBQzFCLFFBQVEsRUFBRSxPQUFPO0lBQ2pCLE9BQU8sRUFBRSxnQkFBZ0I7SUFDekIsZUFBZSxFQUFFLHdCQUF3QjtJQUN6QyxnQkFBZ0IsRUFBRSx5QkFBeUI7SUFDM0MsYUFBYSxFQUFFLGVBQWU7SUFDOUIsY0FBYyxFQUFFLHdCQUF3QjtJQUN4QyxzQkFBc0IsRUFBRSxxQkFBcUI7SUFDN0Msa0JBQWtCLEVBQUUsaUJBQWlCO0lBQ3JDLFFBQVEsRUFBRSxPQUFPO0lBQ2pCLDBCQUEwQixFQUFFLHlCQUF5QjtJQUNyRCw2QkFBNkIsRUFBRSxTQUFTO0lBQ3hDLHFCQUFxQixFQUFFLHFCQUFxQjtJQUM1QyxZQUFZLEVBQUUsYUFBYTtJQUMzQixVQUFVLEVBQUUsUUFBUTtJQUNwQixlQUFlLEVBQUUsUUFBUTtJQUN6QixTQUFTLEVBQUUsNEJBQTRCO0lBQ3ZDLHNCQUFzQixFQUFFLGFBQWE7SUFDckMsNEJBQTRCLEVBQUUsZ0JBQWdCO0lBQzlDLHVCQUF1QixFQUFFLFdBQVc7SUFDcEMsMkJBQTJCLEVBQUUsd0JBQXdCO0lBQ3JELDBC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