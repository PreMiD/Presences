const presence = new Presence({
    clientId: "628269030901547037"
}), pages = {
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
}, smallImageKey = {
    "/ara": "searching",
    "/video": "video",
    "/uye/favorilerim": "star"
};
presence.on("UpdateData", async () => {
    const page = document.location.pathname, title = document.querySelector("body > div.wt-container > div.global-container.container > div.content > div.news.content-detail-page > article > div.content-title > h1"), videoTitle = document.querySelector("body > div.wt-container > div.video-showcase > div > div.video-showcase__content__title > h1");
    if (page.includes("/yazar/")) {
        const author = document.querySelector("body > div.wt-container > div.global-container.container > div.content > div.content-author > div.content-author__detail > a > span");
        presence.setActivity({
            largeImageKey: "wt-logo",
            details: "Bir yazara göz atıyor:",
            state: author && author.textContent != "" ? author.textContent : "Belirsiz",
            startTimestamp: Math.floor(Date.now() / 1000)
        });
    }
    else if (title && title.textContent != "") {
        const postCreated = document.querySelector("body > div.wt-container > div.global-container.container > div.content > div.news.content-detail-page > article > div.content-info.clearfix > div.content-author > time")
            ? document.querySelector("body > div.wt-container > div.global-container.container > div.content > div.news.content-detail-page > article > div.content-info.clearfix > div.content-author > time").textContent
            : "Belirsiz Süre", author = document.querySelector("body > div.wt-container > div.global-container.container > div.content > div.news.content-detail-page > article > div.content-info.clearfix > div.content-author > span:nth-child(1) > a")
            ? document.querySelector("body > div.wt-container > div.global-container.container > div.content > div.news.content-detail-page > article > div.content-info.clearfix > div.content-author > span:nth-child(1) > a").textContent
            : "Belirsiz";
        presence.setActivity({
            largeImageKey: "wt-logo",
            details: `${title.textContent}`,
            state: `Yazar: ${author} (${postCreated})`,
            smallImageKey: "post",
            smallImageText: "Bir gönderi okuyor...",
            startTimestamp: Math.floor(Date.now() / 1000)
        });
    }
    else if (videoTitle && videoTitle.textContent != "") {
        const postCreated = document.querySelector("body > div.wt-container > div.global-container.container > div.content > article > div.content-info > time")
            ? document.querySelector("body > div.wt-container > div.global-container.container > div.content > article > div.content-info > time").textContent
            : "Belirsiz Süre", author = document.querySelector("body > div.wt-container > div.global-container.container > div.content > article > div.content-info > span:nth-child(1) > a")
            ? document.querySelector("body > div.wt-container > div.global-container.container > div.content > article > div.content-info > span:nth-child(1) > a").textContent
            : "Belirsiz";
        presence.setActivity({
            largeImageKey: "wt-logo",
            details: `${videoTitle.textContent}`,
            state: `Yazar: ${author} (${postCreated})`,
            smallImageKey: "video",
            smallImageText: "Bir video gönderi okuyor...",
            startTimestamp: Math.floor(Date.now() / 1000)
        });
    }
    else {
        presence.setActivity({
            largeImageKey: "wt-logo",
            details: `Bir sayfaya göz atıyor:`,
            state: pages[page] || pages[page.slice(0, -1)] || "Ana Sayfa",
            smallImageKey: smallImageKey[page] || smallImageKey[page.slice(0, -1)] || "NOTHING",
            startTimestamp: Math.floor(Date.now() / 1000)
        });
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUM1QixRQUFRLEVBQUUsb0JBQW9CO0NBQzlCLENBQUMsRUFDRixLQUFLLEdBQUc7SUFDUCxHQUFHLEVBQUUsV0FBVztJQUNoQixRQUFRLEVBQUUsVUFBVTtJQUNwQixRQUFRLEVBQUUsVUFBVTtJQUNwQixtQkFBbUIsRUFBRSwwQkFBMEI7SUFDL0MsdUJBQXVCLEVBQUUsOEJBQThCO0lBQ3ZELG9CQUFvQixFQUFFLDJCQUEyQjtJQUNqRCxNQUFNLEVBQUUsc0JBQXNCO0lBQzlCLGtCQUFrQixFQUFFLGFBQWE7SUFDakMsYUFBYSxFQUFFLFlBQVk7SUFDM0IsV0FBVyxFQUFFLFVBQVU7SUFDdkIsY0FBYyxFQUFFLGFBQWE7SUFDN0IsUUFBUSxFQUFFLE9BQU87SUFDakIsV0FBVyxFQUFFLFVBQVU7SUFDdkIsV0FBVyxFQUFFLFVBQVU7Q0FDdkIsRUFDRCxhQUFhLEdBQUc7SUFDZixNQUFNLEVBQUUsV0FBVztJQUNuQixRQUFRLEVBQUUsT0FBTztJQUNqQixrQkFBa0IsRUFBRSxNQUFNO0NBQzFCLENBQUM7QUFFSCxRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxLQUFLLElBQUksRUFBRTtJQUNwQyxNQUFNLElBQUksR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFDdEMsS0FBSyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQzdCLDBJQUEwSSxDQUMxSSxFQUNELFVBQVUsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUNsQyw4RkFBOEYsQ0FDOUYsQ0FBQztJQUVILElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsRUFBRTtRQUM3QixNQUFNLE1BQU0sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUNwQyxxSUFBcUksQ0FDckksQ0FBQztRQUVG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