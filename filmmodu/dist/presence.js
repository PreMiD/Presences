const presence = new Presence({
    clientId: "634816982843129857"
}), strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
}), pages = {
    "/film-arsivi": "Film Arşivi",
    "/en-cok-izlenen-filmler": "En Çok İzlenen Filmler",
    "/boxset-filmler": "Seri Filmleri",
    "/oyuncular": "Oyuncular",
    "/yonetmenler": "Yönetmenler",
    "/altyazili-film-izle": "Alt Yazılı Filmler",
    "/turkce-dublaj-izle": "Türkçe Dublajlı Filmler",
    "/giris-yap": "Giriş Yap",
    "/kayit-ol": "Kayıt Ol",
    "/iletisim": "İletişim"
};
presence.on("UpdateData", async () => {
    const page = document.location.pathname, title = document.querySelector("body > div.watch-page > div:nth-child(1) > div > div.col-md-7.col-xs-12.titles > h1"), video = document.querySelector("video");
    if (pages[page] || pages[page.slice(0, -1)]) {
        presence.setActivity({
            largeImageKey: "fm-logo",
            startTimestamp: Math.floor(Date.now() / 1000),
            details: "Bir sayfaya göz atıyor:",
            state: pages[page] || pages[page.slice(0, -1)]
        });
    }
    else if (page.includes("/liste/")) {
        const listName = document.querySelector("body > main > div.row.category-head > div > h2");
        presence.setActivity({
            largeImageKey: "fm-logo",
            startTimestamp: Math.floor(Date.now() / 1000),
            details: "Bir listeye göz atıyor:",
            state: listName && listName.textContent != ""
                ? listName.textContent
                : "Belirsiz"
        });
    }
    else if (page.includes("/film-ara")) {
        const searching = document.querySelector("body > main > div.row.category-head > div > h2"), fixedSearching = searching && searching.textContent != ""
            ? searching.textContent.replace(/"/g, "").replace(" Sonuçları", "")
            : "Belirsiz";
        presence.setActivity({
            largeImageKey: "fm-logo",
            startTimestamp: Math.floor(Date.now() / 1000),
            details: "Bir şey arıyor:",
            state: fixedSearching != "Belirsiz"
                ? fixedSearching[0].toUpperCase() + fixedSearching.slice(1)
                : "Belirsiz",
            smallImageKey: "search"
        });
    }
    else if (page.includes("/kategori/")) {
        const categoryName = document.querySelector("body > main > div.row.category-head > div:nth-child(1) > h2");
        presence.setActivity({
            largeImageKey: "fm-logo",
            startTimestamp: Math.floor(Date.now() / 1000),
            details: "Bir kategoriyi inceliyor:",
            state: categoryName && categoryName.textContent != ""
                ? categoryName.textContent
                : "Belirsiz"
        });
    }
    else if (title && title.textContent != "" && !video) {
        presence.setActivity({
            largeImageKey: "fm-logo",
            startTimestamp: Math.floor(Date.now() / 1000),
            details: "Bir filmi inceliyor:",
            state: title.textContent
        });
    }
    else if (title && title.textContent != "" && video) {
        const timestamps = getTimestamps(Math.floor(video.currentTime), Math.floor(video.duration));
        let data = {
            largeImageKey: "fm-logo",
            details: "Bir film izliyor:",
            state: title.textContent,
            smallImageKey: video.paused ? "pause" : "play",
            smallImageText: video.paused
                ? (await strings).pause
                : (await strings).play
        };
        if (!isNaN(timestamps[0]) && !isNaN(timestamps[1])) {
            data.startTimestamp = timestamps[0];
            data.endTimestamp = timestamps[1];
        }
        if (video.paused) {
            delete data.startTimestamp;
            delete data.endTimestamp;
        }
        presence.setActivity(data);
    }
    else {
        presence.setActivity({
            largeImageKey: "fm-logo",
            startTimestamp: Math.floor(Date.now() / 1000),
            details: "Bir sayfaya göz atıyor:",
            state: "Ana Sayfa"
        });
    }
});
function getTimestamps(videoTime, videoDuration) {
    const startTime = Date.now(), endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUM1QixRQUFRLEVBQUUsb0JBQW9CO0NBQzlCLENBQUMsRUFDRixPQUFPLEdBQVEsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUNsQyxJQUFJLEVBQUUsMkJBQTJCO0lBQ2pDLEtBQUssRUFBRSwwQkFBMEI7Q0FDakMsQ0FBQyxFQUNGLEtBQUssR0FBRztJQUNQLGNBQWMsRUFBRSxhQUFhO0lBQzdCLHlCQUF5QixFQUFFLHdCQUF3QjtJQUNuRCxpQkFBaUIsRUFBRSxlQUFlO0lBQ2xDLFlBQVksRUFBRSxXQUFXO0lBQ3pCLGNBQWMsRUFBRSxhQUFhO0lBQzdCLHNCQUFzQixFQUFFLG9CQUFvQjtJQUM1QyxxQkFBcUIsRUFBRSx5QkFBeUI7SUFDaEQsWUFBWSxFQUFFLFdBQVc7SUFDekIsV0FBVyxFQUFFLFVBQVU7SUFDdkIsV0FBVyxFQUFFLFVBQVU7Q0FDdkIsQ0FBQztBQUVILFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBQ3BDLE1BQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUN0QyxLQUFLLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FDN0IscUZBQXFGLENBQ3RFLEVBQ2hCLEtBQUssR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBcUIsQ0FBQztJQUU3RCxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO1FBQzVDLFFBQVEsQ0FBQyxXQUFXLENBQUM7WUFDcEIsYUFBYSxFQUFFLFNBQVM7WUFDeEIsY0FBYyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxD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