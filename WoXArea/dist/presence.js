var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function (resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }

        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }

        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

const presence = new Presence({
    clientId: "644205772565381138"
}), pages = {
    "/": "Ana Sayfa",
    "/whats-new": "Neler Yeni?",
    "/find-threads/contributed": "Mesaj Yazılan Konular",
    "/find-threads/unanswered": "Cevaplanmamış Konular",
    "/find-threads/started": "Konularım",
    "/watched/threads": "Takip Ettiğim Konular",
    "/whats-new/news-feed": "Haber Akışı",
    "/whats-new/latest-activity": "Son Aktiviteler",
    "/shop/index.php": "Mağaza Ana Sayfa",
    "/shop/urunlerim.php": "Satın Aldıklarım",
    "/shop/myticket.php": "Destek Bildirimlerim",
    "/shop/newticket.php": "Yeni Destek Talebi",
    "/shop/hesapno.php": "Banka Hesap Bilgileri",
    "/account": "Hesabım",
    "/account/alerts": "Bildirimler",
    "/account/reactions": "Alınan Tepkiler",
    "/account/bookmarks": "Yer İşaretleri",
    "/account/kl-editor-templates/": "Editör Şablonları",
    "/account/security": "Şifre & Güvenlik",
    "/account/privacy": "Gizlilik Ayarları",
    "/account/following": "Takip Ettiklerim",
    "/account/signature": "İmzam",
    "/account/ignored": "Yok Sayılanlar",
    "/conversations": "Özel Konuşmalar",
    "/members": "Tüm Kullanıcılar"
};

presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    const page = document.location.pathname,
        searchingFor = document.querySelector("#top > div.p-body > div > div.\\<div.class\\= > div > h1 > a > em"),
        forumTitle = document.querySelector("#top > div.p-body > div > div.\\<div.class\\= > div.p-title > h1"),
        postTitle = document.querySelector("#top > div.p-body > div > div.\\<div.class\\= > div.p-title > h1"),
        memberName = document.querySelector("#top > div.p-body > div > div > div > div > div > div > div > div > div.memberHeader-main > div > h1 > span > span");

    if (page.includes("/members/") && memberName && memberName.textContent) {
        presence.setActivity({
            largeImageKey: "wa-logo2",
            details: "Bir üyenin profiline bakıyor:",
            state: memberName && memberName.textContent != "" ? memberName.textContent : "Belirsiz",
            startTimestamp: Math.floor(Date.now() / 1000)
        });
    } else if (page.includes("/search/") && searchingFor && searchingFor.textContent != "") {
        presence.setActivity({
            largeImageKey: "wa-logo2",
            details: "Bir şey arıyor:",
            state: searchingFor.textContent || "Belirsiz",
            smallImageKey: "search",
            startTimestamp: Math.floor(Date.now() / 1000)
        });
    } else if (page.includes("/post-thread")) {
        const input = document.querySelector(".input.js-titleInput");

        presence.setActivity({
            largeImageKey: "wa-logo2",
            details: "Yeni bir konu açıyor:",
            state: input && input.value ? input.value : "Henüz Başlık Girilmemiş",
            smallImageKey: "writing",
            startTimestamp: Math.floor(Date.now() / 1000)
        });
    } else if (page.includes("/forums/") && forumTitle && forumTitle.textContent != "") {
        presence.setActivity({
            largeImageKey: "wa-logo2",
            details: "Bir foruma göz atıyor:",
            state: forumTitle.textContent || "Belirsiz",
            startTimestamp: Math.floor(Date.now() / 1000)
        });
    } else if (page.includes("/threads/") && postTitle && postTitle.textContent != "") {
        const isTagged = document.querySelector("#top > div.p-body > div > div.\\<div.class\\= > div.p-title > h1 > span.konu_calisiyor") || document.querySelector("#top > div.p-body > div > div.\\<div.class\\= > div.p-title > h1 > span.konu_duyuru") || document.querySelector("#top > div.p-body > div > div.\\<div.class\\= > div.p-title > h1 > span.konu_betatest") || document.querySelector("#top > div.p-body > div > div.\\<div.class\\= > div.p-title > h1 > span.konu_calismiyor"),
            fixedPostTitle = isTagged && isTagged.textContent ? postTitle.textContent.replace(isTagged.textContent, "").trim() : postTitle.textContent;

        presence.setActivity({
            largeImageKey: "wa-logo2",
            details: "Bir gönderiye bakıyor:",
            state: fixedPostTitle || "Belirsiz",
            startTimestamp: Math.floor(Date.now() / 1000)
        });
    } else if (pages[page] || pages[page.slice(0, -1)]) {
        presence.setActivity({
            largeImageKey: "wa-logo2",
            details: "Bir sayfaya göz atıyor:",
            state: pages[page] || pages[page.slice(0, -1)] || "Belirsiz",
            startTimestamp: Math.floor(Date.now() / 1000)
        });
    } else {
        presence.setActivity({
            largeImageKey: "wa-logo2",
            details: "Bir sayfaya göz atıyor:",
            state: "Bilinmeyen Sayfa",
            startTimestamp: Math.floor(Date.now() / 1000)
        });
    }
}));