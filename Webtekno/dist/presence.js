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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsRUFDRixLQUFLLEdBQUc7SUFDTixHQUFHLEVBQUUsV0FBVztJQUNoQixRQUFRLEVBQUUsVUFBVTtJQUNwQixRQUFRLEVBQUUsVUFBVTtJQUNwQixtQkFBbUIsRUFBRSwwQkFBMEI7SUFDL0MsdUJBQXVCLEVBQUUsOEJBQThCO0lBQ3ZELG9CQUFvQixFQUFFLDJCQUEyQjtJQUNqRCxNQUFNLEVBQUUsc0JBQXNCO0lBQzlCLGtCQUFrQixFQUFFLGFBQWE7SUFDakMsYUFBYSxFQUFFLFlBQVk7SUFDM0IsV0FBVyxFQUFFLFVBQVU7SUFDdkIsY0FBYyxFQUFFLGFBQWE7SUFDN0IsUUFBUSxFQUFFLE9BQU87SUFDakIsV0FBVyxFQUFFLFVBQVU7SUFDdkIsV0FBVyxFQUFFLFVBQVU7Q0FDeEIsRUFDRCxhQUFhLEdBQUc7SUFDZCxNQUFNLEVBQUUsV0FBVztJQUNuQixRQUFRLEVBQUUsT0FBTztJQUNqQixrQkFBa0IsRUFBRSxNQUFNO0NBQzNCLENBQUM7QUFFSixRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxLQUFLLElBQUksRUFBRTtJQUNuQyxNQUFNLElBQUksR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFDckMsS0FBSyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQzVCLDBJQUEwSSxDQUMzSSxFQUNELFVBQVUsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUNqQyw4RkFBOEYsQ0FDL0YsQ0FBQztJQUVKLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsRUFBRTtRQUM1QixNQUFNLE1BQU0sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUNuQyxxSUFBcUksQ0FDdEksQ0FBQztRQUVG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