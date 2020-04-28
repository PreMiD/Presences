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
function getTimestamps(videoTime, videoDuration) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
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
        const data = {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsRUFDRixPQUFPLEdBQVEsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUNqQyxJQUFJLEVBQUUsMkJBQTJCO0lBQ2pDLEtBQUssRUFBRSwwQkFBMEI7Q0FDbEMsQ0FBQyxFQUNGLEtBQUssR0FBRztJQUNOLGNBQWMsRUFBRSxhQUFhO0lBQzdCLHlCQUF5QixFQUFFLHdCQUF3QjtJQUNuRCxpQkFBaUIsRUFBRSxlQUFlO0lBQ2xDLFlBQVksRUFBRSxXQUFXO0lBQ3pCLGNBQWMsRUFBRSxhQUFhO0lBQzdCLHNCQUFzQixFQUFFLG9CQUFvQjtJQUM1QyxxQkFBcUIsRUFBRSx5QkFBeUI7SUFDaEQsWUFBWSxFQUFFLFdBQVc7SUFDekIsV0FBVyxFQUFFLFVBQVU7SUFDdkIsV0FBVyxFQUFFLFVBQVU7Q0FDeEIsQ0FBQztBQU9KLFNBQVMsYUFBYSxDQUNwQixTQUFpQixFQUNqQixhQUFxQjtJQUVyQixJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDM0IsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEdBQUcsU0FBUyxHQUFHLGFBQWEsQ0FBQztJQUN2RSxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFDakQsQ0FBQztBQUVELFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBQ25DLE1BQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUNyQyxLQUFLLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FD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