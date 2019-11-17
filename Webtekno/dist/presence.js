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
    clientId: "628269030901547037"
}),
    pages = {
        "/": "Ana Sayfa",
        "/haber": "Haberler",
        "/video": "Videolar",
        "/en-cok-okunanlar": "En Çok Okunan Gönderiler",
        "/en-cok-paylasilanlar": "En Çok Paylaşılan Gönderiler",
        "/en-cok-izlenenler": "En Çok İzlenilen Videolar",
        "/ara": "Bir şeyler arıyor...",
        "/uye/favorilerim": "Favorilerim",
        "/hakkimizda": "Hakkımızda",
        "/yazarlar": "Yazarlar",
        "/odullerimiz": "Ödüllerimiz",
        "/kunye": "Künye",
        "/gizlilik": "Gizlilik",
        "/iletisim": "İletişim"
    },
    smallImageKey = {
        "/ara": "searching",
        "/video": "video",
        "/uye/favorilerim": "star"
    };

presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    const page = document.location.pathname,
        title = document.querySelector("body > div.wt-container > div.global-container.container > div.content > div.news.content-detail-page > article > div.content-title > h1"),
        videoTitle = document.querySelector("body > div.wt-container > div.video-showcase > div > div.video-showcase__content__title > h1");

    if (page.includes("/yazar/")) {
        const author = document.querySelector("body > div.wt-container > div.global-container.container > div.content > div.content-author > div.content-author__detail > a > span");

        presence.setActivity({
            largeImageKey: "wt-logo",
            details: "Bir yazara göz atıyor:",
            state: author && author.textContent != "" ? author.textContent : "Belirsiz",
            startTimestamp: Math.floor(Date.now() / 1000)
        });
    } else if (title && title.textContent != "") {
        const postCreated = document.querySelector("body > div.wt-container > div.global-container.container > div.content > div.news.content-detail-page > article > div.content-info.clearfix > div.content-author > time") ? document.querySelector("body > div.wt-container > div.global-container.container > div.content > div.news.content-detail-page > article > div.content-info.clearfix > div.content-author > time").textContent : "Belirsiz Süre",
            author = document.querySelector("body > div.wt-container > div.global-container.container > div.content > div.news.content-detail-page > article > div.content-info.clearfix > div.content-author > span:nth-child(1) > a") ? document.querySelector("body > div.wt-container > div.global-container.container > div.content > div.news.content-detail-page > article > div.content-info.clearfix > div.content-author > span:nth-child(1) > a").textContent : "Belirsiz";

        presence.setActivity({
            largeImageKey: "wt-logo",
            details: `${title.textContent}`,
            state: `Yazar: ${author} (${postCreated})`,
            smallImageKey: "post",
            smallImageText: "Bir gönderi okuyor...",
            startTimestamp: Math.floor(Date.now() / 1000)
        });
    } else if (videoTitle && videoTitle.textContent != "") {
        const postCreated = document.querySelector("body > div.wt-container > div.global-container.container > div.content > article > div.content-info > time") ? document.querySelector("body > div.wt-container > div.global-container.container > div.content > article > div.content-info > time").textContent : "Belirsiz Süre",
            author = document.querySelector("body > div.wt-container > div.global-container.container > div.content > article > div.content-info > span:nth-child(1) > a") ? document.querySelector("body > div.wt-container > div.global-container.container > div.content > article > div.content-info > span:nth-child(1) > a").textContent : "Belirsiz";

        presence.setActivity({
            largeImageKey: "wt-logo",
            details: `${videoTitle.textContent}`,
            state: `Yazar: ${author} (${postCreated})`,
            smallImageKey: "video",
            smallImageText: "Bir video gönderi okuyor...",
            startTimestamp: Math.floor(Date.now() / 1000)
        });
    } else {
        presence.setActivity({
            largeImageKey: "wt-logo",
            details: `Bir sayfaya göz atıyor:`,
            state: pages[page] || pages[page.slice(0, -1)] || "Ana Sayfa",
            smallImageKey: smallImageKey[page] || smallImageKey[page.slice(0, -1)] || "NOTHING",
            startTimestamp: Math.floor(Date.now() / 1000)
        });
    }
}));